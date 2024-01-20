import React from "react";
function Book(props){

    if (!props.book) {
        return null; // or handle the case when book is not defined
      }

    return (
        <tr>
            <td>{props.book.title}</td>
            <td>{props.book.author}</td>
            <td>{props.book.genre}</td>
            <td>{props.book.year}</td>
            <td>{props.book.seller}</td>
            <td>{props.book.prize}</td>
            <td>{props.book.stock}</td>
            <td>{props.book.rating}</td>
            <td>
                <button className="btn btn-primary" onClick={() => props.onEdit(props.book)}>Edit</button>
                <button className="btn btn-primary" onClick={() => props.onDelete(props.book)}>Delete</button>
            </td>
        </tr>
    )
}
export default Book;