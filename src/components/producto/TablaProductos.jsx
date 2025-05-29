import React from 'react';
import { Table, Button } from 'react-bootstrap';
import Paginacion from '../ordenamiento/Paginacion';
import 'bootstrap/dist/css/bootstrap.min.css';
import Productos from '../../views/productos';


const TablaProductos = ({ 
  productos, 
  cargando, 
  error,
totalElementos,
elementosPorPagina,
paginaActual,
establecerPaginaActual,
abrirModalEliminacion,
abrirModalEdicion,
generarPDFDetalleProducto

}) => {

  if (cargando) {
    return <div>Cargando productos...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;        // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID Producto</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>ID Categoría</th>
          <th>Precio Unitario</th>
          <th>Stock</th>
          <th>Imagen</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id_producto}>
            <td>{producto.id_producto}</td>
            <td>{producto.nombre_producto}</td>
            <td>{producto.descripcion_producto || 'Sin descripción'}</td>
            <td>{producto.id_categoria}</td>
            <td>{producto.precio_unitario.toFixed(2)}</td>
            <td>{producto.stock}</td>
            <td>
            {producto.imagen ? (
            <img
            src={`data:image/png;base64,${producto.imagen}`}
            alt={producto.nombre_producto}
            style={{ maxWidth: '100px' }}
             />
            ) : (
              'Sin imagen'
            )}
          </td>
          
          <td>

              <Button
                variant="outline-secondary"
                size="sm"
                className="me-2"
                onClick={() => generarPDFDetalleProducto(producto)}
              >
                <i className="bi bi-filetype-pdf"></i>
              </Button>


            <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEdicion(producto)}
                >
                  <i className="bi bi-pencil"></i>
          </Button>

          <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => abrirModalEliminacion(producto)}
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
export default TablaProductos;