import React from 'react';
import { useState, useEffect } from 'react';

import { Container, Row, Col, Form, } from 'react-bootstrap';
import './OrderDetails.css';
import { getBadgeStatus, parseDate } from './utils'; 

import UserApi from '../User/UserApi';
import { useAuth } from '../AuthContext';


function OrderDetailsInfoEditable(props){

    // -------------------  Order info loading (other services info) ---------------------

    const { accessToken } = useAuth();

    // const [seller, setSeller] = useState({});
  
    // useEffect(() => {
    //   async function fetchSeller() {
    //     try {
    //       const s = await UserApi.getSeller(accessToken, props.order.sellerId);
    //       setSeller(s);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   fetchSeller();
    // }, [props.order.sellerId]);
  
    const [customer, setCustomer] = useState({});
  
    useEffect(() => {
      async function fetchCustomer() {
        try {
          const c = await UserApi.getCustomer(accessToken, props.order.userId);
          setCustomer(c);
        } catch (error) {
          console.log(error);
        }
      }
      fetchCustomer();
    }, [props.order.userId]);

  // -------------------------  HTML Order Details Info --------------------------------

  const [orderStatus, setOrderStatus] = useState(props.order.status);
  const [orderMaxDeliveryDate, setOrderMaxDeliveryDate] = useState(parseDate(props.order.maxDeliveryDate));

  useEffect(() => {
    props.onChange({
      status: orderStatus,
      maxDeliveryDate: orderMaxDeliveryDate
    });
  }, [orderStatus, orderMaxDeliveryDate]);

  return(

  <Container className="orderDetails-info">
      <h3>Información del pedido</h3>
      <Row className="mt-3">

        <Col>
          <Row> <div> <strong>Identificador: </strong> {props.order.orderId} </div> </Row>
          {/* <Row> <div> <strong>Vendedor: </strong> Nombre del vendedor ID={props.order.sellerId} </div> </Row>
          <Row> <div> <strong>Comprador: </strong> Nombre del usuario ID={props.order.userId} </div> </Row> */}
          {/* <Row> <div> <strong>Vendedor: </strong> {seller.name} </div> </Row> */}
          <Row> <div> <strong>Comprador: </strong> {customer.name} </div> </Row>
          <Row> <div> <strong>Fecha de realizacion: </strong> {parseDate(props.order.creationDatetime)} </div> </Row>
          <Row> <div> <strong>Dirección de entrega: </strong> {props.order.deliveryAddress} </div> </Row>
        </Col>

        <Col>
        <Form>
          <Form.Group className="row mb-3 d-flex align-items-center">
            <Row>
              <Col> <Form.Label className="col">Estado:</Form.Label> </Col>
              <Col> <Form.Select className="col" value={orderStatus} onChange={(event) => setOrderStatus(event.target.value)}>
                <option value="">Elija una opción</option>
                <option value="In preparation">In preparation</option>
                <option value="Sent">Sent</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Select> </Col>
            </Row>
          </Form.Group>

          <Form.Group className="row mb-3 d-flex align-items-center">

            <Row>
              <Col> <Form.Label className="col">Fecha prevista de entrega:</Form.Label> </Col>
              <Col> <Form.Control type="date" defaultValue={parseDate(orderMaxDeliveryDate)} onChange={(event) => setOrderMaxDeliveryDate(event.target.value)}/> </Col>
            </Row>
            
          </Form.Group>

        </Form>
        </Col> 

      </Row>

    </Container>

  );

}

export default OrderDetailsInfoEditable;