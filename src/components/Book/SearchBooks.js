import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BooksApi from './BooksApi';
import imageBook1 from '../../img/HarryPotter.jpg';
import Book from './Book';  // Asegúrate de tener este componente creado

function SearchBooks() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchBooks() {
      try {
        const booksData = await BooksApi.getAllBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Could not fetch books:', error);
      }
    }

    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by title"
        value={searchTerm}
        onChange={handleSearch}
      />

      <Container className="home-container">
        <Row>
          {filteredBooks.map((book) => (
            <Col key={book.isbn} className="column align-items-center justify-content-center">
              <Card>
                <Card.Img variant="top" src={imageBook1} style={{ width: '100%', height: '40vh' }} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>{book.author}</Card.Text>
                  <Card.Text>{book.genre}</Card.Text>
                  <Link to={`/books/${book.isbn}`} className="btn btn-primary">
                    View Book
                  </Link>
                  <Button variant="primary">Reviews</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="separator"></div>

        <Col align="center">
          <Link to="/" className="btn btn-primary">
            Go back to main
          </Link>
        </Col>
      </Container>
    </Container>
  );
}

export default SearchBooks;
