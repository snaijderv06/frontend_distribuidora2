// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaVentas from '../components/ventas/TablaVentas'; // Importa el componente de tabla
import ModalDetallesVenta from '../components/detalles_venta/ModalDetallesVenta';
import ModalEliminacionVenta from '../components/ventas/ModalEliminacionVenta';
import { Container, Button, Row, Col } from "react-bootstrap";
import ModalRegistroVenta from '../components/ventas/ModalRegistroVenta';
import ModalActualizacionVenta from '../components/ventas/ModalActualizacionVenta';


// Declaración del componente Ventas
const Ventas = () => {
  // Estados para manejar los datos, carga y errores
  const [listaVentas, setListaVentas] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);     // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null); // Maneja errores de la petición
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para el modal

  const [detallesVenta, setDetallesVenta] = useState([]); // Estado para los detalles
  const [cargandoDetalles, setCargandoDetalles] = useState(false); // Estado de carga de detalles
  const [errorDetalles, setErrorDetalles] = useState(null); // Estado de error de detalles


  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [ventaAEliminar, setVentaAEliminar] = useState(null);

  const [mostrarModalActualizacion, setMostrarModalActualizacion] = useState(false);
const [ventaAEditar, setVentaAEditar] = useState(null);
const [detallesEditados, setDetallesEditados] = useState([]);

  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
const [clientes, setClientes] = useState([]);
const [empleados, setEmpleados] = useState([]);
const [productos, setProductos] = useState([]);
const [nuevaVenta, setNuevaVenta] = useState({
  id_cliente: '',
  id_empleado: '',
  fecha_venta: new Date(),
  total_venta: 0
});
const [detallesNuevos, setDetallesNuevos] = useState([]);
//Funciones de agregar necesarias
const agregarDetalle = (detalle) => {
  setDetallesNuevos(prev => [...prev, detalle]);
  setNuevaVenta(prev => ({
    ...prev,
    total_venta: prev.total_venta + (detalle.cantidad * detalle.precio_unitario)
  }));
};

const agregarVenta = async () => {
  if (!nuevaVenta.id_cliente || !nuevaVenta.id_empleado || !nuevaVenta.fecha_venta || detallesNuevos.length === 0) {
    setErrorCarga("Por favor, completa todos los campos y agrega al menos un detalle.");
    return;
  }

  try {
    const ventaData = {
      id_cliente: nuevaVenta.id_cliente,
      id_empleado: nuevaVenta.id_empleado,
      fecha_venta: nuevaVenta.fecha_venta.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', ' '),
      total_venta: detallesNuevos.reduce((sum, d) => sum + (d.cantidad * d.precio_unitario), 0),
      detalles: detallesNuevos
    };

    const respuesta = await fetch('http://localhost:3000/api/registrarventa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ventaData)
    });

    if (!respuesta.ok) throw new Error('Error al registrar la venta');

    await obtenerVentas();
    setNuevaVenta({ id_cliente: '', id_empleado: '', fecha_venta: new Date(), total_venta: 0 });
    setDetallesNuevos([]);
    setMostrarModalRegistro(false);
    setErrorCarga(null);
  } catch (error) {
    setErrorCarga(error.message);
  }
};


//Metodos de obtencion necesarios

const abrirModalActualizacion = async (venta) => {
  setCargandoDetalles(true);
  try {
    const respuestaventa = await fetch(`http://localhost:3000/api/obtenerventaporid/${venta.id_venta}`);
    if (!respuestaventa.ok) throw new Error('Error al cargar la venta');
    const datosventa = await respuestaventa.json();

    
    const datoscompletos = {
      id_venta: datosventa.id_venta,
      id_cliente: datosventa.id_cliente,
      id_empleado: datosventa.id_empleado,
      fecha_venta: datosventa.fecha_venta,
      total_venta: datosventa.total_venta,
      nombre_cliente: venta.nombre_cliente,
      nombre_empleado: venta.nombre_empleado
    };
    
    setVentaAEditar(datoscompletos);

    const respuesta = await fetch(`http://localhost:3000/api/obtenerdetallesventa/${venta.id_venta}`);
    if (!respuesta.ok) throw new Error('Error al cargar los detalles de la venta');
    const datos = await respuesta.json();
    setDetallesEditados(datos);

    setCargandoDetalles(false);
    setMostrarModalActualizacion(true);
  } catch (error) {
    setErrorDetalles(error.message);
    setCargandoDetalles(false);
  }
};


const obtenerClientes = async () => {
  try {
    const respuesta = await fetch('http://localhost:3000/api/clientes');
    if (!respuesta.ok) throw new Error('Error al cargar los clientes');
    const datos = await respuesta.json();
    setClientes(datos);
  } catch (error) {
    setErrorCarga(error.message);
  }
};

const obtenerEmpleados = async () => {
  try {
    const respuesta = await fetch('http://localhost:3000/api/empleados');
    if (!respuesta.ok) throw new Error('Error al cargar los empleados');
    const datos = await respuesta.json();
    setEmpleados(datos);
  } catch (error) {
    setErrorCarga(error.message);
  }
};

const obtenerProductos = async () => {
  try {
    const respuesta = await fetch('http://localhost:3000/api/productos');
    if (!respuesta.ok) throw new Error('Error al cargar los productos');
    const datos = await respuesta.json();
    setProductos(datos);
  } catch (error) {
    setErrorCarga(error.message);
  }
};

