import Comment from './Comment.js';
import React, { useState } from 'react';


function CommentList(props) {
    
  return(
    <table className='table table-fixed table-margin'>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.comments.map((c) =>
          <Comment key={c.id} comment={c} updateReviewFunction={props.updateReviewFunction} deleteReviewFunction={props.deleteReviewFunction}/>
        )}
      </tbody>
    </table>
  )
}


export default CommentList;