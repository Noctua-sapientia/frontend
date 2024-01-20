import React from 'react';
import { Card } from 'react-bootstrap';

const BookDetailPage = ({ book }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.author}</Card.Text>
        <Card.Text>{book.year}</Card.Text>
        <Card.Text>{book.genre}</Card.Text>
        <Card.Text>{book.rating} Reviews</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BookDetailPage;