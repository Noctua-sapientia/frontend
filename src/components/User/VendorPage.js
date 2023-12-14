import React from 'react';
import { Container, Button, Row, Col, CardText } from 'react-bootstrap';
import './user_styles.css'; // Importa tus estilos CSS aquí
import logoImage from '../../img/logo.png'

function VendorPage() {
    return (
        <Container className='home-container'>
            {/* Cabecera */}
            <Col>
                <Row>
                    <Col align='center'>
                        <h2>Mi Perfil de Vendedor</h2>
                    </Col>
                </Row>
                <Row>
                    {/* Columna de botones */}
                    <Col className='column align-items-center justify-content-center' >
                        <Row>
                        <CardText>NOMBRE</CardText>
                        </Row>
                        <Row>
                        <CardText>APELLIDOS</CardText>
                        </Row>
                        <Row>
                        <CardText>CORREO ELECTRONICO</CardText>
                        </Row>
                        <Row>
                        <CardText>DIRECCION POSTAL</CardText>    
                        </Row>
                        <Row>
                        <Button className='profile-button' href="/book"> Mis libros </Button>
                        </Row>
                        <Row>
                        <Button className='profile-button' href="/review"> Mis reseñas </Button>
                        </Row>                   
                        {/* Agrega más botones según sea necesario */}
                    </Col>
        
                    {/* Gran imagen */}
                    <Col className='column'>
                        <img
                        src={logoImage} // Reemplaza con la URL de tu imagen
                        alt="Logo"
                        className="img-fluid"
                        />
                    </Col>
                </Row>
            </Col>
        </Container>
    );
  }
  
  export default VendorPage;