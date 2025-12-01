import React from 'react';
import { ListGroup, Form } from 'react-bootstrap';

const CatalogFilter = ({ 
  categories, 
  authors, 
  selectedCategory, 
  setSelectedCategory,
  selectedAuthor,
  setSelectedAuthor,
  priceLimit,
  setPriceLimit 
}) => {
  return (
    <div className="bg-light p-3 rounded">
      <h5 className="mb-3">Filtrar por</h5>
      
      {/* Filtro Categoría */}
      <h6 className="mt-3">Categoría</h6>
      <ListGroup variant="flush" className="mb-3">
        {categories.map(cat => (
          <ListGroup.Item 
            key={cat} 
            action 
            active={cat === selectedCategory}
            onClick={() => setSelectedCategory(cat)}
            className="bg-transparent border-0 py-1 px-2"
          >
            {cat}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Filtro Precio */}
      <h6 className="mt-3">Precio Máximo</h6>
      <Form.Range 
        min={0} max={30000} step={1000} 
        value={priceLimit}
        onChange={(e) => setPriceLimit(Number(e.target.value))}
      />
      <div className="text-end small text-muted">${priceLimit.toLocaleString()}</div>
    </div>
  );
};

export default CatalogFilter;