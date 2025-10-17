import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Carrito from './components/Carrito';
import Contacto from './components/Contacto';
import Libro from './components/Libro';
import Usuario from './components/Usuario';
import Somos from './components/Somos';
import Catalogo from './components/Catalogo';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="container my-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/libro/:id" element={<Libro />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/somos" element={<Somos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;