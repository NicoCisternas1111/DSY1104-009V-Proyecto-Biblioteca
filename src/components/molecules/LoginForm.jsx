import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ActionBtn from '../atoms/ActionBtn';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const user = login(email, password);

    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError('Credenciales incorrectas. Prueba: admin@duoc.cl / admin');
    }
  };

  return (
    <Form onSubmit={handleLogin} className="animate__animated animate__fadeIn">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form.Group className="mb-3" controlId="loginEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="admin@duoc.cl" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="loginPass">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="admin" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <div className="d-grid">
        <ActionBtn type="submit">Iniciar Sesión</ActionBtn>
      </div>
      
      <div className="text-center mt-3">
        <small className="text-muted">
          Para demo Admin usa: <strong>admin@duoc.cl</strong> / <strong>admin</strong>
        </small>
      </div>
    </Form>
  );
};

export default LoginForm;