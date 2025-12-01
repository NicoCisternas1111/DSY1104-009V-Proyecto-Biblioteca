import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { getCart } from '../../storage';

const CartWidget = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateBadge = () => {
      const count = getCart().reduce((sum, item) => sum + (item.qty || 0), 0);
      setCartCount(count);
    };

    updateBadge();
    window.addEventListener('storage', updateBadge);
    return () => window.removeEventListener('storage', updateBadge);
  }, []);

  return (
    <Nav.Link as={Link} to="/carrito" className="position-relative">
      <i className="bi bi-cart-fill fs-4"></i>
      {cartCount > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
          {cartCount > 99 ? '99+' : cartCount}
          <span className="visually-hidden">artículos</span>
        </span>
      )}
    </Nav.Link>
  );
};

export default CartWidget;