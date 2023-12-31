import React from 'react';
import { useParams } from 'react-router-dom';

import { Container, Card, Button } from 'react-bootstrap';
import './OrderDetails.css';

import { parseDate } from './utils'; 
import OrderDetailsInfo from './OrderDetailsInfo';
import OrderDetailsBooks from './OrderDetailsBooks';


function OrderDetails(props) {

  const orderId = useParams().orderId;
  const order = props.orders.find(order => order.orderId === Number(orderId));

  console.log(parseDate(order.maxDeliveryDate));


  return (
    <Container className="mt-5 d-flex justify-content-center orderDetails">

      <Card className="mb-3 col-9">

        <Card.Header className="text-center bg-primary text-white">
          Pedido ID={order.orderId}
        </Card.Header>

        <Card.Body className="d-grid gap-4">

          <OrderDetailsInfo key={orderId} order={order}/>

          <hr></hr>

          <OrderDetailsBooks key={orderId} order={order}/>

          <Container className="orderDetails-buttons d-flex justify-content-center gap-3">
            <Button variant="primary">Editar</Button>
            <Button variant="info">Ver factura</Button>
          </Container>
          
          </Card.Body>

      </Card>

    </Container>
  );
}

export default OrderDetails;