// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Paginacion from '../ordenamiento/Paginacion';

// Declaración del componente TablaCategorias que recibe props
const TablaEmpleado = ({ 
  empleado,
   cargando,
    error,
    totalElementos,
    elementosPorPagina,
    paginaActual,
    establecerPaginaActual, 
    abrirModalEliminacion,
    abrirModalEdicion 
   }) => {
  // Renderizado condicional según el estado recibido por props
  if (cargando) {
    return <div>Cargando empleado...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;         // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID Empleado</th>
          <th>primer Nombre</th>
          <th>segundo Nombre</th>
          <th>primer Apellido</th>
          <th>segudo Apellido</th>
          <th>Celular</th>
          <th>Cargo</th>
          <th>Fecha Contratacion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {empleado.map((empleados) => (
          <tr key={empleados.id_empleado}>
            <td>{empleados.id_empleado}</td>
            <td>{empleados.primer_nombre}</td>
            <td>{empleados.segundo_nombre}</td>
            <td>{empleados.primer_apellido}</td>
            <td>{empleados.segundo_apellido}</td>
            <td>{empleados.celular}</td>
            <td>{empleados.cargo}</td>
            <td>{empleados.fecha_contratacion}</td>
            <td>

            <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEdicion(empleados)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>


                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => abrirModalEliminacion(empleados)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

    <Paginacion
    elementosPorPagina={elementosPorPagina}
    totalElementos={totalElementos}
    paginaActual={paginaActual}
    establecerPaginaActual={establecerPaginaActual}
    />
    </>

  );
};

// Exportación del componente
export default TablaEmpleado;
