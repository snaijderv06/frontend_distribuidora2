import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import './App.css';
import Encabezado from "./components/encabezado/Encabezado";
import Clientes from "./views/Clientes";
import Productos from "./views/productos";
import Categorias from "./views/Categorias";
import Ventas from "./views/ventas";

const App = () => {
  return (
    
    <Router>
      <main className="margen-superior-main">
      <Encabezado/>
        <Routes>
       

        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/Categorias" element={<Categorias />} />
        <Route path="/ventas" element={<Ventas />} />

        </Routes>
      </main>
    </Router>
  );
};

export default App;