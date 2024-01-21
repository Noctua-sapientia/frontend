import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, CardHeader, CardBody } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import imageMicrosoft from '../../img/microsoft.png';
import imageMeta from '../../img/meta.png';
import imageGoogle from '../../img/google.png';

function RegisterPage() {
  const [selectedType, setSelectedType] = useState('customer');
  const [formData, setFormData] = useState({
    email: '',
    customerField1: '',
    customerField2: '',
    sellerField1: '',
    sellerField2: '',
  });

  const handleTypeChange = (type) => {
    setSelectedType(type);
    // Reiniciar los campos del formulario al cambiar el tipo
    setFormData({
      email: '',
      customerField1: '',
      customerField2: '',
      sellerField1: '',
      sellerField2: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleRegister = (planId) => {
    // Lógica de registro según el tipo seleccionado (customer o seller)
    console.log(`register as ${selectedType}`, formData);

    // Si es un vendedor, realiza el registro y pasa la información al backend
    if (selectedType === 'seller') {
      // Obtén el tipo de plan seleccionado (puedes obtenerlo de algún estado o como prefieras)

      // Realiza la llamada al backend para registrar al usuario con la información del formulario
      registerSeller(formData, planId);
    }
    else{
      registerCustomer(formData);
    }
  };

  // Función para registrar al vendedor en el backend
  const registerSeller = async (formData, selectedPlan) => {
    try {
      // Realiza la llamada al backend, envía formData y selectedPlan
      const response = await fetch('https://tu-backend.com/api/register-seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          selectedPlan,
        }),
      });

      // Verifica la respuesta del backend
      if (response.ok) {
        console.log('Registro exitoso como vendedor');
        // Puedes realizar alguna acción adicional después del registro
      } else {
        console.error('Error en el registro como vendedor');
        // Maneja errores si es necesario
      }
    } catch (error) {
      console.error('Error en la llamada al backend', error);
      // Maneja errores de la llamada al backend
    }
  };
  // Función para registrar al vendedor en el backend
  const registerCustomer = async (formData) => {
    try {
      // Realiza la llamada al backend, envía formData y selectedPlan
      const response = await fetch('https://tu-backend.com/api/register-seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData
        }),
      });

      // Verifica la respuesta del backend
      if (response.ok) {
        console.log('Registro exitoso como vendedor');
        // Puedes realizar alguna acción adicional después del registro
      } else {
        console.error('Error en el registro como vendedor');
        // Maneja errores si es necesario
      }
    } catch (error) {
      console.error('Error en la llamada al backend', error);
      // Maneja errores de la llamada al backend
    }
  };

  const handleLoginWithMeta = () => {
    // Lógica para iniciar sesión con Meta
  };

  const handleLoginWithMicrosoft = () => {
    // Lógica para iniciar sesión con Microsoft
  };

  const handleLoginWithGoogle = () => {
    // Lógica para iniciar sesión con Google
  };
  return (
    <Container className="home-container">
      <Row className="column-container">
        <Col className="column">
          <Row>
            <h2>Register</h2>
            <div className="d-flex justify-content-between">
                <Button
                  variant={selectedType === 'customer' ? 'primary' : 'secondary'}
                  onClick={() => handleTypeChange('customer')}>
                  Customer
                </Button>
                <Button
                  variant={selectedType === 'seller' ? 'primary' : 'secondary'}
                  onClick={() => handleTypeChange('seller')}>
                  Seller
                </Button>
              </div>
            <Form>
              <Form.Group controlId="formEmail" className="registerForm">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              {selectedType === 'customer' && (
                <>
                  <Form.Group controlId="name" className="registerForm">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={formData.customerField1}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="surname" className="registerForm">
                    <Form.Control
                      type="text"
                      placeholder="Surname"
                      name="surname"
                      value={formData.customerField2}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="address" className="registerForm">
                    <Form.Control
                      type=""
                      placeholder="Address"
                      name="address"
                      value={formData.customerField3}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="button" onClick={handleRegister}>
                    Registrarse
                  </Button>
                  <div className="separator"></div>
                  <Row>
                    <h2>Others</h2>
                    <div className="d-flex justify-content-around align-items-center">
                      <div className="btn registerButton">
                        <Col>
                          <img src={imageGoogle} alt="Google" className="icono" />
                        </Col>
                        <Col>
                          <Button variant="outline-primary" className="text-white" onClick={handleLoginWithGoogle}>
                            Google
                          </Button>
                        </Col>
                      </div>

                      <div className="btn registerButton">
                        <Col>
                          <img src={imageMicrosoft} alt="Microsoft" className="icono" />
                        </Col>
                        <Col>
                          <Button variant="outline-primary" className="text-white" onClick={handleLoginWithMicrosoft}>
                            Microsoft
                          </Button>
                        </Col>
                      </div>

                      <div className="btn registerButton">
                        <Col>
                          <img src={imageMeta} alt="Meta" className="icono" />
                        </Col>
                        <Col>
                          <Button variant="outline-primary" className="text-white" onClick={handleLoginWithMeta}>
                            Meta
                          </Button>
                        </Col>
                      </div>
                    </div>
                  </Row>
                </>
              )}

              {selectedType === 'seller' && (
                <>
                  <Form.Group controlId="formSellerField1" className="registerForm">
                    <Form.Control
                      type="text"
                      placeholder="Campo específico del vendedor 1"
                      name="sellerField1"
                      value={formData.sellerField1}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formSellerField2" className="registerForm">
                    <Form.Control
                      type="text"
                      placeholder="Campo específico del vendedor 2"
                      name="sellerField2"
                      value={formData.sellerField2}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <div className="separator"></div>

                  <Row>
                    <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                      <h2>Plan and pricing</h2>
                      <h3>Select the better option for your business model</h3>
                    </div>
                  </Row>
                  <Row className="d-flex">
                    <Col md className="align-items-stretch">
                      <Card className="text-center box-shadow h-100">
                        <CardHeader>
                          <h4 className="my-0 font-weight-normal">Standard</h4>
                        </CardHeader>
                        <CardBody className="d-flex flex-column">
                          <h1 className="card-title pricing-card-title" style={{ color: 'black' }}> 3.99€ <small className="text-muted">/ month</small></h1>
                          <ul className="list-unstyled mt-3 mb-4">
                            <li>10 books</li>
                            <li>20 orders/month</li>
                            <li>30 days</li>
                            <li>Peninsular delivery</li>
                            <li>Email support up to 14 days</li>
                            <li>True</li>
                          </ul>
                          <Button variant="primary" onClick={() => handleRegister('plan1')} style={{ outline: 'none' }} >
                            Subscribe
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md className="align-items-stretch">
                      <Card className="text-center box-shadow h-100">
                        <CardHeader>
                          <h4 className="my-0 font-weight-normal">Pro</h4>
                        </CardHeader>
                        <CardBody className="d-flex flex-column">
                          <h1 className="card-title pricing-card-title" style={{ color: 'black' }}>15.99€ <small className="text-muted">/ mes</small></h1>
                          <ul className="list-unstyled mt-3 mb-4">
                            <li>50 books</li>
                            <li>100 orders/month</li>
                            <li>14 days</li>
                            <li>Peninsula, Canary Islands, and Balearic Islands</li>
                            <li>Email support up to 7 days</li>
                            <li>False</li>
                          </ul>
                          <Button variant="primary" onClick={() => handleRegister('plan2')} style={{ outline: 'none' }}>
                            Subscribe
                          </Button>            
                          </CardBody>
                      </Card>
                    </Col>
                    <Col md className="align-items-stretch">
                      <Card className="text-center box-shadow h-100">
                        <CardHeader>
                          <h4 className="my-0 font-weight-normal">Premium</h4>
                        </CardHeader>
                        <CardBody className="d-flex flex-column">
                          <h1 className="card-title pricing-card-title" style={{ color: 'black' }}>49.79€ <small className="text-muted">/ mes</small></h1>
                          <ul className="list-unstyled mt-3 mb-4">
                            <li>Unlimited</li>
                            <li>Unlimited</li>
                            <li>5 days</li>
                            <li>International</li>
                            <li>24-hour telephone support</li>
                            <li>True</li>
                          </ul>
                          <Button variant="primary" onClick={() => handleRegister('plan3')} 
                          style={{ outline: 'none' }}>
                            Subscribe
                          </Button>            
                          </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </>
              )}
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;
