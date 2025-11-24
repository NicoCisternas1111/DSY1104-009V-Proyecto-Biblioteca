import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Mientras está verificando el token /users/me
  if (loading) {
    return <div className="text-center mt-5">Cargando sesión...</div>;
  }

  // No autenticado → redirige a /usuario
  if (!user) {
    return <Navigate to="/usuario" state={{ from: location }} replace />;
  }

  // Tiene rol, pero no está permitido para esta ruta
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
