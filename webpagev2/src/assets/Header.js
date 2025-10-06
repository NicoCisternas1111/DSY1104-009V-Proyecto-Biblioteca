import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Form, FormControl, Nav } from 'react-bootstrap';
import { getCart } from '../storage';
import logo from '../assets/logo.png';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateBadge = () => {
      const count = getCart().reduce((sum, item) => sum + (item.qty || 0), 0);
      setCartCount(count);
    };

    updateBadge();
    window.addEventListener('storage', updateBadge); // Escucha cambios en el storage

    return () => {
      window.removeEventListener('storage', updateBadge);
    };
  }, []);

  return (
    <Navbar bg="light" expand="lg" className="border-bottom sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/"><img src={logo} width="40" alt="Librería Duoc" /> Librería Duoc</Navbar.Brand>
        <Form className="d-flex mx-auto">
          <FormControl type="search" placeholder="Buscar Título, Autor..." className="me-2" style={{ width: '250px' }} />
        </Form>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/usuario"><i className="bi bi-person-circle fs-4"></i></Nav.Link>
          <Nav.Link as={Link} to="/carrito" className="position-relative">
            <i className="bi bi-cart-fill fs-4"></i>
            {cartCount > 0 && (
              <span className="badge text-bg-primary rounded-pill position-absolute top-0 start-100 translate-middle">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;