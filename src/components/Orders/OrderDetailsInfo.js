import React from 'react';
import { useState, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import './OrderDetails.css';

import { getBadgeStatus, parseDate } from './utils'; 
import UserApi from '../User/UserApi';
import { useAuth } from '../AuthContext';


function OrderDetailsInfo(props){

  // -------------------  Order info loading (other services info) ---------------------

  const { accessToken } = useAuth();

  const [seller, setSeller] = useState({});

  useEffect(() => {
    async function fetchSeller() {
      try {
        const s = await UserApi.getSeller(accessToken, props.order.sellerId);
        setSeller(s);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSeller();
  }, [props.order.sellerId]);

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

    return(

    <Container className="orderDetails-info">
        <h3>Información del pedido</h3>
        <Row className="mt-3">

          <Col>
            <Row> <div> <strong>Identificador: </strong> {props.order.orderId} </div> </Row>
            {/* <Row> <div> <strong>Vendedor: </strong> Nombre del vendedor ID={props.order.sellerId} </div> </Row>
            <Row> <div> <strong>Comprador: </strong> Nombre del usuario ID={props.order.userId} </div> </Row> */}
            <Row> <div> <strong>Vendedor: </strong> {seller.name} </div> </Row>
            <Row> <div> <strong>Comprador: </strong> {customer.name} </div> </Row>
            <Row> <div> <strong>Fecha de realizacion: </strong> {parseDate(props.order.creationDatetime)} </div> </Row>
            <Row> <div> <strong>Dirección de entrega: </strong> {props.order.deliveryAddress} </div> </Row>
          </Col>

          <Col>
            <Row> <div> <strong>Estado: </strong> {getBadgeStatus(props.order.status)} </div> </Row>
            <Row> <div> <strong>Fecha prevista de entrega: </strong> {parseDate(props.order.maxDeliveryDate)} </div> </Row>           
          </Col>

        </Row>
      </Container>

    );

}

export default OrderDetailsInfo;