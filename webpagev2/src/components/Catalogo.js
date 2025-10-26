import React, { useState, useMemo } from 'react';
import { Card, Button, Row, Col, Form, FormControl, ListGroup, Alert } from 'react-bootstrap';
import { addToCart } from '../storage';
import { Link } from 'react-router-dom';
import { catalogoLibros } from '../data/libros';
import Magnet from '../ui/reactbits/Magnet';
import '../ui/reactbits/reactbits.css';

const Catalogo = () => {
  const [added, setAdded] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [priceLimit, setPriceLimit] = useState(30000);
  const [selectedAuthor, setSelectedAuthor] = useState('Todos');

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({ ...product, qty: 1 });
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 900);
  };

  const categorias = useMemo(
    () => ['Todas', ...new Set(catalogoLibros.map(libro => libro.category))],
    []
  );
  const autores = useMemo(
    () => ['Todos', ...new Set(catalogoLibros.map(libro => libro.author))],
    []
  );

  const librosFiltrados = catalogoLibros.filter(libro => {
    const porBusqueda =
      libro.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      libro.author.toLowerCase().includes(searchTerm.toLowerCase());
    const porCategoria = selectedCategory === 'Todas' || libro.category === selectedCategory;
    const porPrecio = libro.price <= priceLimit;
    const porAutor = selectedAuthor === 'Todos' || libro.author === selectedAuthor;
    return porBusqueda && porCategoria && porPrecio && porAutor;
  });

  return (
    <Row>
      <Col md={3} className="mb-4">
        <h4 className="mb-3">Filtros</h4>

        <h5 className="mt-4 mb-2">Categoría</h5>
        <ListGroup>
          {categorias.map(categoria => (
            <ListGroup.Item
              key={categoria}
              action
              active={categoria === selectedCategory}
              onClick={() => setSelectedCategory(categoria)}
              className="filter-item"
            >
              {categoria}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <h5 className="mt-4 mb-3">Precio</h5>
        <Form.Label>Hasta: ${priceLimit.toLocaleString()}</Form.Label>
        <Form.Range
          min={0}
          max={30000}
          step={1000}
          value={priceLimit}
          onChange={e => setPriceLimit(Number(e.target.value))}
        />

        <h5 className="mt-4 mb-2">Autor</h5>
        <Form.Select value={selectedAuthor} onChange={e => setSelectedAuthor(e.target.value)}>
          {autores.map(autor => (
            <option key={autor} value={autor}>
              {autor}
            </option>
          ))}
        </Form.Select>
      </Col>

      <Col md={9}>
        <h2 className="text-center mb-4">Nuestro Catálogo</h2>
        <Form className="mb-4">
          <FormControl
            type="text"
            placeholder="Busca por título o autor..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </Form>

        <Row xs={1} sm={2} md={2} lg={3} className="g-4">
          {librosFiltrados.map(product => (
            <Col key={product.id} className="d-flex align-items-stretch">
              <Card className="book-card-catalogo d-flex flex-column">
                <Link to={`/libro/${product.id}`}>
                  <Card.Img variant="top" src={product.image} className="book-cover" />
                </Link>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>
                    <Link to={`/libro/${product.id}`} className="text-decoration-none text-dark">
                      {product.title}
                    </Link>
                  </Card.Title>
                  <Card.Text className="text-muted small">{product.author}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">
                    ${product.price.toLocaleString()}
                  </Card.Subtitle>

                  {/* Botón con efecto magnético */}
                  <Magnet>
                    <Button
                      variant="primary"
                      className="mt-auto"
                      onClick={e => handleAddToCart(e, product)}
                      disabled={added[product.id]}
                    >
                      {added[product.id] ? 'Agregado' : 'Añadir al carrito'}
                    </Button>
                  </Magnet>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {librosFiltrados.length === 0 && (
          <Alert variant="warning" className="text-center mt-4">
            No se encontraron libros que coincidan con tu búsqueda.
          </Alert>
        )}
      </Col>
    </Row>
  );
};

export default Catalogo;