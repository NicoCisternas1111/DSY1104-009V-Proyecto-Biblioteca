import React, { useEffect, useState } from 'react';
import HeroSection from '../organisms/HeroSection';
import FeaturedGallery from '../organisms/FeaturedGallery';
import NewArrivals from '../organisms/NewArrivals';
import FluidGlassCard from '../../ui/reactbits/FluidGlassCard';
import { fetchBooks } from '../../services/api';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        setError('');

        // Pedimos algunos libros para el home (ajusta el size si quieres)
        const data = await fetchBooks({ size: 12 });

        // Soporta tanto array plano como respuesta paginada
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

  const recentBooks = books.slice(0, 4);

  return (
    <>
      <HeroSection />

      {/* Estado de carga / error simple */}
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
          <FeaturedGallery items={books} />

          <div className="container mb-5">
            <FluidGlassCard title="Recomendado del Mes" subtitle="Literatura contemporánea">
              <p className="mb-0">
                Selección curada por nuestro equipo editorial. Descubre historias que están marcando
                tendencia y rescata joyas ocultas que no te puedes perder.
              </p>
            </FluidGlassCard>
          </div>

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
