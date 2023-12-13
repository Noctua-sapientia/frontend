import React, { useState } from 'react';

function TextArea(props){
    var valorInicial = props.valorInicial;
    const maxCharacters = props.maxCharacters;
    if(valorInicial == null){
        valorInicial = '';
    }
    const [valor, setValor] = useState(valorInicial);
    const handleChange = (e) => {
        const nuevoValor = e.target.value;
        if (nuevoValor.length <= maxCharacters) {
          setValor(nuevoValor);
        }
    }
    const contadorCaracteres = () => {
        return `${valor.length}/${maxCharacters}`;
    };

    return (
        <div>
      
        <textarea type="text" value={valor} onChange={handleChange}  
        autoFocus   style={{ width: '750px', height: '150px' }}/>
        
        <div className='TextRight' style={{ marginBottom: '16px' }}>{contadorCaracteres()}</div>
        </div>
    );
}


export default TextArea;