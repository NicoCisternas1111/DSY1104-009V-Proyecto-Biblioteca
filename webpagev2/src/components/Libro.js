import React, { useState } from 'react';
import { Row, Col, Button, FormControl, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { addToCart, formatCLP } from '../storage';
import { catalogoLibros } from '../data/libros';
import { Link } from 'react-router-dom';

const Libro = () => {
    const { id } = useParams();
    const product = catalogoLibros.find(p => p.id === id);

    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    if (!product) {
        return <Alert variant="danger">Libro no encontrado.</Alert>;
    }

    const handleAddToCart = () => {
        addToCart({ ...product, qty });
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    return (
        <Row className="g-4 align-items-start">
            <Col lg={5}>
                <img src={product.image} className="img-fluid rounded shadow" alt={`Portada de ${product.title}`} />
            </Col>
            <Col lg={7}>
                <h1 className="h2 mb-1">{product.title}</h1>
                <h2 className="h5 text-muted mb-3">{product.author}</h2>
                
                <p className="lead mb-4">{product.description}</p>
                <hr />
                <h5 className="mt-4">Sinopsis</h5>
                <p style={{ whiteSpace: 'pre-wrap' }}>{product.extendedDescription}</p>
                
                <div className="d-flex align-items-center my-4">
                    <span className="h4 me-3">{formatCLP(product.price)}</span>
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