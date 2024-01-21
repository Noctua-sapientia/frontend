// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken') || null);
  const [userType, setUserType] = useState(sessionStorage.getItem('userType') || null);
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') || null);


  const handleLogin = async (username, password) => {
    try {
        // Simulación de una solicitud al backend para obtener el token de acceso
        const request= new Request('/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email:username,
            password:password
          }),
      });
        
        const response = await fetch(request);

        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.token);
          setUserType(data.userType);
          setUserId(data.userId);

          // Almacenar en sessionStorage en lugar de sessionStorage
          sessionStorage.setItem('accessToken', data.token);
          sessionStorage.setItem('userType', data.userType);
          sessionStorage.setItem('userId', data.userId);

          return true;
        } else {
          // Manejo de errores
          console.error('Inicio de sesión fallido');
          return false;
        }

    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
      return false;
    }
  };


  const handleLogout = () => {
    setAccessToken(null);
    setUserType(null);

    // Limpiar sessionStorage al cerrar sesión
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('userId');
  };

  const isAuthenticated = () => !!accessToken;

  const contextValue = {
    accessToken,
    userType,
    userId,
    handleLogin,
    handleLogout,
    isAuthenticated,
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
