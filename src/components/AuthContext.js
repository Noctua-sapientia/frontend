// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
const DEBUG = true;
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userType, setUserType] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      if (DEBUG){
        const userCustomer = 'customer';
        const userCustomerPass = 'customer';
        const userSeller = 'seller';
        const userSellerPass = 'seller';

        console.log("Estamos en debug")

        let fakeToken = null;
        if (username === userCustomer && password === userCustomerPass) {
          fakeToken = createFakeToken(username, password , 'customer');
          setAccessToken(fakeToken);
          setUserType('customer');
          console.log('User type:', userType);
          return true;
        }
        if (username === userSeller && password === userSellerPass) {
          fakeToken = createFakeToken(username, password , 'seller');
          setAccessToken(fakeToken);
          setUserType('seller');
          console.log('User type:', userType);
          return true;
        }
        // Puedes almacenar el token en el estado o contexto de autenticación si es necesario
        console.log('Fake Token:', fakeToken);
      }else{
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
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
      return false;
    }
  };

  // Función para simular la creación de un token
  const createFakeToken = (username, password, userType) => {
    // Simula la creación de un token con información de usuario
    const tokenPayload = {
      username,
      password,
      userType,
    };

    // Codifica el objeto en formato JSON y luego en Base64 (puedes usar otras estrategias)
    const encodedToken = btoa(JSON.stringify(tokenPayload));

    return encodedToken;
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
