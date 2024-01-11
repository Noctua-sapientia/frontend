import React, { useState } from 'react';
import Star from './Star.js';
import CommentWindow from './CommentWindow.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons';



function Comment(props) {

  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = () => {
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };
  //se añade la info que se le quiera pasar a la ventana modal
  //const params = {"description": props.comment.description, "rating": props.comment.rating, "isOpen": modalAbierto, "onClose": cerrarModal}
  //que solo se muestre el lapiz con el usuario que coincida 
  return(
    <tr>
      <td>Imagen del avatar si se pone</td>
      <td className='TextCenter'>
          {props.comment.id}
      </td>
      <td className='TextLeft'>
          {props.comment.date}
      </td>
      <td className='TextLeft'>
        <Star numGoldStars={props.comment.rating} edit='false'/>
        <div>
          {props.comment.description} 
        </div>    
      </td>
      <td>
        <FontAwesomeIcon icon={faPencilAlt} onClick={abrirModal} className="icono-lapiz" />
      </td>
      <CommentWindow isOpen={modalAbierto} onClose={cerrarModal} description={props.comment.description} rating={props.comment.rating}/>
      <CommentWindow/>
    </tr>
  )
 
}

export default Comment; 