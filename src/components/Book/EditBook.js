import React from "react";
import { useState } from "react";
import BooksApi from "./BooksApi";
import { useAuth } from '../AuthContext';

function EditBook(props) {
    const {accessToken, userId } = useAuth();
    const [isbn, setIsbn] = useState(props.book.isbn);
    const [title, setTitle] = useState(props.book.title);
    const [author, setAuthor] = useState(props.book.author);
    const [genre, setGenre] = useState(props.book.genre);
    const [year, setYear] = useState(props.book.year);
    console.log(props.book);
    const optionWithSeller = props.book.options.find(option => Number(option.seller) === Number(userId));
    console.log(optionWithSeller);
    console.log(userId);
    console.log(props.book)
    const [prize, setPrize] = useState(optionWithSeller ? optionWithSeller.prize : 0);
    const [stock, setStock] = useState(optionWithSeller ? optionWithSeller.stock : 0);

    return (
        <tr>
            <td><input className="form-control" name="isbn" value={isbn} onChange={(event) => setIsbn(event.target.value)}/></td>
            <td><input className="form-control" name="title" value={title} onChange={(event) => setTitle(event.target.value)}/></td>
            <td><input className="form-control" name="author" value={author} onChange={(event) => setAuthor(event.target.value)}/></td>
            <td><input className="form-control" name="genre" value={genre} onChange={(event) => setGenre(event.target.value)}/></td>
            <td><input className="form-control" name="year" value={year} onChange={(event) => setYear(event.target.value)}/></td>
            <td><input className="form-control" name="prize" value={prize} onChange={(event) => setPrize(event.target.value)}/></td>
            <td><input className="form-control" name="stock" value={stock} onChange={(event) => setStock(event.target.value)}/></td>

            <td>
                <button className="btn btn-primary" onClick={() => BooksApi.updateBook(accessToken, userId, {isbn: isbn, title: title, author:author, genre: genre, year: year, prize: prize, stock: stock, options: props.book.options})}>Guardar</button>
                <button className="btn btn-primary" onClick={() => props.onCancel()}>Cancelar</button>
            </td>
        </tr>
    )
}

export default EditBook;