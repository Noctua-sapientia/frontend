import React from "react";
function Book(props){
    return (
        <tr>
            <td>{props.book.titulo}</td>
            <td>{props.book.autor}</td>
            <td>{props.book.categoria}</td>
            <td>{props.book.año}</td>
            <td>{props.book.vendedores}</td>
            <td>{props.book.precio}</td>
            <td>{props.book.stock}</td>
            <td>{props.book.reseñas}</td>
            <td>
                <button className="btn btn-primary" onClick={() => props.onEdit(props.book)}>Edit</button>
                <button className="btn btn-primary" onClick={() => props.onDelete(props.book)}>Delete</button>
            </td>
        </tr>
    )
}
export default Book;
