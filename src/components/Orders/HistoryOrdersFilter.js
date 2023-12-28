import React, { Fragment, useState } from 'react';
import { Card, Button, Form, Collapse } from 'react-bootstrap';

import './HistoryOrders.css';


function HistoryOrdersFilter() {

  const [open, setOpen] = useState(false);

  const inputStyle = { maxWidth: '200px' };

  return (
    <div>
      <div className="d-flex justify-content-end align-items-end">
      <Button 
          variant="outline-info" 
          onClick={() => setOpen(!open)} 
          aria-controls="history-orders-filter"
          aria-expanded={open}
        >
          Filtrar y ordenar
        </Button>
      </div>

      <Collapse in={open}>
      <div id="history-orders-filter">
        <Card>
          <Card.Body>
            <Form>
              <Form.Group className="row mb-3 d-flex align-items-center">
                <Form.Label className="col-sm-2">Estado del pedido:</Form.Label>
                <Form.Select className="col" style={inputStyle} id="orderStatus">
                  <option value="">Elija una opción</option>
                  <option value="In preparation">In preparation</option>
                  <option value="Sent">Sent</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select> 

              </Form.Group>

              <Form.Group className="row mb-3 d-flex align-items-center">
                <Form.Label className="col-sm-2">Rango de precio (€): </Form.Label>
                <div className='col'>
                  <div className='row flex-row gap-3'>

                    <Form.Control type="number" style={inputStyle} id="minPrice" placeholder="Mínimo" />
                    <Form.Control type="number" style={inputStyle} id="maxPrice" placeholder="Máximo" />
                    
                  </div>
                </div>
                
              </Form.Group>

              <Form.Group className="row mb-3 d-flex align-items-center">
                <Form.Label className="col-sm-2">Ordenar por:</Form.Label>
                <Form.Select className="col" style={inputStyle} id="sortOrder">
                  <option value="">Elija una opción</option>
                  <option value="totalPayment">Pago total</option>
                  <option value="deliveryDate">Fecha prevista de entrega</option>
                  <option value="orderDate">Fecha de realización</option>
                </Form.Select> 
              </Form.Group>

              <div className="d-flex justify-content-center gap-2">
                <Button variant="info" type="submit">Aplicar filtros</Button>
                <Button variant="secondary" type="button">Borrar filtros</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
      </Collapse>
    </div>
  );
}

export default HistoryOrdersFilter;