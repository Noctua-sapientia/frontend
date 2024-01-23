import React, { useState, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BooksApi from './BooksApi';
import BookElement from './BookElement.js';
import { Container, Button, Row, Col, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import imageBook1 from '../../img/bookGeneral.png';
import { useAuth } from '../AuthContext';

function SearchBooks() {
    const [books, setBooks] = useState([]); // Your array of books
    const [searchTerm, setSearchTerm] = useState(''); // Search term
    const [filteredBooks, setFilteredBooks] = useState([]); // Books filtered by search term
    const {accessToken, userId } = useAuth();

    useEffect(() => {
        // Fetch books from API or any data source
        const fetchBooks = async () => {
            try {
                const response = await BooksApi.getAllBooks(accessToken);
                setBooks(response);
            } catch (error) {
                console.error('Error fetching books:', error.message);
            }
        };
    
        if (books.length === 0) {
            fetchBooks();
        }
      // Filter by title
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      // Sort by reviews (assuming you have a 'reviews' property in each book)
      filtered.sort((a, b) => b.reviews - a.reviews);
  
      setFilteredBooks(filtered);
    }, [books, searchTerm]);
  
    const handleSearch = (e) => {
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
          <Container className="home-container">
                    <Row>
                        {filteredBooks.map((book, index) => (
                            <Col key={book.isbn} md={6}>
                                <BookElement key={book.isbn} book={book} />
                            </Col>
                        ))}
                    </Row>
                </Container>
        </div>
      </Fragment>
    );
  }
  
  export default SearchBooks;
