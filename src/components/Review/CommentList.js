import Comment from './Comment.js';
import React,  { useState,useEffect } from 'react';
import { useAuth } from '../AuthContext';
import UsersApi from '../../api/UserApi.js'
import BooksApi from '../Book/BooksApi.js'


function CommentList(props) {
const { accessToken, userType } = useAuth();
const [userNames, setUserNames] = useState([]);

const searchUserName = async (idCustomer)=>{
  const customer = await UsersApi.getCustomer(accessToken, idCustomer);
  const fullName = customer.name + ' ' + customer.surnames;
  return fullName;
}

const searchSellerName = async (idSeller)=>{
  const seller = await UsersApi.getSeller(accessToken, idSeller);
  return seller.name;
}

const searchBookName = async (idBook)=>{
  const book = await BooksApi.getBooksByISBN(accessToken, idBook);
  return book.title;
}

const searchNames = async () => {
  try {
    let names;
    if(props.mode==='books' && userType.toLowerCase() === 'customer'){
      names = await Promise.all(
        props.comments.map((comment) =>
        searchBookName(comment.bookId)
        )
      );
    }else if(props.mode === 'sellers' && userType.toLowerCase() === 'customer'){
      names = await Promise.all(
        props.comments.map((comment) =>
        searchSellerName(comment.sellerId)
        )
      );
    }else{
      names = await Promise.all(
        props.comments.map((comment) =>
          searchUserName(comment.customerId)
        )
      );
    }
    setUserNames(names);
  } catch (error) {
    console.error('Error fetching customer names:', error);

    setUserNames([]);
  }
};

useEffect(() => {
 
  searchNames();

}, [props.comments]);
    
  return(
    <table className='tableReview table-margin'>
      
      <tbody>
      {(() => {
      if (Object.keys(props.comments).length === 0) {
        return <div>No hay reseñas</div>
      }else{
        return <div>{props.comments.map((comment, index) =>
          <Comment key={comment.id} comment={comment} customerName={userNames[index]} updateReviewFunction={props.updateReviewFunction} deleteReviewFunction={props.deleteReviewFunction} onYesCancelAlert={props.onYesCancelAlert} mode={props.mode}/>
        )}
        </div>
      }
    })()}

      </tbody>
    </table>
  )
}


export default CommentList;