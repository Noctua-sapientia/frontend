// LoginPage.js
import React from 'react';
import authService from '../../services/authService';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './user_styles.css'; // Importa tus estilos CSS aquí


function LoginPage() {
  const handleLogin = () => {
    // Lógica de inicio de sesión utilizando authService
    authService.login();
  };

  return (
    <Container className="home-container">
      <Row className="column-container">
        <Col md={4} className="column">
          <h1>Hola de nuevo</h1>
          <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" >
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="button" onClick={handleLogin}>
            Iniciar Sesión
          </Button>
          </Form>
        </Col>
        <Col md={4} className="column">
          <h1>Registrate</h1>
          <Button variant="primary" type="button" href="/login/register">
            Registrarse
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage; 

