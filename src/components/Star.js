import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Star(props) {
  const numStarsGold = props.numGoldStars;
  const numStarsGrey = 5-numStarsGold;
  const edit = props.edit;
  var arrayStars = null;
  if (numStarsGold == 0){
    arrayStars = Array(numStarsGrey).fill('grey');
  }else{
    arrayStars = Array(numStarsGold).fill('gold').concat(Array(numStarsGrey).fill('grey'));
  }
  const [coloresEstrellas, setColoresEstrellas] = useState(arrayStars);
  
  const changeStarColor = (index) => {
    const goldenStar = index +1;
    const greyStar = 5 - goldenStar;
    const nuevosColores = Array(goldenStar).fill('gold').concat(Array(greyStar).fill('grey'));
    setColoresEstrellas(nuevosColores);
  };
    return (
      <div>
        Valoración: {' '}
        {coloresEstrellas.map((color, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          style={{ color }}
          onClick={edit=='true' ? () => changeStarColor(index) : null}
        />
      ))}
      </div>
    )
}


export default Star;