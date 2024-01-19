import React from "react";
import { useState } from "react";

function EditBook(props) {
    const [titulo, setTitle] = useState(props.book.titulo);
    const [autor, setAuthor] = useState(props.book.autor);
    const [categoria, setGenre] = useState(props.book.categoria);
    const [año, setYear] = useState(props.book.año);
    const [vendedores, setSeller] = useState(props.book.vendedores);
    const [precio, setPrize] = useState(props.book.precio);
    const [stock, setStock] = useState(props.book.stock);
    const [reseñas, setReview] = useState(props.book.reseñas);

    return (
        <tr>
            <td><input className="form-control" name="titulo" value={titulo} onChange={(event) => setTitle(event.target.value)}/></td>
            <td><input className="form-control" name="autor" value={autor} onChange={(event) => setAuthor(event.target.value)}/></td>
            <td><input className="form-control" name="categoria" value={categoria} onChange={(event) => setGenre(event.target.value)}/></td>
            <td><input className="form-control" name="año" value={año} onChange={(event) => setYear(event.target.value)}/></td>
            <td><input className="form-control" name="vendedores" value={vendedores} onChange={(event) => setSeller(event.target.value)}/></td>
            <td><input className="form-control" name="precio" value={precio} onChange={(event) => setPrize(event.target.value)}/></td>
            <td><input className="form-control" name="stock" value={stock} onChange={(event) => setStock(event.target.value)}/></td>
            <td><input className="form-control" name="reseñas" value={reseñas} onChange={(event) => setReview(event.target.value)}/></td>

            <td>
                <button className="btn btn-primary" onClick={() => props.onSave({titulo: titulo, autor:autor, categoria: categoria, año: año, vendedores: vendedores, precio: precio, stock: stock, reseñas: reseñas})}>Save</button>
                <button className="btn btn-primary" onClick={() => props.onDelete(props.book)}>Delete</button>
            </td>
        </tr>
    )
}

export default EditBook;