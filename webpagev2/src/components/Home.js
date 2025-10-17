import React, { useState } from 'react';
import { Card, Button, Row, Col, Carousel } from 'react-bootstrap';
import { addToCart } from '../storage';
import { Link } from 'react-router-dom';
import { catalogoLibros } from '../data/libros';

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

    return (
        <>
            <Carousel className="home-carousel mb-5">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.libreriadelgam.cl/images/bloques_sliders/003-es-despachos-nov-2021.webp"
                        alt="Nuevos Lanzamientos"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://contrapunto.cl/cdn/shop/files/luminias.png?v=1753198995&width=1920"
                        alt="Ofertas del Mes"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.libreriadelgam.cl/images/bloques_sliders/012-es-copia-de-copia-de-retiro-en-tienda-3.webp"
                        alt="Autores Destacados"
                    />
                </Carousel.Item>
            </Carousel>

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
                                <Card.Subtitle className="mb-2 text-muted">${product.price.toLocaleString()}</Card.Subtitle>
                                <Button
                                    variant="primary"
                                    className="mt-auto"
                                    onClick={() => handleAddToCart(product)}
                                    disabled={added[product.id]}
                                >
                                    {added[product.id] ? <><i className="bi bi-check2"></i> Agregado</> : <><i className="bi bi-cart-plus"></i> Añadir al carrito</>}
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