import React from 'react';

const BookMeta = ({ title, author, description, extendedDescription }) => {
  return (
    <>
      <h6 className="text-uppercase text-primary fw-bold letter-spacing-2 mb-2">Libro</h6>
      <h1 className="display-4 fw-bold mb-2">{title}</h1>
      <h3 className="h5 text-muted mb-4">por {author}</h3>
      
      <p className="lead mb-4">{description}</p>
      
      <div className="bg-light p-4 rounded-3 mb-4">
        <h6 className="fw-bold mb-2">Sinopsis</h6>
        <p className="mb-0 text-secondary" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
            {extendedDescription}
        </p>
      </div>
    </>
  );
};

export default BookMeta;