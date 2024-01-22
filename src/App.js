import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

import LoginPage from './components/User/LoginPage';
import RegisterPage from './components/User/RegisterPage';
import selectedSeller from './components/User/SelectedSeller.js';
import MyAccount from './components/User/Account';


import Books from './components/Books';
import BookReview from './components/Review/ReviewsInDetail.js';

import Review from './components/Review/Review.js';

import BookDetail from './components/Book/BookDetail.js'
import SearchBooks from './components/Book/SearchBooks.js'

import HistoryOrders from './components/Orders/HistoryOrders';
import OrderDetails from './components/Orders/OrderDetails';
import BasketOrders from './components/Orders/BasketOrders';
import Header from './header';

function App() {

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/register" element={<RegisterPage />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/seller/:id" element={<selectedSeller />} />

        <Route path="/books/:isbn/:seller" element={<Books />} />
        <Route path="/books/:isbn" element={<BookDetail />} />
        <Route path="/books" element={<SearchBooks />} />

        <Route path="/review" element={<Review />} />

        <Route path="/historyOrders" element={<HistoryOrders />}/>
        <Route path="/historyOrders/:orderId" element={<OrderDetails />} />
        <Route path="/basketOrders" element={<BasketOrders />} />

        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;