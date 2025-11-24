import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import ActionBtn from '../atoms/ActionBtn';
import { changePassword } from '../../services/api';

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOk('');

    if (newPassword1 !== newPassword2) {
      setError('La nueva contraseña y su confirmación no coinciden');
      return;
    }

    try {
      setLoading(true);
      await changePassword({
        currentPassword,
        newPassword: newPassword1,
      });
      setOk('Contraseña actualizada correctamente');
      setCurrentPassword('');
      setNewPassword1('');
      setNewPassword2('');
    } catch (err) {
      console.error(err);
      setError(err.message || 'No se pudo cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {ok && <Alert variant="success">{ok}</Alert>}

      <Form.Group className="mb-3" controlId="currentPass">
        <Form.Label>Contraseña actual</Form.Label>
        <Form.Control
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="newPass1">
        <Form.Label>Nueva contraseña</Form.Label>
        <Form.Control
          type="password"
          value={newPassword1}
          onChange={(e) => setNewPassword1(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="newPass2">
        <Form.Label>Repetir nueva contraseña</Form.Label>
        <Form.Control
          type="password"
          value={newPassword2}
          onChange={(e) => setNewPassword2(e.target.value)}
          required
        />
      </Form.Group>

      <div className="d-grid">
        <ActionBtn type="submit" variant="primary" disabled={loading}>
          {loading ? 'Guardando...' : 'Cambiar contraseña'}
        </ActionBtn>
      </div>
    </Form>
  );
};

export default ChangePasswordForm;
