import React from 'react';
import Comment from './Comment.js';



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
          <Comment key={c.id} comment={c}/>
        )}
      </tbody>
    </table>
  )
}


export default CommentList;