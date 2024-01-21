import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Star(props) {
  const { numGoldStars, edit, onClick } = props;
  const numStarsGrey = 5 - numGoldStars;
  const initialStars = Array(numGoldStars).fill('gold').concat(Array(numStarsGrey).fill('grey'));

  const [coloresEstrellas, setColoresEstrellas] = useState(initialStars);

  useEffect(() => {
    const newStars = Array(numGoldStars).fill('gold').concat(Array(numStarsGrey).fill('grey'));
    setColoresEstrellas(newStars);
  }, [numGoldStars, numStarsGrey]);

  const changeStarColor = (index) => {
    if(edit==='true'){
      const goldenStar = index + 1;
      const greyStar = 5 - goldenStar;
      const nuevosColores = Array(goldenStar).fill('gold').concat(Array(greyStar).fill('grey'));
      setColoresEstrellas(nuevosColores);
      onClick(goldenStar);
    }

  };

  return (
    <div>
      Valoración: {' '}
      {coloresEstrellas.map((color, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          style={{ color }}
          onClick={() => changeStarColor(index)}
        />
      ))}
    </div>
  )
}



export default Star;