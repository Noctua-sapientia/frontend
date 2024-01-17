import React from 'react';

import { Container, Row, Table} from 'react-bootstrap';
import './OrderDetails.css';

import { calculateOrderPayment } from './utils'; 
import OrderDetailsBook from './OrderDetailsBook'; 


function OrderDetailsBooks(props) {

    const orderPayment = calculateOrderPayment(props.order);

    return (       
        <Container className="orderDetails-books">
            <h3>Productos adquiridos</h3>

            <Row className="d-flex justify-content-center">
            <Table className="mt-3 table-borderless">
            <thead className="orderDetails-products-header">
                <tr className="tr-bottomBorder">
                <td>PRODUCTOS</td>
                <td>PRECIO</td>
                <td>UNIDADES</td>
                <td>TOTAL</td>
                </tr>
            </thead>
            <tbody className="orderDetails-products-books">
                {props.order.books.map((book) => 
                <OrderDetailsBook key={book.bookId} book={book} />
                )}
            </tbody>
            <tbody className="orderDetails-products-payment">
                <tr className="tr-topBorder">
                <td colSpan="3" className="text-end">Subtotal:</td>
                <td>{orderPayment.subtotal}€</td>
                </tr>
                <tr>
                <td colSpan="3" className="text-end">Coste de envío:</td>
                <td>{props.order.shippingCost}€</td>
                </tr>
                <tr>
                <td colSpan="3" className="text-end">Total:</td>
                <td>{orderPayment.payment}€</td>
                </tr>
            </tbody>
            </Table>
            </Row>
        </Container>
    );

}

export default OrderDetailsBooks;

