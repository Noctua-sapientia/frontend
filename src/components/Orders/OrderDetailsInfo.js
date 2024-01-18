import React from 'react';
import { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import './OrderDetails.css';

import { getBadgeStatus, parseDate } from './utils'; 



function OrderDetailsInfo(props){

    return(

    <Container className="orderDetails-info">
        <h3>Información del pedido</h3>
        <Row className="mt-3">

          <Col>
            <Row> <div> <strong>Identificador: </strong> {props.order.orderId} </div> </Row>
            <Row> <div> <strong>Vendedor: </strong> Nombre del vendedor ID={props.order.sellerId} </div> </Row>
            <Row> <div> <strong>Comprador: </strong> Nombre del usuario ID={props.order.userId} </div> </Row>
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