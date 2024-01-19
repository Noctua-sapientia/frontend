// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
const DEBUG = false;

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);


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
          setUserId(1);
          console.log('User type:::', userType);
          return true;
        }
        if (username === userSeller && password === userSellerPass) {
          fakeToken = createFakeToken(username, password , 'seller');
          setAccessToken(fakeToken);
          setUserType('seller');
          setUserId(2);
          console.log('User type:', userType);
          return true;
        }
        // Puedes almacenar el token en el estado o contexto de autenticación si es necesario
        console.log('Fake Token:', fakeToken);
      }else{
        // Simulación de una solicitud al backend para obtener el token de acceso
        const request= new Request('http://localhost:3000/api/v1/login', {
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
