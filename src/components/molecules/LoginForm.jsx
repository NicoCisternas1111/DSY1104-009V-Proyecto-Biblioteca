import React from 'react';
import { Form } from 'react-bootstrap';
import ActionBtn from '../atoms/ActionBtn';

const LoginForm = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    alert('Login simulado... Conectar con Spring Boot aquí.');
  };

  return (
    <Form onSubmit={handleLogin} className="animate__animated animate__fadeIn">
      <Form.Group className="mb-3" controlId="loginEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Ingresa tu correo" required />
      </Form.Group>

      <Form.Group className="mb-4" controlId="loginPass">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Ingresa tu contraseña" required />
      </Form.Group>

      <div className="d-grid">
        <ActionBtn type="submit">Iniciar Sesión</ActionBtn>
      </div>
    </Form>
  );
};

export default LoginForm;