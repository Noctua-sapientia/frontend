import React from 'react';
import { Container, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import logo from './img/logo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Link>
        {/* Usa flex-grow-1 en el Form para que ocupe el espacio disponible */}
        <Form className="flex-grow-1 mx-2">
          <FormControl
            type="text"
            placeholder="Buscar..."
            aria-label="Buscar..."
            aria-describedby="basic-addon2"
            className="mr-sm-2 w-100"
          />
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Link to="/review" className="nav-link">
        <i className="bi bi-star-half"></i> Mis reseñas
      </Link>
      <Link to="/historyOrders" className="nav-link">
        <i className="bi bi-archive-fill"></i> Pedidos
      </Link>
      <Link to="/bascketOrders" className="nav-link">
      <i className="bi bi-cart-fill"></i> Cesta
      </Link>
      <Link to="/myaccount" className="nav-link">
        <i className="bi bi-person-circle"></i> Cuenta
      </Link>
      <Link to="/login" className="nav-link">
        <i className="bi bi-box-arrow-in-right"></i> Log in
      </Link>
    </Nav>
  </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
