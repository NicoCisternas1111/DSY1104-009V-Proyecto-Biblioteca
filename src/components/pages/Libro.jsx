import React, { useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { catalogoLibros } from '../../data/libros';
import { addToCart } from '../../storage';
import PriceTag from '../atoms/PriceTag';
import QuantitySelector from '../atoms/QuantitySelector';
import BookMeta from '../molecules/BookMeta';
import Magnet from '../../ui/reactbits/Magnet';

const Libro = () => {
  const { id } = useParams();
  const product = catalogoLibros.find(p => p.id === id);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return <Container className="py-5"><h2>Libro no encontrado 😢</h2></Container>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Container className="py-5">
      <Row className="g-5 align-items-start">
        {/* Columna Imagen */}
        <Col lg={5} className="position-relative">
          <div className="sticky-top" style={{ top: '100px', zIndex: 1 }}>
              <img
                src={product.image}
                className="img-fluid rounded-3 shadow-lg w-100"
                alt={`Portada de ${product.title}`}
                style={{ maxHeight: '600px', objectFit: 'cover' }}
              />
          </div>
        </Col>

        {/* Columna Info */}
        <Col lg={7}>
          <BookMeta 
            title={product.title}
            author={product.author}
            description={product.description}
            extendedDescription={product.extendedDescription}
          />

          <hr className="my-5 opacity-10" />

          <div className="d-flex flex-wrap align-items-center gap-4 mb-4">
            <div>
                <small className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.75rem' }}>Precio</small>
                <div className="fs-2 fw-bold text-dark">
                    <PriceTag value={product.price} className="text-dark" />
                </div>
            </div>

            <div className="vr opacity-25 d-none d-sm-block" style={{ height: '50px' }}></div>

            <div>
                <small className="text-uppercase text-muted fw-bold mb-1 d-block" style={{ fontSize: '0.75rem' }}>Cantidad</small>
                <QuantitySelector 
                    qty={qty} 
                    onChange={setQty}
                    onIncrease={() => setQty(q => q + 1)}
                    onDecrease={() => setQty(q => Math.max(1, q - 1))}
                />
            </div>
          </div>

          <div className="d-grid d-sm-flex gap-3">
            <Magnet>
              <Button
                variant={added ? "success" : "primary"}
                size="lg"
                onClick={handleAddToCart}
                disabled={added}
                className="px-5 rounded-pill"
              >
                {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
              </Button>
            </Magnet>

            <Button
              as={Link}
              to="/carrito"
              variant="outline-dark"
              size="lg"
              className="px-4 rounded-pill"
            >
              Ir al carrito
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Libro;