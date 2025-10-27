import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { addToCart } from '../storage';
import { Link } from 'react-router-dom';
import { catalogoLibros } from '../data/libros';
import TextTrail from '../ui/reactbits/TextTrail';
import RotatingText from '../ui/reactbits/RotatingText';
import FluidGlassCard from '../ui/reactbits/FluidGlassCard';
import RollingGallery from '../ui/reactbits/RollingGallery';
import '../ui/reactbits/reactbits.css';

const products = catalogoLibros.slice(0, 4);

const Home = () => {
  const [added, setAdded] = useState({});

  const handleAddToCart = (product) => {
    addToCart({ ...product, qty: 1 });
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAdded(prev => ({ ...prev, [product.id]: false }));
    }, 900);
  };

  const galleryItems = catalogoLibros.map(l => ({ id: l.id, image: l.image }));

  return (
    <>
      <section className="py-5 text-center">
        <div className="container">
          <TextTrail text="Librería Duoc" />
          <div className="mt-2">
            <RotatingText
              items={['Novedades semanales', 'Best-sellers', 'Envíos a todo Chile']}
              interval={2000}
            />
          </div>
        </div>
      </section>

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

      <div className="container mb-4">
        <FluidGlassCard title="Recomendado del Mes" subtitle="Literatura contemporánea">
          <p className="mb-0">
            Selección curada por nuestro equipo editorial. Descubre historias que están marcando
            tendencia y rescata joyas ocultas que no te puedes perder.
          </p>
        </FluidGlassCard>
      </div>

      <h2 className="text-center mb-4">Novedades</h2>
      <Row xs={1} md={2} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id} className="d-flex align-items-stretch">
            <Card className="book-card">
              <Link to={`/libro/${product.id}`}>
                <Card.Img variant="top" src={product.image} />
              </Link>
              <Card.Body className="d-flex flex-column">
                <Card.Title>
                  <Link to={`/libro/${product.id}`} className="text-decoration-none text-dark">
                    {product.title}
                  </Link>
                </Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                  ${product.price.toLocaleString()}
                </Card.Subtitle>
                <Button
                  variant="primary"
                  className="mt-auto"
                  onClick={() => handleAddToCart(product)}
                  disabled={added[product.id]}
                >
                  {added[product.id]
                    ? <><i className="bi bi-check2"></i> Agregado</>
                    : <><i className="bi bi-cart-plus"></i> Añadir al carrito</>}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;