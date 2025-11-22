import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SocialLinks from '../molecules/SocialLinks';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <Container className="text-center text-md-start">
        <Row className="g-4">
          <Col md={4}>
            <h5 className="text-uppercase mb-3">Librería Duoc</h5>
            <p className="text-white-50 small">
              Tu espacio para encontrar conocimiento, aventuras y nuevas historias.
            </p>
            <p className="text-white-50 mt-2 small">© 2025 Todos los derechos reservados.</p>
          </Col>
          
          <Col md={4}>
            <h5 className="text-uppercase mb-3">Enlaces Rápidos</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/somos" className="text-white-50 text-decoration-none hover-white">Quiénes somos</Link></li>
              <li><Link to="/catalogo" className="text-white-50 text-decoration-none hover-white">Catálogo Completo</Link></li>
              <li><Link to="/contacto" className="text-white-50 text-decoration-none hover-white">Contacto</Link></li>
            </ul>
          </Col>
          
          <Col md={4}>
            <h5 className="text-uppercase mb-3">Síguenos</h5>
            <SocialLinks />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;