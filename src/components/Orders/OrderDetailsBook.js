import React from 'react';

function OrderDetailsBook(props) {

  return (
    <tr className="product-row">
      <td> 
      <div><strong>Nombre libro ID={props.book.bookId}</strong></div>
      <div>Nombre del autor libro ID={props.book.bookId}</div>     
      </td>
      <td>{props.book.price}€</td>
      <td>{props.book.units} uds </td>
      <td>{props.book.price * props.book.units}€</td>
    </tr>
  );
}

export default OrderDetailsBook;

