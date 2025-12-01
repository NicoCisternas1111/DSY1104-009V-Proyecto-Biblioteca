// src/components/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { Container, Form, Card, Alert, Row, Col, Table, Button } from 'react-bootstrap';
import ActionBtn from '../atoms/ActionBtn';
import { fetchBooks, createBook, updateBook, deleteBook } from '../../services/api';

const emptyForm = {
  title: '',
  author: '',
  category: '',
  price: '',
  stock: '',
  image: '',
  description: '',
  extendedDescription: '',
};

const AdminPanel = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState(null); // 'created' | 'updated' | 'deleted'
  const [error, setError] = useState('');

  // Cargar libros desde el backend
  const loadBooks = async () => {
    try {
      const data = await fetchBooks({ size: 100, sort: 'title,asc' }); // usa tu api.js

      // Si el backend devuelve Page<Book>, tomar data.content; si no, usar el array directo.
      const list = Array.isArray(data) ? data : (data?.content || []);

      setBooks(list);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los libros.');
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setStatus(null);
    setError('');
  };

  // Crear / actualizar libro
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus(null);

    const payload = {
      title: form.title,
      author: form.author,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      image: form.image || null,
      description: form.description || null,
      extendedDescription: form.extendedDescription || null,
    };

    try {
      if (editingId) {
        // EDITAR
        await updateBook(editingId, payload);
        setStatus('updated');
      } else {
        // CREAR (SIN ID → que lo genere el backend)
        await createBook(payload);
        setStatus('created');
      }

      await loadBooks();
      resetForm();
    } catch (err) {
      console.error(err);
      setError(err.message || 'No se pudo guardar el libro.');
    }
  };

  // Rellenar formulario para editar
  const handleEdit = (book) => {
    setEditingId(book.id);

    setForm({
      title: book.title || '',
      author: book.author || '',
      category: book.category || '',
      price: book.price ?? '',
      stock: book.stock ?? '',
      image: book.image || '',
      description: book.description || '',
      extendedDescription: book.extendedDescription || '',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Eliminar libro
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este libro?')) return;

    try {
      await deleteBook(id);
      setStatus('deleted');
      await loadBooks();
    } catch (err) {
      console.error(err);
      setError('No se pudo eliminar el libro.');
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-shield-lock me-2" />
            Panel de Administración de Libros
          </h2>
          <p className="text-muted mb-0">
            Desde aquí puedes crear, editar y eliminar libros del catálogo.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Formulario */}
        <Col lg={5}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white py-3">
              <h5 className="mb-0">
                <i className="bi bi-book-half me-2" />
                {editingId ? 'Editar Libro' : 'Nuevo Libro'}
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              {status === 'created' && (
                <Alert variant="success" onClose={() => setStatus(null)} dismissible>
                  Libro creado correctamente.
                </Alert>
              )}
              {status === 'updated' && (
                <Alert variant="success" onClose={() => setStatus(null)} dismissible>
                  Libro actualizado correctamente.
                </Alert>
              )}
              {status === 'deleted' && (
                <Alert variant="info" onClose={() => setStatus(null)} dismissible>
                  Libro eliminado.
                </Alert>
              )}
              {error && (
                <Alert variant="danger" onClose={() => setError('')} dismissible>
                  {error}
                </Alert>
              )}

              {/* Mostrar ID solo cuando se edita, como solo lectura */}
              {editingId && (
                <Form.Group className="mb-3">
                  <Form.Label>ID (solo lectura)</Form.Label>
                  <Form.Control type="text" value={editingId} disabled />
                </Form.Group>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Autor</Form.Label>
                  <Form.Control
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Fantasía, Clásico, Distopía..."
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Precio (CLP)</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        min="0"
                        value={form.price}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        type="number"
                        name="stock"
                        min="0"
                        value={form.stock}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>URL Imagen</Form.Label>
                  <Form.Control
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción corta</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción extendida</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="extendedDescription"
                    value={form.extendedDescription}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-flex gap-2 mt-3">
                  <ActionBtn type="submit" className="flex-grow-1">
                    {editingId ? 'Guardar Cambios' : 'Crear Libro'}
                  </ActionBtn>
                  {editingId && (
                    <Button variant="secondary" onClick={resetForm}>
                      Cancelar
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Tabla de libros */}
        <Col lg={7}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-card-list me-2" />
                  Libros en el catálogo
                </h5>
                <Button size="sm" variant="outline-primary" onClick={loadBooks}>
                  Recargar
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0 align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Título</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4">
                          No hay libros registrados.
                        </td>
                      </tr>
                    ) : (
                      books.map((b) => (
                        <tr key={b.id}>
                          <td>{b.id}</td>                 {/* ID real */}
                          <td>{b.title}</td>              {/* Título */}
                          <td>{b.category}</td>           {/* Categoría (string) */}
                          <td>${b.price}</td>
                          <td>{b.stock}</td>
                          <td className="text-end">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              className="me-2"
                              onClick={() => handleEdit(b)}
                            >
                              <i className="bi bi-pencil-square" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleDelete(b.id)}
                            >
                              <i className="bi bi-trash" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
