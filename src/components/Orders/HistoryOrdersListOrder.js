import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';

import './HistoryOrders.css';
import { parseDate, chooseBadgeType } from './utils';  

function HistoryOrdersListOrder(props) {


  function goToOrderDetails() {
    console.log('goToOrderDetails');
  }

  return (
    <tr>
      <th>{props.order.orderId}</th>
      <td>{parseDate(props.order.creationDatetime)}</td>
      <td>{parseDate(props.order.maxDeliveryDate)}</td>
      <td>{props.order.payment}€</td>
      <td><Badge bg={chooseBadgeType(props.order.status).bg} text={chooseBadgeType(props.order.status).text}>{props.order.status}</Badge></td>
      <td>
        {/* <Button variant="info" onClick={goToOrderDetails}>Ver detalles</Button> */}
        <Link to={`/historyOrders/${props.order.orderId}`}>
          <Button variant="info">Ver detalles</Button>
        </Link>
      </td>
    </tr>
  );
}

export default HistoryOrdersListOrder;