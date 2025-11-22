import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Offcanvas, Button } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import PromoMarquee from '../molecules/PromoMarquee';
import CartWidget from '../molecules/CartWidget';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
                
                {/* ENLACE SOLO PARA ADMINISTRADORES */}
                {user && user.role === 'admin' && (
                    <Nav.Link as={Link} to="/admin" className="text-danger fw-bold">
                        <i className="bi bi-shield-lock me-1"></i>Admin Panel
                    </Nav.Link>
                )}
              </Nav>

              <Nav className="d-flex flex-row align-items-center mt-3 mt-lg-0 gap-3">
                <CartWidget />
                
                {user ? (
                    <div className="d-flex align-items-center gap-2 border-start ps-3">
                        <span className="text-muted small d-none d-xl-block">Hola, {user.name}</span>
                        <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            onClick={handleLogout}
                            title="Cerrar Sesión"
                        >
                            <i className="bi bi-box-arrow-right"></i>
                        </Button>
                    </div>
                ) : (
                    <Nav.Link as={Link} to="/usuario" className="btn btn-sm btn-outline-primary px-3 ms-2">
                        <i className="bi bi-person-circle me-1"></i>Ingresar
                    </Nav.Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;