import React, { useState } from 'react';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import { addToCart, formatCLP } from '../storage';
import { Link } from 'react-router-dom';

// En una aplicación real, este producto vendría de una API o de las props.
const PRODUCTO = {
  id: "isbn-9789560000001",
  title: "El Valle de los Caballos",
  author: "Jean M. Auel",
  description: "La inteligencia y la curiosidad de Ayla la impulsan a seguir su propio camino.",
  price: 12990,
  image: "https://www.lachilenalibros.cl/4152-large_default/el-valle-de-los-caballos.jpg"
};

const Libro = () => {
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart({ ...PRODUCTO, qty });
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    return (
        <Row className="g-4 align-items-start">
            <Col lg={5}>
                <img src={PRODUCTO.image} className="img-fluid rounded shadow" alt={`Portada de ${PRODUCTO.title}`} />
            </Col>
            <Col lg={7}>
                <h1 className="h3 mb-1">{PRODUCTO.title}</h1>
                <div className="text-muted mb-3">{PRODUCTO.author}</div>
                <p className="mb-4">{PRODUCTO.description}</p>

                <div className="d-flex align-items-center mb-3">
                    <span className="h4 me-3">{formatCLP(PRODUCTO.price)}</span>
                    <div className="ms-auto d-flex align-items-center">
                        <Button variant="outline-secondary" onClick={() => setQty(Math.max(1, qty - 1))}>−</Button>
                        <FormControl
                            type="number"
                            value={qty}
                            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                            className="mx-2"
                            style={{ width: '80px', textAlign: 'center' }}
                        />
                        <Button variant="outline-secondary" onClick={() => setQty(qty + 1)}>+</Button>
                    </div>
                </div>

                <div className="d-grid d-sm-flex gap-2">
                    <Button variant="primary" size="lg" onClick={handleAddToCart} disabled={added}>
                        {added ? 'Agregado ✓' : 'Agregar al carrito'}
                    </Button>
                    <Button as={Link} to="/carrito" variant="outline-secondary" size="lg">Ver carrito</Button>
                </div>
            </Col>
        </Row>
    );
};

export default Libro;