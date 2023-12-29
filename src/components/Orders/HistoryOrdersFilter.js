import React, { useState } from 'react';
import { Card, Button, Form, Collapse } from 'react-bootstrap';

function HistoryOrdersFilter({ onFilterChange }) {
  const [open, setOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const inputStyle = { maxWidth: '200px' };

  const handleApplyFilters = () => {
    onFilterChange({ orderStatus, minPrice, maxPrice, sortOrder });
  };

  const handleClearFilters = () => {
    setOrderStatus('');
    setMinPrice('');
    setMaxPrice('');
    setSortOrder('');
    onFilterChange({ orderStatus: '', minPrice: '', maxPrice: '', sortOrder: '' });
  };

  return (
    <div>
      <Button variant="outline-info" onClick={() => setOpen(!open)} aria-controls="history-orders-filter" aria-expanded={open}>
        Filtrar y ordenar
      </Button>
      <Collapse in={open}>
        <div id="history-orders-filter">
          <Card>
            <Card.Body>
              <Form>

                <Form.Group className="row mb-3 d-flex align-items-center">
                  <Form.Label className="col-sm-2">Estado del pedido:</Form.Label>
                  <Form.Select className="col" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} style={inputStyle}>
                    <option value="">Elija una opción</option>
                    <option value="In preparation">In preparation</option>
                    <option value="Sent">Sent</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="row mb-3 d-flex align-items-center">
                  <Form.Label className="col-sm-2">Rango de precio (€):</Form.Label>
                  <div className='col'>
                    <div className='row flex-row gap-3'>
                      <Form.Control type="number" min="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} style={inputStyle} placeholder="Mínimo" />
                      <Form.Control type="number" min="0" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={inputStyle} placeholder="Máximo" />
                    </div>
                  </div>
                </Form.Group>

               
                <Form.Group className="row mb-3 d-flex align-items-center">
                  <Form.Label className="col-sm-2">Ordenar por:</Form.Label>
                  <Form.Select className="col" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={inputStyle}>
                    <option value="">Elija una opción</option>
                    <option value="totalPayment">Pago total</option>
                    <option value="deliveryDate">Fecha prevista de entrega</option>
                    <option value="orderDate">Fecha de realización</option>
                  </Form.Select>
                </Form.Group>
                
                <div className="d-flex justify-content-center gap-2">
                  <Button variant="info" onClick={handleApplyFilters}>Aplicar filtros</Button>
                  <Button variant="secondary" onClick={handleClearFilters}>Borrar filtros</Button>
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