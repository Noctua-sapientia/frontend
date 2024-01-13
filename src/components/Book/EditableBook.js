import { useState } from "react";
import Book from "./Book.js";
import EditBook from "./EditBook.js"

function EditableBook(props){
    const [isEditing, setIsEditing] = useState(false);

    function saveBook(book){
        const result = props.onEdit(book);
        if (result){
            setIsEditing(false);
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