import React from 'react';
import { Link } from 'react-router-dom'; 
import { Container, Button, Row, Col, CardText } from 'react-bootstrap';
/*import BooksApi from './BooksApi.js';*/
import libro1 from '../src/img/book1.jpeg';

import './book_styles.css';

function BookDetail() {
 /* IMPORTAR API
    useEffect(() => {
        async function fetchBooks(){
            try{
            const c = await BooksApi.getAllBooks();
            setBooks(c);
            } catch (error) {
                setMessage('No se pudo contactar con el servidor');
            }
        }

        fetchBooks();
    }
    , []);*/

return(
    <Container className='home-container'>
            {/* Cabecera */}
            <Col>
                <Row>
                    <Col align='center'>
                        <h2>Harry Potter y La Piedra Filosofal</h2>
                    </Col>
                </Row>
                <Row>
                    {/* Columna de botones */}
                    <Col className='column align-items-center justify-content-center' >
                        <Row>
                            <CardText>J.K. Rowling</CardText>
                        </Row>
                        <Row>
                            <CardText>Fantasía</CardText>
                        </Row>
                        <Row>
                            <CardText>Vendedor 1: 10€ (4,3)</CardText>    
                        </Row>
                        <Row>
                            <CardText>Vendedor 2: 11€ (4,9)</CardText>    
                        </Row>
                        <Row>
                            <CardText>Vendedor 3: 7€ (3,7)</CardText>    
                        </Row>
                        <Row>
                            <Link to="/orders/book" className="btn btn-primary" > Añadir al Carrito </Link>
                        </Row>
                        <Row>
                            <Link to="/reviews/seller" className="btn btn-primary" > Reseñas </Link>
                        </Row>                   
                        {/* Agrega más botones según sea necesario */}
                    </Col>
        
                    {/* Gran imagen */}
                    <Col className='column'>
                        <img
                        src={libro1} 
                        alt="Logo"
                        className="img-fluid"
                        />
                    </Col>
                </Row>
                <div className="separator"></div>
                <Col align='center'>
                    <Link to="/books" className="btn btn-primary" > Vuelve al catálogo </Link>
                </Col>
            </Col>
        </Container>
)
}export default BookDetail;