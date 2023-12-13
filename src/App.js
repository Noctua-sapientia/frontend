import './App.css';
import React, { useState } from 'react';
import CommentList from './components/CommentList.js';
import NewComment from './components/NewComment.js';
import OrderCommentsBy from './components/OrderCommentsBy.js';

const comments = [
  { customerDescription: "Belén González", description: 'Como todas las ediciones de Minalima, es una maravilla. Este es mi libro favorito de la saga, a lo que se ha sumado una encuadernación y una serie de ilustraciones increíbles. Un imprescindible para aquellos que crecimos leyendo a Harry Potter.', rating: 5, updatedDate:"06/10/2023" },
  { customerDescription: "Juan Gutiérrez", description: 'Es una mierda.', rating: 0, updatedDate:"23/10/2023" },
  { customerDescription: "Sandra Jiménez", description: 'Es preciosa esta edicion!', rating: 4, updatedDate:"21/09/2023" },
];

function App() {
  const numComments = comments.length;
  const [mostrarComponente, setMostrarComponente] = useState(false);

  const showNewComment = () => {
    setMostrarComponente(!mostrarComponente);
  };
  return (
    <div className="App">
      <h1>Noctia App</h1>
      <h2 className="TextLeft">Comentarios ({numComments})</h2>
      <OrderCommentsBy comments={comments}/>
      <h6 className="TextLeft" onClick={showNewComment} style={{ color:'blue'}}>Añadir un comentario</h6>
      {mostrarComponente && <NewComment/>}
      <CommentList comments={comments}/>

      
     
    </div>

    
      
    
  );
}

export default App;
