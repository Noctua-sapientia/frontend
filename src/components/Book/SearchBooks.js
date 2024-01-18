import React, { useState, useEffect, setMessage, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import BooksApi from './BooksApi';
import Book from './Book';
import { Container, Button, Row, Col, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import imageBook1 from '../../img/HarryPotter.jpg';

function BookSearch() {
  const initialBooks = [
    {
        "id": 1,
        "titulo": "Harry Potter y la piedra filosofal",
        "autor": "J.K.Rowling",
        "año": "1997",
        "genero": "fantasía",
        "options": [
          { "vendedor": 2, "stock": 110, "prize": 9.9, "reseñas": 4.2 },
          { "vendedor": 2, "stock": 120, "prize": 12.10, "reseñas": 3.8 }
        ]
      }
  ];

  const [books, setBooks] = useState([]); // Tu arreglo de libros
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
  const [filteredBooks, setFilteredBooks] = useState([]); // Libros filtrados por término de búsqueda


  useEffect(() => {
    // Lógica para obtener los libros de tu API o de cualquier fuente de datos
    // Supongamos que books contiene la lista de libros obtenida
   /* async function fetchBooks(){
        try{
        const c = await BooksApi.getAllBooks();
        setBooks(c);
        } catch (error) {
            setMessage('No se pudo contactar con el servidor');
        }
        fetchBooks();
    }*/
    // Filtrar por título
    const filtered = books.filter((book) =>
      book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ordenar por mejores reseñas (aquí suponemos que tienes una propiedad 'reviews' en cada libro)
    filtered.sort((a, b) => b.reviews - a.reviews);

    setFilteredBooks(filtered);
  }, [books, searchTerm]);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <Fragment>
    <div className="container mt-4">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por título"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul className="list-group">
            {filteredBooks.map((book) => (
                <li key={book.id} className="list-group-item">
                <Book key={book} />
                </li>
             ))}
      </ul>
    </div>
    <Container className='home-container'>
            {/* Cabecera */}
            <Col>
                <Row>
                    <Col align='center'>
                        <h2>Catálogo de Libros</h2>
                    </Col>
                </Row>
                <Row>
                    {/* Columna de botones */}
                    <Col className='column align-items-center justify-content-center' >
                        <img src={imageBook1} className="icono" style={{ width: '30%', height: '40vh'}} />
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
                            <Link to="/books/book" className="btn btn-primary" > Ver Libro </Link>
                        </Row>
                        <Row>
                            <Button variant="primary"> Reseñas </Button>
                        </Row>                   
                        {/* Agrega más botones según sea necesario */}
                    </Col>
                    <Col className='column align-items-center justify-content-center' >
                        <img src={imageBook1} className="icono" style={{ width: '30%', height: '40vh'}} />
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
                            <Link to="/books/book" className="btn btn-primary" > Ver Libro </Link>
                        </Row>
                        <Row>
                            <Button variant="primary"> Reseñas </Button>
                        </Row>                   
                        {/* Agrega más botones según sea necesario */}
                    </Col>
                </Row>
                <Row>
                    {/* Columna de botones */}
                    <Col className='column align-items-center justify-content-center' >
                        <img src={imageBook1} className="icono" style={{ width: '30%', height: '40vh'}} />
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
                            <Link to="/books/book" className="btn btn-primary" > Ver Libro </Link>
                        </Row>
                        <Row>
                            <Button variant="primary"> Reseñas </Button>
                        </Row>                   
                        {/* Agrega más botones según sea necesario */}
                    </Col>
                    <Col className='column align-items-center justify-content-center' >
                        <img src={imageBook1} className="icono" style={{ width: '30%', height: '40vh'}} />
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
                            <Link to="/books/book" className="btn btn-primary" > Ver Libro </Link>
                        </Row>
                        <Row>
                            <Button variant="primary"> Reseñas </Button>
                        </Row>                   
                        {/* Agrega más botones según sea necesario */}
                    </Col>
                </Row>
                <div className="separator"></div>
                <Col align='center'>
                    <Link to="/" className="btn btn-primary" > Vuelve a principal </Link>
                </Col>
            </Col>
        </Container>
    </Fragment>
  );
}

export default BookSearch;
