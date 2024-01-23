import React from 'react';
import { Container, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import logo from './img/logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from './components/AuthContext';

function Header() {

  // -------------------------- Detecting user logged --------------------------------

  const {userType, userId, accessToken } = useAuth();

  console.log('userType: ', userType);
  console.log('userId: ', userId);

  // -------------------------- Navbar --------------------------------


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
      {accessToken && (
      <Link to="/books" className='nav-link'>
        <i className="bi bi-book-half"></i> Libros
      </Link>)}
      {accessToken && userType === "Seller" && (
      <Link to = {`/book/${userId}`} className='nav-link'>
        <i className="bi bi-book-half"></i> Mis Libros
      </Link>)}
      {accessToken && (
      <Link to="/review" className="nav-link">
        <i className="bi bi-star-half"></i> Mis reseñas
      </Link>)}
      {accessToken && (
      <Link to="/historyOrders" className="nav-link">
        <i className="bi bi-archive-fill"></i> Mis pedidos
      </Link>)}
      {userType === 'Customer' && (
      <Link to="/basketOrders" className="nav-link">
      <i className="bi bi-cart-fill"></i> Mi cesta
      </Link>)}
      {accessToken && (
      <Link to="/myaccount" className="nav-link">
        <i className="bi bi-person-circle"></i> Mi cuenta
      </Link>)}
      {!accessToken && (
      <Link to="/login" className="nav-link">
        <i className="bi bi-box-arrow-in-right"></i> Log in
      </Link>)}
    </Nav>
  </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
