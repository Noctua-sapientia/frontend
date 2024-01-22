import { useState } from "react"
import BooksApi from './BooksApi.js';
import { useParams } from 'react-router-dom';

import React from "react";

function NewBook(props) {
    const [isbn, setIsbn] = useState('');
    const [titulo, setTitle] = useState('');
    const [autor, setAuthor] = useState('');
    const [categoria, setGenre] = useState('');
    const [año, setYear] = useState('');
    const [precio, setPrize] = useState('');
    const [stock, setStock] = useState('');
    const { seller } = useParams();

    const [forceRender, setForceRender] = useState(false);

    function onClick() {
        const options = {
            seller: seller,
            prize: precio,
            stock: stock
        }
        const newBook = {
            isbn: isbn,
            title: titulo,
            author: autor,
            genre: categoria,
            year: año,
            options: options
        };
        const result = BooksApi.postBook(newBook);

        if (result) {
            setIsbn('');
            setTitle('');
            setAuthor('');
            setGenre('');
            setYear('');
            setStock('');
            setPrize('');

            if (props.reloadBooks) {
                props.reloadBooks();
            }
        }
    }

    return (
        <tr>
            <td><input className="form-control" name="isbn" value={isbn} onChange={(event) => setIsbn(event.target.value)}/></td>
            <td><input className="form-control" name="titulo" value={titulo} onChange={(event) => setTitle(event.target.value)}/></td>
            <td><input className="form-control" name="autor" value={autor} onChange={(event) => setAuthor(event.target.value)}/></td>
            <td><input className="form-control" name="categoria" value={categoria} onChange={(event) => setGenre(event.target.value)}/></td>
            <td><input className="form-control" name="año" value={año} onChange={(event) => setYear(event.target.value)}/></td>
            <td><input className="form-control" name="precio" value={precio} onChange={(event) => setPrize(event.target.value)}/></td>
            <td><input className="form-control" name="stock" value={stock} onChange={(event) => setStock(event.target.value)}/></td>
            <td><button className="btn btn-primary" onClick={onClick}>Añadir libro</button></td>
        </tr>
    )
}

export default NewBook;