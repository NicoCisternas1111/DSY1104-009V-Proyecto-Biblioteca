import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import ActionBtn from '../atoms/ActionBtn';
import { registerUser } from '../../services/api';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setOk('');

    if (pass1 !== pass2) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true);
      await registerUser({ name, email, password: pass1 });
      setOk('Cuenta creada correctamente, ahora puedes iniciar sesión.');
      setName('');
      setEmail('');
      setPass1('');
      setPass2('');
    } catch (err) {
      console.error(err);
      setError(err.message || 'No se pudo registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleRegister} className="animate__animated animate__fadeIn">
      {error && <Alert variant="danger">{error}</Alert>}
      {ok && <Alert variant="success">{ok}</Alert>}

      <Form.Group className="mb-3" controlId="regName">
        <Form.Label>Nombre completo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: Juan Pérez"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="regEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="regPass1">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Crea una contraseña segura"
          value={pass1}
          onChange={(e) => setPass1(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="regPass2">
        <Form.Label>Repetir contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Repite la contraseña"
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          required
        />
      </Form.Group>

      <div className="d-grid">
        <ActionBtn type="submit" variant="success" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Registrarse'}
        </ActionBtn>
      </div>
    </Form>
  );
};

export default RegisterForm;
