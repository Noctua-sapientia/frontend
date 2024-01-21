import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BooksApi from './BooksApi.js';
import { Container, Col, Row, CardText, Button } from 'react-bootstrap';
import imageBook1 from '../../img/HarryPotter.jpg';
import styles from './book_detail_styles.css'

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


  const addToCart = (bookOption) => {
    let cart = JSON.parse(sessionStorage.getItem('vendorsCart') || '[]');
    const vendorIndex = cart.findIndex(vendor => vendor.vendorName === bookOption.seller);
    
    if (vendorIndex >= 0) {
      // El vendedor ya está en el carrito, solo añadir el libro a sus items
      cart[vendorIndex].items.push({
        title: books.title,
        price: bookOption.prize,
        quantity: 1, // o la cantidad que desees
        sellerId: bookOption.seller,
        bookId: isbn,
      });
    } else {
      // Añadir nuevo vendedor y libro al carrito
      cart.push({
        vendorName: bookOption.seller, // Asegúrate de que este es el nombre correcto del vendedor
        items: [{
          title: books.title,
          price: bookOption.prize,
          quantity: 1, // o la cantidad que desees
          sellerId: bookOption.seller,
          bookId: isbn,
        }]
      });
    }
  
    sessionStorage.setItem('vendorsCart', JSON.stringify(cart));
  };

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
                    <td>{option.prize}</td>
                    <td>{option.stock}</td>
                    <Button onClick={() => addToCart(option)}>Añadir al Carrito</Button>
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
