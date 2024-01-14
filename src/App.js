import './App.css';
import React, { useEffect, useState } from 'react';
import CommentList from './components/CommentList.js';
import NewComment from './components/NewComment.js';
import OrderCommentsBy from './components/OrderCommentsBy.js';
import Alert from './components/Alert.js';
import ReviewsApi from './ReviewsApi.js';


/*const sellerReviews = [
  { id: 1, description: 'Un envío muy rápido y en perfectas condiciones', rating: 5, date:"06/10/2023" },
  { id: 2, description: 'Un trato horroroso.', rating: 0, date:"23/10/2023" },
  { id: 3, description: 'Buen trato', rating: 4, date:"21/09/2023" },
];

const bookReviews = [
  { id: 1, description: 'Muy buen libro. Me ha encantado', rating: 5, date:"06/10/2023" },
  { id: 2, description: 'Horroroso', rating: 0, date:"23/10/2023" },
  { id: 3, description: 'Buen libro', rating: 4, date:"21/09/2023" },
];*/

function App() {

  const [activeData, setActiveData] = useState([]);
  const [activeType, setActiveType] = useState('book'); // Estado para rastrear el tipo activo
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(''); //para cambiar el estado del selector


  const handleSwitchToSellerReviews = () => {
    setActiveType('seller');
  };

  const handleSwitchToBookReviews = () => {
    setActiveType('book');
  };


  const [mostrarComponente, setMostrarComponente] = useState(false);

  const showNewComment = () => {
    setMostrarComponente(!mostrarComponente);
  };

  
useEffect(() => {
  async function getReviewsBySelector(){
    console.log('Entra en la funcion');
    try{
      //le pasamos como queremos que nos las devuelva
      let filters = 
       {       
      };
      if (opcionSeleccionada === 'fechaAsc') {
        filters = {
          sort:'date',
          order:'asc'
        }
      } else if (opcionSeleccionada === 'fechaDesc') {
        filters = {
          sort:'date',
          order:'desc'
        }
      }else if(opcionSeleccionada === 'valoracionAsc'){
        filters = {
          sort:'rating',
          order:'asc'
        }
        
      }else if(opcionSeleccionada === 'valoracionDesc'){
        filters = {
          sort:'rating',
          order:'desc'
        }
          
        }
      let reviews = null;
      if (activeType === 'book'){
        reviews = await ReviewsApi.getAllBookReviews(filters);
      }else if(activeType === 'seller'){
        reviews = await ReviewsApi.getAllSellerReviews(filters);
      }
      setActiveData(reviews);
    } catch (error) {
      console.log(error);
      setMessage('Could not connect to server');
    }     
  }
  getReviewsBySelector();

}, [activeType, opcionSeleccionada]);




function onAddReview(review){
  //hay que hacer comprobaciones de que no se pueda añadir por ejemplo los que tengann descripcion vacia
  if(review.description === ''){
    setMessage('Añade una descripción para la review');
    return false;
  }if(activeData.find(br => br.id === review.id)){
    setMessage('No se puede crear una review con el mismo id'); 
    return false;
  }else{
    setActiveData((prevReviews) => {
      if(!activeData.find(r => r.id === review.id)){
        return [...prevReviews, review];
      }else{
        setMessage('Esta review ya existe')
        return prevReviews;
      }
      
    });
    return true;
    
  }

}

const [message, setMessage] = useState(null);
function onCloseAlert(){
  setMessage(null);
  return true;
}

function onUpdateReview(newReviewData){
  //realizar comprobaciones
  console.log(newReviewData);
  setActiveData((prevReviews) => {
          return prevReviews.map((r) => r.id === newReviewData.id ? newReviewData : r);
  });

  return true;
}

function onDeleteReview(review){
  
  setActiveData((prevReviews) => {
          return prevReviews.filter((r) => r.id !== review.id);
        
  });
}



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
      <Alert message={message} onClose={onCloseAlert}/>
      <OrderCommentsBy handleSort={setOpcionSeleccionada}/>
      <h6 className="TextLeft" onClick={showNewComment} style={{ color:'blue'}}>Añadir un comentario</h6>
      {mostrarComponente && <NewComment addNewReviewFunction={onAddReview} showComponentFunction={setMostrarComponente} activeType={activeType}/>}


      <h2 className="TextLeft">Comentarios ({activeData.length})</h2>
      
      <div className="table-container">
        <CommentList comments={activeData} updateReviewFunction={onUpdateReview} deleteReviewFunction={onDeleteReview} />
      </div>
    </div>
    
  );
}

export default App;
