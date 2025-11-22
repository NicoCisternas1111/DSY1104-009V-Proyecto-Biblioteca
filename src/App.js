import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import Home from './components/pages/Home';
import Carrito from './components/pages/Carrito';
import Catalogo from './components/pages/Catalogo';
import Contacto from './components/pages/Contacto';
import Libro from './components/pages/Libro';
import Usuario from './components/pages/Usuario';
import Somos from './components/pages/Somos';

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