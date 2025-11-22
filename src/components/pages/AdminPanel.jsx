import React, { useState } from 'react';
import { Container, Form, Card, Alert, Row, Col } from 'react-bootstrap';
import ActionBtn from '../atoms/ActionBtn';

const AdminPanel = () => {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('success');
    setTimeout(() => {
        setStatus(null);
    }, 3000);
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Panel de Administración</h2>
        <span className="badge bg-danger">Zona Restringida</span>
      </div>
      
      <Row className="justify-content-center">
        <Col lg={8}>
            <Card className="shadow-sm border-0">
                <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0"><i className="bi bi-book-half me-2"></i>Gestión de Libros</h5>
                </Card.Header>
                <Card.Body className="p-4">
                {status === 'success' && (
                    <Alert variant="success" onClose={() => setStatus(null)} dismissible>
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Libro agregado exitosamente al sistema.
                    </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="bookTitle">
                    <Form.Label>Título del Libro</Form.Label>
                    <Form.Control type="text" required placeholder="Ej: Clean Code" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="bookAuthor">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control type="text" required placeholder="Ej: Robert C. Martin" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="bookDesc">
                    <Form.Label>Descripción Corta</Form.Label>
                    <Form.Control as="textarea" rows={2} required placeholder="Resumen breve..." />
                    </Form.Group>

                    <Row>
                    <div className="col-md-6 mb-3">
                        <Form.Group controlId="bookPrice">
                        <Form.Label>Precio (CLP)</Form.Label>
                        <Form.Control type="number" required placeholder="25000" min="0" />
                        </Form.Group>
                    </div>
                    <div className="col-md-6 mb-3">
                        <Form.Group controlId="bookCategory">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select aria-label="Seleccionar categoría">
                            <option value="Programación">Programación</option>
                            <option value="Fantasía">Fantasía</option>
                            <option value="Historia">Historia</option>
                            <option value="Ciencia Ficción">Ciencia Ficción</option>
                            <option value="Clásicos">Clásicos</option>
                        </Form.Select>
                        </Form.Group>
                    </div>
                    </Row>

                    <div className="d-grid mt-3">
                    <ActionBtn type="submit" variant="success" size="lg">
                        <i className="bi bi-plus-circle me-2"></i>Guardar Nuevo Libro
                    </ActionBtn>
                    </div>
                </Form>
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;