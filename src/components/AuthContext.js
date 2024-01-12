// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userType, setUserType] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      // Simulación de una solicitud al backend para obtener el token de acceso
      const response = await fetch('https://api.tuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setUserType(data.userType);
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
  };

  const isAuthenticated = () => !!accessToken;

  const contextValue = {
    accessToken,
    userType,
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
