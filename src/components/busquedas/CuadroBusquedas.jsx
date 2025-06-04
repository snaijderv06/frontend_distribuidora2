// components/busquedas/CuadroBusquedas.jsx
import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const CuadroBusquedas = ({ textoBusqueda = "", manejarCambioBusqueda = () => {} }) => {
  return (
    <InputGroup className="mb-3" style={{ width: "100%" }}>
      <InputGroup.Text>
        <i className="bi bi-search"></i>
      </InputGroup.Text>
      <Form.Control
        id="busqueda-empleados"
        type="text"
        placeholder="Buscar empleados por nombre, apellido o cargo..."
        value={textoBusqueda}
        onChange={manejarCambioBusqueda}
        aria-label="Buscar empleados"
      />
    </InputGroup>
  );
};

export default CuadroBusquedas;