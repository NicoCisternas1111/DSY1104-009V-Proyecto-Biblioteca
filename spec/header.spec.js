import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthProvider } from '../src/context/AuthContext';
import Header from '../src/components/organisms/Header';

describe('Header (Navbar)', () => {
  const renderHeader = () =>
    render(
      <AuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthProvider>
    );

  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza la barra de navegación', () => {
    renderHeader();
    expect(screen.getByRole('navigation')).toBeTruthy();
  });

  it('muestra los enlaces principales', () => {
    renderHeader();

    expect(screen.getByText(/inicio/i)).toBeTruthy();
    expect(screen.getByText(/catálogo/i)).toBeTruthy();
    expect(screen.getByText(/contacto/i)).toBeTruthy();
  });

  it('muestra el contador del carrito si existe', () => {
    localStorage.setItem(
      'cart_v1',
      JSON.stringify([
        { id: '1', title: 'Libro Test', price: 1000, image: 'x.jpg', qty: 2 }
      ])
    );

    renderHeader();

    // El número visible
    expect(screen.getByText('2')).toBeTruthy();

    // El texto accesible oculto
    expect(screen.getByText(/artículos/i)).toBeTruthy();
  });
});
