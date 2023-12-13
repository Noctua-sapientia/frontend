import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Star from './Star.js';
import TextArea from './TextArea.js';

//hay que pasarle la información de la fila que se ha hecho click
function CommentWindow(props) {
    const description = props.description;
    const rating = props.rating;
    const isOpen = props.isOpen;
    const onClose = props.onClose;
      
  
    const guardarDatos = () => {
      // Lógica para guardar datos
     { onClose() }; // Cierra la ventana emergente después de guardar
    };
  
    return (
      <div>
        <Modal
           isOpen={isOpen}
           onRequestClose={onClose}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              maxWidth: '800px',
              margin: 'auto',
              padding: '20px',
              maxHeight: '400px',
            },
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px'  }}> 
            <h2>EDITAR COMENTARIO</h2>
            <button onClick={onClose}>
              <FontAwesomeIcon icon={faClose } />
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px'  }}>
            <Star numGoldStars={rating} edit='true'/>
          </div>
          <TextArea valorInicial= {description} maxCharacters='500'/>
    
          <div className='TextRight' style={{ justifyContent: 'flex-end'}}>
            <button className="btn btn-primary" onClick={guardarDatos}>Guardar</button>
            </div>
        </Modal>
      </div>
    );
};

export default CommentWindow;