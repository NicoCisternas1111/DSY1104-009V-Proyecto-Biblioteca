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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = await login(email, password);

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group controlId="loginEmail" className="mb-3">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nombre@correo.com"
          required
        />
      </Form.Group>

      <Form.Group controlId="loginPassword" className="mb-4">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Tu contraseña"
          required
        />
      </Form.Group>

      <div className="d-grid">
        <ActionBtn type="submit">Iniciar sesión</ActionBtn>
      </div>

      <div className="text-center mt-3">
        <small className="text-muted">
          Admin: <strong>admin@biblioteca.cl</strong> / <strong>Admin1234!</strong>
        </small>
      </div>
    </Form>
  );
};

export default LoginForm;
