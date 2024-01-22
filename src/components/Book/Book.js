import React from "react";
import BooksApi from "./BooksApi";
import { useAuth } from '../AuthContext';

function Book(props) {
  const {accessToken, userId } = useAuth();

  if (!props.book) {
    return null;
  }

  function deleteBook(isbn) {
    
    const result = BooksApi.deleteBooksByISBN(accessToken, isbn);

    if (result) {
        if (props.reloadBooks) {
            props.reloadBooks();
        }
    }
}


  return (
    <tr>
      <td>{props.book.isbn}</td>
      <td>{props.book.title}</td>
      <td>{props.book.author}</td>
      <td>{props.book.genre}</td>
      <td>{props.book.year}</td>
      <td>
        {props.book.options.map((option, index) => (
          <div key={index}>
            <div>{option.prize}</div>
          </div>
        ))}
      </td>
      <td>
        {props.book.options.map((option, index) => (
          <div key={index}>
            <div>{option.stock}</div>
          </div>
        ))}
      </td>
      <td>
        <button className="btn btn-primary" onClick={() => props.onEdit(props.book)}>
          Editar
        </button>
        <button className="btn btn-primary" onClick={() => deleteBook(props.book.isbn)}>
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default Book;
