import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, CardText } from 'react-bootstrap';
import { useParams, Link} from 'react-router-dom';
import './user_styles.css'; // Importa tus estilos CSS aquí
import logoImage from '../../img/logo.png'
import UserApi from '../../api/UserApi.js'
import { useAuth } from '../AuthContext.js';


function SelectedSeller(props) {
    const [user, setUser] = useState([]);
    const {accessToken} = useAuth();
    const id = useParams().id;
    useEffect(() => {
        async function fetchUser() {
            try {
                const c = await UserApi.getSeller(accessToken, id);
                setUser(c);

            } catch (error) {
                
            }
        }

        fetchUser();
    }, [accessToken,id]);

    return (
        <Container className='home-container'>
            {/* Cabecera */}
            <Col>
                <Row>
                    <Col align='center'>
                        <h2>Seller profile</h2>
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
                            <Link to='/'>
                                <Button className='profile-button' href="/book"> Books </Button>
                            </Link>
                        </Row>
                        <Row>
                            <Link to='/'>
                                <Button className='profile-button' href="/book"> Reviews </Button>
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
  
  export default SelectedSeller;