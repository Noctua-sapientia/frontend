import './App.css';
import React, { useState } from 'react';
import CommentList from './components/CommentList.js';
import OrderCommentsBy from './components/OrderCommentsBy.js';
import Dropdown from 'react-bootstrap/Dropdown';

const sellerReviews = [
  { id: 1, description: 'Un envío muy rápido y en perfectas condiciones', rating: 5, date:"06/10/2023" },
  { id: 2, description: 'Un trato horroroso.', rating: 0, date:"23/10/2023" },
  { id: 3, description: 'Buen trato', rating: 4, date:"21/09/2023" },
];

const bookReviews = [
  { id: 1, description: 'Muy buen libro. Me ha encantado', rating: 5, date:"06/10/2023" },
  { id: 2, description: 'Horroroso', rating: 0, date:"23/10/2023" },
  { id: 3, description: 'Buen libro', rating: 4, date:"21/09/2023" },
];

function App() {

  const [activeData, setActiveData] = useState(bookReviews);
  const [activeType, setActiveType] = useState('book'); // Estado para rastrear el tipo activo

  const handleSwitchToSellerReviews = () => {
    setActiveData(sellerReviews);
    setActiveType('seller');
  };

  const handleSwitchToBookReviews = () => {
    setActiveData(bookReviews);
    setActiveType('book');
  };

  const handleSort = (sortType) => {
    console.log(1);
  };

  return (
    <div className="App">
      <h1>Mis reseñas</h1>
      <button className={activeType === 'book' ? 'btn btn-primary' : 'btn btn-primary faded'}
              style={{ marginRight: "5px" }}
              onClick={handleSwitchToBookReviews}>
        Libros
      </button>
      <button className={activeType === 'seller' ? 'btn btn-primary' : 'btn btn-primary faded'}
              style={{ marginLeft: "5px" }}
              onClick={handleSwitchToSellerReviews}>
        Vendedores
      </button>

      <Dropdown className="desplegable">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Ordenar por
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/fechaAsc" onClick={() => handleSort('fechaAsc')}>Fecha Ascendente</Dropdown.Item>
          <Dropdown.Item href="#/fechaDesc" onClick={() => handleSort('fechaDesc')}>Fecha Descendente</Dropdown.Item>
          <Dropdown.Item href="#/valoracionAsc" onClick={() => handleSort('valoracionAsc')}>Valoración Ascendente</Dropdown.Item>
          <Dropdown.Item href="#/valoracionDesc" onClick={() => handleSort('valoracionDesc')}>Valoración Descendente</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <h2 className="TextLeft">Comentarios ({activeData.length})</h2>
      {/* <OrderCommentsBy comments={activeData}/> */}
      <div className="table-container">
        <CommentList comments={activeData}/>
      </div>
    </div>
    
  );
}

export default App;
