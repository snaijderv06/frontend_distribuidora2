import React, { useState, useEffect } from 'react';
import TablaCliente from '../components/Cliente/TablaClientes';
import { Container, Row, Col, Button } from "react-bootstrap";
import ModalRegistroClientes from '../components/Cliente/ModalRegistroClientes';
import ModalEdicionClientes from '../components/Cliente/ModalEdicionClientes';
import ModalEliminacionClientes from '../components/Cliente/ModalEliminacionClientes';
import CuadroBusquedas from '../components/busquedas/Cuadrobusquedas';
import TablaClientes from '../components/Cliente/TablaClientes';

const Clientes = () => {
  // Estados para manejar los datos, carga y errores
  const [listaClientes, setListaClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    celular: '',
    direccion: '',
    cedula: ''
  });
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 4;
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [clienteEditado, setClienteEditado] = useState(null);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);

  // Obtener clientes desde la API
  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/clientes');
      if (!respuesta.ok) {
        throw new Error('Error al cargar los clientes');
      }
      const datos = await respuesta.json();
      setListaClientes(datos);
      setClientesFiltrados(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  // Cargar clientes al montar el componente
  useEffect(() => {
    obtenerClientes();
  }, []);

  // Manejar cambios en los inputs del modal de registro
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar cambios en los inputs del modal de edición
  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setClienteEditado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Registrar un nuevo cliente
  const agregarCliente = async () => {
    if (!nuevoCliente.primer_nombre || !nuevoCliente.primer_apellido || !nuevoCliente.cedula) {
      setErrorCarga("Por favor, completa los campos obligatorios: Primer Nombre, Primer Apellido y Cédula.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarClientes', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoCliente),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el cliente');
      }

      await obtenerClientes();
      setNuevoCliente({
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        celular: '',
        direccion: '',
        cedula: ''
      });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  // Actualizar un cliente existente
  const actualizarCliente = async () => {
    if (!clienteEditado?.primer_nombre || !clienteEditado?.primer_apellido || !clienteEditado?.cedula) {
      setErrorCarga("Por favor, completa los campos obligatorios: Primer Nombre, Primer Apellido y Cédula.");
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3000/api/actualizarcliente/${clienteEditado.id_cliente}`, {
        method: 'Put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          primer_nombre: clienteEditado.primer_nombre,
          segundo_nombre: clienteEditado.segundo_nombre,
          primer_apellido: clienteEditado.primer_apellido,
          segundo_apellido: clienteEditado.segundo_apellido,
          celular: clienteEditado.celular,
          direccion: clienteEditado.direccion,
          cedula: clienteEditado.cedula
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar el cliente');
      }

      await obtenerClientes();
      setMostrarModalEdicion(false);
      setClienteEditado(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  // Eliminar un cliente
  const eliminarCliente = async () => {
    if (!clienteAEliminar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarClientes/${clienteAEliminar.id_cliente}`, {
        method: 'Delete',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el cliente');
      }

      await obtenerClientes();
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1);
      setClienteAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  // Abrir modal de edición
  const abrirModalEdicion = (cliente) => {
    setClienteEditado(cliente);
    setMostrarModalEdicion(true);
    setErrorCarga(null);
  };

  // Abrir modal de eliminación
  const abrirModalEliminacion = (cliente) => {
    setClienteAEliminar(cliente);
    setMostrarModalEliminacion(true);
  };

  // Manejar búsqueda
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    establecerPaginaActual(1);

    const filtrados = listaClientes.filter(
      (cliente) =>
        cliente.primer_nombre.toLowerCase().includes(texto) ||
        (cliente.segundo_nombre && cliente.segundo_nombre.toLowerCase().includes(texto)) ||
        cliente.primer_apellido.toLowerCase().includes(texto) ||
        (cliente.segundo_apellido && cliente.segundo_apellido.toLowerCase().includes(texto)) ||
        (cliente.celular && cliente.celular.toLowerCase().includes(texto)) ||
        (cliente.direccion && cliente.direccion.toLowerCase().includes(texto)) ||
        cliente.cedula.toLowerCase().includes(texto)
    );
    setClientesFiltrados(filtrados);
  };

  // Calcular clientes paginados
  const clientesPaginados = clientesFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  return (
    <Container className="mt-5">
      <br />
      <h4>Clientes</h4>
      <Row>
        <Col lg={2} md={4} sm={4} xs={5}>
          <Button
            variant="primary"
            onClick={() => {
              setNuevoCliente({
                primer_nombre: '',
                segundo_nombre: '',
                primer_apellido: '',
                segundo_apellido: '',
                celular: '',
                direccion: '',
                cedula: ''
              });
              setMostrarModal(true);
              setErrorCarga(null);
            }}
            style={{ width: "100%" }}
          >
            Nuevo Cliente
          </Button>
        </Col>
        <Col lg={6} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      <TablaClientes
        clientes={clientesPaginados}
        cargando={cargando}
        error={errorCarga}
        totalElementos={listaClientes.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
        abrirModalEliminacion={abrirModalEliminacion}
        abrirModalEdicion={abrirModalEdicion}
      />

      <ModalRegistroClientes
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        ClienteNuevo={nuevoCliente}
        manejarCambioInput={manejarCambioInput}
        registrarCliente={agregarCliente}
        errorCarga={errorCarga}
      />

      <ModalEdicionClientes
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        ClienteEditado={clienteEditado}
        manejarCambioInputEdicion={manejarCambioInputEdicion}
        actualizarCliente={actualizarCliente}
        errorCarga={errorCarga}
      />

      <ModalEliminacionClientes
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        eliminarCliente={eliminarCliente}
      />
    </Container>
  );
};

export default Clientes;