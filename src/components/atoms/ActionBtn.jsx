import React from 'react';
import { Button } from 'react-bootstrap';

const ActionBtn = ({ children, variant = 'primary', onClick, disabled, ...props }) => {
  return (
    <Button 
      variant={variant} 
      onClick={onClick} 
      disabled={disabled}
      className={`rounded-pill px-4 ${props.className || ''}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ActionBtn;