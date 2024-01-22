import { useState } from "react";
import Book from "./Book.js";
import EditBook from "./EditBook.js"
import React from "react";
import BooksApi from './BooksApi.js';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function EditableBook(props){
    const [isEditing, setIsEditing] = useState(false);
    const [editedBookData, setEditedBookData] = useState(null);
    const { isbn } = useParams();
    const {accessToken, userId } = useAuth();

  const handleEditBook = (book) => {
    console.log("Edited book data in handleEditBook:", book);
    setEditedBookData(book);
  };

    async function saveBook(book) {
    }

    function onCancel(){
        setIsEditing(false);
    }

    var bookRender;
    if(isEditing){
        bookRender = <EditBook book = {props.book} onCancel={onCancel} onSave={saveBook}/>;
    } else {
        bookRender = <Book book = {props.book} reloadBooks={props.reloadBooks} onDelete={props.onDelete} onEdit={() => setIsEditing(true)}/>
    }

    return bookRender;
    
}

export default EditableBook;