import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import './HistoryOrders.css';

import HistoryOrdersListOrder from './HistoryOrdersListOrder';


function HistoryOrdersList(props) {

  return (
    <Table className="mt-4 text-center">
      <thead>
        <tr className="history-orders-tableHeader">
          <th scope="col">Identificador</th>
          <th scope="col">Fecha de realizacion</th>
          <th scope="col">Fecha prevista de entrega</th>
          <th scope="col">Pago</th>
          <th scope="col">Estado</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody className='history-orders-tableBody'>
        {props.orders.map((order) => 
          <HistoryOrdersListOrder key={order.orderId} order={order} />          
        )}
      </tbody>
    </Table>
  );
}

export default HistoryOrdersList;