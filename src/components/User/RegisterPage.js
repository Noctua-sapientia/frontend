import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, CardHeader, CardBody } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import imageMicrosoft from '../../img/microsoft.png';
import imageMeta from '../../img/meta.png';
import imageGoogle from '../../img/google.png';
import UserApi from '../../api/UserApi';

function RegisterPage() {
  const [selectedType, setSelectedType] = useState('customer');
  const [formData, setFormData] = useState({
    valoration:0,
    orders:0,
    reviews:0,
  });
  // Obtén el objeto history
  const navigate = useNavigate();

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRegister = async (planId) => {
    try{
      // Si es un vendedor, realiza el registro y pasa la información al backend
      if (selectedType === 'seller') {
        // Realiza la llamada al backend para registrar al usuario con la información del formulario
        await UserApi.registerSeller(formData, planId);
      }
      else{
        await UserApi.registerCustomer(formData);
      }
      console.log(`register as ${selectedType}`, formData);
      navigate('/login');

    } catch (error) {
      console.error('Error durante el registro:', error);
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
              <Form.Group controlId="name" className="registerForm">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
              </Form.Group>
              <Form.Group controlId="formEmail" className="registerForm">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="password" className="registerForm">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
              </Form.Group>

              {/* Seccion para Customers*/}
              {selectedType === 'customer' && (
                <>
                  <Form.Group controlId="surnames" className="registerForm">
                    <Form.Control
                      type="text"
                      placeholder="surnames"
                      name="surnames"
                      value={formData.surnames}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="address" className="registerForm">
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={formData.address}
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
              {/* Seccion para Sellers*/}
              {selectedType === 'seller' && (
                <>
                  {/*
                  <Form.Group controlId="formSellerField2" className="registerForm">
                    <Form.Control
                      type="text"
                      placeholder="Campo específico del vendedor 2"
                      name="sellerField2"
                      value={formData.sellerField2}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  */}
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
                          <Button variant="primary" onClick={handleRegister} style={{ outline: 'none' }} >
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
                          <Button variant="primary" onClick={handleRegister} style={{ outline: 'none' }}>
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
                          <Button variant="primary" onClick={handleRegister} 
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
