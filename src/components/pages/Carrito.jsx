import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getCart, saveCart, setQty, removeFromCart, cartTotal } from '../../storage';
import CartItemRow from '../molecules/CartItemRow';
import CartSummary from '../molecules/CartSummary';
import { fetchBookById, updateBook } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Carrito = () => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleCheckout = async () => {
    setMessage('');
    setError('');

    if (cart.length === 0) {
      setError('El carrito está vacío.');
      return;
    }

    // Cualquier usuario logueado puede simular la compra
    if (!user) {
      alert('Debes iniciar sesión para simular la compra.');
      navigate('/usuario');
      return;
    }

    const confirmar = window.confirm(
      `Vas a simular un pago por un total de ${cartTotal()} (formato demo). ¿Confirmar compra?`
    );

    if (!confirmar) return;

    try {
      setProcessing(true);

      for (const item of cart) {
        // 1. Obtenemos el libro actualizado desde el backend
        const book = await fetchBookById(item.id);

        const currentStock = book.stock ?? 0;
        const newStock = currentStock - item.qty;

        if (newStock < 0) {
          throw new Error(`Stock insuficiente para "${book.title}".`);
        }

        // 2. Preparamos payload para updateBook (sin campos de solo lectura / HATEOAS)
        const {
          id,
          createdAt,
          updatedAt,
          created_at,
          updated_at,
          _links,
          ...bookPayload
        } = book;

        const payload = {
          ...bookPayload,
          stock: newStock,
        };

        // 3. Actualizamos el libro en el backend (descontar stock)
        await updateBook(item.id, payload);
      }

      // 4. Vaciar carrito y mostrar mensaje
      handleEmptyCart();
      setMessage('Compra simulada correctamente. El stock fue actualizado en la base de datos.');
    } catch (err) {
      console.error(err);

      if (err.status === 403) {
        setError(
          'El servidor rechazó la operación (403). Revisa la configuración de seguridad para permitir que usuarios normales actualicen el stock al comprar.'
        );
      } else {
        setError(err.message || 'No se pudo completar la compra.');
      }
    } finally {
      setProcessing(false);
    }
  };

  // Vista de carrito vacío
  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        {message && <Alert variant="success" className="mb-4">{message}</Alert>}
        {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

        <div className="py-5">
          <i className="bi bi-cart-x display-1 text-muted mb-3"></i>
          <h2 className="mb-3">Tu carrito está vacío</h2>
          <p className="text-muted mb-4">Parece que aún no has agregado libros.</p>
          <a href="/catalogo" className="btn btn-primary btn-lg rounded-pill px-5">
            Explorar Catálogo
          </a>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4 fw-bold">
        Tu Carrito{' '}
        <span className="fs-5 text-muted fw-normal">({cart.length} items)</span>
      </h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

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
            onCheckout={handleCheckout}
            processing={processing}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Carrito;
