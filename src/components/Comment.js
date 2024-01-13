import React, { useState } from 'react';
import Star from './Star.js';
import CommentWindow from './CommentWindow.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt,faTrash  } from '@fortawesome/free-solid-svg-icons';



function Comment(props) {

  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = () => {
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setNewRating(props.comment.rating);
    setNewDescription(props.comment.description);
  };
  const [newDescription, setNewDescription] = useState(props.comment.description);
    const [newRating, setNewRating] = useState(props.comment.rating);
    //hay que pasarle el bookId y customerId
    const numberOfGoldStarsChange = (number) => {
      // Lógica para almacenar el numero de estrellas seleccionadas
      setNewRating(number);

    };
    const reviewDescriptionChange = (description) => {
      // Lógica para almacenar la descripcion
      setNewDescription(description);

    };

    const saveData = () => {
      // Lógica para guardar datos
      if(newDescription === ''){
        setMessage('Añade una descripción para la review');
      }else{
        const updatedBookReview = {
          id: props.comment.id,
          description:newDescription,
          rating: newRating,
          date: props.comment.date
        };
        const result =  props.updateReviewFunction(updatedBookReview);
        if (result){
          setNewDescription('');
          setNewRating(0);
        }
       // Cierra la ventana emergente después de guardar
       cerrarModal();
      }
    
      
    };

    const [message, setMessage] = useState(null);
    function onCloseAlert(){
      setMessage(null);
    }
    

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
        <FontAwesomeIcon icon={faTrash} onClick={() => props.deleteReviewFunction(props.comment)}/>
      </td>
      <CommentWindow isOpen={modalAbierto} onClose={cerrarModal} description={newDescription} rating={newRating} 
      saveFunction={saveData} numberOfGoldStarsChange={numberOfGoldStarsChange} 
      reviewDescriptionChange={reviewDescriptionChange} message={message} onCloseAlert={onCloseAlert}
      
      
      />
      <CommentWindow/>
    </tr>
  )
 
}

export default Comment; 