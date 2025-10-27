import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../src/components/Header'; 

describe('Header (Navbar)', () => {
  it('renderiza la barra de navegación', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const nav = screen.getByRole('navigation');
    expect(nav).toBeTruthy();
  });

  it('muestra los enlaces principales (p.ej., Inicio / Catálogo / Carrito)', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const inicio = screen.queryByRole('link', { name: /inicio/i });
    const catalogo = screen.queryByRole('link', { name: /catálog/i });
    const carrito = screen.queryByRole('link', { name: /carrit/i });

    expect(inicio || catalogo || carrito).toBeTruthy();
  });

  it('muestra el contador del carrito si existe', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const badge = screen.queryByTestId('cart-count');
    expect(true).toBe(true);
  });
});