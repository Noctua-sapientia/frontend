import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SellerPage from './SellerPage';
import CustomerPage from './CustomerPage';
import { useAuth } from '../AuthContext';

const MyAccount = () => {
  const {userType, handleLogout, isAuthenticated } = useAuth();
  console.log("Estamos en myAccount y tenemos el usuario:", userType);
  // Verifica si el usuario está autenticado antes de renderizar el contenido
  if (!isAuthenticated()) {
    return <p>No has iniciado sesión.</p>;
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