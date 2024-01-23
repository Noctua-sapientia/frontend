import React from 'react';
import { ListGroup, InputGroup, Form, Button } from 'react-bootstrap';

function BasketOrder({ item, onUpdateQuantity, onDeleteBook, itemIndex, vendorIndex }) {
  
  const handleQuantityChange = (e) => {
    onUpdateQuantity(vendorIndex, itemIndex, parseInt(e.target.value));
  };

  const handleDeleteBook = () => {
    onDeleteBook(vendorIndex, itemIndex);
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

          <Button variant="secondary" size="sm" className="ml-2" onClick={handleDeleteBook}>
          <i className="bi bi-trash"></i>
          </Button>
        </InputGroup>
      </div>
    </ListGroup.Item>
  );
}

export default BasketOrder;