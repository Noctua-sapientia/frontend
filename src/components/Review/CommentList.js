import Comment from './Comment.js';
import React from 'react';


function CommentList(props) {
    
  return(
    <table className='table table-margin'>
     
      <tbody>
      {(() => {
      if (Object.keys(props.comments).length === 0) {
        return <div>No hay reseñas</div>
      }else{
        return <div>{props.comments.map((c) =>
          <Comment key={c.id} comment={c} updateReviewFunction={props.updateReviewFunction} deleteReviewFunction={props.deleteReviewFunction} onYesCancelAlert={props.onYesCancelAlert}/>
        )}
        </div>
      }
    })()}
        
      </tbody>
    </table>
  )
}


export default CommentList;