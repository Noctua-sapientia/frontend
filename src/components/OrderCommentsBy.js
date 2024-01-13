import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';



function OrderCommentsBy(props) {
  
  return(
    <Dropdown className="desplegable">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Ordenar por
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/fechaAsc" onClick={() => props.handleSort('fechaAsc')}>Fecha Ascendente</Dropdown.Item>
          <Dropdown.Item href="#/fechaDesc" onClick={() => props.handleSort('fechaDesc')}>Fecha Descendente</Dropdown.Item>
          <Dropdown.Item href="#/valoracionAsc" onClick={() => props.handleSort('valoracionAsc')}>Valoración Ascendente</Dropdown.Item>
          <Dropdown.Item href="#/valoracionDesc" onClick={() => props.handleSort('valoracionDesc')}>Valoración Descendente</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
   
  )
}


export default OrderCommentsBy;