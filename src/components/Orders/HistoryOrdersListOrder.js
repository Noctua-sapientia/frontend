import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';

import './HistoryOrders.css';
import { parseDate, getBadgeStatus } from './utils';  

function HistoryOrdersListOrder(props) {
  const navigate = useNavigate();

  function goToOrderDetails(orderId) {
    navigate(`/historyOrders/${orderId}`);
  }

  return (
    <tr>
      <th>{props.order.orderId}</th>
      <td>{parseDate(props.order.creationDatetime)}</td>
      <td>{parseDate(props.order.maxDeliveryDate)}</td>
      <td>{props.order.payment}€</td>
      <td>{getBadgeStatus(props.order.status)}</td>
      <td>
        <Button variant="info" onClick={() => goToOrderDetails(props.order.orderId)}>Ver detalles</Button>
      </td>
    </tr>
  );
}

export default HistoryOrdersListOrder;
