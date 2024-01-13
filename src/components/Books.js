// Home.js
import React from 'react';
/*
import { Link } from 'react-router-dom';

function Book() {
  return (
    <div>
      <h1> Página de BOOKS </h1>
      <Link to="/">Volver a INICIO</Link>
    </div>
  );
}

export default Book;*/

import { Fragment, useState, useEffect} from 'react';
import EditableBook from './Book/EditableBook.js'
import Alert from './Book/Alert.js';
import NewBook from './Book/NewBook.js';
import BooksApi from './Book/BooksApi.js';
import { Link } from 'react-router-dom'; 

function Books(props){

    const [message, setMessage] = useState(null);
    const[books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchBooks(){
            try{
            const c = await BooksApi.getAllBooks();
            setBooks(c);
            } catch (error) {
                setMessage('No se pudo contactar con el servidor');
            }
        }

        fetchBooks();
    }
    , []);

    function onAlertClose(){
        setMessage(null);
    }

    function onBookEdit(newBook, oldBook){
        const validation = validateBookTitulo(newBook);
        if (! validation){
            return false;
        }

        if(newBook.titulo !== oldBook.titulo){
            setMessage('No se puede cambiar el título del libro');
            return false;
        }

        setBooks((prevBooks) => {
            const newBooks = prevBooks.map((c) => c.titulo === oldBook.titulo ? newBook : c);
            return newBooks
        })
        return true;
    }

    function onBookDelete(book){
        setBooks((prevBooks) => {
            return prevBooks.filter((c) => c.titulo !== book.titulo);
        });
    }

    function validateBookTitulo(book){
        if(book.titulo === ''){
            setMessage('El titulo debe ser añadido');
            return false;
        }
        return true;
    }

    function onAddBook(book){
       const validation = validateBookTitulo(book);
       if(!validation){
        return false;
       }

       if(books.find(c => c.titulo === book.titulo)){
        if(books.find(c => c.vendedores === book.vendedores)){
        setMessage('Libro duplicado para este vendedor');
        return false;
     }
    }

        setBooks((prevBooks) => {
            if (! prevBooks.find(c => c.titulo === book.titulo)){
                    return [...prevBooks, book];
            } else {
                setMessage('Libro duplicado para este vendedor');
                return prevBooks;
            }
        });
        return true;
    }

    return(
        <Fragment>
            <Alert message={message} onClick={onAlertClose}/>
            <table className="table">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Categoria</th>
                        <th>Año</th>
                        <th>Vendedores</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Reseñas</th>
                        <th>&nbsp</th>
                    </tr>
                </thead>
                <tbody>
                    <NewBook onAddBook={onAddBook}/>
                    {books.map((book) => 
                            <EditableBook key={book.titulo} book={book} onEdit={(newBook) => onBookEdit(newBook, book)} onDelete={onBookDelete}/>
                        )}
                        <tr>
                            <td>
                                {/* Botón para redirigir a la página de detalles */}
                                     <Link to={`/`} className="btn btn-primary">Pantalla Principal</Link>
                            </td>

                        </tr>
                </tbody>
            </table> 
        </Fragment>
    )
}

export default Books;