import React, { useEffect, useState } from 'react';
import HeroSection from '../organisms/HeroSection';
import FeaturedGallery from '../organisms/FeaturedGallery';
import NewArrivals from '../organisms/NewArrivals';
import FluidGlassCard from '../../ui/reactbits/FluidGlassCard';
import { fetchBooks } from '../../services/api';

// Últimos N libros por fecha de creación
function getRecentBooks(list, count = 8) {
  if (!Array.isArray(list) || list.length === 0) return [];

  const sorted = [...list].sort((a, b) => {
    const da = new Date(a.createdAt || a.created_at || 0);
    const db = new Date(b.createdAt || b.created_at || 0);
    return db - da; // nuevos primero
  });

  return sorted.slice(0, count);
}

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        setError('');

        // Pide muchos libros para que el carrusel tenga todos
        const data = await fetchBooks({ page: 0, size: 1000 });

        const list = Array.isArray(data) ? data : (data?.content || []);
        setBooks(list);
      } catch (err) {
        console.error('Error cargando libros para el home:', err);
        setError('No se pudieron cargar los libros. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  // Ahora los 8 más nuevos
  const recentBooks = getRecentBooks(books, 8);

  return (
    <>
      <HeroSection />

      {loading && (
        <div className="container my-4">
          <p>Cargando libros destacados...</p>
        </div>
      )}

      {error && (
        <div className="container my-4">
          <div className="alert alert-danger mb-0" role="alert">
            {error}
          </div>
        </div>
      )}

      {!loading && !error && books.length > 0 && (
        <>
          {/* Carrusel usa TODOS los libros cargados */}
          <FeaturedGallery items={books} />

          <div className="container mb-5">
            <FluidGlassCard title="Recomendado del Mes" subtitle="Literatura contemporánea">
              <p className="mb-0">
                Selección curada por nuestro equipo editorial. Descubre historias que están marcando
                tendencia y rescata joyas ocultas que no te puedes perder.
              </p>
            </FluidGlassCard>
          </div>

          {/* 8 más nuevos */}
          <NewArrivals books={recentBooks} />
        </>
      )}

      {!loading && !error && books.length === 0 && (
        <div className="container my-4">
          <p>No hay libros disponibles aún. Vuelve más tarde.</p>
        </div>
      )}
    </>
  );
};

export default Home;