const actualizarVenta = async (ventaActualizada, detalles) => {

    if (!ventaActualizada.id_cliente || !ventaActualizada.id_empleado || !ventaActualizada.fecha_venta || detalles.length === 0) {
      setErrorCarga("Por favor, completa todos los campos y agrega al menos un detalle.");
      return;
    }
    try {      
      const ventaData = {
        id_venta: ventaActualizada.id_venta,
        id_cliente: ventaActualizada.id_cliente,
        id_empleado: ventaActualizada.id_empleado,
        fecha_venta: ventaActualizada.fecha_venta.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', ' '),
        total_venta: detalles.reduce((sum, d) => sum + (d.cantidad * d.precio_unitario), 0),
        detalles
      };
      console.log(`Enviando ID venta: ${ventaActualizada.id_venta}`, JSON.stringify(ventaData));
      const respuesta = await fetch(`http://localhost:3000/api/actualizarventa/${ventaActualizada.id_venta}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ventaData)
      });
      if (!respuesta.ok) throw new Error('Error al actualizar la venta');
      await obtenerVentas();
      setMostrarModalActualizacion(false);
      setVentaAEditar(null);
      setDetallesEditados([]);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };




//Metodo para eliminar una venta
  const eliminarVenta = async () => {
    if (!ventaAEliminar) return;
  
    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarventa/${ventaAEliminar.id_venta}`, {
        method: 'DELETE',
      });
  
      if (!respuesta.ok) {
        throw new Error('Error al eliminar la venta');
      }
      
      setMostrarModalEliminacion(false);
      await obtenerVentas();
      setVentaAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };
  
  const abrirModalEliminacion = (venta) => {
    setVentaAEliminar(venta);
    setMostrarModalEliminacion(true);
  };

  // Lógica de obtención de datos con useEffect
 
    const obtenerVentas = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/obtenerventas'); // Ruta ajustada al controlador
        if (!respuesta.ok) {
          throw new Error('Error al cargar las ventas');
        }
        const datos = await respuesta.json();
        setListaVentas(datos);    // Actualiza el estado con los datos
        setCargando(false);       // Indica que la carga terminó
      } catch (error) {
        setErrorCarga(error.message); // Guarda el mensaje de error
        setCargando(false);       // Termina la carga aunque haya error
      }

    };
    
    // Lógica de obtención de datos con useEffect
    useEffect(() => {
    obtenerVentas(); 
    obtenerClientes();
    obtenerEmpleados();
    obtenerProductos();
    eliminarVenta();           // Ejecuta la función al montar el componente
  }, []);                       // Array vacío para que solo se ejecute una vez

  // Función para obtener detalles de una venta
  const obtenerDetalles = async (id_venta) => {
    setCargandoDetalles(true);
    setErrorDetalles(null);
    try {
      const respuesta = await fetch(`http://localhost:3000/api/obtenerdetallesventa/${id_venta}`);
      if (!respuesta.ok) {
        throw new Error('Error al cargar los detalles de la venta');
      }
      const datos = await respuesta.json();
      setDetallesVenta(datos);
      setCargandoDetalles(false);
      setMostrarModal(true); // Abre el modal
    } catch (error) {
      setErrorDetalles(error.message);
      setCargandoDetalles(false);
    }
  };
  

  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Ventas con Detalles</h4>
        <Row>
        <Col lg={2} md={4} sm={4} xs={5}>
        <Button variant="primary" onClick={() => setMostrarModalRegistro(true)} style={{ width: "100%" }}>
          Nueva Venta
          </Button>
        </Col>
        </Row>
      <br />

        {/* Pasa los estados como props al componente TablaVentas */}
        <TablaVentas
          ventas={listaVentas}
          cargando={cargando}
          error={errorCarga}
          obtenerDetalles={obtenerDetalles} // Pasar la función
          abrirModalEliminacion={abrirModalEliminacion}
          abrirModalActualizacion={abrirModalActualizacion}
          
        />
         {/* Implementación del ModalDetallesVenta */}
      <ModalDetallesVenta
        mostrarModal={mostrarModal} // Controla si el modal está visible
        setMostrarModal={setMostrarModal} // Permite cerrar el modal
        detalles={detallesVenta} // Pasa los detalles obtenidos al modal
        cargandoDetalles={cargandoDetalles} // Indica si los detalles aún están cargando
        errorDetalles={errorDetalles} // Muestra mensajes de error relacionados
      />

      <ModalEliminacionVenta
      mostrarModalEliminacion={mostrarModalEliminacion}
      setMostrarModalEliminacion={setMostrarModalEliminacion}
      eliminarVenta={eliminarVenta}
      />
      <ModalRegistroVenta
      mostrarModal={mostrarModalRegistro}
      setMostrarModal={setMostrarModalRegistro}
      nuevaVenta={nuevaVenta}
      setNuevaVenta={setNuevaVenta}
      detallesVenta={detallesNuevos}
      setDetallesVenta={setDetallesNuevos}
      agregarDetalle={agregarDetalle}
      agregarVenta={agregarVenta}
      errorCarga={errorCarga}
      clientes={clientes}
      empleados={empleados}
      productos={productos}
      />
      <ModalActualizacionVenta
      mostrarModal={mostrarModalActualizacion}
      setMostrarModal={setMostrarModalActualizacion}
      venta={ventaAEditar}
      detallesVenta={detallesEditados}
      setDetallesVenta={setDetallesEditados}
      actualizarVenta={actualizarVenta}
      errorCarga={errorCarga}
      clientes={clientes}
      empleados={empleados}
      productos={productos}
      />
      </Container>
    </>
  );
};

// Exportación del componente
export default Ventas;
