import './Review.css';
import '../../App.css';
import React, { useEffect, useState } from 'react';
import CommentList from './CommentList.js';
import OrderCommentsBy from './OrderCommentsBy.js';
import Alert from './Alert.js';
import ReviewsApi from '../../api/ReviewsApi.js';
import swal from 'sweetalert';
import ReturnButton from '../ReturnButton.js';
import Pagination from './Pagination.js';
import { useAuth } from '../AuthContext';

function Review() {

  const [activeData, setActiveData] = useState([]);
  const {userType, isAuthenticated, userId,accessToken} = useAuth();
  let activeTypeDefault = 'books';
  if(userType != null && userType.toLowerCase() === 'seller'){
    activeTypeDefault = 'sellers';
    }
  const [activeType, setActiveType] = useState(activeTypeDefault); // Estado para rastrear el tipo activo
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(''); //para cambiar el estado del selector
  const [numberReviews, setNumberReviews] = useState(0); 
  const [numberPages, setNumberPages] = useState(1); 
  const [currentPage, setCurrentPage] = useState(0); 


  window.onload = function() {     
    if (window.location.hash) {         
      window.location.href = window.location.href.split('#')[0];     
    } 
  }
  
  const limit = 3;

  const handleSwitchToSellerReviews = () => {
    setActiveType('sellers');
  };

  const handleSwitchToBookReviews = () => {
    setActiveType('books');
  };

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };


  useEffect(() => {
    async function getTotalNumberReviews(){
      let filters = {

      };
      if(isAuthenticated() && userType.toLowerCase() === 'customer'){
        filters.customerId = userId;
      }else if(isAuthenticated() && userType.toLowerCase() === 'seller'){
        filters.sellerId = userId;
      }
      const response = await ReviewsApi.getNumberReviews(activeType,filters,accessToken);
      const totalNumber = response.count;
      setNumberReviews(totalNumber);
      if(totalNumber % limit === 0){
        setNumberPages(totalNumber/limit);
      }else{
        setNumberPages(Math.floor(totalNumber/limit)+1);
      }
    }
    getTotalNumberReviews();

  }, [activeData]);

console.log(accessToken);
async function getReviewsBySelector(){
  try{
    //le pasamos como queremos que nos las devuelva
    let filters = 
    {      
      limit:limit,
      offset:limit*currentPage
    };
    if(isAuthenticated() && userType.toLowerCase() === 'customer'){
      //si es un cliente aparecera las reviews creadas por el
      filters.customerId = userId;
    }else if(isAuthenticated() && userType.toLowerCase() === 'seller'){
      filters.sellerId = userId;
    }
    if (opcionSeleccionada === 'fechaAsc') {
      filters.sort = 'date';
      filters.order = 'asc';
    } else if (opcionSeleccionada === 'fechaDesc') {
      filters.sort = 'date';
      filters.order = 'desc';
    } else if(opcionSeleccionada === 'valoracionAsc'){
      filters.sort = 'rating';
      filters.order = 'asc';
      
    }else if(opcionSeleccionada === 'valoracionDesc'){
      filters.sort = 'rating';
      filters.order = 'desc';
        
      }
    let reviews = null;
    reviews = await ReviewsApi.getReviews(filters, activeType,accessToken);
    setActiveData(reviews);
  } catch (error) {
    console.log(error);
    setMessage('Could not connect to server');
  }     
}
useEffect(() => {
  
  getReviewsBySelector();

}, [activeType, currentPage, opcionSeleccionada]);



const [message, setMessage] = useState(null);
function onCloseAlert(){
  setMessage(null);
  return true;
}

async function onUpdateReview(newReviewData){
  //realizar comprobaciones
  const { id, date, ...restData } = newReviewData;
  const newReview = await ReviewsApi.updateReview(newReviewData.id, restData, activeType,accessToken);
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
  await ReviewsApi.deleteReviewById(review, activeType,accessToken);
       
}



const onYesCancelAlert = async(reviewIdToDelete) => {
  await onDeleteReview(reviewIdToDelete);
  swal({text:"El comentario se ha eliminado correctamente"});
  setActiveData((prevReviews) => {
  return prevReviews.filter((r) => r.id !== reviewIdToDelete)});
  getReviewsBySelector();
};

if (!isAuthenticated()) {
  return <h1> No has iniciado sesión </h1>;
}else{

  return(
    <div className="App">
      <h1>Mis reseñas</h1>
      {(() => {
      if (userType.toLowerCase() === 'customer') {
        return <div><button className={activeType === 'books' ? 'btn btn-primary' : 'btn btn-primary faded'}
        style={{ marginRight: "5px" }}
        onClick={handleSwitchToBookReviews}>
          Libros
        </button>
        <button className={activeType === 'sellers' ? 'btn btn-primary' : 'btn btn-primary faded'}
                style={{ marginLeft: "5px" }}
                onClick={handleSwitchToSellerReviews}>
          Vendedores
        </button></div>
      } 
    })()}
      <Alert message={message} onClose={onCloseAlert}/>
     
      <OrderCommentsBy handleSort={setOpcionSeleccionada}/>
      
      <div className="table-container">
        <CommentList comments={activeData} updateReviewFunction={onUpdateReview} deleteReviewFunction={onDeleteReview} onYesCancelAlert={onYesCancelAlert} mode={activeType}/>
      </div>

     
      <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '10%', marginRight: '10%', marginBottom: '5%', marginTop: '5%' }}>
        <ReturnButton title="Volver a inicio" />
        <Pagination classStyle="paginationMyReview" numberPages={numberPages} onChangePage={handleChangePage} currentPage={currentPage}/>
      </div>

    </div>
    
  );
}
}

export default Review;