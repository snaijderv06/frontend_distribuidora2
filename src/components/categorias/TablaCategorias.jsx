import React from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';

const TablaCategorias = ({
  categorias,
  cargando,
  error,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual,
  onEditar,
  onEliminar,
}) => {
  const totalPaginas = Math.ceil(totalElementos / elementosPorPagina);

  const items = [];
  for (let numero = 1; numero <= totalPaginas; numero++) {
    items.push(
      <Pagination.Item
        key={numero}
        active={numero === paginaActual}
        onClick={() => establecerPaginaActual(numero)}
      >
        {numero}
      </Pagination.Item>
    );
  }

  return (
    <>
      {cargando && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!cargando && !error && categorias.length === 0 && <p>No hay categorías disponibles.</p>}
      {!cargando && !error && categorias.length > 0 && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.id_categoria}>
                  <td>{categoria.id_categoria}</td>
                  <td>{categoria.nombre_categoria}</td>
                  <td>{categoria.descripcion_categoria}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => onEditar(categoria)}
                      className="me-2"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onEliminar(categoria)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>{items}</Pagination>
        </>
      )}
    </>
  );
};

export default TablaCategorias;