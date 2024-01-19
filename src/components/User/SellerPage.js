import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, CardText } from 'react-bootstrap';
import './user_styles.css'; // Importa tus estilos CSS aquí
import logoImage from '../../img/logo.png'
import UserApi from './UserApi.js'

function SellerPage(props) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        async function fetchUser() {
            try {
                const c = await UserApi.getSeller(user);
                setUser(c);

            } catch (error) {
                
            }
        }

        fetchUser();
    });

    /*
    function OnUserEdit(user){
        setMessage(user);
    }
    */
    return (
        <Container className='home-container'>
            {/* Cabecera */}
            <Col>
                <Row>
                    <Col align='center'>
                        <h2>Mi perfil de vendedor</h2>
                    </Col>
                </Row>
                <Row>
                    {/* Columna de botones */}
                    <Col className='column align-items-center justify-content-center' >
                        <Row>
                        <CardText>{user.map(user => user.name)}</CardText>
                        </Row>
                        <Row>
                        <CardText>Nº valorations: {user.map(user => user.valoration)}</CardText>
                        </Row>
                        <Row>
                        <CardText>Nº orders: {user.map(user => user.orders)}</CardText>
                        </Row>
                        <Row>
                        <CardText>Nº reviews: {user.map(user => user.reviews)}</CardText>    
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
  
  export default SellerPage;