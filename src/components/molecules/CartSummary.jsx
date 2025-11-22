import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PriceTag from '../atoms/PriceTag';

const CartSummary = ({ total, onEmpty, onCheckout }) => {
  return (
    <Card className="border-0 bg-light rounded-3 p-4">
      <h5 className="mb-3">Resumen del pedido</h5>
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <span className="h5 mb-0">Total</span>
        <span className="h4 mb-0 text-primary">
            <PriceTag value={total} className="text-primary" />
        </span>
      </div>
      
      <div className="d-grid gap-2">
        <Button variant="success" size="lg" onClick={onCheckout}>
          Ir a Pagar
        </Button>
        <Button variant="outline-danger" size="sm" onClick={onEmpty}>
          Vaciar carrito
        </Button>
      </div>
    </Card>
  );
};

export default CartSummary;