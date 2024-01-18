import React, { useState, useEffect } from 'react';
import { Container, Col, Card, ListGroup, Button, Row } from 'react-bootstrap';
import BascketOrder from './BascketOrder';
import './BascketOrders.css';

function BascketOrders() {
  const initialData = [
    {
      vendorName: "ElRinconDelLibro",
      items: [
        {
          title: "Harry Potter y la Piedra Filosofal",
          price: 5,
          quantity: 2,
        //   idSeller: 1,
        //   idBook: 1
        },
        // Otros artículos...
      ]
    },
    // Otros vendedores...
  ];

  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const loadedVendors = localStorage.getItem('vendorsCart');
    if (loadedVendors) {
      setVendors(JSON.parse(loadedVendors));
    } else {
      setVendors(initialData);
      localStorage.setItem('vendorsCart', JSON.stringify(initialData));
    }
  }, []);

  const calculateTotalItems = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const onUpdateQuantity = (vendorIndex, itemIndex, newQuantity) => {
    const updatedVendors = vendors.map((vendor, vIndex) => {
      if (vIndex === vendorIndex) {
        return {
          ...vendor,
          items: vendor.items.map((item, iIndex) => {
            if (iIndex === itemIndex) {
              return { ...item, quantity: newQuantity };
            }
            return item;
          })
        };
      }
      return vendor;
    });

    setVendors(updatedVendors);
    localStorage.setItem('vendorsCart', JSON.stringify(updatedVendors));
  };

  return (
    <Col>
      <h2 className="section-title">Carrito de la compra</h2>
      <Container className="basket-orders">
        {vendors.map((vendor, vendorIndex) => (
          <Card className="basket-order mb-5" key={vendorIndex}>
            <Card.Header className="text-center basket-order-header">
              <h5>Pedido a vendedor @{vendor.vendorName}</h5>
            </Card.Header>
            <Card.Body className="row align-items-center">
              <Col md={7} className="basket-order-products">
                <ListGroup variant="flush">
                  {vendor.items.map((item, itemIndex) => (
                    <BascketOrder 
                      key={itemIndex} 
                      item={item} 
                      onUpdateQuantity={onUpdateQuantity} 
                      itemIndex={itemIndex} 
                      vendorIndex={vendorIndex} 
                    />
                  ))}
                </ListGroup>
              </Col>
              <Col md={5} className="basket-order-data">
                <Row className="justify-content-center">
                  <ListGroup>
                    <ListGroup.Item><b>Número de artículos:</b> {calculateTotalItems(vendor.items)}</ListGroup.Item>
                    <ListGroup.Item><b>Precio total:</b> {calculateTotalPrice(vendor.items)} €</ListGroup.Item>
                  </ListGroup>
                </Row>
                <Row className="justify-content-center">
                  <div className="d-grid gap-3">
                    <Button type="button" variant="info" className="mt-3"><i className="fas fa-truck"></i> Realizar Pedido</Button>
                    <Button type="button" variant="secondary" className="mt-3"><i className="fas fa-trash"></i> Borrar Pedido</Button>
                  </div>
                </Row>
              </Col>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </Col>
  );
}

export default BascketOrders;