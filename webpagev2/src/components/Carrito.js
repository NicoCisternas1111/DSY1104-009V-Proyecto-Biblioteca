import React, { useState, useEffect } from 'react';
import { Table, Button, FormControl, Alert } from 'react-bootstrap';
import { getCart, saveCart, setQty, removeFromCart, cartTotal, formatCLP } from '../storage';

const Carrito = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(getCart());
    }, []);

    const handleRemove = (id) => {
        removeFromCart(id);
        setCart(getCart());
    };

    const handleQtyChange = (id, newQty) => {
        setQty(id, newQty);
        setCart(getCart());
    };

    const handleEmptyCart = () => {
        saveCart([]);
        setCart([]);
    };

    if (cart.length === 0) {
        return <Alert variant="info">Tu carrito está vacío. Agrega un libro desde la página de inicio.</Alert>;
    }

    return (
        <>
            <h2 className="mb-4">Tu carrito</h2>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Portada</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr key={item.id}>
                                <td><img src={item.image} alt={item.title} style={{ width: '64px', height: '64px', objectFit: 'cover' }} /></td>
                                <td><strong>{item.title}</strong><div className="text-muted small">{item.author}</div></td>
                                <td>{formatCLP(item.price)}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <Button variant="outline-secondary" size="sm" onClick={() => handleQtyChange(item.id, item.qty - 1)}>−</Button>
                                        <FormControl
                                            type="number"
                                            value={item.qty}
                                            onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value, 10))}
                                            style={{ width: '80px', textAlign: 'center' }}
                                            className="mx-2"
                                            min="1"
                                        />
                                        <Button variant="outline-secondary" size="sm" onClick={() => handleQtyChange(item.id, item.qty + 1)}>+</Button>
                                    </div>
                                </td>
                                <td>{formatCLP(item.price * item.qty)}</td>
                                <td><Button variant="outline-danger" size="sm" onClick={() => handleRemove(item.id)}>Eliminar</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="d-flex justify-content-end mt-4">
                <div style={{ maxWidth: '360px' }} className="w-100">
                    <ul className="list-group mb-3">
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total</span><strong>{formatCLP(cartTotal())}</strong>
                        </li>
                    </ul>
                    <div className="d-grid d-md-flex gap-2">
                        <Button variant="outline-danger" onClick={handleEmptyCart}>Vaciar carrito</Button>
                        <Button variant="success" onClick={() => alert("Demo: aquí iría tu flujo de pago.")}>Proceder al pago</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Carrito;