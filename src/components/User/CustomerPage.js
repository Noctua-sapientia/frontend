import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import './user_styles.css';
import logoImage from '../../img/logo.png';
import UserApi from '../../api/UserApi.js';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function CustomerPage(props) {
  const { accessToken, userId, handleLogout } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '', // Agrega el campo email
    password: '',
    address: '', // Agrega el campo address
    valoration: 0,
    orders: 0,
    reviews: 0,
    id: 0, // Corrige la clave a userId
  });

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUser() {
      try {
        const c = await UserApi.getCustomer(accessToken, userId);
        setFormData(c);
      } catch (error) {
        // Maneja errores si es necesario
      }
    }

    fetchUser();
  }, [accessToken, userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        id: userId,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Llama a la función de la API para guardar cambios
      await UserApi.updateCustomer(accessToken, formData);
      navigate('/myaccount');
      // Puedes realizar alguna acción adicional después de guardar cambios
    } catch (error) {
      // Maneja errores si es necesario
    }
  };

  const handleDelete = async () => {
    try {
        // Llama a la función de la API para borrar el usuario
        await UserApi.deleteCustomer(accessToken, userId);
        handleLogout();
        navigate('/');
        // Puedes realizar alguna acción adicional después de borrar el usuario
    } catch (error) {
      // Maneja errores si es necesario
    }
  };

  return (
    <Container className='home-container'>
      <Col>
        <Row>
          <Col align='center'>
            <h2>My customer profile</h2>
          </Col>
        </Row>
        <Row>
          <Col>
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
            <Form.Group controlId="address" className="registerForm">
                <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                />
            </Form.Group>
            <Row className="mt-3">
          <Col>
            <Button variant="primary" onClick={handleSaveChanges}>
              Guardar Cambios
            </Button>
          </Col>
          <Col>
            <Button variant="danger" onClick={handleDelete}>
              Borrar
            </Button>
          </Col>
        </Row>
        </Form>
          </Col>
          <Col className='column'>
            <img
              src={logoImage}
              alt="Logo"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

export default CustomerPage;