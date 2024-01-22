import React, { useState, useEffect } from 'react';
import { Container, Col, Card, ListGroup, Button, Row } from 'react-bootstrap';


import BasketOrder from './BasketOrder';
import OrdersApi from '../../api/OrdersApi';
import UserApi from '../User/UserApi';

import './BasketOrders.css';

import { useAuth } from '../AuthContext';

function BasketOrders() {

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
        console.log('u.address: ', u.address);
      } catch (error) {
        console.log(error);
      //   setMessage('Could not contact with the server');
      }
    }  
    fetchUser();
  }, [userType, userId]); 


    // -------------------  Order info loading (other services info) ---------------------




  // ---------------------- Utility functions ----------------------------------

  const formatOrderData = (vendor, vendorIndex) => {

    // Aquí deberías determinar los valores correctos para estos campos

    // userId ya lo tenemos del login y el deliveryAddress igual   

    // Esto hay que cambiarlo para que sea el id del vendedor según la decision que se tome al añadir al carrito
    const sellerId = vendor.vendorName; 
    
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
    console.log('items: ', items);
    const total_price = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    return Math.round(total_price * 100) / 100;
  };

  // ---------------------- State setup ----------------------------------

  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const loadedVendors = sessionStorage.getItem('vendorsCart');
    if (loadedVendors) {
      setVendors(JSON.parse(loadedVendors));
    } else {
      setVendors([]); 
    }
  }, []);

  const [vendorNames, setVendorNames] = useState({});


  useEffect(() => {
    vendors.forEach(vendor => {
      if (!vendorNames[vendor.vendorName]) {
        UserApi.getSeller(accessToken, vendor.vendorName)
          .then(sellerInfo => {
            setVendorNames(prevVendorNames => ({
              ...prevVendorNames,
              [vendor.vendorName]: sellerInfo.name
            }));
          })
          .catch(error => {
            console.log(`Error al obtener la información del vendedor ${vendor.vendorName}:`, error);
          });
      }
    });
  }, [vendors, accessToken, vendorNames]);

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
    sessionStorage.setItem('vendorsCart', JSON.stringify(updatedVendors));
  };

  const handleDeleteOrder = (vendorIndex) => {
    const updatedVendors = vendors.filter((_, index) => index !== vendorIndex);
    setVendors(updatedVendors);
    sessionStorage.setItem('vendorsCart', JSON.stringify(updatedVendors));
  };

  const handleCreateOrder = (accessToken, vendorIndex) => {
    const orderData = formatOrderData(vendors[vendorIndex], vendorIndex);
    console.log(orderData);
    OrdersApi.createOrder(accessToken, orderData)
      .then(response => {
        const updatedVendors = vendors.filter((_, index) => index !== vendorIndex);
        setVendors(updatedVendors);
        sessionStorage.setItem('vendorsCart', JSON.stringify(updatedVendors));

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
    sessionStorage.setItem('vendorsCart', JSON.stringify(updatedVendors));
  };

  // ---------------------- Basket orders page ----------------------------------
  

  return (
    <Col>
      <h2 className="section-title">Carrito de la compra</h2>
      <Container>
        {vendors.map((vendor, vendorIndex) => (
          <Card key={vendorIndex}>
            <Card.Header className="text-center bg-primary text-white">
              <h5>Pedido a vendedor @{vendorNames[vendor.vendorName]}</h5>
            </Card.Header>
            <Card.Body className="align-items-center">
            <Container>
            <Row>
              <Col className="col-7">
                <ListGroup variant="flush" className="basket-order">
                  {vendor.items.map((item, itemIndex) => (
                    <BasketOrder
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
              <Col className="col-5 align-self-center">
                <Row className="justify-content-center">
                  <ListGroup>
                    <ListGroup.Item><b>Número de artículos:</b> {calculateTotalItems(vendor.items)}</ListGroup.Item>
                    <ListGroup.Item><b>Precio total:</b> {calculateTotalPrice(vendor.items)} €</ListGroup.Item>
                  </ListGroup>
                </Row>
                <Row className="justify-content-center">
                  <Container className="d-flex justify-content-center gap-3">
                      <Button 
                        type="button" 
                        variant="primary" 
                        className="mt-3"
                        onClick={() => handleCreateOrder(accessToken, vendorIndex)}>
                        <i class="bi bi-bag-fill"></i> Comprar
                      </Button>
                      <Button 
                        type="button" 
                        variant="secondary" 
                        className="mt-3"
                        onClick={() => handleDeleteOrder(vendorIndex)}>
                        <i className="bi bi-trash"></i> Borrar cesta
                      </Button>
                  </Container>
                </Row>
              </Col>
            </Row>
            </Container>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </Col>
  );
}

export default BasketOrders;