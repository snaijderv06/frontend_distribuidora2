// components/empleados/Empleados.jsx
import React, { useState, useEffect } from 'react';
import TablaEmpleado from '../components/empleados/TablaEmpleado';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ModalRegistroEmpleados from '../components/empleados/ModalRegistroEmpleados';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import ModalEliminacionEmpleados from '../components/empleados/ModalEliminacionEmpleados';
import ModalEdicionEmpleados from '../components/empleados/ModalEdicionEmpleados';


const Empleados = () => {
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    celular: '',
    cargo: '',
    fecha_contratacion: ''
  });
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 4;
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [empleadoAEliminar, setEmpleadoAEliminar] = useState(null);
  const [empleadoEditado, setEmpleadoEditado] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);

  // Formatear fecha a yyyy-MM-dd
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Devuelve yyyy-MM-dd
  };

  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/empleados');
      if (!respuesta.ok) {
        throw new Error('Error al cargar los empleados');
      }
      const datos = await respuesta.json();
      // Formatear fecha_contratacion para cada empleado
      const datosFormateados = datos.map(empleado => ({
        ...empleado,
        fecha_contratacion: formatDate(empleado.fecha_contratacion)
      }));
      setListaEmpleados(datosFormateados);
      setEmpleadosFiltrados(datosFormateados);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarEmpleado = async () => {
    if (!nuevoEmpleado.primer_nombre || !nuevoEmpleado.primer_apellido || !nuevoEmpleado.cargo) {
      setErrorCarga('Por favor, completa los campos obligatorios: Primer Nombre, Primer Apellido y Cargo.');
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarEmpleados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEmpleado),
      });

      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(errorData.mensaje || 'Error al agregar el empleado');
      }

      await obtenerEmpleados();
      setNuevoEmpleado({
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        celular: '',
        cargo: '',
        fecha_contratacion: ''
      });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const eliminarEmpleado = async () => {
    if (!empleadoAEliminar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarempleados/${empleadoAEliminar.id_empleado}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el empleado');
      }

      await obtenerEmpleados();
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1);
      setEmpleadoAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (empleado) => {
    setEmpleadoAEliminar(empleado);
    setMostrarModalEliminacion(true);
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setEmpleadoEditado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const actualizarEmpleado = async () => {
    if (!empleadoEditado?.primer_nombre || !empleadoEditado?.primer_apellido || !empleadoEditado?.cargo) {
      setErrorCarga('Por favor, completa los campos obligatorios: Primer Nombre, Primer Apellido y Cargo.');
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3000/api/actualizarempleados/${empleadoEditado.id_empleado}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          primer_nombre: empleadoEditado.primer_nombre,
          segundo_nombre: empleadoEditado.segundo_nombre,
          primer_apellido: empleadoEditado.primer_apellido,
          segundo_apellido: empleadoEditado.segundo_apellido,
          celular: empleadoEditado.celular,
          cargo: empleadoEditado.cargo,
          fecha_contratacion: empleadoEditado.fecha_contratacion,
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar el empleado');
      }

      await obtenerEmpleados();
      setMostrarModalEdicion(false);
      setEmpleadoEditado(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEdicion = (empleado) => {
    setEmpleadoEditado({
      ...empleado,
      fecha_contratacion: formatDate(empleado.fecha_contratacion)
    });
    setMostrarModalEdicion(true);
  };

  
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    establecerPaginaActual(1);

    const filtrados = listaEmpleados.filter(
      (empleado) =>
        (empleado.primer_nombre?.toLowerCase().includes(texto) || '') ||
        (empleado.segundo_nombre?.toLowerCase().includes(texto) || '') ||
        (empleado.primer_apellido?.toLowerCase().includes(texto) || '') ||
        (empleado.segundo_apellido?.toLowerCase().includes(texto) || '') ||
        (empleado.celular?.toLowerCase().includes(texto) || '') ||
        (empleado.cargo?.toLowerCase().includes(texto) || '') ||
        (empleado.fecha_contratacion?.toLowerCase().includes(texto) || '')
    );
    setEmpleadosFiltrados(filtrados);
  };

  const empleadosPaginados = empleadosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  
  return (
    <Container className="mt-5">
      <br />
      <h4>Empleados</h4>
      <Row>
        <Col lg={2} md={4} sm={4} xs={5}>
          <Button
            variant="primary"
            onClick={() => {
              console.log("Botón Nuevo Empleado clicado");
              setMostrarModal(true);
            }}
            style={{ width: "100%" }}
          >
            Nuevo Empleado
          </Button>
        </Col>
        <Col lg={6} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>
      <TablaEmpleado
        empleado={empleadosPaginados}
        cargando={cargando}
        error={errorCarga}
        totalElementos={listaEmpleados.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
        abrirModalEliminacion={abrirModalEliminacion}
        abrirModalEdicion={abrirModalEdicion}
      />
      <ModalRegistroEmpleados
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoEmpleado={nuevoEmpleado}
        manejarCambioInput={manejarCambioInput}
        agregarEmpleado={agregarEmpleado}
        errorCarga={errorCarga}
      />
      
      <ModalEliminacionEmpleados
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        eliminarEmpleado={eliminarEmpleado}
      />
      <ModalEdicionEmpleados
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        EmpleadoEditado={empleadoEditado}
        manejarCambioInputEdicion={manejarCambioInputEdicion}
        actualizarEmpleado={actualizarEmpleado}
        errorCarga={errorCarga}
      />
    </Container>
  );
};


export default Empleados;