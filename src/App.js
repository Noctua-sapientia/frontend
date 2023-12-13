import './App.css';
import Books from './Books.js'
import BookDetail from './BookDetail.js'
import SearchBooks from './SearchBooks.js'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  
  return (
    /*<div className="App">
      <h1>Noctia App</h1>
      <Books/>
    </div>*/
    <Router>
      <Routes>
        <Route path="/books" element={<SearchBooks />} />
        <Route path="/books/book" element={<BookDetail />} />
        <Route path="/books/book/seller" element={<Books />} />
      </Routes>
    </Router>
  );
}

export default App;