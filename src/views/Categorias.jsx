import React, { useState, useEffect } from 'react';
import TablaCategorias from '../components/categorias/TablaCategorias';
import ModalEdicionCategorias from '../components/categorias/ModalEdicionCategorias';
import ModalEliminacionCategorias from '../components/categorias/ModalEliminacionCategorias';
import ModalRegistroCategorias from '../components/categorias/ModalRegistroCategoria';
import { Container, Button, Row, Col } from 'react-bootstrap';
import CuadroBusquedas from '../components/busquedas/Cuadrobusquedas';

const Categorias = () => {
  const [listaCategorias, setListaCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre_categoria: '',
    descripcion_categoria: ''
  });
  const [categoriaEdicion, setCategoriaEdicion] = useState({
    nombre_categoria: '',
    descripcion_categoria: ''
  });
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const obtenerCategorias = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/categoria');
      if (!respuesta.ok) {
        throw new Error('Error al cargar las categorías');
      }
      const datos = await respuesta.json();
      setListaCategorias(datos);
      setCategoriasFiltradas(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    if (mostrarModalEdicion) {
      setCategoriaEdicion(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setNuevaCategoria(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const registrarCategoria = async () => {
    if (!nuevaCategoria.nombre_categoria || !nuevaCategoria.descripcion_categoria) {
      setErrorCarga('Por favor, completa todos los campos antes de registrar.');
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarcategoria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaCategoria),
      });

      if (!respuesta.ok) {
        throw new Error('Error al registrar la categoría');
      }

      await obtenerCategorias();
      setNuevaCategoria({ nombre_categoria: '', descripcion_categoria: '' });
      setMostrarModalRegistro(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const guardarCambios = async () => {
    if (!categoriaEdicion.nombre_categoria || !categoriaEdicion.descripcion_categoria) {
      setErrorCarga('Por favor, completa todos los campos antes de guardar.');
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3000/api/actualizarcategoria/${categoriaSeleccionada.id_categoria}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoriaEdicion),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar la categoría');
      }

      await obtenerCategorias();
      setCategoriaEdicion({ nombre_categoria: '', descripcion_categoria: '' });
      setMostrarModalEdicion(false);
      setCategoriaSeleccionada(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarcategoria/${id}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar la categoría');
      }

      await obtenerCategorias();
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtradas = listaCategorias.filter(
      (categoria) =>
        categoria.nombre_categoria.toLowerCase().includes(texto) ||
        categoria.descripcion_categoria.toLowerCase().includes(texto)
    );
    setCategoriasFiltradas(filtradas);
    establecerPaginaActual(1);
  };

  const categoriasPaginadas = categoriasFiltradas.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  return (
    <Container className="mt-5">
      <br />
      <h4>Categorías</h4>
      <Row>
        <Col lg={2} md={4} sm={4} xs={5}>
          <Button
            variant="primary"
            onClick={() => {
              setNuevaCategoria({ nombre_categoria: '', descripcion_categoria: '' });
              setMostrarModalRegistro(true);
            }}
            style={{ width: '100%' }}
          >
            Nueva Categoría
          </Button>
        </Col>
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>
      <br /><br />

      <TablaCategorias
        categorias={categoriasPaginadas}
        cargando={cargando}
        error={errorCarga}
        totalElementos={categoriasFiltradas.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
        onEditar={(categoria) => {
          setCategoriaEdicion({
            nombre_categoria: categoria.nombre_categoria,
            descripcion_categoria: categoria.descripcion_categoria
          });
          setCategoriaSeleccionada(categoria);
          setMostrarModalEdicion(true);
        }}
        onEliminar={(categoria) => {
          setCategoriaSeleccionada(categoria);
          setMostrarModalEliminacion(true);
        }}
      />

      <ModalEdicionCategorias
        mostrarModal={mostrarModalEdicion}
        setMostrarModal={setMostrarModalEdicion}
        categoria={categoriaEdicion}
        manejarCambioInput={manejarCambioInput}
        guardarCambios={guardarCambios}
        errorCarga={errorCarga}
      />

      <ModalEliminacionCategorias
        mostrarModal={mostrarModalEliminacion}
        setMostrarModal={setMostrarModalEliminacion}
        categoria={categoriaSeleccionada}
        eliminarCategoria={eliminarCategoria}
      />

      <ModalRegistroCategorias
        mostrarModal={mostrarModalRegistro}
        setMostrarModal={setMostrarModalRegistro}
        nuevaCategoria={nuevaCategoria}
        manejarCambioInput={manejarCambioInput}
        registrarCategoria={registrarCategoria}
        errorCarga={errorCarga}
      />
    </Container>
  );
};

export default Categorias;