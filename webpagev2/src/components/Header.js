import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import { getCart } from '../storage';
import logo from '../assets/logo.png';
import '../ui/reactbits/reactbits.css'; // mantenemos el css base

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateBadge = () => {
      const count = getCart().reduce((sum, item) => sum + (item.qty || 0), 0);
      setCartCount(count);
    };

    updateBadge();
    window.addEventListener('storage', updateBadge);

    return () => {
      window.removeEventListener('storage', updateBadge);
    };
  }, []);

  return (
    <>
      {/* === Franja de promociones con marquesina lateral === */}
      <div
        className="d-none d-md-block"
        style={{
          background: '#f8f9fa',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          borderBottom: '1px solid #e5e5e5',
        }}
      >
        <div
          className="marquee-text"
          style={{
            display: 'inline-block',
            padding: '6px 0',
            fontWeight: '500',
            fontSize: '0.9rem',
            animation: 'marquee 18s linear infinite',
          }}
        >
          🚚 Despachos gratis sobre $35.000 &nbsp; • &nbsp;
          📚 Nuevas ediciones limitadas &nbsp; • &nbsp;
          💳 3 y 6 cuotas sin interés &nbsp; • &nbsp;
          🕒 Atención personalizada para estudiantes &nbsp; • &nbsp;
        </div>
      </div>

      {/* === Navbar principal === */}
      <Navbar bg="light" expand="lg" className="border-bottom sticky-top mb-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              width="40"
              alt="Librería Duoc"
              className="d-inline-block align-top"
            />{' '}
            Librería Duoc
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />

          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                Menú
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
                <Nav.Link as={Link} to="/somos">Quiénes Somos</Nav.Link>
                <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
              </Nav>

              <Nav className="d-flex flex-row align-items-center mt-3 mt-lg-0">
                <Nav.Link as={Link} to="/usuario" className="me-2">
                  <i className="bi bi-person-circle fs-4"></i>
                </Nav.Link>
                <Nav.Link as={Link} to="/carrito" className="position-relative">
                  <i className="bi bi-cart-fill fs-4"></i>
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                      {cartCount > 99 ? '99+' : cartCount}
                      <span className="visually-hidden">artículos en el carrito</span>
                    </span>
                  )}
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;