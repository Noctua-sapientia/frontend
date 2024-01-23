import React from 'react';
import { useState, useEffect } from 'react';

import BooksApi from '../Book/BooksApi';
import { useAuth } from '../AuthContext';

function OrderDetailsBook(props) {

  // -------------------  Order info loading (other services info) ---------------------

  const bookId = props.book.bookId;
  const [book, setBook] = useState({});
  const {userType, userId, accessToken } = useAuth();

  useEffect(() => {
    async function fetchBook() {
      try {
        const b = await BooksApi.getBooksByISBN(accessToken, bookId);
        setBook(b);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBook();
  }, [bookId]);

  // ----------------------  HTML Order Details books table ---------------------------


  return (
    <tr className="product-row">
      <td> 
      <div><strong>{book.title}</strong></div>
      <div>{book.author}</div>     
      {/* <div><strong>Nombre libro ID={props.book.bookId}</strong></div>
      <div>Nombre del autor libro ID={props.book.bookId}</div>      */}
      </td>
      <td>{props.book.price}€</td>
      <td>{props.book.units} uds </td>
      <td>{props.book.price * props.book.units}€</td>
    </tr>
  );
}

export default OrderDetailsBook;

