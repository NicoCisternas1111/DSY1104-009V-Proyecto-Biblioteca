import React from 'react';
import '../../ui/reactbits/reactbits.css'; 

const PromoMarquee = () => {
  return (
    <div
      className="d-none d-md-block"
      style={{
        background: '#f8f9fa',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        borderBottom: '1px solid #e5e5e5',
      }}
    >
      <div
        className="marquee-text"
        style={{
          display: 'inline-block',
          padding: '6px 0',
          fontWeight: '500',
          fontSize: '0.9rem',
          animation: 'marquee 18s linear infinite',
        }}
      >
        🚚 Despachos gratis sobre $35.000 &nbsp; • &nbsp;
        📚 Nuevas ediciones limitadas &nbsp; • &nbsp;
        💳 3 y 6 cuotas sin interés &nbsp; • &nbsp;
        🕒 Atención personalizada para estudiantes &nbsp; • &nbsp;
      </div>
    </div>
  );
};

export default PromoMarquee;