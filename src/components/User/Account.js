import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SellerPage from './SellerPage';
import CustomerPage from './CustomerPage';
import { useAuth } from '../AuthContext';

const MyAccount = () => {
  const {userType, handleLogout, isAuthenticated, userId } = useAuth();
  console.log("Estamos en myAccount y tenemos el usuario:", userType);
  console.log("Numero de usuario:", userId);
  // Verifica si el usuario está autenticado antes de renderizar el contenido
  if (!isAuthenticated()) {
    return <h1> No has iniciado sesión </h1>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          {userType === 'seller' ? (
            <SellerPage />
          ) : (
            <CustomerPage />
          )}
        </Col>
      </Row>
      <Button className="mt-3" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </Container>
  );
};

export default MyAccount;