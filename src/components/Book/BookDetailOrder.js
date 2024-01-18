import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; 

function BookDetailOrder(props) {
  const navigate = useNavigate();

  function goToSeller(seller) {
    navigate(`/vendorUser/${seller}`);
  }

  return (
    <tr>
      <th>{props.book.seller}</th>
      <td>{props.book.prize}€</td>
      <td>{props.book.stock}</td>
      <td>{props.book.reviews}</td>
      <td>
        <Button variant="info" onClick={() => goToSeller(props.book.seller)}>Comprar</Button>
      </td>
    </tr>
  );
}

export default BookDetailOrder;
