// LoginPage.js
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './user_styles.css'; // Importa tus estilos CSS aquí
import 'bootstrap/dist/css/bootstrap.min.css';
import imageMicrosoft from '../../img/microsoft.png';
import imageMeta from '../../img/meta.png';
import imageGoogle from '../../img/google.png';

function RegisterPage() {

    const handleLoginWithMeta = () => {
      // Lógica para iniciar sesión con Meta
    };
    const handleLoginWithMicrosoft = () => {
      // Lógica para iniciar sesión con Microsoft
    };
    const handleLoginWithGoogle = () => {
      // Lógica para iniciar sesión con Google
    };

    return (
      <Container className="home-container">
        <Row className="column-container">
          <Col className= "column">
            <Row>
            <h2>Registro</h2>
            <Form>
              <Form.Group controlId="formFirstName" className="registerForm">
                <Form.Control type="text" placeholder="Nombre" className="smallWidthControl"/>
              </Form.Group>
              <Form.Group controlId="formLastName" className="registerForm">
                <Form.Control type="text" placeholder="Apellidos" className="smallWidthControl"/>
              </Form.Group>
              <Form.Group controlId="formEmail" className="registerForm">
                <Form.Control type="email" placeholder="Email" className="smallWidthControl"/>
              </Form.Group>
              {/* Otros campos del formulario... */}
  
              <Button variant="primary" type="submit">
                Registrarse
              </Button>
            </Form>
            </Row>
            <Row>
            {/*Aqui para informacion adicional en caso de necesidad*/}
            </Row>
            <div className="separator"></div>
            <Row>
              <h2>Métodos alternativos</h2>
              {/* Para identificacion por redes externas*/}
              <div className="d-flex justify-content-around align-items-center">

              {/* Botón para registrarse con Google */}
              <div to="/register/google" className="btn registerButton">
                <Col><img src={imageGoogle} alt="Google" className="icono" /></Col>
                <Col><Button onClick={handleLoginWithGoogle}>Iniciar sesión con Google</Button></Col>
              </div>

              {/* Botón para registrarse con Microsoft */}
              <div>
                <Col><img src={imageMicrosoft} alt="Microsoft" className="icono" /></Col>
                <Col><Button onClick={handleLoginWithMicrosoft}>Iniciar sesión con Microsoft</Button></Col>
              </div>

              {/* Botón para registrarse con Meta (Facebook) */}
              <div>
                <Col><img src={imageMeta} alt="Meta" className="icono" /></Col>
                <Col><Button onClick={handleLoginWithMeta}>Iniciar sesión con Meta</Button></Col>
              </div>
              </div>
            </Row>
          </Col>
        </Row>
        
      </Container>
    );
  }
  
  export default RegisterPage;