import React, { useState } from 'react';
import Star from './Star.js';
import CommentWindow from './CommentWindow.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt,faTrash  } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { useAuth } from '../AuthContext';


function Comment(props) {
  const {userId } = useAuth();

  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = () => {
    setModalAbierto(true);
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

  const cerrarModal = () => {
    setModalAbierto(false);
    console.log(props.comment.rating);
    setNewDescription(props.comment.description);
    setNewRating(props.comment.rating);
  };
  const formatDate = (date) => {
    const fecha = new Date(date);
    const año = fecha.getFullYear();
    const mes = ("0" + (fecha.getMonth() + 1)).slice(-2); // El mes es base 0, por lo que se suma 1
    const dia = ("0" + fecha.getDate()).slice(-2);
    const horas = ("0" + fecha.getHours()).slice(-2);
    const minutos = ("0" + fecha.getMinutes()).slice(-2);
    return `${dia}-${mes}-${año} ${horas}:${minutos}`;
  };

  const saveData = async () => {
    // Lógica para guardar datos
    if(newDescription === ''){
      setMessage('Añade una descripción para la review');
    }else{
      const updatedBookReview = {
        id: props.comment.id,
        description: newDescription,
        rating: newRating,
        createdAt: props.comment.createdAt,
        bookId: props.comment.bookId,
        customerId: userId
      };
      await props.updateReviewFunction(updatedBookReview);
     // Cierra la ventana emergente después de guardar
     setModalAbierto(false);
    }

    return true;
  
    
  };

  const [message, setMessage] = useState(null);
  function onCloseAlert(){
    setMessage(null);
  }


  const showSweetAlert = (title, messageSweet) => {
      swal({
          title: title,
          text: messageSweet,
          icon: "warning",
          buttons: ["No", "Si"]
      }).then(respuesta=>{
          if(respuesta){
             props.onYesCancelAlert(props.comment.id)
          }
      })
  
};

    

  //se añade la info que se le quiera pasar a la ventana modal
  //const params = {"description": props.comment.description, "rating": props.comment.rating, "isOpen": modalAbierto, "onClose": cerrarModal}
  //que solo se muestre el lapiz con el usuario que coincida 
  return(
    <tr>
      <td >
        Aqui iria el nombre del customerId que ha escrito el comentario
          {props.comment.customerId}
      </td>
      <td >
          {formatDate(props.comment.createdAt)}
      </td>
      <td >
        <Star numGoldStars={props.comment.rating} edit='false' onClick={numberOfGoldStarsChange}/>
        <div>
          {props.comment.description} 
        </div>    
      </td>
      {(() => {
      if (props.comment.customerId === userId) {
        return <td>
        <FontAwesomeIcon icon={faPencilAlt} onClick={abrirModal} className="icono-lapiz" />
        <FontAwesomeIcon icon={faTrash} onClick={() => showSweetAlert("Eliminar","¿Estás seguro de que desea eliminar el comentario?")}/>
      </td>
      } else{
        return <td>

        </td>
      }
    })()}
   
      <CommentWindow isOpen={modalAbierto} onClose={cerrarModal} description={newDescription} rating={newRating} 
      saveFunction={saveData} numberOfGoldStarsChange={numberOfGoldStarsChange} 
      reviewDescriptionChange={reviewDescriptionChange} message={message} onCloseAlert={onCloseAlert}
      />
    </tr>
  )
 
}

export default Comment; 