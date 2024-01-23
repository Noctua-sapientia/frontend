import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import imageBook1 from '../../img/bookGeneral.png';

function BookElement({ book }) {
  return (
    <Container className='home-container'>
      <Col>
        <Row>
          <Col className='column'>
            <img src={imageBook1} className="book-image" alt={book.title} />
          </Col>
          <Col className='column align-items-center justify-content-center'>
            <Card>
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>Autor: {book.author}</Card.Text>
                <Card.Text>Año: {book.year}</Card.Text>
                <Card.Text>Género: {book.genre}</Card.Text>
                <Card.Text>Valoración: {book.rating}</Card.Text>
                <Link to={'/books/' + book.isbn} className="btn btn-primary">
                Ver más detalle
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="separator"></div>
      </Col>
    </Container>
  );
}

export default BookElement;
