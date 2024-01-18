import React, { useState, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BooksApi from './BooksApi';
import Book from './Book';
import { Container, Button, Row, Col, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import imageBook1 from '../../img/HarryPotter.jpg';

function SearchBooks() {
  const initialBooks = [
    {
      "isbn": 1,
      "title": "Harry Potter and the Philosopher's Stone",
      "author": "J.K.Rowling",
      "year": "1997",
      "genre": "fantasy",
      "options": [
        { "seller": 2, "stock": 110, "prize": 9.9, "reviews": 4.2 },
        { "seller": 2, "stock": 120, "prize": 12.10, "reviews": 3.8 }
      ]
    }
  ];

  const [books, setBooks] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    // Logic to fetch books from your API or any data source
    // Suppose 'books' contains the list of obtained books
    /* async function fetchBooks() {
      try {
        const c = await BooksApi.getAllBooks();
        setBooks(c);
      } catch (error) {
        setMessage('Could not contact the server');
      }
    }
    fetchBooks(); */

    // Filter by title
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort by best reviews (assuming you have a 'reviews' property in each book)
    filtered.sort((a, b) => b.options[0].reviews - a.options[0].reviews);

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
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Container className='home-container'>
        {/* Header */}
        <Col>
          <Row>
            <Col align='center'>
              <h2>Book Catalog</h2>
            </Col>
          </Row>
          <Row>
          <Col className='column align-items-center justify-content-center' >
              <img src={imageBook1} className="icono" style={{ width: '30%', height: '40vh' }} />
              <Row>
                <CardText>{books[0].title}</CardText>
              </Row>
              <Row>
                <CardText>{books[0].author}</CardText>
              </Row>
              <Row>
                <CardText>{books[0].genre}</CardText>
              </Row>
              <Row>
                <Link to={`/books/${books[0].isbn}`}>View Book</Link>
              </Row>
              <Row>
                <Button variant="primary"> Reviews </Button>
              </Row>
            </Col>
            <Col className='column align-items-center justify-content-center' >
              <img src={imageBook1} className="icono" style={{ width: '30%', height: '40vh' }} />
              <Row>
                <CardText>{books[0].title}</CardText>
              </Row>
              <Row>
                <CardText>{books[0].author}</CardText>
              </Row>
              <Row>
                <CardText>{books[0].genre}</CardText>
              </Row>
              <Row>
                <Link to={`/books/${books[0].isbn}`}>View Book</Link>
              </Row>
              <Row>
                <Button variant="primary"> Reviews </Button>
              </Row>
            </Col>
          </Row>
          <Row>
          <Col className='column align-items-center justify-content-center' >
              <img src={imageBook1} className="icono" style={{ width: '30%', height: '40vh' }} />
              <Row>
                <CardText>{books[0].title}</CardText>
              </Row>
              <Row>
                <CardText>{books[0].author}</CardText>
              </Row>
              <Row>
                <CardText>{books[0].genre}</CardText>
              </Row>
              <Row>
                <Link to={`/books/${books[0].isbn}`}>View Book</Link>
              </Row>
              <Row>
                <Button variant="primary"> Reviews </Button>
              </Row>
            </Col>
            <Col className='column align-items-center justify-content-center' >
              <img src={imageBook1} className="icono" style={{ width: '30%', height: '40vh' }} />
              <Row>
                <CardText>{books[0].title}</CardText>
              </Row>
              <Row>
                <CardText>{books[0].author}</CardText>
              </Row>
              <Row>
                <CardText>{books[0].genre}</CardText>
              </Row>
              <Row>
                <Link to={`/books/${books[0].isbn}`}>View Book</Link>
              </Row>
              <Row>
                <Button variant="primary"> Reviews </Button>
              </Row>
            </Col>
          </Row>
          <div className="separator"></div>
          <Col align='center'>
            <Link to="/" className="btn btn-primary" > Go back to main </Link>
          </Col>
        </Col>
      </Container>
    </Fragment>
  );
}

export default SearchBooks;
