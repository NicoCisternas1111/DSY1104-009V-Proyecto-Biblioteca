import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/atoms/ProtectedRoute';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import Home from './components/pages/Home';
import Carrito from './components/pages/Carrito';
import Catalogo from './components/pages/Catalogo';
import Contacto from './components/pages/Contacto';
import Libro from './components/pages/Libro';
import Usuario from './components/pages/Usuario';
import Somos from './components/pages/Somos';
import AdminPanel from './components/pages/AdminPanel';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          
          <main className="container my-5">
            <Routes>
              {/* Rutas Públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/somos" element={<Somos />} />
              <Route path="/libro/:id" element={<Libro />} />
              <Route path="/usuario" element={<Usuario />} />

              {/* Rutas Privadas: CLIENTES (Requiere login, cualquier rol) */}
              <Route 
                path="/carrito" 
                element={
                  <ProtectedRoute allowedRoles={['user', 'admin']}>
                    <Carrito />
                  </ProtectedRoute>
                } 
              />

              {/* Rutas Privadas: ADMINISTRADOR (Requiere login y rol 'admin') */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;