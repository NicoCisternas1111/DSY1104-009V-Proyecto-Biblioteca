import React from 'react';
import RollingGallery from '../../ui/reactbits/RollingGallery';

const FeaturedGallery = ({ items }) => {
  const galleryItems = items.map(l => ({ id: l.id, image: l.image }));

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