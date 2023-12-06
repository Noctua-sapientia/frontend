import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/User/LoginPage';
import Orders from './components/Order';
import Books from './components/Book';
import Review from './components/Review';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/book" element={<Books />} />
        <Route path="/review" element={<Review />} />

        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;
