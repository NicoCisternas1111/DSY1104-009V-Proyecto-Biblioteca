import React from 'react';
import RollingGallery from '../../ui/reactbits/RollingGallery';

const FeaturedGallery = ({ items }) => {
  if (!items || items.length === 0) {
    return null; // Si no hay libros, no mostramos nada
  }

  // Solo usamos libros que tengan imagen definida
  const galleryItems = items
    .filter((l) => l && l.image)
    .map((l) => ({
      id: l.id,
      image: l.image,
    }));

  // Si después del filtro no queda nada, tampoco mostramos
  if (galleryItems.length === 0) {
    return null;
  }

  return (
    <div className="container mb-5">
      <RollingGallery
        items={galleryItems}
        clickable
        height={300}
        gap={24}
        speed={22}
        pauseOnHover={true}
        mask={true}
        aspect={0.6667}
      />
    </div>
  );
};

export default FeaturedGallery;
