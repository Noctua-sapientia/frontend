import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BooksApi from './BooksApi.js';
import { Container, Col, Row, CardText } from 'react-bootstrap';
import imageBook1 from '../../img/HarryPotter.jpg';
import styles from './book_detail_styles.css'
import { useParams } from 'react-router-dom';

function BookDetail() {
  const [message, setMessage] = useState(null);
  const [books, setBooks] = useState([]);
  const { isbn } = useParams();

  useEffect(() => {
    async function fetchBooks() {
      try {
        console.log(isbn);
        const fetchedBooks = await BooksApi.getBooksByISBN(isbn);
        setBooks(fetchedBooks);  // Corrección aquí
      } catch (error) {
        setMessage('Could not contact the server');
      }
    }
  
    fetchBooks();
  }, [isbn]);

  return (
    <Fragment>
      <Container className='home-container'>
        <Col>
          <Row>
            <Col className='column'>
              <img src={imageBook1} className="icono" style={{ width: '50%', height: '60vh'}} />
            </Col>
            <Col className='column align-items-center justify-content-center'>
              <Row>
                <CardText>Título: {books.title}</CardText>
              </Row>
              <Row>
                <CardText>Autor: {books.author}</CardText>
              </Row>
              <Row>
                <CardText>Género: {books.genre}</CardText>
              </Row>
              <Row>
                <CardText>Año: {books.year}</CardText>
              </Row>
              <Row>
                <CardText>Valoración: {books.rating}</CardText>
              </Row>
              <Row>
                <CardText>VENDEDORES</CardText>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Vendedor</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Compra</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    books.options && books.options.map((option, index) => (
                    <tr key={index}>
                    <td>{option.seller}</td>
                    <td>{option.stock}</td>
                    <td>{option.prize}</td>
                    <td><Link to={`/books`} className="btn btn-primary">Añadir al Carrito</Link></td>
      </tr>
    ))
  }
</tbody>

                </table>
              </Row>
            </Col>
          </Row>
        </Col>
      </Container>
      <Link to={`/books`} className="btn btn-primary">Volver al Catálogo</Link>
    </Fragment>
  );
}

export default BookDetail;
