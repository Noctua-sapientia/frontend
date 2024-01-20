import React from 'react';
import { Container, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import logo from './img/logo.png';
import { Link } from 'react-router-dom';


function Header() {

    return (
            <Container>
                <Row>
                    <Col xs={2}>
                        <Link to="/">
                            <img src={logo} alt="Logo" className="icono"/>
                        </Link>
                    </Col>
                    <Col xs={2}>
                        <InputGroup className="mb-5">
                            <FormControl
                                placeholder="Buscar..."
                                aria-label="Buscar..."
                                aria-describedby="basic-addon2"
                            />
                        
                        </InputGroup>
                    </Col>
                    <Col xs={2}>
                        <Link to="/review">
                            <Button className="btn btn-primary">Mis reseñas</Button>
                        </Link> 
                    </Col>
                    <Col xs={2}>
                        <Link to="/order">
                            <Button className="btn btn-primary">Orders</Button>
                        </Link> 
                    </Col>
                    <Col xs={2}>
                        <Link to="/myaccount">
                            <Button className="btn btn-primary">My Account</Button>
                        </Link>
                    </Col>
                    <Col xs={2}>
                        <Link to="/login"> 
                            <Button className="btn btn-primary">Log in</Button>
                        </Link>                
                    </Col>
                </Row>
            </Container>
    );
  }
  export default Header;