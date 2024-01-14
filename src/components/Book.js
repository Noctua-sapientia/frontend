// Book.js
import React from 'react';
import { Link } from 'react-router-dom';

function Book() {
  return (
    <div>
      <h1> Página de BOOKS </h1>
      <Link to="/">Volver a INICIO</Link>
    </div>
  );
}

export default Book;