import './Review.css';
import React, { useEffect, useState } from 'react';
import CommentList from './CommentList.js';
import NewComment from './NewComment.js';
import OrderCommentsBy from './OrderCommentsBy.js';
import Alert from './Alert.js';
import ReviewsApi from '../../api/ReviewsApi.js';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

function Review() {

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


  return(
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

      <div>
        <Link to="/">Volver a INICIO</Link>
      </div>

    </div>
    
  );
}

export default Review;