import React, { useState } from 'react';
import TextArea from './TextArea.js';
import Star from './Star.js';

function NewComment(props) {

    const [reviewDescription, setReviewDescription] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    //hay que pasarle el bookId y customerId
    const numberOfGoldStars = (number) => {
      // Lógica para almacenar el numero de estrellas seleccionadas
      setReviewRating(number);

    };
    const reviewDescriptionSave = (description) => {
      // Lógica para almacenar la descripcion
      setReviewDescription(description);

    };
    const save = () => {
        // Lógica para guardar datos
       
        const newBookReview = {
          id: 4,
          description:reviewDescription,
          rating: reviewRating
        };
        const result =  props.addNewReviewFunction(newBookReview);
   
        if (result){
          props.showComponentFunction(false);
        }
              

      };
    return(
      <table className='table'>
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td><Star numGoldStars={reviewRating} edit='true' onClick={numberOfGoldStars}/></td>
                <td>
                    <TextArea maxCharacters='500' changeTextFunction={reviewDescriptionSave} valor={reviewDescription}/>
                    <div className='TextRight' style={{ justifyContent: 'flex-end'}}>
                        <button className="btn btn-primary" onClick={save}>Guardar</button>
                    </div>
                </td>
            </tr>
        </tbody>
      </table>
    
    )
  }
  
  
  export default NewComment;