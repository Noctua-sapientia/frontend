import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BooksApi from './BooksApi.js';
import UsersApi from '../../api/UserApi.js'
import OrdersApi from '../../api/OrdersApi.js';
import { Container, Col, Row, CardText, Button } from 'react-bootstrap';
import imageBook1 from '../../img/bookGeneral.png';
import styles from './book_detail_styles.css';
import ReviewsInDetail from '../Review/ReviewsInDetail.js';
import Star from '../Review/Star.js';
import { useAuth } from '../AuthContext';

function BookDetail() {
  const [message, setMessage] = useState(null);
  const [rating, setRating] = useState(1);
  const [books, setBooks] = useState([]);
  const { isbn } = useParams();
  const {accessToken, userId, userType} = useAuth();

  const [bookSales, setBookSales] = useState(null);
  const [hasBought, setHasBought] = useState(false);

  console.log(accessToken);
  useEffect(() => {
    async function fetchBooks() {
      try {
        const fetchedBooks = await BooksApi.getBooksByISBN(accessToken, isbn);
        console.log(fetchedBooks);
  
        const fetchedBooksWithUserName = [];
  
        for (const item of fetchedBooks.options) {
          const user = await UsersApi.getSeller(accessToken, item.seller);
          console.log(user);
          const sellerName = user ? user.name : item.seller;
          fetchedBooksWithUserName.push({ ...item, sellerName: sellerName });
        }
        fetchedBooks.options = fetchedBooksWithUserName;
        console.log(fetchedBooksWithUserName);
        setBooks(fetchedBooks);
  
        if (fetchedBooks.rating != null || fetchedBooks.rating !== undefined) {
          setRating(fetchedBooks.rating);
        }
      } catch (error) {
        setMessage('Could not contact the server');
      }
    }
  
    fetchBooks();
  
    async function fetchOrders() {
      try {
        const orders = await OrdersApi.getAllOrders(accessToken, userType, userId);
  
        if (userType === 'Seller') {
          // Contar pedidos que incluyen el libro basado en el ISBN y que pertenecen al vendedor logueado
          const salesCount = orders.reduce((count, order) => {
            return count + (parseInt(order.sellerId) === parseInt(userId) && order.books.some(book => parseInt(book.bookId) === parseInt(isbn)) ? order.books.filter(book => parseInt(book.bookId) === parseInt(isbn)).length : 0);
          }, 0);
          setBookSales(salesCount);
        } else if (userType === 'Customer') {
          console.log(userId);
          // Verificar si el cliente ha comprado este libro antes y que el pedido pertenece al cliente logueado
          const hasBoughtBefore = orders.some(order => 
            parseInt(order.userId) === parseInt(userId) && order.books.some(book => parseInt(book.bookId) === parseInt(isbn))
          );
          setHasBought(hasBoughtBefore);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
  
    if (userType) {
      fetchOrders();
    }
  }, [isbn, userType, userId, accessToken]);
  

  const navigate = useNavigate();

  const addToCart = (bookOption) => {
    let cart = JSON.parse(sessionStorage.getItem('vendorsCart') || '[]');
    const vendorIndex = cart.findIndex(vendor => vendor.vendorName === bookOption.seller);

    console.log(bookOption.seller);
    
    if (vendorIndex >= 0) {
      // El vendedor ya está en el carrito, solo añadir el libro a sus items

      const itemIndex = cart[vendorIndex].items.findIndex(item => item.bookId === isbn);
      if (itemIndex >= 0) {
        // El libro ya está en el carrito, incrementar la cantidad
        cart[vendorIndex].items[itemIndex].quantity += 1;
      } else {
        // El libro no está en el carrito, añadir como nuevo libro
        cart[vendorIndex].items.push({
          title: books.title,
          price: bookOption.prize,
          quantity: 1, // o la cantidad que desees
          sellerId: bookOption.seller,
          bookId: isbn,
        });
      }
      
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
    navigate('/basketOrders');

  };

  return (
    <Fragment>
      <Container className='home-container'> 
        <Col>
        {
          userType === 'Seller' && (
            <p>Número de pedidos de este libro: {bookSales !== null ? bookSales : 'Cargando...'}</p>
          )
        }
        {
          userType === 'Customer' && hasBought && (
            <p>Ya has comprado este libro anteriormente.</p>
          )
        }
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
                <CardText><Star numGoldStars={Math.round(rating)} edit='false'/> ({rating})</CardText>
              </Row>
              <Row>
                <CardText>VENDEDORES</CardText>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Vendedor</th>
                      <th>Stock</th>
                      <th>Precio</th>
                      {userType === 'Customer' && 
                      <th>Compra</th>}
                    </tr>
                  </thead>
                  <tbody>
                  {
                    books.options && books.options.map((option, index) => (
                    <tr key={index}>
                    <td>{option.sellerName}</td>
                    <td>{option.stock}</td>
                    <td>{option.prize}</td>
                    {userType === 'Customer' &&
                    <td>
                          <button 
                              onClick={() => addToCart(option)}
                              style={{
                                  all: 'initial',
                                  backgroundColor: '#007bff', 
                                  color: 'white', 
                                  padding: '10px 10px', 
                                  border: 'none', // Sin borde
                                  borderRadius: '5px', // Bordes redondeados
                                  cursor: 'pointer', // Cursor en forma de mano
                                  textAlign: 'center', // Alineación del texto
                                  fontFamily: 'Arial, sans-serif', // Tipo de letra
                              }}
                              onMouseEnter={e => e.target.style.color = 'black'}
                              onMouseLeave={e => e.target.style.color = 'white'}
                          >
                              Añadir al Carrito
                          </button>
                      </td>
                    }

                    </tr>
                    ))}
                  </tbody>

                </table>
              </Row>
            </Col>
          </Row>
        </Col>
      </Container>
      <ReviewsInDetail activeType="books" bookId={isbn}/>
      <Link to={`/books`} className="btn btn-primary">Volver al Catálogo</Link>
    </Fragment>
  );
}

export default BookDetail;
