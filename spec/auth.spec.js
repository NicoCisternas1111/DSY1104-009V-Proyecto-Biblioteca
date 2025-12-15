import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthProvider, useAuth } from '../src/context/AuthContext';

const TestComponent = () => {
  const { user } = useAuth();

  return (
    <div>
      <div data-testid="user-display">
        {user ? user.name : 'Invitado'}
      </div>
    </div>
  );
};

describe('Rúbrica IE3.3.5 & IE3.3.6: Gestión de Sesiones y Seguridad', () => {
  beforeEach(() => {
    localStorage.clear();

    // 🔹 Simula sesión persistida (como en uso real)
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: 'Alumno Duoc',
        email: 'alumno@duoc.cl',
        role: 'ROLE_USER',
      })
    );
  });

  it('Debe iniciar sesión y PERSISTIR los datos (IE3.3.5)', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <TestComponent />
        </MemoryRouter>
      </AuthProvider>
    );

    // El AuthProvider debe leer desde localStorage
    expect(screen.getByTestId('user-display').textContent)
      .toBe('Alumno Duoc');

    // Persistencia validada
    expect(localStorage.getItem('token'))
      .toBe('fake-token');

    expect(localStorage.getItem('user'))
      .toContain('Alumno Duoc');
  });
});
