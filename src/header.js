import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import logo from './img/logo.png';

function Header() {
    return (
            <Container>
                <Row>
                    <Col xs={2}><a href='/'><img src={logo} alt="Logo" className="icono"/></a></Col>
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
                        <Button className="btn btn-primary" href="/review"> Orders </Button> 
                    </Col>
                    <Col xs={2}>
                        <Button className="btn btn-primary" href="/order"> Orders </Button> 
                    </Col>
                    <Col xs={2}>
                        <Button className="btn btn-primary" href="/myaccount"> My Account </Button>
                    </Col>
                    <Col xs={2}>
                        <Button className="btn btn-primary" href="/login"> Login </Button>                
                    </Col>
                </Row>
            </Container>
    );
  }
  export default Header;