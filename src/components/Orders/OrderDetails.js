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
import BackButton from './BackButton';

import { useAuth } from '../AuthContext';


function OrderDetails(props) {

  const navigate = useNavigate();


  // -------------------------- Errors alert ---------------------------------------

  // const [alertMessage, setAlertMessage] = useState(null);

  // function onCloseAlert() {
  //   setAlertMessage(null);
  // }

  // -------------------------- Detecting user logged --------------------------------

  const {userType, userId, accessToken } = useAuth();

  console.log('userType: ', userType);
  console.log('userId: ', userId);


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
        const o = await OrdersApi.getOrder(accessToken, orderId);
        setOrder(o);
      } catch (error) {
        console.log(error);
        //   setMessage('Could not contact with the server');
      }
    }
    fetchOrder();
  }, []);

  console.log("Order in OrderDetails:", order);

  // --------------------------  Order editing --------------------------------------

  const [isEditing, setIsEditing] = useState(false);
  const [editedOrderData, setEditedOrderData] = useState(null);

  const handleEditChange = (newOrderData) => {
    console.log("Edited order data in handleEditChange:", newOrderData);
    setEditedOrderData(newOrderData);
  };


  async function onEditOrder(accessToken, orderId, newOrderData) {
    console.log("Edited order data in onEditOrder:", newOrderData);    

    if (editedOrderData !== null) {
      try {
        // Meter logica de comprobaciones

        await OrdersApi.updateOrder(accessToken, orderId, newOrderData);
        setOrder(prevOrder => ({
          ...prevOrder,
          ...newOrderData
        }));
        setEditedOrderData(null);
        setIsEditing(false);

      } catch (error) {
        console.log(error);
      }
    }
  }

  // --------------------------  Order deleting --------------------------------------

  async function onDeleteOrder(accessToken, orderId) {
    try {
        await OrdersApi.deleteOrder(accessToken, orderId);
        navigate('/historyOrders');
    } catch (error) {
        console.log(error);
    }
  }


  // --------------------------  Order Details Page --------------------------------------

  return (
    
    <Container className="d-flex flex-direction-column justify-content-center align-items-center orderDetails">

      {/* <Row>
        <Col className="d-flex justify-content-center">
          <OrderAlert message={alertMessage} onClick={onCloseAlert} />
        </Col>
      </Row> */}

      {order.orderId !== 0 &&
        <Row>
          <Col className="d-flex justify-content-center">
            <Card className="">

              <Card.Header className="text-center bg-primary text-white">

                <Row>
                  <Col className="col-2"><BackButton destination="/historyOrders" /></Col>
                  <Col className="col-8 d-flex justify-content-center">
                    <p className="mb-0">Pedido ID={order.orderId}</p>
                  </Col>
                </Row>

                
              </Card.Header>

              <Card.Body className="d-grid gap-4">

                {
                isEditing ? (
                  <OrderDetailsInfoEditable order={order} onChange={handleEditChange} />
                ) : (
                  <OrderDetailsInfo order={order}/>
                )
                }

                <OrderDetailsBooks key={orderId} order={order} />

                <Container className="orderDetails-buttons d-flex justify-content-center gap-3">

                  {userType === 'Seller' && (
                      isEditing ? (
                        <Fragment>
                          <Button variant="success" onClick={() => onEditOrder(accessToken, order.orderId, editedOrderData)}>
                            <i className="bi bi-check"></i> Actualizar
                          </Button>
                          <Button variant="secondary" onClick={() => {setIsEditing(false); setEditedOrderData(null)}}>
                            <i className="bi bi-x"></i> Cancelar
                          </Button>
                        </Fragment>
                        
                      ) : (
                        <Button variant="primary" onClick={() => setIsEditing(true)}>
                          <i className="bi bi-pencil"></i> Editar
                        </Button>
                      )
                    )}
                  

                  {['Delivered', 'Cancelled'].includes(order.status) && (
                    <Button variant="danger" onClick={() => onDeleteOrder(accessToken, order.orderId)}> <i className="bi bi-trash"></i> Borrar </Button>
                  )}


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