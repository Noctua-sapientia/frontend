import React from 'react';

function TextArea(props){
    
    const maxCharacters = props.maxCharacters;
    
    
    const handleChange = (e) => {
        const nuevoValor = e.target.value;
        if (nuevoValor.length <= maxCharacters) {
            props.changeTextFunction(nuevoValor);
        }
    }
    const contadorCaracteres = () => {
        return `${props.valor.length}/${maxCharacters}`;
    };

    return (
        <div>
      
        <textarea type="text" value={props.valor} onChange={handleChange}  
        autoFocus   style={{ width: '750px', height: '150px' }}/>
        
        <div className='TextRight' style={{ marginBottom: '16px' }}>{contadorCaracteres()}</div>
        </div>
    );
}


export default TextArea;