import React, { useState, useEffect } from 'react';
import { Container, Col, Card, ListGroup, Button, Row } from 'react-bootstrap';


import BascketOrder from './BascketOrder';
import OrdersApi from '../../api/OrdersApi';
import UserApi from '../User/UserApi';

import './BascketOrders.css';

import { useAuth } from '../AuthContext';

function BascketOrders() {

  // ----------------------- Detecting user logged ------------------------------


  const {userType, userId, accessToken } = useAuth();

  console.log('userType: ', userType);
  console.log('userId: ', userId);
  
  const [deliveryAddress, setDeliveryAddress] = useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        const u = await UserApi.getCustomer(accessToken, userId);
        setDeliveryAddress(u.address);
      } catch (error) {
        console.log(error);
      //   setMessage('Could not contact with the server');
      }
    }  
    fetchUser();
  }, [userType, userId]); 

  // ---------------------- Initial data setup ----------------------------------
  
  const initialData = [
    {
      vendorName: "ElRinconDelLibro",
      items: [
        {
          title: "Harry Potter y la Piedra Filosofal",
          price: 5,
          quantity: 2,
          sellerId: 1,
          bookId: 12345678,
        },
        {
          title: "La Sombra del Viento",
          price: 7.5,
          quantity: 4,
          sellerId: 2,
          bookId: 1
        },
        // Otros artículos...
      ]
    },
    {
      vendorName: "LaCasaDelLibro",
      items: [
        {
          title: "Harry Potter y la Piedra Filosofal",
          price: 5,
          quantity: 2,
          sellerId: 1,
          bookId: 12345678,
        },
        {
          title: "La Sombra del Viento",
          price: 7.5,
          quantity: 4,
          sellerId: 2,
          bookId: 1
        },
        // Otros artículos...
      ]
    }

    
    // Otros vendedores...
  ];

  // ---------------------- Utility functions ----------------------------------

  const formatOrderData = (vendor, vendorIndex) => {

    // Aquí deberías determinar los valores correctos para estos campos

    // userId ya lo tenemos del login y el deliveryAddress igual   

    // Esto hay que cambiarlo para que sea el id del vendedor según la decision que se tome al añadir al carrito
    const sellerId = 2; 
    
    // Esto hay que determinarlo en funcion del pricing al que esta suscrito el usuario
    const maxDeliveryDateAux = new Date();
    maxDeliveryDateAux.setDate(maxDeliveryDateAux.getDate() + 7);
    const maxDeliveryDate =  maxDeliveryDateAux.toISOString().split('T')[0];
    const shippingCost = 5;



    const creationDatetime = new Date().toISOString(); // Fecha de creación del pedido
    const updateDatetime = new Date().toISOString(); // Fecha de actualización del pedido

  
    const books = vendor.items.map(item => ({
      bookId: item.bookId, /* determinar el valor de bookId */
      units: item.quantity,
      price: item.price,
    }));
  
    return {
      userId,
      sellerId,
      books,
      deliveryAddress,
      maxDeliveryDate,
      creationDatetime,
      updateDatetime,
      shippingCost
    };
  };

  const calculateTotalItems = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // ---------------------- State setup ----------------------------------

  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const loadedVendors = localStorage.getItem('vendorsCart');
    // if (loadedVendors) {
    //   setVendors(JSON.parse(loadedVendors));
    // } else {
      setVendors(initialData);
      localStorage.setItem('vendorsCart', JSON.stringify(initialData));
    // }
  }, []);

  // ---------------------- Event handlers ----------------------------------

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

  const handleDeleteOrder = (vendorIndex) => {
    const updatedVendors = vendors.filter((_, index) => index !== vendorIndex);
    setVendors(updatedVendors);
    localStorage.setItem('vendorsCart', JSON.stringify(updatedVendors));
  };

  const handleCreateOrder = (accessToken, vendorIndex) => {
    const orderData = formatOrderData(vendors[vendorIndex], vendorIndex);
    OrdersApi.createOrder(accessToken, orderData)
      .then(response => {
        const updatedVendors = vendors.filter((_, index) => index !== vendorIndex);
        setVendors(updatedVendors);
        localStorage.setItem('vendorsCart', JSON.stringify(updatedVendors));

      })
      .catch(error => {
        // Maneja los errores aquí, como mostrar un mensaje de error
      });
  };

  const onDeleteBook = (vendorIndex, itemIndex) => {
    let updatedVendors = vendors.map((vendor, vIndex) => {
      if (vIndex === vendorIndex) {
        // Filtrar el libro específico
        const updatedItems = vendor.items.filter((_, iIndex) => iIndex !== itemIndex);
        
        // Si después de eliminar el libro, no quedan más libros, no devolver el vendedor
        if (updatedItems.length === 0) {
          return null;
        }
  
        return {
          ...vendor,
          items: updatedItems
        };
      }
      return vendor;
    });
  
    // Filtrar los vendedores que no tienen libros
    updatedVendors = updatedVendors.filter(vendor => vendor !== null);
  
    setVendors(updatedVendors);
    localStorage.setItem('vendorsCart', JSON.stringify(updatedVendors));
  };

  // ---------------------- Basket orders page ----------------------------------
  

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
                      onDeleteBook={onDeleteBook}
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
                    <Button 
                      type="button" 
                      variant="info" 
                      className="mt-3"
                      onClick={() => handleCreateOrder(accessToken, vendorIndex)}>
                      <i className="fas fa-truck"></i> Realizar Pedido
                    </Button>
                    <Button 
                      type="button" 
                      variant="secondary" 
                      className="mt-3"
                      onClick={() => handleDeleteOrder(vendorIndex)}>
                      <i className="fas fa-trash"></i> Borrar Pedido
                    </Button>
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