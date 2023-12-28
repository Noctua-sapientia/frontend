import React from 'react';
import { Container, Card, InputGroup, FormControl, Button, Row, Col } from 'react-bootstrap';

import './OrderDetails.css';

function OrderDetails() {


  return (
    <Container className="mt-5">
      <Card className="mb-3">
        <Card.Header className="text-center bg-primary text-white">
          Detalles del Pedido a vendedor SELLER
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <InputGroup className="mb-3">
                  <InputGroup.Text>Identificador</InputGroup.Text>
                <FormControl type="text" placeholder="123456789" disabled />
              </InputGroup>
              <InputGroup className="mb-3">
                  <InputGroup.Text>Dirección</InputGroup.Text>
                <FormControl type="text" placeholder="20-2 Yoga, Setagaya-Ku, Tokio, Japón" disabled />
              </InputGroup>
              <InputGroup className="mb-3">
                  <InputGroup.Text>Fecha de realización</InputGroup.Text>
                <FormControl type="date" placeholder="02/02/2000" disabled />
              </InputGroup>
              <InputGroup className="mb-3">
                  <InputGroup.Text>Vendedor</InputGroup.Text>
                <FormControl type="text" placeholder="Pablo's store" disabled />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className="mb-3">
                  <InputGroup.Text>Estado</InputGroup.Text>
                <FormControl as="select">
                  <option value="4">En Preparación</option>
                  <option value="1">En Reparto</option>
                  <option value="2">Entregado</option>
                  <option value="3">Cancelado</option>
                </FormControl>
              </InputGroup>
              <InputGroup className="mb-3">
                  <InputGroup.Text>Entrega antes de</InputGroup.Text>
                <FormControl type="date" />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card.Text>
                <h5>Harry Potter y piedra filosofal</h5>
                Precio: 9.9€/ud<br />
                Unidades: 1
              </Card.Text>
              <Card.Text>
                <h5>Otro libro de ejemplo</h5>
                Precio: 9.9€/ud<br />
                Unidades: 1
              </Card.Text>
            </Col>
            <Col md={6}>
              <Card.Text>
                <h5>Tercer libro de ejemplo</h5>
                Precio: 9.9€/ud<br />
                Unidades: 1
              </Card.Text>
              <Card.Text>
                <h5>Cuarto libro de ejemplo</h5>
                Precio: 9.9€/ud<br />
                Unidades: 1
              </Card.Text>
            </Col>
          </Row>

          <Row className="d-flex justify-content-between align-items-center">
            <Col xs={6}>
                <p className="mb-0"><strong>Envío:</strong> 3.5€</p>
                <p><strong>Pago total:</strong> 19.98€</p>
            </Col>
            <Col xs={6} className="d-flex justify-content-end">
                <Button variant="primary" className="me-2">Actualizar</Button>
                <Button variant="info">Factura</Button>
            </Col>
        </Row>

        </Card.Body>
      </Card>
    </Container>
  );
}

export default OrderDetails;