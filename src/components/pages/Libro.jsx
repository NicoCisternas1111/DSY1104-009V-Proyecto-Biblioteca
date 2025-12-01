// src/components/pages/Libro.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Alert, Spinner, Button } from 'react-bootstrap';
import { fetchBookById } from '../../services/api';
import { addToCart } from '../../storage';

const Libro = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar la información del libro.');
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" />
        <p className="mt-3 mb-0">Cargando libro...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          Libro no encontrado.
        </Alert>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: book.id,
      title: book.title,
      price: book.price,
      image: book.image,
      qty: 1,
    });
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={4} className="mb-4">
          <img
            src={book.image}
            alt={book.title}
            className="img-fluid rounded shadow-sm"
          />
        </Col>
        <Col md={8}>
          <h2 className="mb-3">{book.title}</h2>
          <p className="text-muted mb-1">Autor: {book.author}</p>
          <p className="text-muted mb-3">Categoría: {book.category}</p>
          <h4 className="text-success mb-3">
            ${book.price?.toLocaleString('es-CL')}
          </h4>
          <p className="mb-3">
            {book.description || 'Sin descripción disponible.'}
          </p>
          {book.extendedDescription && (
            <p className="text-muted">
              {book.extendedDescription}
            </p>
          )}
          <p className="mb-3">Stock disponible: {book.stock}</p>

          <Button variant="primary" onClick={handleAddToCart}>
            Agregar al carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Libro;
