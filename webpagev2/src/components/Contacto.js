import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Contacto = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Mensaje enviado (demo)');
    };

    return (
        <div className="col-md-8 mx-auto">
            <h2 className="text-center mb-4">Ponte en Contacto</h2>
            <p className="text-center text-muted mb-5">
                ¿Tienes alguna pregunta? Llena el formulario y te responderemos a la brevedad.
            </p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre Completo</Form.Label>
                    <Form.Control type="text" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Asunto</Form.Label>
                    <Form.Control type="text" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control as="textarea" rows={5} required />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">Enviar Mensaje</Button>
            </Form>
        </div>
    );
};

export default Contacto;