import './Review.css';
import '../../App.css';
import React, { useEffect, useState } from 'react';
import CommentList from './CommentList.js';
import NewComment from './NewComment.js';
import OrderCommentsBy from './OrderCommentsBy.js';
import Alert from './Alert.js';
import ReviewsApi from '../../api/ReviewsApi.js';
import swal from 'sweetalert';
import ReturnButton from '../ReturnButton.js';
import Pagination from './Pagination.js';

function Review() {

  const limit = 3;
  const [activeData, setActiveData] = useState([]);
  const [activeType, setActiveType] = useState('books'); // Estado para rastrear el tipo activo
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(''); //para cambiar el estado del selector
  const [numberReviews, setNumberReviews] = useState(0); 
  const [numberPages, setNumberPages] = useState(1); 
  const [currentPage, setCurrentPage] = useState(0); 

  window.onload = function() {     
    if (window.location.hash) {         
      window.location.href = window.location.href.split('#')[0];     
    } 
  }

  const handleSwitchToSellerReviews = () => {
    setActiveType('sellers');
  };

  const handleSwitchToBookReviews = () => {
    setActiveType('books');
  };

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const [mostrarComponente, setMostrarComponente] = useState(false);

  const showNewComment = () => {
    setMostrarComponente(!mostrarComponente);
  };

  useEffect(() => {
    async function getTotalNumberReviews(){
      const totalNumber = await ReviewsApi.getNumberReviews(activeType);
      console.log(totalNumber);
      setNumberReviews(totalNumber);
      if(numberReviews % limit === 0){
        setNumberPages(numberReviews/limit);
      }else{
        setNumberPages(Math.floor(numberReviews/limit)+1);
      }
    }
    getTotalNumberReviews();
  
  }, [activeType, activeData, numberReviews]);

  
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
          order:'asc',
          limit:limit,
          skip:limit*currentPage
        }
      } else if (opcionSeleccionada === 'fechaDesc') {
        filters = {
          sort:'date',
          order:'desc',
          limit:limit,
          skip:limit*currentPage
        }
      }else if(opcionSeleccionada === 'valoracionAsc'){
        filters = {
          sort:'rating',
          order:'asc',
          limit:limit,
          skip:limit*currentPage
        }
        
      }else if(opcionSeleccionada === 'valoracionDesc'){
        filters = {
          sort:'rating',
          order:'desc',
          limit:limit,
          skip:limit*currentPage
        }
          
      }else{
        filters = {
          limit:limit,
          skip:limit*currentPage
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

}, [activeType, currentPage, opcionSeleccionada]);




async function onAddReview(review){
  //hay que hacer comprobaciones de que no se pueda añadir por ejemplo los que tengann descripcion vacia
  if(review.description === ''){
    setMessage('Añade una descripción para la review');
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
     <div classname="containerCommentOrderBy">
     <button className="add-comment-button" onClick={showNewComment}>Añadir un comentario</button>
        <OrderCommentsBy handleSort={setOpcionSeleccionada}/>
        
        {mostrarComponente && <NewComment addNewReviewFunction={onAddReview} showComponentFunction={setMostrarComponente} activeType={activeType}/>}
      </div>
      Comentarios: {numberReviews} - {numberPages}
      <div className="table-container">
        <CommentList comments={activeData} updateReviewFunction={onUpdateReview} deleteReviewFunction={onDeleteReview} onYesCancelAlert={onYesCancelAlert}/>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '10%', marginRight: '10%', marginBottom: '5%', marginTop: '5%' }}>
      <ReturnButton title="Volver a inicio" />
      <Pagination numberPages={numberPages} onChangePage={handleChangePage} currentPage={currentPage}/>
      </div>
    </div>
    
  );
}

export default Review;