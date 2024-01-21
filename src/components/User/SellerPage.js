import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, CardText } from 'react-bootstrap';
import './user_styles.css'; // Importa tus estilos CSS aquí
import logoImage from '../../img/logo.png'
import UserApi from '../../api/UserApi.js'
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';



function SellerPage(props) {
    const [user, setUser] = useState([]);
    const {accessToken, userId } = useAuth();

    useEffect(() => {
        async function fetchUser() {
            try {
                const c = await UserApi.getSeller(accessToken, userId);
                setUser(c);

            } catch (error) {
                
            }
        }

        fetchUser();
    }, [accessToken, userId]);

    return (
        <Container className='home-container'>
            {/* Cabecera */}
            <Col>
                <Row>
                    <Col align='center'>
                        <h2>My profile</h2>
                    </Col>
                </Row>
                <Row>
                    {/* Columna de botones */}
                    <Col className='column align-items-center justify-content-center' >
                        <Row>
                        <CardText>Name: {user.name}</CardText>
                        </Row>
                        <Row>
                        <CardText>Nº valorations: {user.valoration}</CardText>
                        </Row>
                        <Row>
                        <CardText>Nº orders: {user.orders}</CardText>
                        </Row>
                        <Row>
                        <CardText>Nº reviews: {user.reviews}</CardText>    
                        </Row>
                        <Row>
                            <Link to={`/books/${user.userId}`}>
                                <Button className='profile-button'> Books </Button>
                            </Link>
                        </Row>
                        <Row>
                            <Link to={`/books/${user.userId}`}>
                                <Button className='profile-button'> Reviews </Button>
                            </Link>
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