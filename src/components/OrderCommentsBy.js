import React, { useState} from 'react';



function OrderCommentsBy(props) {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const [registros, setRegistros] = useState(props.comments);
    //const order = props.comments.sort((a, b) =>a.rating - b.rating);
    const handleChange = (event) => {
        var newOption = event.target.value;
        setOpcionSeleccionada(newOption);

        //actualizamos los registros segun lo que se haya elegido en el selector
        if (newOption === 'ratingOrderAsc') {
            console.log("opcion1"); //setRegistros([...registros].sort((a, b) => a.rating - b.rating));
          } else if (newOption === 'ratingOrderDesc') {
            console.log("opcion2"); //setRegistros([...registros].sort((a, b) => b.rating - a.rating));
          }else if(newOption === 'updatedDateOrder'){
            console.log("opcion3"); //setRegistros([...registros].sort((a, b) => new Date(a.fecha) - new Date(b.fecha)));
          }
         

    };
  return(
    <div className="TextRight">
        <h6 style={{ fontWeight: 'bold'}}>Ordenar por</h6>
        <select id="miSelector" value={opcionSeleccionada} onChange={handleChange} >
            <option value="">Seleccionar...</option>
            <option value="ratingOrderAsc">De menor a mayor puntuación</option>
            <option value="ratingOrderDesc">De mayor a menor puntuación</option>
            <option value="updatedDateOrder">Más recientes</option>
        </select>
    </div>
   
  )
}


export default OrderCommentsBy;