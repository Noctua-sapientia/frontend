import React, { Fragment, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BooksApi from './BooksApi.js';
import BookDetailOrder from './BookDetailOrder.js';
import { Container, Col, Row, CardText, Table } from 'react-bootstrap';
import imageBook1 from '../../img/HarryPotter.jpg';
import styles from './book_detail_styles.css';

function BookDetail(props) {
  const [book, setBook] = useState(null);
  const { isbn } = useParams();
  const initialBooks = [
    {
      "isbn": 1,
      "titulo": "Harry Potter y la piedra filosofal",
      "autor": "J.K.Rowling",
      "año": "1997",
      "genero": "fantasía",
      "options": [
        { "vendedor": 2, "stock": 110, "prize": 9.9, "reseñas": 4.2 },
        { "vendedor": 2, "stock": 120, "prize": 12.10, "reseñas": 3.8 }
      ]
    }
  ];/*
  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const fetchedBook = await BooksApi.getBooksByISBN(isbn);
        setBook(fetchedBook);
      } catch (error) {
        console.error('Could not fetch book details', error);
      }
    }

    fetchBookDetails();
  }, [isbn]);
*/
  // Verificación de nulidad antes de acceder a las propiedades del libro
  if (!book) {
    return <p>Cargando...</p>;
  }

  return (
    <Fragment>
      <Container className="home-container">
        <Col>
          <Row>
            <Col className="column">
              <img src={imageBook1} className="icono" style={{ width: '50%', height: '60vh' }} alt="Book Cover" />
            </Col>
            <Col className="column align-items-center justify-content-center">
              <Row>
                <CardText>TÍTULO={book.title}</CardText>
              </Row>
              <Row>
                <CardText>AUTOR={book.author}</CardText>
              </Row>
              <Row>
                <CardText>GÉNERO={book.genre}</CardText>
              </Row>
              <Row>
                <CardText>AÑO={book.year}</CardText>
              </Row>
              <Row>
                <CardText>VENDEDORES</CardText>
                <Table className="mt-4 text-center">
                  <thead>
                    <tr className="book-orders-tableHeader">
                      <th scope="col">Vendedor</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Reseñas</th>
                      <th scope="col">Compra</th>
                    </tr>
                  </thead>
                  <tbody className="book-orders-tableBody">
                    <BookDetailOrder key={book.isbn} book={book} />
                  </tbody>
                </Table>
              </Row>
            </Col>
          </Row>
        </Col>
      </Container>
      <Link to={`/books`} className="btn btn-primary">
        Volver al Catálogo
      </Link>
    </Fragment>
  );
}

export default BookDetail;
