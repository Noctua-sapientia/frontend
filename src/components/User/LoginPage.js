// LoginPage.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './user_styles.css'; // Importa tus estilos CSS aquí
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';



function LoginPage() {
  const { handleLogin } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Obtén el objeto history
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    // Llama a la función handleLogin del contexto de autenticación
    const success = await handleLogin(username, password);

    // Verifica si el inicio de sesión fue exitoso
    if (success) {
      // Puedes redirigir al usuario a la página de su cuenta, por ejemplo:
      navigate('/my-account');
    }
  };

  return (
    <Container className="home-container">
      <Row className="column-container">
        <Col md={4} className="column">
          {/* Formulario de inicio de sesión si no hay un token de acceso */}
          <Form className="mt-5">
            <Form.Group controlId="formUsername">
              <Form.Control
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleLoginClick}>
              Iniciar sesión
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

