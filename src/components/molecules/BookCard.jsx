import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PriceTag from '../atoms/PriceTag';
import ActionBtn from '../atoms/ActionBtn';
import Magnet from '../../ui/reactbits/Magnet';

const BookCard = ({ book, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    onAddToCart(book);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 900);
  };

  return (
    <Card className="h-100 shadow-sm border-0 hover-effect">
      <Link to={`/libro/${book.id}`}>
        <div style={{ overflow: 'hidden', height: '300px' }}>
             <Card.Img 
               variant="top" 
               src={book.image} 
               className="w-100 h-100 object-fit-cover" 
             />
        </div>
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6 text-truncate">{book.title}</Card.Title>
        <Card.Text className="text-muted small mb-2">{book.author}</Card.Text>
        
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <PriceTag value={book.price} />
          
          <Magnet>
            <ActionBtn 
              size="sm" 
              onClick={handleClick} 
              disabled={isAdded}
              variant={isAdded ? "success" : "outline-primary"}
            >
              {isAdded ? '✓' : 'Añadir'}
            </ActionBtn>
          </Magnet>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;