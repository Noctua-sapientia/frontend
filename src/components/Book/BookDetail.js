
import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BooksApi from './BooksApi.js';
import { Container, Col, Row, CardText } from 'react-bootstrap';
import imageBook1 from '../../img/HarryPotter.jpg';
import styles from './book_detail_styles.css'

function Books(props) {
  const [message, setMessage] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const fetchedBooks = await BooksApi.getAllBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        setMessage('Could not contact the server');
      }
    }

    fetchBooks();
  }, []);

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
                <CardText>TÍTULO: HARRY POTTER Y LA PIEDRA FILOSOFAL {books.map((book) => (book.title))}</CardText>
              </Row>
              <Row>
                <CardText>AUTOR:  J.K.ROWLING{books.map((book) => (book.author))}</CardText>
              </Row>
              <Row>
                <CardText>GÉNERO:  FANTASÍA{books.map((book) => (book.category))}</CardText>
              </Row>
              <Row>
                <CardText>VENDEDORES</CardText>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Vendedor</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Reseñas</th>
                      <th>Compra</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      book.options.map((option, index) => (
                        <tr key={index}>
                          <td>{option.seller}</td>
                          <td>{option.stock}</td>
                          <td>{option.prize}</td>
                          <td>{option.reviews}</td>
                          <div className={styles.rating}>
                                <span className={styles.stars}>★★★★★</span>
                            </div>
                          <td><Link to={`/books`} className="btn btn-primary">Añadir al Carrito</Link></td>
                        </tr>
                      ))
                    ))}
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

export default Books;
