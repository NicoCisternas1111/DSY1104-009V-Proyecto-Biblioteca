import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container className="text-center text-md-start">
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <p className="text-white-50 mt-2">© 2025 Todos los derechos reservados.</p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Enlaces</h5>
            <ul className="list-unstyled">
              <li><Link to="/somos" className="text-white text-decoration-none">Quiénes somos</Link></li>
              <li><Link to="/usuario" className="text-white text-decoration-none">Mi cuenta</Link></li>
              <li><Link to="/contacto" className="text-white text-decoration-none">Contacto</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Síguenos</h5>
            <a href="#" className="text-white me-2 fs-4"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-white me-2 fs-4"><i className="bi bi-instagram"></i></a>
            <a href="#" className="text-white fs-4"><i className="bi bi-twitter"></i></a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;