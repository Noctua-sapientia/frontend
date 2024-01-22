import React from 'react';
import { Fragment, useState, useEffect} from 'react';
import EditableBook from './Book/EditableBook.js'
import Alert from './Book/Alert.js';
import NewBook from './Book/NewBook.js';
import BooksApi from './Book/BooksApi.js';
import { Link } from 'react-router-dom'; 
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Books(props){

    const [message, setMessage] = useState(null);
    const[books, setBooks] = useState([]);
    const {accessToken, userId } = useAuth();

    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const { seller } = useParams();
    useEffect(() => {
    
        setSelectedSeller(seller)
        console.log(selectedSeller)
        // Filtra los libros por vendedor cuando el vendedor cambia
        if (selectedSeller !== null) {
            console.log(books)
            const filtered = books.filter((book) => {
                const hasSelectedSeller = book.options.some(option => Number(option.seller) === Number(selectedSeller));
                book.options = book.options.filter((option)=> Number(option.seller) === Number(selectedSeller));
                return hasSelectedSeller;
              });
              
            setFilteredBooks(filtered);
            console.log(filteredBooks)
        } else {
            setFilteredBooks(books);
        }
    }, [books, selectedSeller]);

    function onSellerChange(sellerId) {
        // Actualiza el estado del vendedor seleccionado
        setSelectedSeller(sellerId);
    }

    useEffect(() => {
        async function fetchBooks(){
            try{
            const c = await BooksApi.getAllBooks(accessToken);
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

    function reloadBooks() {
        
        async function fetchBooks() {
            try {
                const c = await BooksApi.getAllBooks(accessToken);
                setBooks(c);
            } catch (error) {
                setMessage('No se pudo contactar con el servidor');
            }
        }

        fetchBooks();
    }

    function onBookEdit(newBook, oldBook){
        const validation = validateBookTitulo(newBook);
        if (! validation){
            return false;
        }

        if(newBook.title !== oldBook.title){
            setMessage('No se puede cambiar el título del libro');
            return false;
        }

        setBooks((prevBooks) => {
            const newBooks = prevBooks.map((c) => c.title === oldBook.title ? newBook : c);
            return newBooks
        })
        return true;
    }

    function onBookDelete(book){
        setBooks((prevBooks) => {
            return prevBooks.filter((c) => c.title !== book.title);
        });
    }


    function validateBookTitulo(book){
        if(book.title === ''){
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

       if(books.find(c => c.title === book.title)){
        if(books.find(c => c.seller === book.seller)){
        setMessage('Libro duplicado para este vendedor');
        return false;
     }
    }

        setBooks((prevBooks) => {
            if (! prevBooks.find(c => c.title === book.title)){
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
                        <th>ISBN</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Categoria</th>
                        <th>Año</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <NewBook onAddBook={onAddBook} reloadBooks={reloadBooks} />
                    {filteredBooks.map((book) => 
                            <EditableBook key={book.title} book={book} onEdit={(newBook) => onBookEdit(newBook, book)} reloadBooks={reloadBooks} onDelete={onBookDelete} />
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