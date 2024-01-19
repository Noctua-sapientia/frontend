import React, { Fragment, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import './OrderDetails.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


import OrderDetailsBooks from './OrderDetailsBooks';
import OrderDetailsInfoEditable from './OrderDetailsInfoEditable';
import OrderDetailsInfo from './OrderDetailsInfo';
import OrdersApi from '../../api/OrdersApi';


function OrderDetails(props) {

  const navigate = useNavigate();


  // -------------------------- Errors alert ---------------------------------------

  // const [alertMessage, setAlertMessage] = useState(null);

  // function onCloseAlert() {
  //   setAlertMessage(null);
  // }


  // --------------------------  Order loading --------------------------------------

  const emptyOrder = {
    orderId: 0,
    userId: 0,
    sellerId: 0,
    books: [],
    status: "",
    maxDeliveryDate: "",
    creationDatetime: "",
    updateDatetime: "",
    shippingCost: 0
  };
  const orderId = useParams().orderId;
  const [order, setOrder] = useState(emptyOrder);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const o = await OrdersApi.getOrder(orderId);
        setOrder(o);
      } catch (error) {
        console.log(error);
        //   setMessage('Could not contact with the server');
      }
    }
    fetchOrder();
  }, []);

  console.log("Order in OrderDetails:", order);


  // const [isEditing, setIsEditing] = useState(false);

  // function onDeleteOrder(order){
  //   props.setOrders(prevOrders => {return prevOrders.filter(o => o.orderId !== order.orderId)});
  //   navigate('/historyOrders');
  // }

  // function onEditOrder(newDataOrder, oldOrder) {
  //   setAlertMessage(`Editando pedido ID=${oldOrder.orderId}`); 

  //   console.log(newDataOrder);

  //   // Logica de comprobaciones

  //   const newOrder = { ...oldOrder, ...newDataOrder };

  //   props.setOrders((prevOrders) => {
  //     const newOrders = prevOrders.map((o) => o.orderId === oldOrder.orderId ? newOrder : o);
  //     return newOrders;
  //   });

  //   navigate('/historyOrders');
  // }

  // --------------------------  Order deleting --------------------------------------

  async function onDeleteOrder(orderId) {
    try {
        await OrdersApi.deleteOrder(orderId);
        navigate('/historyOrders');
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <Container className="mt-3 d-flex justify-content-center align-items-center orderDetails">

      {/* <Row>
        <Col className="d-flex justify-content-center">
          <OrderAlert message={alertMessage} onClick={onCloseAlert} />
        </Col>
      </Row> */}

      {order.orderId !== 0 && 

        <Row>
          <Col className="d-flex justify-content-center">
            <Card className="col-12">

              <Card.Header className="text-center bg-primary text-white">
                Pedido ID={order.orderId}
              </Card.Header>

              <Card.Body className="d-grid gap-4">

              {/* <OrderDetailsInfoEditable key={orderId} order={order} onEdit={(newOrderData) => onEditOrder(newOrderData, order)} isEditing={isEditing} setIsEditing={setIsEditing}/> */}

                <hr></hr>

                <OrderDetailsBooks key={orderId} order={order}/>

                <Container className="orderDetails-buttons d-flex justify-content-center gap-3">

                {/* {!isEditing && (
                <Button variant="primary" onClick={() => setIsEditing(true)}>
                  <HiPencilSquare /> Editar
                </Button>
                
                )} */}
                  {/* <Button variant="primary" onClick={() => setIsEditing(true)} > <HiPencilSquare /> {isEditing ? '' : 'Editar'}</Button> */}
                  <Button variant="danger" onClick={() => onDeleteOrder(order.orderId)}> <i className="bi bi-trash"></i> Delete </Button>
                
                </Container>
                
                </Card.Body>

            </Card>
          </Col>
        </Row>
      }
    </Container>
  );
}

export default OrderDetails;