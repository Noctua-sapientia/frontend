import React from 'react';
import TextArea from './TextArea.js';
import Star from './Star.js';

function NewComment(props) {
    const save = () => {
        // Lógica para guardar datos
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
                <td><Star numGoldStars='0' edit='true'/></td>
                <td>
                    <TextArea maxCharacters='500'/>
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