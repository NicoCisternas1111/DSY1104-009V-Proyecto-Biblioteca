import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { addToCart } from '../storage';

const products = [
    { id: "isbn-9789560000001", title: "El Valle de los Caballos", author: "Jean M. Auel", description: "La inteligencia y la curiosidad de Ayla la impulsan a seguir su propio camino.", price: 12990, image: "https://www.lachilenalibros.cl/4152-large_default/el-valle-de-los-caballos.jpg" },
    { id: "libro2", title: "El Problema Final", author: "Arturo Pérez-Reverte", description: "Una novela de misterio absorbente ambientada en los Alpes suizos.", price: 19990, image: "https://www.antartica.cl/media/catalog/product/9/7/9789563844191_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700" },
    { id: "libro3", title: "Cien Años de Soledad", author: "Gabriel García Márquez", description: "La aclamada obra de Gabriel García Márquez que narra la historia de los Buendía.", price: 15500, image: "https://www.antartica.cl/media/catalog/product/9/7/9788439745358_1_4.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700" },
    { id: "libro4", title: "Harry Potter y la Piedra Filosofal", author: "J.K. Rowling", description: "El inicio de la mágica saga que cautivó a millones de lectores en todo el mundo.", price: 14990, image: "https://www.antartica.cl/media/catalog/product/9/7/9786287744035_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700" },
];

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
            <h2 className="text-center mb-4">Novedades</h2>
            <Row xs={1} md={2} lg={4} className="g-4">
                {products.map((product) => (
                    <Col key={product.id} className="d-flex align-items-stretch">
                        <Card className="book-card">
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{product.title}</Card.Title>
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