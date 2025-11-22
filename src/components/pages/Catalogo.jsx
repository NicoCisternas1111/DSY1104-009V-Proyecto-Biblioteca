import React, { useState, useMemo } from 'react';
import { Row, Col, Alert, Container } from 'react-bootstrap';
import { catalogoLibros } from '../../data/libros';
import { addToCart } from '../../storage';
import BookCard from '../molecules/BookCard';
import CatalogFilter from '../organisms/CatalogFilter';

const Catalogo = () => {
  // --- Lógica de Estado (Hooks) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedAuthor, setSelectedAuthor] = useState('Todos');
  const [priceLimit, setPriceLimit] = useState(30000);

  // --- Lógica de Negocio (Filtrado) ---
  const categorias = useMemo(() => ['Todas', ...new Set(catalogoLibros.map(l => l.category))], []);
  const autores = useMemo(() => ['Todos', ...new Set(catalogoLibros.map(l => l.author))], []);

  const librosFiltrados = catalogoLibros.filter(libro => {
    return (
      (selectedCategory === 'Todas' || libro.category === selectedCategory) &&
      (selectedAuthor === 'Todos' || libro.author === selectedAuthor) &&
      (libro.price <= priceLimit) &&
      (libro.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <Container fluid="md">
      <Row>
        {/* Columna Izquierda: Filtros (Organismo) */}
        <Col md={3} className="mb-4">
          <CatalogFilter 
            categories={categorias}
            authors={autores}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedAuthor={selectedAuthor}
            setSelectedAuthor={setSelectedAuthor}
            priceLimit={priceLimit}
            setPriceLimit={setPriceLimit}
          />
        </Col>

        {/* Columna Derecha: Grilla de Libros */}
        <Col md={9}>
          <div className="mb-4">
            <input 
              type="text" 
              className="form-control form-control-lg"
              placeholder="¿Qué quieres leer hoy?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Row xs={1} sm={2} lg={3} className="g-4">
            {librosFiltrados.map(libro => (
              <Col key={libro.id}>
                {/* Aquí usamos la Molécula */}
                <BookCard 
                  book={libro} 
                  onAddToCart={(item) => addToCart({ ...item, qty: 1 })} 
                />
              </Col>
            ))}
          </Row>

          {librosFiltrados.length === 0 && (
            <Alert variant="warning" className="mt-5 text-center">
              No encontramos libros con esos filtros 😢
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Catalogo;