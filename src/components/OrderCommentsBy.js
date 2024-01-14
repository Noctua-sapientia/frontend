import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';



function OrderCommentsBy(props) {
  const [tituloDropdown, setTituloDropdown] = useState('Ordenar por');
  const changeLabel = (newLabel) => {
    setTituloDropdown(newLabel); // Actualiza el título al seleccionar una opción
  };
  
  return(
    <Dropdown className="desplegable">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
         {tituloDropdown}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/fechaAsc" onClick={() => {changeLabel('Fecha Ascendente');props.handleSort('fechaAsc')}}>Fecha Ascendente</Dropdown.Item>
          <Dropdown.Item href="#/fechaDesc" onClick={() => {changeLabel('Fecha Descendente');props.handleSort('fechaDesc')}}>Fecha Descendente</Dropdown.Item>
          <Dropdown.Item href="#/valoracionAsc" onClick={() => {changeLabel('Valoración Ascendente');props.handleSort('valoracionAsc')}}>Valoración Ascendente</Dropdown.Item>
          <Dropdown.Item href="#/valoracionDesc" onClick={() => {changeLabel('Valoración Descendente');props.handleSort('valoracionDesc')}}>Valoración Descendente</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
   
  )
}


export default OrderCommentsBy;