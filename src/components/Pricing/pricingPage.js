// LoginPage.js
import React from 'react';
import {Container, CardBody, CardHeader, Card, Row,Col} from 'react-bootstrap';

function PricingPage() {

  return (
    <Container>
        <Row>
            <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h1 class="display-4">Pricing</h1>
            </div>
        </Row>
      <Row>
        <Col md={4}>
          <Card className="text-center box-shadow" bg='primary'>
            <CardHeader>
              <h4 className="my-0 font-weight-normal">Standard</h4>
            </CardHeader>
            <CardBody>
              <h1 className="card-title pricing-card-title">3.99€ <small className="text-muted">/ mes</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>10 libros</li>
                <li>20 pedidos/mes</li>
                <li>30 días</li>
                <li>Península</li>
                <li>E-mail hasta 14 días</li>
                <li>True</li>
              </ul>
              <button type="button" className="btn btn-lg btn-block btn-outline-primary">Sign up for free</button>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center box-shadow">
            <CardHeader>
              <h4 className="my-0 font-weight-normal">Pro</h4>
            </CardHeader>
            <CardBody>
              <h1 className="card-title pricing-card-title">15.99€ <small className="text-muted">/ mes</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>50 libros</li>
                <li>100 pedidos/mes</li>
                <li>14 días</li>
                <li>Península, Canarias y Baleares</li>
                <li>E-mail hasta 7 días</li>
                <li>False</li>
              </ul>
              <button type="button" className="btn btn-lg btn-block btn-primary">Get started</button>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center box-shadow">
            <CardHeader>
              <h4 className="my-0 font-weight-normal">Premium</h4>
            </CardHeader>
            <CardBody>
              <h1 className="card-title pricing-card-title">49.79€ <small className="text-muted">/ mes</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Ilimitado</li>
                <li>Ilimitado</li>
                <li>5 días</li>
                <li>Internacional</li>
                <li>Telefónica 24h</li>
                <li>True</li>
              </ul>
              <button type="button" className="btn btn-lg btn-block btn-primary">Contact us</button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PricingPage; 