// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginApi, getMe } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    if (user) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const me = await getMe();
        const role = me.role === 'ROLE_ADMIN' ? 'admin' : 'user';

        const userData = {
          name: me.name,
          email: me.email,
          role,
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (err) {
        console.error('No se pudo restaurar la sesión', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginApi(email, password);
      if (!data?.token) {
        throw new Error('Credenciales inválidas');
      }

      localStorage.setItem('token', data.token);

      const me = await getMe();
      const role = me.role === 'ROLE_ADMIN' ? 'admin' : 'user';

      const userData = {
        name: me.name,
        email: me.email,
        role,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      return userData;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};
