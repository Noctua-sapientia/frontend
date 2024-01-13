import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/User/LoginPage';
import RegisterPage from './components/User/RegisterPage';
import MyAccount from './components/User/Account';
import Orders from './components/Order';
import Books from './components/Book';
import Review from './components/Review';
import Pricing from './components/Pricing/pricingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/register" element={<RegisterPage />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/book" element={<Books />} />
        <Route path="/review" element={<Review />} />
        <Route path="/pricing" element={<Pricing />} />
        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;
