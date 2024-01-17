import React from 'react';
import { useState } from 'react';

import { Container, Row, Col, Form, } from 'react-bootstrap';
import './OrderDetails.css';

import { getBadgeStatus, parseDate } from './utils'; 

function OrderDetailsInfoEdit(props){

  const [orderStatus, setOrderStatus] = useState(props.order.status);
  const [orderMaxDeliveryDate, setOrderMaxDeliveryDate] = useState(props.order.maxDeliveryDate);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log("submit");
    // Previene el comportamiento por defecto del envío del formulario
    // Aquí puedes agregar la lógica para manejar el envío del formulario
    // Por ejemplo, actualizar el estado del pedido en la base de datos

        // Objeto con todos los campos del pedido, incluyendo los modificados y los no modificados
    const updatedOrder = {
      ...props.order, // Toma todos los campos existentes de props.order
      status: orderStatus, // Actualiza con el nuevo estado
      maxDeliveryDate: orderMaxDeliveryDate, // Actualiza con la nueva fecha máxima de entrega
    };

    // Llama a la función onSave con el pedido actualizado
    props.onSave(updatedOrder);
  };

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
          <Form onSubmit={handleSubmit}>
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
              

              <button className="btn btn-primary" type="submit">Save</button>

            </Form.Group>

            {/* <button className="btn btn-primary" type="submit" onClick={() => props.onSave({orderMaxDeliveryDate: orderMaxDeliveryDate, orderStatus:orderStatus})}>Save</button> */}



          </Form>
          </Col> 

        </Row>
      </Container>

    );

}

export default OrderDetailsInfoEdit;