import React from 'react';
import { Link } from 'react-router-dom'; 
import { Container, Button, Row, Col, CardText } from 'react-bootstrap';
/*import BooksApi from './BooksApi.js';*/

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
                        <h2>Libro</h2>
                    </Col>
                </Row>
                <Row>
                    {/* Columna de botones */}
                    <Col className='column align-items-center justify-content-center' >
                        <Row>
                            <CardText>TÍTULO</CardText>
                        </Row>
                        <Row>
                            <CardText>AUTOR</CardText>
                        </Row>
                        <Row>
                            <CardText>CATEGORÍA</CardText>
                        </Row>
                        <Row>
                            <CardText>PRECIO</CardText>    
                        </Row>
                        <Row>
                            <CardText>VENDEDORES</CardText>    
                        </Row>
                        <Row>
                            <Link to="/books/book" className="btn btn-primary" > Comprar </Link>
                        </Row>
                        <Row>
                            <Button variant="primary"> Reseñas </Button>
                        </Row>                   
                        {/* Agrega más botones según sea necesario */}
                    </Col>
        
                    {/* Gran imagen */}
                    <Col className='column'>
                        <img
                        //src={logoImage} // Reemplaza con la URL de tu imagen
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