import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

import LoginPage from './components/User/LoginPage';
import RegisterPage from './components/User/RegisterPage';

import VendorPage from './components/User/VendorPage';
import MyAccount from './components/User/Account';
import Books from './components/Books';

import Review from './components/Review/Review.js';

import BookDetail from './components/Book/BookDetail.js'
import SearchBooks from './components/Book/SearchBooks.js'

import HistoryOrders from './components/Orders/HistoryOrders';
import OrderDetails from './components/Orders/OrderDetails';
import BascketOrders from './components/Orders/BascketOrders';
import orders from './components/Orders/OrdersData';
import Header from './header';

function App() {

  const [rawOrders, setOrders] = useState(orders);

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/register" element={<RegisterPage />} />
        <Route path="/myaccount" element={<MyAccount />} />

        <Route path="/vendorUser" element={<VendorPage />} />

        <Route path="/book" element={<Books />} />
        <Route path="/books/book" element={<BookDetail />} />
        <Route path="/books/book/seller" element={<Books />} />

        <Route path="/review" element={<Review />} />

        <Route path="/historyOrders" element={<HistoryOrders />}/>
        <Route path="/historyOrders/:orderId" element={<OrderDetails orders={rawOrders} setOrders={setOrders} />} />
        <Route path="/bascketOrders" element={<BascketOrders />} />

        {/* <Route path="/pricing" element={<Pricing />} /> */}

        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;