import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Catalogo from '../src/components/pages/Catalogo';

const mockBooksResponse = {
  content: [
    {
      id: '1',
      title: 'Libro Rúbrica 100%',
      author: 'Estudiante Modelo',
      price: 15000,
      category: 'Educación',
      image: 'test.jpg'
    }
  ]
};

describe('Rúbrica RA3: Integración Backend y Visualización', () => {
  
  beforeEach(() => {
    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockBooksResponse)
    }));
  });

  it('Debe obtener libros desde la API y renderizarlos correctamente', async () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    expect(window.fetch).toHaveBeenCalledWith(jasmine.stringMatching('/api/books'));

    await waitFor(() => {
      expect(screen.getByText('Libro Rúbrica 100%')).toBeTruthy();
      expect(screen.getByText('Estudiante Modelo')).toBeTruthy();
    });
  });

  it('Debe manejar errores de API gracefully (sin romper la app)', async () => {
    window.fetch.and.returnValue(Promise.reject('API Caída'));
    spyOn(console, 'error');

    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.queryByText('Libro Rúbrica 100%')).toBeNull();
    });
  });
});