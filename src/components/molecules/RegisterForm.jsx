import React from 'react';
import { Form } from 'react-bootstrap';
import ActionBtn from '../atoms/ActionBtn';

const RegisterForm = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    alert('Registro simulado... Conectar con Spring Boot aquí.');
  };

  return (
    <Form onSubmit={handleRegister} className="animate__animated animate__fadeIn">
      <Form.Group className="mb-3" controlId="regName">
        <Form.Label>Nombre Completo</Form.Label>
        <Form.Control type="text" placeholder="Ej: Juan Pérez" required />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="regEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="correo@ejemplo.com" required />
      </Form.Group>

      <Form.Group className="mb-4" controlId="regPass">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Crea una contraseña segura" required />
      </Form.Group>

      <div className="d-grid">
        <ActionBtn type="submit" variant="success">Registrarse</ActionBtn>
      </div>
    </Form>
  );
};

export default RegisterForm;