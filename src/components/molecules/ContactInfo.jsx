import React from 'react';

const ContactInfo = () => {
  return (
    <div className="pe-md-5">
      <h2 className="mb-4 text-primary fw-bold">Ponte en contacto</h2>
      <p className="lead text-muted mb-4">
        ¿Tienes dudas sobre un libro? ¿Problemas con un pedido? 
        Estamos aquí para ayudarte.
      </p>
      
      <div className="d-flex mb-3 align-items-start">
        <i className="bi bi-geo-alt fs-4 text-primary me-3"></i>
        <div>
          <h6 className="fw-bold mb-0">Dirección</h6>
          <p className="text-muted">Av. Concha y Toro 1234, Puente Alto</p>
        </div>
      </div>

      <div className="d-flex mb-3 align-items-start">
        <i className="bi bi-envelope fs-4 text-primary me-3"></i>
        <div>
          <h6 className="fw-bold mb-0">Email</h6>
          <p className="text-muted">contacto@libreriaduoc.cl</p>
        </div>
      </div>

      <div className="d-flex mb-3 align-items-start">
        <i className="bi bi-telephone fs-4 text-primary me-3"></i>
        <div>
          <h6 className="fw-bold mb-0">Teléfono</h6>
          <p className="text-muted">+56 2 2345 6789</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;