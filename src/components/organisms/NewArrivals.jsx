import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BookCard from '../molecules/BookCard';
import { addToCart } from '../../storage';

const NewArrivals = ({ books }) => {
  return (
    <div className="container mb-5">
      <h2 className="text-center mb-4 display-6">Novedades</h2>
      <Row xs={1} md={2} lg={4} className="g-4">
        {books.map((book) => (
          <Col key={book.id}>
            <BookCard 
                book={book} 
                onAddToCart={(item) => addToCart({ ...item, qty: 1 })}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default NewArrivals;