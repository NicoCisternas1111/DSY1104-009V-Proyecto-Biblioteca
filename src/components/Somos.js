import React from 'react';
import { Row, Col } from 'react-bootstrap';
import FluidGlassCard from '../ui/reactbits/FluidGlassCard';
import '../ui/reactbits/reactbits.css';

const Somos = () => {
  return (
    <Row className="align-items-center">
      <Col md={6} className="mb-4 mb-md-0">
        <img
          src="https://www.casadellibro.com/blog/wp-content/uploads/2020/11/1366_2000.jpg"
          className="img-fluid rounded shadow"
          alt="Imagen de la librería"
        />
      </Col>

      <Col md={6}>
        <FluidGlassCard title="Quiénes somos" subtitle="Tu librería favorita en la web">
          <h2 className="mb-3">Nuestra Historia</h2>
          <p>
            Fundada en el corazón de la comunidad estudiantil, Librería Duoc nació con la misión de ser más que una simple tienda de libros.
            Somos un espacio de encuentro para la cultura, el conocimiento y la creatividad.
          </p>
          <p>
            Desde nuestros inicios, hemos trabajado para ofrecer una cuidada selección de textos académicos, literatura clásica y contemporánea,
            así como las últimas novedades del mundo editorial. Nuestro compromiso es apoyar a estudiantes, profesionales y a todos los amantes de la lectura
            en su camino de aprendizaje y descubrimiento.
          </p>
          <p className="mb-0">
            Creemos en el poder de los libros para transformar vidas y conectar personas. Por eso, nuestro equipo está siempre dispuesto a ofrecerte
            una recomendación personalizada y a ayudarte a encontrar exactamente lo que buscas.
          </p>
        </FluidGlassCard>
      </Col>
    </Row>
  );
};

export default Somos;