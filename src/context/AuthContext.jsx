import React, { createContext, useState, useContext, useEffect } from 'react';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error al leer usuario del storage:", error);
      return null;
    }
  });

  const login = (email, password) => {
    let role = 'user';
    let name = 'Cliente Frecuente';

    if (email === 'admin@duoc.cl' && password === 'admin') {
      role = 'admin';
      name = 'Administrador Sistema';
    }

    const userData = {
      email,
      name,
      role,
      token: 'simulated-jwt-token-xyz-123'
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};