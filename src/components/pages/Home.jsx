import React from 'react';
import { catalogoLibros } from '../../data/libros';
import HeroSection from '../organisms/HeroSection';
import FeaturedGallery from '../organisms/FeaturedGallery';
import NewArrivals from '../organisms/NewArrivals';
import FluidGlassCard from '../../ui/reactbits/FluidGlassCard';

const Home = () => {
  const recentBooks = catalogoLibros.slice(0, 4);

  return (
    <>
      <HeroSection />
      
      <FeaturedGallery items={catalogoLibros} />

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
  );
};

export default Home;