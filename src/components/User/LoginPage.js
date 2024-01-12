// LoginPage.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './user_styles.css'; // Importa tus estilos CSS aquí


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState(null);

  const handleLogin = async () => {
    try {
      // Realizar la solicitud al backend
      const response = await fetch('https://api.tuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // Verificar si la solicitud fue exitosa (código de estado 200-299)
      if (!response.ok) {
        throw new Error('Inicio de sesión fallido');
      }

      // Extraer el token de acceso de la respuesta
      const data = await response.json();
      const token = data.accessToken;

      // Almacenar el token de acceso en el estado
      setAccessToken(token);
    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
    }
  };

  return (
    <Container className="home-container">
      <Row className="column-container">
        
        {accessToken ? ( // Verifica si hay un token de acceso
          <Col md={8} className="column">
            <p>¡Bienvenido! Ya has iniciado sesión.</p>
          </Col>
          
          ) : (
            <>
            <Col md={4} className="column">
              {/* Formulario de inicio de sesión si no hay un token de acceso */}
              <Form>
                Nombre de usuario:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form>
              <br />
              <Form>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form>
              <br />
              <Button onClick={handleLogin}>Iniciar sesión</Button>
              
            </Col>
            <Col md={4} className="column">
              <h1>Registrate</h1>
              <Button variant="primary" type="button" href="/login/register">
                Registrarse
              </Button>
            </Col>
            </>
        )}
      </Row>
    </Container>
  );
}

export default LoginPage; 

