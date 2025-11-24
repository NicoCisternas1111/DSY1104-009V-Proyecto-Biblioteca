import React from 'react';

const PriceTag = ({ value, className = '' }) => {
  const formattedValue = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(value);

  return (
    <span className={`fw-bold text-primary ${className}`}>
      {formattedValue}
    </span>
  );
};

export default PriceTag;