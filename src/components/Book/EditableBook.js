import { useState } from "react";
import Book from "./Book.js";
import EditBook from "./EditBook.js"
import React from "react";
import BooksApi from './BooksApi.js';
import { useParams } from 'react-router-dom';

function EditableBook(props){
    const [isEditing, setIsEditing] = useState(false);
    const [editedBookData, setEditedBookData] = useState(null);
    const { isbn } = useParams();
    
  const handleEditBook = (book) => {
    console.log("Edited book data in handleEditBook:", book);
    setEditedBookData(book);
  };

    async function saveBook(book) {
        if (editedBookData !== null) {
        try {
            const result = await BooksApi.updateBook(isbn, book);
            if (result) {
            props.onSave(book);
            setEditedBookData(null);
            setIsEditing(false);
            }
        } catch (error) {
            console.log(error);
        }
        }
    }

    var bookRender;
    if(isEditing){
        bookRender = <EditBook book = {props.book} onDelete={props.onDelete} onSave={saveBook}/>;
    } else {
        bookRender = <Book book = {props.book} onDelete={props.onDelete} onEdit={() => setIsEditing(true)}/>
    }

    return bookRender;
    
}

export default EditableBook;