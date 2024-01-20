import { Link } from 'react-router-dom';
function ReturnButton(props) {

    return (
       
          <Link to="/">
            <button className="boton-volver">{props.title}</button>
          </Link>
       
      );
    };

export default ReturnButton;