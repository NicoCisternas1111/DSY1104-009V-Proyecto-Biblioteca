import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LoginForm from '../molecules/LoginForm';

const Usuario = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-4 text-center">Iniciar sesión</h3>
              <LoginForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Usuario;
