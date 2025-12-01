import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const AuthToggle = ({ isLogin, setIsLogin }) => {
  return (
    <div className="d-flex justify-content-center mb-4">
      <ButtonGroup className="shadow-sm rounded-pill overflow-hidden">
        <Button
          variant={isLogin ? 'primary' : 'light'}
          onClick={() => setIsLogin(true)}
          className="px-4 fw-bold border-0"
        >
          Ingresar
        </Button>
        <Button
          variant={!isLogin ? 'primary' : 'light'}
          onClick={() => setIsLogin(false)}
          className="px-4 fw-bold border-0"
        >
          Registrarse
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default AuthToggle;