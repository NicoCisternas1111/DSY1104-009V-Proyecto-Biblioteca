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
      image: 'test.jpg',
    },
  ],
};

describe('Rúbrica RA3: Integración Backend y Visualización', () => {
  beforeEach(() => {
    // Mock de fetch compatible con apiRequest():
    // - fetch(url, config)
    // - res.headers.get('content-type')
    spyOn(window, 'fetch').and.callFake(() =>
      Promise.resolve({
        ok: true,
        headers: {
          get: () => 'application/json',
        },
        json: () => Promise.resolve(mockBooksResponse),
      })
    );
  });

  afterEach(() => {
    window.fetch.calls.reset();
  });

  it('Debe obtener libros desde la API y renderizarlos correctamente', async () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    await waitFor(() => {
      // fetchBooks() llama a /api/books?page=0&size=100 (y además pasa config como 2do argumento)
      expect(window.fetch).toHaveBeenCalled();
      expect(window.fetch.calls.argsFor(0)[0]).toMatch(/\/api\/books/);
      expect(typeof window.fetch.calls.argsFor(0)[1]).toBe('object');
    });

    await waitFor(() => {
      expect(screen.getByText('Libro Rúbrica 100%')).toBeTruthy();
      expect(screen.getByText('Estudiante Modelo')).toBeTruthy();
    });
  });

  it('Debe manejar errores de API gracefully (sin romper la app)', async () => {
    window.fetch.and.callFake(() => Promise.reject(new Error('API Caída')));
    spyOn(console, 'error'); // silenciar ruido de console.error del componente

    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    await waitFor(() => {
      // El componente muestra este mensaje cuando falla
      expect(screen.getByText(/no se pudieron cargar los libros del catálogo/i)).toBeTruthy();
    });
  });
});
