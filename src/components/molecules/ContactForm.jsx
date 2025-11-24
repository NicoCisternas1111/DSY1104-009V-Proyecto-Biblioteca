import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import ActionBtn from '../atoms/ActionBtn';

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensaje enviado (simulado)');
  };

  return (
    <Card className="shadow-lg border-0 rounded-4">
      <Card.Body className="p-4 p-md-5">
        <h3 className="mb-4 fw-bold">Envíanos un mensaje</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control type="text" placeholder="Tu nombre" required className="bg-light border-0 py-2" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="nombre@ejemplo.com" required className="bg-light border-0 py-2" />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formMessage">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="¿En qué podemos ayudarte?" required className="bg-light border-0 py-2" />
          </Form.Group>

          <div className="d-grid">
            <ActionBtn type="submit" size="lg">
              Enviar Mensaje
            </ActionBtn>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ContactForm;