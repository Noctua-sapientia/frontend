import React, { useState, useMemo, useEffect } from 'react';

import { Container } from 'react-bootstrap';
import './HistoryOrders.css';

import HistoryOrdersFilter from './HistoryOrdersFilter';
import HistoryOrdersList from './HistoryOrdersList';
import OrdersApi from '../../api/OrdersApi';

import { calculateOrderPayment } from './utils'; 
import { useAuth } from '../AuthContext';


function HistoryOrders(props) {

  // -------------------------- Errors alert ---------------------------------------


  // -------------------------- Detecting user logged --------------------------------

  const {userType, userId, accessToken } = useAuth();

  console.log('userType: ', userType);
  console.log('userId: ', userId);

  // --------------------------  Orders loading --------------------------------------

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const o = await OrdersApi.getAllOrders(accessToken, userType, userId);
        setOrders(o);
      } catch (error) {
        console.log(error);
      //   setMessage('Could not contact with the server');
      }
    }  
    fetchOrders();
  }, [userType, userId]); 

  // --------------------------  Orders filtering --------------------------------------

  const [filters, setFilters] = useState({
    orderStatus: '',
    minPrice: '',
    maxPrice: '',
    sortOrder: ''
  });

  const applyFilters = (orders, filters) => {
    const { orderStatus, minPrice, maxPrice, sortOrder } = filters;

    let filteredOrders = orders;

    if (orderStatus) {
      filteredOrders = filteredOrders.filter(order => order.status === orderStatus);
    }

    if (minPrice) {
      filteredOrders = filteredOrders.filter(order => calculateOrderPayment(order).payment >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filteredOrders = filteredOrders.filter(order => calculateOrderPayment(order).payment <= parseFloat(maxPrice));
    }

    if (sortOrder === 'totalPayment') {
      filteredOrders.sort((a, b) => calculateOrderPayment(a).payment - calculateOrderPayment(b).payment);
    } else if (sortOrder === 'deliveryDate') {
      filteredOrders.sort((a, b) => new Date(a.maxDeliveryDate) - new Date(b.maxDeliveryDate));
    } else if (sortOrder === 'orderDate') {
      filteredOrders.sort((a, b) => new Date(a.creationDatetime) - new Date(b.creationDatetime));
    }
    return filteredOrders;
  };

  const filteredOrders = useMemo(() => applyFilters(orders, filters), [orders, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // --------------------------  History orders page --------------------------------------

  return (
    <Container>
      <h2 className="section-title">Mi historial de pedidos</h2>
      <div className="section-content">
        <HistoryOrdersFilter onFilterChange={handleFilterChange} />
        <HistoryOrdersList orders={filteredOrders} />
      </div>
    </Container>
  );
}

export default HistoryOrders;