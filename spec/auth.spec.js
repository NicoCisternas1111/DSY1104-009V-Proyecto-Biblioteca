import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import ProtectedRoute from '../src/components/atoms/ProtectedRoute';

const TestComponent = () => {
  const { user, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="user-display">{user ? user.name : 'Invitado'}</span>
      <button onClick={() => login({ name: 'Alumno Duoc' })}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('Rúbrica IE3.3.5 & IE3.3.6: Gestión de Sesiones y Seguridad', () => {
  
  beforeEach(() => {
    localStorage.clear();
  });

  it('Debe iniciar sesión y PERSISTIR los datos (IE3.3.5)', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-display').textContent).toBe('Invitado');

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByTestId('user-display').textContent).toBe('Alumno Duoc');
      expect(localStorage.getItem('user')).toContain('Alumno Duoc');
    });
  });

  it('Debe restringir el acceso a usuarios no autenticados (IE3.3.6)', () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/privado']}>
          <Routes>
            <Route path="/usuario" element={<div>Página de Login</div>} />
            <Route 
              path="/privado" 
              element={
                <ProtectedRoute>
                  <div>Contenido Secreto</div>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.queryByText('Contenido Secreto')).toBeNull();
    expect(screen.getByText('Página de Login')).toBeTruthy();
  });
});