import React from 'react';
import { Button, FormControl } from 'react-bootstrap';

const QuantitySelector = ({ qty, onIncrease, onDecrease, onChange }) => {
  return (
    <div className="d-flex align-items-center" style={{ width: 'fit-content' }}>
      <Button 
        variant="outline-secondary" 
        size="sm" 
        onClick={onDecrease}
        className="rounded-circle"
        style={{ width: '32px', height: '32px', padding: 0 }}
      >
        −
      </Button>
      
      <FormControl
        type="number"
        value={qty}
        onChange={(e) => onChange(parseInt(e.target.value) || 1)}
        className="mx-2 text-center border-0 bg-light"
        style={{ width: '50px', fontWeight: 'bold' }}
        min="1"
      />
      
      <Button 
        variant="outline-secondary" 
        size="sm" 
        onClick={onIncrease}
        className="rounded-circle"
        style={{ width: '32px', height: '32px', padding: 0 }}
      >
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;