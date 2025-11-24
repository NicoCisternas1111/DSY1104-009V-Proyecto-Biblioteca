import React from 'react';
import TextTrail from '../../ui/reactbits/TextTrail';
import RotatingText from '../../ui/reactbits/RotatingText';

const HeroSection = () => {
  return (
    <section className="py-5 text-center bg-light mb-4">
      <div className="container">
        <div style={{ minHeight: '100px' }}>
            <TextTrail text="Librería Duoc" />
        </div>
        <div className="mt-3">
          <RotatingText
            items={['Novedades semanales', 'Best-sellers', 'Envíos a todo Chile']}
            interval={2000}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;