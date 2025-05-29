// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaEmpleado from '../components/empleados/TablaEmpleado';// Importa el componente de tabla
import { Container, Row, Col, Button } from "react-bootstrap";
import ModalRegistroEmpleados from '../components/empleados/ModalRegistroEmpleados';
import CuadroBusquedas from '../components/busquedas/Cuadrobusquedas';
import ModalEliminacionEmpleados from '../components/empleados/ModalEliminacionEmpleados';
import ModalEdicionEmpleados from '../components/empleados/ModalEdicionEmpleados';

// Declaración del componente Categorias
const Empleados = () => {
  // Estados para manejar los datos, carga y errores
  const [ListaEmpleado, setListaEmpleado] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null)
  const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoEmpleado, setNuevoEmpleado] = useState({
      primer_nombre: '',      
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      celular: '',
      cargo: '',
      fecha_contratacion: ''
    });;        // Maneja errores de la petición

   const [empleadosFiltradas,  setEmpleadosFiltradas] = useState([]);
      const [textoBusqueda, setTextoBusqueda] = useState("");

        const [paginaActual, establecerPaginaActual] = useState(1);
      const elementosPorPagina = 4; // Número de elementos por página


      const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
        const [empleadoAEliminar, setEmpleadoAEliminar] = useState(null);
        
        const [empleadoEditado, setEmpleadoEditado] = useState(null);
        const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);



      const obtenerEmpleado = async () => { // Método renombrado a español
        try {
          const respuesta = await fetch('http://localhost:3000/api/empleados');
          if (!respuesta.ok) {
            throw new Error('Error al cargar las empleado');
          }
          const datos = await respuesta.json();
          setListaEmpleado(datos);    // Actualiza el estado con los datos
          setEmpleadosFiltradas(datos);
          setCargando(false);           // Indica que la carga terminó
        } catch (error) {
          setErrorCarga(error.message); // Guarda el mensaje de error
          setCargando(false);           // Termina la carga aunque haya error
        }
      };
  // Lógica de obtención de datos con useEffect
  useEffect(() => {
   
    obtenerEmpleado();            // Ejecuta la función al montar el componente
  }, []);                           // Array vacío para que solo se ejecute una vez


    // Maneja los cambios en los inputs del modal
const manejarCambioInput = (e) => {
  const { name, value } = e.target;
  setNuevoEmpleado(prev => ({
    ...prev,
    [name]: value
  }));
};


// Manejo la inserción de una nueva categoría
const agregarEmpleado = async () => {
  if (!nuevoEmpleado.primer_nombre || !nuevoEmpleado.segundo_nombre || !nuevoEmpleado.primer_apellido ||
    !nuevoEmpleado.segundo_apellido ||!nuevoEmpleado.celular || !nuevoEmpleado.cargo ||!nuevoEmpleado.fecha_contratacion
  ) {
  setErrorCarga("Por favor, completa todos los campos antes de guardar.");
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
      throw new Error('Error al agregar la Empleado');
    }

    await obtenerEmpleado(); // Refresca toda la lista desde el servidor
    setNuevoEmpleado({  primer_nombre: '', segundo_nombre: '', primer_apellido: '', segundo_apellido: '', celular: '', cargo: '', fecha_contratacion: '' });
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
      throw new Error('Error al eliminar la empleado');
    }

    await obtenerEmpleado(); // Refresca la lista
    setMostrarModalEliminacion(false);
    establecerPaginaActual(1); // Regresa a la primera página
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
  if (!empleadoEditado?.primer_nombre || !empleadoEditado?.segundo_nombre || !empleadoEditado?.primer_apellido
    || !empleadoEditado?.segundo_apellido || !empleadoEditado?.celular || !empleadoEditado?.cargo || !empleadoEditado?.fecha_contratacion
  ) {
    setErrorCarga("Por favor, completa todos los campos antes de guardar.");
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
      throw new Error('Error al actualizar la empleado');
    }

    await obtenerEmpleado();
    setMostrarModalEdicion(false);
    setEmpleadoEditado(null);
    setErrorCarga(null);
  } catch (error) {
    setErrorCarga(error.message);
  }
};


const abrirModalEdicion = (empleado ) => {
  setEmpleadoEditado(empleado);
  setMostrarModalEdicion(true);
};






  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    establecerPaginaActual(1);


    
    const filtradas = ListaEmpleado.filter(
      (empleado) =>
        empleado.primer_nombre.toLowerCase().includes(texto) ||
        empleado.segundo_nombre.toLowerCase().includes(texto)||
        empleado.primer_apellido.toLowerCase().includes(texto) ||
        empleado.segundo_apellido.toLowerCase().includes(texto)||
        empleado.celular.toLowerCase().includes(texto) ||
        empleado.cargo.toLowerCase().includes(texto)||
        empleado.fecha_contratacion.toLowerCase().includes(texto)
        
    );
    setEmpleadosFiltradas(filtradas);
  };

      // Calcular elementos paginados
const EmpleadoPaginadas = empleadosFiltradas.slice(
  (paginaActual - 1) * elementosPorPagina,
  paginaActual * elementosPorPagina
);


  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Empleados</h4>


        <Row>
           <Col lg={2} md={4} sm={4} xs={5}> 
                   <Button variant="primary" onClick={() => setMostrarModal(true)}  style={{ width: "100%"}} >
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

        {/* Pasa los estados como props al componente TablaCategorias */}
        <TablaEmpleado
          empleado={EmpleadoPaginadas} 
          cargando={cargando} 
          error={errorCarga} 
          totalElementos={ListaEmpleado.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
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
    </>
  );
};

// Exportación del componente
export default Empleados;