import './App.css';
import React, { useState } from 'react';
import CommentList from './components/CommentList.js';
import NewComment from './components/NewComment.js';
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


  const [mostrarComponente, setMostrarComponente] = useState(false);

  const showNewComment = () => {
    setMostrarComponente(!mostrarComponente);
  };

  const convertirCadenaAFecha = (cadena) => {
    const [dia, mes, anio] = cadena.split('/').map(Number);
    const fecha = new Date(anio, mes - 1, dia);
  
    return fecha;
  };

  const handleSort = (sortType) => {
   
    //actualizamos los registros segun lo que se haya elegido en el selector
    if (sortType === 'fechaAsc') {
      setActiveData([...activeData].sort((a, b) => convertirCadenaAFecha(a.date).getTime() - convertirCadenaAFecha(b.date).getTime()));
    } else if (sortType === 'fechaDesc') {
        setActiveData([...activeData].sort((a, b) => convertirCadenaAFecha(b.date).getTime() - convertirCadenaAFecha(a.date).getTime()));
    }else if(sortType === 'valoracionAsc'){
        setActiveData([...activeData].sort((a, b) => a.rating - b.rating));
      
    }else if(sortType === 'valoracionDesc'){
        setActiveData([...activeData].sort((a, b) => b.rating - a.rating));
        
      }
      

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
      
      <h6 className="TextLeft" onClick={showNewComment} style={{ color:'blue'}}>Añadir un comentario</h6>
      {mostrarComponente && <NewComment/>}

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
