import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LoginForm from '../molecules/LoginForm';
import RegisterForm from '../molecules/RegisterForm';
import AuthToggle from '../molecules/AuthToggle';

const Usuario = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <div className="text-center mb-4">
             <h2 className="fw-bold">{isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}</h2>
             <p className="text-muted">
                {isLogin 
                  ? 'Accede a tu historial de pedidos y favoritos.' 
                  : 'Únete para comprar más rápido y seguir tus pedidos.'}
             </p>
          </div>

          <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />

          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            <Card.Body className="p-4 p-md-5 bg-white">
              {isLogin ? <LoginForm /> : <RegisterForm />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Usuario;