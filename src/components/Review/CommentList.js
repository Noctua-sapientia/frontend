import Comment from './Comment.js';
import React from 'react';


function CommentList(props) {
    
  return(
    <table className='table table-margin'>
     
      <tbody>
        {props.comments.map((c) =>
          <Comment key={c.id} comment={c} updateReviewFunction={props.updateReviewFunction} deleteReviewFunction={props.deleteReviewFunction} onYesCancelAlert={props.onYesCancelAlert}/>
        )}
      </tbody>
    </table>
  )
}


export default CommentList;