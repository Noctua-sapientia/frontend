import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const BackButton = (props) => {
  return (
    <Link
      to={props.destination}
      className='bg-sky-800 text-white px-4 py-1 border border-white rounded-lg flex items-center justify-center w-fit'>
      <i className='bi bi-arrow-left'></i>
    </Link>
  );
};

export default BackButton;
