import React from 'react';
import { Accordion } from 'react-bootstrap';

const AboutValues = () => {
  return (
    <Accordion defaultActiveKey="0" flush className="shadow-sm rounded">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Nuestra Misión</Accordion.Header>
        <Accordion.Body>
          Fomentar la lectura y el acceso a la cultura en nuestra comunidad,
          ofreciendo una selección diversa de libros para todas las edades y gustos.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Nuestra Visión</Accordion.Header>
        <Accordion.Body>
          Ser la librería referente en la zona sur de Santiago, reconocida por
          nuestra atención personalizada y nuestro compromiso con la educación.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Nuestros Valores</Accordion.Header>
        <Accordion.Body>
          Pasión por los libros, honestidad, compromiso con el cliente y responsabilidad social.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AboutValues;