import React from "react";

function Book(props) {
  if (!props.book) {
    return null;
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
        <button className="btn btn-primary" onClick={() => props.onDelete(props.book)}>
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default Book;
