import React, { useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import FluidGlassCard from '../ui/reactbits/FluidGlassCard';
import '../ui/reactbits/reactbits.css';

const Contacto = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) {
      setSent(false);
      return;
    }
    setSending(true);
    // Simula envío…
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    setSent(true);
    // Limpia
    setForm({ nombre: '', email: '', asunto: '', mensaje: '' });
  };

  return (
    <Row className="justify-content-center my-4">
      <Col md={10} lg={8}>
        <FluidGlassCard title="Contáctanos" subtitle="Te responderemos a la brevedad">
          {sent && (
            <Alert variant="success" className="mb-3 py-2">
              ¡Mensaje enviado! Gracias por escribirnos.
            </Alert>
          )}

          <Form onSubmit={onSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={onChange}
                  required
                />
              </Col>
              <Col md={6}>
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="nombre@correo.com"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </Col>
              <Col md={12}>
                <Form.Label>Asunto</Form.Label>
                <Form.Control
                  type="text"
                  name="asunto"
                  placeholder="Motivo del mensaje"
                  value={form.asunto}
                  onChange={onChange}
                />
              </Col>
              <Col md={12}>
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  name="mensaje"
                  rows={5}
                  placeholder="Cuéntanos en qué podemos ayudarte…"
                  value={form.mensaje}
                  onChange={onChange}
                  required
                />
              </Col>
            </Row>

            <div className="d-grid d-sm-flex gap-2 mt-3">
              <Button type="submit" variant="primary" disabled={sending}>
                {sending ? 'Enviando…' : 'Enviar'}
              </Button>
              <Button
                type="reset"
                variant="outline-secondary"
                onClick={() =>
                  setForm({ nombre: '', email: '', asunto: '', mensaje: '' })
                }
                disabled={sending}
              >
                Limpiar
              </Button>
            </div>
          </Form>
        </FluidGlassCard>
      </Col>
    </Row>
  );
};

export default Contacto;