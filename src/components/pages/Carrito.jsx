import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Alert } from 'react-bootstrap';
import { getCart, saveCart, setQty, removeFromCart, cartTotal } from '../../storage';
import CartItemRow from '../molecules/CartItemRow';
import CartSummary from '../molecules/CartSummary';

const Carrito = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(getCart());
    }, []);

    const handleUpdateQty = (id, newQty) => {
        setQty(id, newQty);
        setCart(getCart());
    };

    const handleRemove = (id) => {
        removeFromCart(id);
        setCart(getCart());
    };

    const handleEmptyCart = () => {
        saveCart([]);
        setCart([]);
    };

    if (cart.length === 0) {
        return (
            <Container className="py-5 text-center">
                <div className="py-5">
                    <i className="bi bi-cart-x display-1 text-muted mb-3"></i>
                    <h2 className="mb-3">Tu carrito está vacío</h2>
                    <p className="text-muted mb-4">Parece que aún no has agregado libros.</p>
                    <a href="/catalogo" className="btn btn-primary btn-lg rounded-pill px-5">Explorar Catálogo</a>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h2 className="mb-4 fw-bold">Tu Carrito <span className="fs-5 text-muted fw-normal">({cart.length} items)</span></h2>
            
            <Row className="g-5">
                {/* Columna Izquierda: Lista de items */}
                <Col lg={8}>
                    <div className="table-responsive">
                        <Table hover borderless className="align-middle">
                            <thead className="text-muted border-bottom">
                                <tr>
                                    <th scope="col" className="pb-3 fw-normal">Producto</th>
                                    <th scope="col" className="pb-3 fw-normal">Detalle</th>
                                    <th scope="col" className="pb-3 fw-normal">Precio</th>
                                    <th scope="col" className="pb-3 fw-normal">Cantidad</th>
                                    <th scope="col" className="pb-3 fw-normal">Subtotal</th>
                                    <th scope="col" className="pb-3 fw-normal"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
                                    <CartItemRow 
                                        key={item.id} 
                                        item={item} 
                                        onUpdateQty={handleUpdateQty}
                                        onRemove={handleRemove}
                                    />
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>

                {/* Columna Derecha: Resumen */}
                <Col lg={4}>
                    <CartSummary 
                        total={cartTotal()} 
                        onEmpty={handleEmptyCart} 
                        onCheckout={() => alert("Demo: Integración de pago pendiente")}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Carrito;