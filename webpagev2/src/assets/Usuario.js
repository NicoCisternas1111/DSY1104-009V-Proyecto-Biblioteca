import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

const USUARIO = {
    nombre: "Nicolas",
    correo: "nicolas@gmail.com",
    contraseña: "12345n"
};

const Usuario = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginEmail === USUARIO.correo && loginPassword === USUARIO.contraseña) {
            alert(`Usuario correcto, ¡Bienvenido ${USUARIO.nombre}!`);
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    };

    return (
        <Row className="g-4">
            <Col lg={6}>
                <Card className="shadow-sm h-100">
                    <Card.Body className="p-5">
                        <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3" controlId="loginEmail">
                                <Form.Label>Correo Electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="loginPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" variant="primary" className="w-100">Ingresar</Button>
                            <div className="text-center mt-3">
                                <a href="#">¿Olvidaste tu contraseña?</a>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={6}>
                <Card className="shadow-sm h-100">
                    <Card.Body className="p-5">
                        <h2 className="card-title text-center mb-4">¿Eres nuevo? Regístrate</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="registerName">
                                <Form.Label>Nombre Completo</Form.Label>
                                <Form.Control type="text" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="registerEmail">
                                <Form.Label>Correo Electrónico</Form.Label>
                                <Form.Control type="email" required />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="registerPassword">
                                <Form.Label>Crear Contraseña</Form.Label>
                                <Form.Control type="password" required />
                            </Form.Group>
                            <Button type="submit" variant="success" className="w-100">Crear Cuenta</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Usuario;