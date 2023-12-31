import React from 'react';
import { ListGroup, InputGroup, Form, Button } from 'react-bootstrap';

function BasketOrder({ item, onUpdateQuantity, itemIndex, vendorIndex }) {
  const handleQuantityChange = (e) => {
    onUpdateQuantity(vendorIndex, itemIndex, parseInt(e.target.value));
  };

  return (
    <ListGroup.Item>
      <p><b>{item.title}</b></p>
      <p>Precio: {item.price} €/ud</p>
      <div className="d-flex align-items-center">
        <InputGroup className="mb-3">
          <InputGroup.Text>Unidades</InputGroup.Text>
          <Form>
            <Form.Control 
              type="number" 
              name="quantity" 
              defaultValue={item.quantity} 
              min="1" 
              onChange={handleQuantityChange}
            />
          </Form>
          <Button variant="danger" size="sm" className="ml-2"><i className="fas fa-trash"></i></Button>
        </InputGroup>
      </div>
    </ListGroup.Item>
  );
}

export default BasketOrder;