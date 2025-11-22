import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import PromoMarquee from '../molecules/PromoMarquee';
import CartWidget from '../molecules/CartWidget';

const Header = () => {
  return (
    <>
      <PromoMarquee />
      
      <Navbar bg="light" expand="lg" className="border-bottom sticky-top mb-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              width="40"
              alt="Librería Duoc"
              className="d-inline-block align-top me-2"
            />
            Librería Duoc
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />

          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
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
                <CartWidget />
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;