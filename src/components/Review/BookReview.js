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
import ReturnButton from '../ReturnButton.js';
import Pagination from './Pagination.js';
import { useAuth } from '../AuthContext';

function BookReview(props){
    const limit = 3;
    const [activeData, setActiveData] = useState([]);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const [numberReviews, setNumberReviews] = useState(0); 
    const [numberPages, setNumberPages] = useState(1); 
    const [currentPage, setCurrentPage] = useState(0); 
    const {userId} = useAuth();

    const bookId = 5 //sustituir por el id real del libro
    const activeType = "books"


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

      useEffect(() => {
        async function getTotalNumberReviews(){
          const totalNumber = await ReviewsApi.getNumberReviews('books');
          setNumberReviews(totalNumber);
          if(numberReviews % limit === 0){
            setNumberPages(numberReviews/limit);
          }else{
            setNumberPages(Math.floor(numberReviews/limit)+1);
          }
        }
        getTotalNumberReviews();

      }, [activeData, numberReviews]);


      useEffect(() => {
        async function getReviewsBySelector(){
          try{
            //le pasamos como queremos que nos las devuelva
            let filters = 
             {      
              limit:limit,
              skip:limit*currentPage,
              bookId:bookId
            };
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
            reviews = await ReviewsApi.getReviews(filters, activeType);
            setActiveData(reviews);
          } catch (error) {
            console.log(error);
            setMessage('Could not connect to server');
          }     
        }
        getReviewsBySelector();

      }, [currentPage, opcionSeleccionada]);


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
          <Alert message={message} onClose={onCloseAlert}/>
         <div classname="containerCommentOrderBy">
         <button className="add-comment-button" onClick={showNewComment}>Añadir un comentario</button>
            <OrderCommentsBy handleSort={setOpcionSeleccionada}/>

            {mostrarComponente && <NewComment addNewReviewFunction={onAddReview} showComponentFunction={setMostrarComponente} activeType={activeType} userId={userId}/>}
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
};

export default BookReview;