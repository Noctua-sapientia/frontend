import React from 'react';
import HistoryOrdersFilter from './HistoryOrdersFilter';
import HistoryOrdersList from './HistoryOrdersList';
import { Container } from 'react-bootstrap';

import './HistoryOrders.css';

function HistoryOrders(props) {

  const orders = [
      {
        orderId: 1,
        userId: 1,
        sellerId: 2,
        books: [
          {
            _id: "658d439a209f46b4655e2c6a",
            bookId: 2,
            units: 1
          }
        ],
        status: "In preparation",
        deliveryAddress: "Reina Mercedes",
        maxDeliveryDate: "2023-12-21T00:00:00.000Z",
        creationDatetime: "2023-12-06T11:27:30.647Z",
        updateDatetime: "2023-12-06T11:27:30.647Z",
        payment: 23.99
      },
      {
        orderId: 3,
        userId: 1,
        sellerId: 2,
        books: [
          {
            _id: "658d439a209f46b4655e2c6b",
            bookId: 2,
            units: 1
          }
        ],
        status: "In preparation",
        deliveryAddress: "Reina Mercedes",
        maxDeliveryDate: "2023-12-21T00:00:00.000Z",
        creationDatetime: "2023-12-06T11:35:54.030Z",
        updateDatetime: "2023-12-06T11:35:54.030Z",
        payment: 23.99
      },
      {
        orderId: 4,
        userId: 1,
        sellerId: 2,
        books: [
          {
            bookId: 2,
            units: 1,
            price: 32,
            _id: "657061f8acf83ad6a5c9f260"
          }
        ],
        status: "In preparation",
        deliveryAddress: "Reina Mercedes",
        maxDeliveryDate: "2023-12-21T00:00:00.000Z",
        creationDatetime: "2023-12-06T11:58:48.628Z",
        updateDatetime: "2023-12-06T11:58:48.628Z",
        payment: 23.99
      },
      {
        orderId: 5,
        userId: 3,
        sellerId: 2,
        books: [
          {
            bookId: 2,
            units: 1,
            price: 6,
            _id: "657389772e90cd59f7ba4f5d"
          },
          {
            bookId: 1,
            units: 2,
            price: 5,
            _id: "657389772e90cd59f7ba4f5e"
          }
        ],
        status: "In preparation",
        deliveryAddress: "4 Privet Drive, Little Whinging, Surrey",
        maxDeliveryDate: "2023-12-25T00:00:00.000Z",
        creationDatetime: "2023-12-08T21:19:20.210Z",
        updateDatetime: "2023-12-08T21:24:07.975Z",
        payment: 16
      },
      {
        orderId: 6,
        userId: 2,
        sellerId: 3,
        books: [
          {
            bookId: 5,
            units: 3,
            price: 8,
            _id: "6575bada10f37f5dd014fc80"
          },
          {
            bookId: 6,
            units: 1,
            price: 12,
            _id: "6575bada10f37f5dd014fc81"
          }
        ],
        status: "In preparation",
        deliveryAddress: "742 Evergreen Terrace, Springfield",
        maxDeliveryDate: "2023-12-15T00:00:00.000Z",
        creationDatetime: "2023-12-10T13:19:22.888Z",
        updateDatetime: "2023-12-10T13:19:22.889Z",
        payment: 36
      }
    ];
    


  return (
    <Container>
      <h2 className="section-title">Mi historial de pedidos</h2>
      <div className="section-content">
        <HistoryOrdersFilter orders={orders}/>
        <HistoryOrdersList orders={orders}/>
      </div>
    </Container>
  );
}

export default HistoryOrders;