//esto iria debajo de los libros
import './Review.css';
import '../../App.css';
import React, { useEffect, useState } from 'react';
import CommentList from './CommentList.js';
import NewComment from './NewComment.js';
import OrderCommentsBy from './OrderCommentsBy.js';
import Alert from './Alert.js';
import ReviewsApi from '../../api/ReviewsApi.js';
import swal from 'sweetalert';
import Pagination from './Pagination.js';
import { useAuth } from '../AuthContext.js';

function ReviewsInDetail(props){
    const limit = 3;
    const [activeData, setActiveData] = useState([]);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const [numberReviews, setNumberReviews] = useState(0); 
    const [numberPages, setNumberPages] = useState(1); 
    const [currentPage, setCurrentPage] = useState(0); 
    const {userId, isAuthenticated, userType,accessToken} = useAuth();


    const activeType = props.activeType;
    

    window.onload = function() {     
        if (window.location.hash) {         
          window.location.href = window.location.href.split('#')[0];     
        } 
      }

      const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
      };

      const [mostrarComponente, setMostrarComponente] = useState(false);

      const showNewComment = () => {
        setMostrarComponente(!mostrarComponente);
      };

      async function getTotalNumberReviews(){
        let filters = {

        };
        if(activeType === 'books'){
          filters.bookId = props.bookId;
        }else if(activeType === 'sellers'){
          filters.sellerId = props.sellerId;
        }
        const response = await ReviewsApi.getNumberReviews(activeType,filters,accessToken);
        const totalNumber = response.count;
        setNumberReviews(totalNumber);
        if(numberReviews % limit === 0){
          setNumberPages(numberReviews/limit);
        }else{
          setNumberPages(Math.floor(numberReviews/limit)+1);
        }
      }

      async function getReviewsBySelector(){
        try{
          //le pasamos como queremos que nos las devuelva
          let filters = 
           {      
            limit:limit,
            offset:limit*currentPage,
          };
          if(activeType === 'books'){
            filters.bookId = props.bookId;
          }else if(activeType === 'sellers'){
            filters.sellerId = props.sellerId;
          }
          if (opcionSeleccionada === 'fechaAsc') {
            filters.sort = 'date';
            filters.order = 'asc';

          } else if (opcionSeleccionada === 'fechaDesc') {
            filters.sort = 'date';
            filters.order = 'desc';

          }else if(opcionSeleccionada === 'valoracionAsc'){
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

      }, [currentPage,opcionSeleccionada]);

      useEffect(() => {
        
        getTotalNumberReviews();
       
      }, [activeData]);


      async function onAddReview(review){
        //hay que hacer comprobaciones de que no se pueda añadir por ejemplo los que tengann descripcion vacia
        if(review.description === ''){
          setMessage('Añade una descripción para la review');
          return false;
        }else{
          //guardamos en bd
          const newReview = await ReviewsApi.createReview(review, activeType,accessToken);
          if(newReview){
            if(activeData.length>0){
              setActiveData((prevReviews) => {
                return [...prevReviews, newReview];
              });
            }else{
              setActiveData([newReview]);
            }
            
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
  await ReviewsApi.deleteReviewById(review, activeType, accessToken);

}

const onYesCancelAlert = async(reviewIdToDelete) => {
    await onDeleteReview(reviewIdToDelete);
    swal({text:"El comentario se ha eliminado correctamente"});
    setActiveData((prevReviews) => {
    return prevReviews.filter((r) => r.id !== reviewIdToDelete)});
    getReviewsBySelector();

  };

    return(
        <div className="App">
          <Alert message={message} onClose={onCloseAlert}/>
            {(() => {
              if (isAuthenticated() && userType.toLowerCase() === 'customer') {
                return <div classname="containerCommentOrderBy">
                <button className="add-comment-button" onClick={showNewComment}>Añadir un comentario</button>
                   <OrderCommentsBy handleSort={setOpcionSeleccionada}/>
                  {mostrarComponente && <NewComment addNewReviewFunction={onAddReview} showComponentFunction={setMostrarComponente} activeType={activeType} userId={userId} bookId={props.bookId}/>}
                </div>
              }else{
                return <div><OrderCommentsBy handleSort={setOpcionSeleccionada}/></div>
              } 
            })()}
           <h6 className='TextLeftReview'>Comentarios ({numberReviews})</h6>
          <div className="table-container">
            <CommentList comments={activeData} updateReviewFunction={onUpdateReview} deleteReviewFunction={onDeleteReview} onYesCancelAlert={onYesCancelAlert} bookId={props.bookId}/>
          </div>
          {(() => {
              if (Object.keys(activeData).length === 0) {
                return <div>
                
                </div>
              }else{
                return <Pagination classStyle="paginationDetail" numberPages={numberPages} onChangePage={handleChangePage} currentPage={currentPage}/>
              } 
            })()}
          
          
      
        </div>

      );
};

export default ReviewsInDetail;