import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/User/LoginPage';
import RegisterPage from './components/User/RegisterPage';
import VendorPage from './components/User/VendorPage';
import Orders from './components/Order';
import Review from './components/Review';
import Books from './components/Books.js'
import BookDetail from './components/Book/BookDetail.js'
import SearchBooks from './components/Book/SearchBooks.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/register" element={<RegisterPage />} />
        <Route path="/vendorUser" element={<VendorPage />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/review" element={<Review />} />
        <Route path="/books" element={<SearchBooks />} />
        <Route path="/books/book" element={<BookDetail />} />
        <Route path="/books/book/seller" element={<Books />} />
        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;
