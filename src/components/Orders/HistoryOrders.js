import React, { useState, useMemo, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Row } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './HistoryOrders.css';

import HistoryOrdersFilter from './HistoryOrdersFilter';
import HistoryOrdersList from './HistoryOrdersList';
import OrdersApi from '../../api/OrdersApi';
import OrderAlert from './OrderAlert';

import { calculateOrderPayment } from './utils'; 
import { useAuth } from '../AuthContext';


function HistoryOrders(props) {

  // -------------------------- Alert ---------------------------------------
  const [alertMessage, setAlertMessage] = useState(null);

  function onAlertClose() {
    setAlertMessage(null);
  }


  // -------------------------- Detecting user logged --------------------------------

  const navigate = useNavigate();

  const {userType, userId, accessToken} = useAuth();

  console.log('userType: ', userType);
  console.log('userId: ', userId);
  

  // --------------------------  Orders loading --------------------------------------

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!userId) {
      setAlertMessage('Debe iniciar sesión para ver su historial de pedidos');
      return;
    }

    async function fetchOrders() {
      try {
        const o = await OrdersApi.getAllOrders(accessToken, userType, userId);
        setOrders(o);
      } catch (error) {
        console.log(error);
        setAlertMessage('No hay pedidos disponibles');
      }
    }  
    fetchOrders();

  },  [userType, userId]);

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
      <Row>      
        <h2 className="section-title">Mi historial de pedidos</h2>
      </Row>
      <Row className='d-flex justify-content-center'>
        <OrderAlert message={alertMessage} onClick={onAlertClose} />
      </Row>
      {userId && 
      <Row className="section-content">
        <HistoryOrdersFilter onFilterChange={handleFilterChange} />
        <HistoryOrdersList orders={filteredOrders} />
      </Row>
      }
    </Container>
  );
}

export default HistoryOrders;