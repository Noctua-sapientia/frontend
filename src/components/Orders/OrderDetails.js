import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import './OrderDetails.css';
//import { HiPencilSquare } from "react-icons/hi2";

import OrderDetailsBooks from './OrderDetailsBooks';
import OrderDetailsInfoEditable from './OrderDetailsInfoEditable';


function OrderDetails(props) {

  const orderId = useParams().orderId;
  const order = props.orders.find(order => order.orderId === Number(orderId));

  const [alertMessage, setAlertMessage]= useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  function onDeleteOrder(order){
    props.setOrders(prevOrders => {return prevOrders.filter(o => o.orderId !== order.orderId)});
    navigate('/historyOrders');
  }

  function onEditOrder(newDataOrder, oldOrder) {
    setAlertMessage(`Editando pedido ID=${oldOrder.orderId}`); 

    console.log(newDataOrder);

    // Logica de comprobaciones

    const newOrder = { ...oldOrder, ...newDataOrder };

    props.setOrders((prevOrders) => {
      const newOrders = prevOrders.map((o) => o.orderId === oldOrder.orderId ? newOrder : o);
      return newOrders;
    });

    navigate('/historyOrders');
  }

  function onCloseAlert() {
    setAlertMessage(null);
  }



  return (
    <Container className="mt-3 d-flex justify-content-center align-items-center orderDetails">

      {/* <Row>
        <Col className="d-flex justify-content-center">
          <OrderAlert message={alertMessage} onClick={onCloseAlert} />
        </Col>
      </Row> */}

      <Row>
        <Col className="d-flex justify-content-center">
          <Card className="col-12">

            <Card.Header className="text-center bg-primary text-white">
              Pedido ID={order.orderId}
            </Card.Header>

            <Card.Body className="d-grid gap-4">

            <OrderDetailsInfoEditable key={orderId} order={order} onEdit={(newOrderData) => onEditOrder(newOrderData, order)} isEditing={isEditing} setIsEditing={setIsEditing}/>

              <hr></hr>

              <OrderDetailsBooks key={orderId} order={order}/>

              <Container className="orderDetails-buttons d-flex justify-content-center gap-3">

              
                {/* <Button variant="primary" onClick={() => setIsEditing(true)} > <HiPencilSquare /> {isEditing ? '' : 'Editar'}</Button> */}
                <Button variant="info" onClick={() => onDeleteOrder(order)}>Delete</Button>
              </Container>
              
              </Card.Body>

          </Card>
        </Col>
      </Row>

    </Container>
  );
}

export default OrderDetails;