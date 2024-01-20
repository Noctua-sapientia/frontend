import { Link } from 'react-router-dom';
import React from 'react';
function ReturnButton(props) {

    return (

          <Link to="/">
            <button className="boton-volver">{props.title}</button>
          </Link>

      );
    };

export default ReturnButton;