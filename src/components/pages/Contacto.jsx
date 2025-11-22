import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ContactInfo from '../molecules/ContactInfo';
import ContactForm from '../molecules/ContactForm';

const Contacto = () => {
  return (
    <div className="py-5 bg-light" style={{ minHeight: '80vh' }}>
      <Container>
        <Row className="g-5 align-items-center">
          <Col lg={6}>
            <ContactInfo />
          </Col>
          <Col lg={6}>
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contacto;