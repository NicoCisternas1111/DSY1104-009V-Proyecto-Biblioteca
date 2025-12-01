import React, { useState } from 'react';
import { Container, Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap';
import LoginForm from '../molecules/LoginForm';
import RegisterForm from '../molecules/RegisterForm';
import ChangePasswordForm from '../molecules/ChangePasswordForm';
import { useAuth } from '../../context/AuthContext';

const Usuario = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-center mb-3">
                <ButtonGroup>
                  <Button
                    variant={isLogin ? 'primary' : 'outline-primary'}
                    onClick={() => setIsLogin(true)}
                  >
                    Iniciar sesión
                  </Button>
                  <Button
                    variant={!isLogin ? 'primary' : 'outline-primary'}
                    onClick={() => setIsLogin(false)}
                  >
                    Registrarse
                  </Button>
                </ButtonGroup>
              </div>

              <h3 className="mb-4 text-center">
                {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
              </h3>

              {isLogin ? <LoginForm /> : <RegisterForm />}
            </Card.Body>
          </Card>

          {user && (
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="mb-3 text-center">Cambiar contraseña</h5>
                <ChangePasswordForm />
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Usuario;
