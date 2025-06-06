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
import Compras from "./views/Compras";
import Catalogo from "./views/CatalogoProductos";
import Estadisticas from "./views/Estadisticas";
import Dashboard from "./views/Dashboard";
import Empleados from "./views/Empleados";
import RutaProtegida from "./components/Rutas/RutasProtegidas";
import PiePagina from "./components/infopie/PiePagina";

const App = () => {
  return (
    
    <Router>

      <div className="app-wrapper">
      
      <Encabezado/>
        
        <main className="margen-superior-main">

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<RutaProtegida vista={<Inicio />} />} />
        <Route path="/clientes" element={<RutaProtegida vista={<Clientes />} />} />
        <Route path="/Categorias" element={<RutaProtegida vista={<Categorias />} />} />
        <Route path="/ventas" element={<RutaProtegida vista={<Ventas />} />} />
        <Route path="/Empleados" element={<RutaProtegida vista={<Empleados />} />} />
        <Route path="/Compras" element={<RutaProtegida vista={<Compras />} />} />
        <Route path="/productos" element={<RutaProtegida vista={<Productos />} />} />
        <Route path="/catalogo" element={<RutaProtegida vista={<Catalogo />} />} />
        <Route path="/estadisticas" element={<RutaProtegida vista={<Estadisticas />} />} />
        <Route path="/dashboard" element={<RutaProtegida vista={<Dashboard />} />} />
    </Routes>
      
      </main>

    <PiePagina />

    </div>

  </Router>
  
);
};

export default App;