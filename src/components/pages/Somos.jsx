import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TextSplitter from '../../ui/reactbits/TextSplitter'; 
import AboutValues from '../organisms/AboutValues';
import '../../ui/reactbits/reactbits.css';

const Somos = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center mb-5">
        <Col md={10}>
          {/* Título animado */}
          <div style={{ height: '100px', overflow: 'hidden' }}>
             <TextSplitter
                text="Sobre Nosotros"
                className="display-3 fw-bold text-primary"
                style={{ fontSize: '3rem' }}
              />
          </div>
          
          <p className="lead text-muted mt-3">
            Somos más que una librería; somos un punto de encuentro para los amantes de las letras, 
            la imaginación y el conocimiento. Fundada en 2024, Librería Duoc busca acercar 
            los grandes clásicos y las nuevas tendencias a todos los lectores.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          <AboutValues />
        </Col>
      </Row>
      
      {/* Sección extra: Imagen o Frase */}
      <Row className="mt-5 text-center">
        <Col>
            <blockquote className="blockquote">
                <p className="mb-0">"Un libro es un sueño que tienes en tus manos."</p>
                <footer className="blockquote-footer mt-2">Neil Gaiman</footer>
            </blockquote>
        </Col>
      </Row>
    </Container>
  );
};

export default Somos;