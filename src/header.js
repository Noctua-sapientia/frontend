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

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Link to="/books" className='nav-link'>
        <i class="bi bi-book-half"></i> Libros
      </Link>
      <Link to="/review" className="nav-link">
        <i className="bi bi-star-half"></i> Mis reseñas
      </Link>
      <Link to="/historyOrders" className="nav-link">
        <i className="bi bi-archive-fill"></i> Mis pedidos
      </Link>
      <Link to="/basketOrders" className="nav-link">
      <i className="bi bi-cart-fill"></i> Mi cesta
      </Link>
      <Link to="/myaccount" className="nav-link">
        <i className="bi bi-person-circle"></i> Mi cuenta
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
