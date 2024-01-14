import './App.css';
import React, { useEffect, useState } from 'react';
import CommentList from './components/CommentList.js';
import NewComment from './components/NewComment.js';
import OrderCommentsBy from './components/OrderCommentsBy.js';
import Alert from './components/Alert.js';
import ReviewsApi from './ReviewsApi.js';
import swal from 'sweetalert';


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
  const [activeType, setActiveType] = useState('books'); // Estado para rastrear el tipo activo
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(''); //para cambiar el estado del selector

  console.log(activeType);
  const handleSwitchToSellerReviews = () => {
    setActiveType('sellers');
  };

  const handleSwitchToBookReviews = () => {
    setActiveType('books');
  };


  const [mostrarComponente, setMostrarComponente] = useState(false);

  const showNewComment = () => {
    setMostrarComponente(!mostrarComponente);
  };

  
useEffect(() => {
  async function getReviewsBySelector(){
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
      reviews = await ReviewsApi.getReviews(filters, activeType);
      setActiveData(reviews);
    } catch (error) {
      console.log(error);
      setMessage('Could not connect to server');
    }     
  }
  getReviewsBySelector();

}, [activeType, opcionSeleccionada]);




async function onAddReview(review){
  //hay que hacer comprobaciones de que no se pueda añadir por ejemplo los que tengann descripcion vacia
  if(review.description === ''){
    setMessage('Añade una descripción para la review');
    return false;
  }if(activeData.find(br => br.id === review.id)){
    setMessage('No se puede crear una review con el mismo id'); 
    return false;
  }else{
    //guardamos en bd
    const newReview = await ReviewsApi.createReview(review, activeType);
    if(newReview){
      setActiveData((prevReviews) => {
        return [...prevReviews, newReview];
      });
      return true;
    }else{
      return false;
    }
       
    
  }

}

const [message, setMessage] = useState(null);
function onCloseAlert(){
  setMessage(null);
  return true;
}

async function onUpdateReview(newReviewData){
  //realizar comprobaciones
  const { id, date, ...restData } = newReviewData;
  const newReview = await ReviewsApi.updateReview(newReviewData.id, restData, activeType);
  console.log(newReview);
  if (newReview) {
    setActiveData((prevReviews) => {
      return prevReviews.map((r) => r.id === newReviewData.id ? newReviewData : r);
      
  });
  return true;
  } else {
    return false;
  }

  
}


async function onDeleteReview(review){
  await ReviewsApi.deleteReviewById(review, activeType);
       
}



const onYesCancelAlert = async(reviewIdToDelete) => {
  await onDeleteReview(reviewIdToDelete);
  swal({text:"El comentario se ha eliminado correctamente"});
  setActiveData((prevReviews) => {
  return prevReviews.filter((r) => r.id !== reviewIdToDelete)});
   
};


  return (
    <div className="App">
      <h1>Mis reseñas</h1>
      <button className={activeType === 'books' ? 'btn btn-primary' : 'btn btn-primary faded'}
              style={{ marginRight: "5px" }}
              onClick={handleSwitchToBookReviews}>
        Libros
      </button>
      <button className={activeType === 'sellers' ? 'btn btn-primary' : 'btn btn-primary faded'}
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
        <CommentList comments={activeData} updateReviewFunction={onUpdateReview} deleteReviewFunction={onDeleteReview} onYesCancelAlert={onYesCancelAlert}/>
      </div>
    </div>
    
  );
}

export default App;
