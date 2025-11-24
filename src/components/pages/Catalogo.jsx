import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Alert, Container, Spinner } from 'react-bootstrap';
import { addToCart } from '../../storage';
import BookCard from '../molecules/BookCard';
import CatalogFilter from '../organisms/CatalogFilter';
import { fetchBooks } from '../../services/api';

const Catalogo = () => {
  // --- Estado de datos ---
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- Estado de filtros ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedAuthor, setSelectedAuthor] = useState('Todos');
  const [priceLimit, setPriceLimit] = useState(30000);

  // --- Cargar libros desde el backend ---
  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await fetchBooks({ size: 100 });
        const list = Array.isArray(data) ? data : (data?.content || []);
        setBooks(list);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los libros del catálogo.');
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  // --- Derivar categorías y autores disponibles ---
  const categorias = useMemo(() => {
    const base = ['Todas'];
    const setCat = new Set(
      books
        .map((l) => l.category)
        .filter(Boolean)
    );
    return base.concat([...setCat]);
  }, [books]);

  const autores = useMemo(() => {
    const base = ['Todos'];
    const setAut = new Set(
      books
        .map((l) => l.author)
        .filter(Boolean)
    );
    return base.concat([...setAut]);
  }, [books]);

  // --- Aplicar filtros ---
  const librosFiltrados = useMemo(() => {
    return books.filter((libro) => {
      const matchesCategory =
        selectedCategory === 'Todas' || libro.category === selectedCategory;

      const matchesAuthor =
        selectedAuthor === 'Todos' || libro.author === selectedAuthor;

      const matchesPrice =
        typeof libro.price === 'number'
          ? libro.price <= priceLimit
          : true;

      const matchesSearch =
        libro.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        libro.author?.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        matchesCategory &&
        matchesAuthor &&
        matchesPrice &&
        matchesSearch
      );
    });
  }, [books, selectedCategory, selectedAuthor, priceLimit, searchTerm]);

  // --- Render ---
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" />
        <p className="mt-3 mb-0">Cargando catálogo...</p>
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

  return (
    <Container fluid="md">
      <Row>
        {/* Columna Izquierda: Filtros */}
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
            {librosFiltrados.map((libro) => (
              <Col key={libro.id}>
                <BookCard 
                  book={libro}
                  onAddToCart={(item) =>
                    addToCart({
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      image: item.image,
                      qty: 1,
                    })
                  }
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
