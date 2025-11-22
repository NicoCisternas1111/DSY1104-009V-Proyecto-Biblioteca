import React from 'react';
import { Button } from 'react-bootstrap';
import PriceTag from '../atoms/PriceTag';
import QuantitySelector from '../atoms/QuantitySelector';

const CartItemRow = ({ item, onUpdateQty, onRemove }) => {
  return (
    <tr className="align-middle">
      <td style={{ width: '100px' }}>
        <img 
          src={item.image} 
          alt={item.title} 
          className="rounded shadow-sm"
          style={{ width: '64px', height: '90px', objectFit: 'cover' }} 
        />
      </td>
      <td>
        <h6 className="mb-0 text-primary">{item.title}</h6>
        <small className="text-muted">{item.author}</small>
      </td>
      <td><PriceTag value={item.price} className="fw-normal text-dark" /></td>
      <td>
        <QuantitySelector 
          qty={item.qty}
          onIncrease={() => onUpdateQty(item.id, item.qty + 1)}
          onDecrease={() => onUpdateQty(item.id, item.qty - 1)}
          onChange={(val) => onUpdateQty(item.id, val)}
        />
      </td>
      <td><PriceTag value={item.price * item.qty} /></td>
      <td className="text-end">
        <Button 
            variant="link" 
            className="text-danger p-0 text-decoration-none" 
            onClick={() => onRemove(item.id)}
        >
            <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default CartItemRow;