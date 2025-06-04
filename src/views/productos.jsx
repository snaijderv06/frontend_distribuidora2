import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useState, useEffect } from 'react';
import TablaProductos from '../components/producto/TablaProductos';
import ModalRegistroProducto from '../components/producto/ModalRegistroProductos';
import { Container, Button, Row, Col } from "react-bootstrap";
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import ModalEdicionProductos from '../components/producto/ModalEdicionProductos';
import ModalEliminacionProductos from '../components/producto/ModalEliminacionProductos';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Declaración del componente Productos
const Productos = () => {
  // Estados para manejar los datos, carga y errores
  const [ListaProducto, setListaProducto] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: '',
    descripcion_producto: '',
    id_categoria: '',
    precio_unitario: '',
    stock: '',
    imagen: ''
  });

  const [productoFiltradas, setProductoFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [ProductoAEliminar, setProductoAEliminar] = useState(null);
  
  const [productoEditado, setProductoEditado] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) {
        throw new Error('Error al cargar los productos');
      }
      const datos = await respuesta.json();
      setListaProducto(datos);
      setProductoFiltradas(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  
  const obtenerCategorias = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/categoria');
      if (!respuesta.ok) throw new Error('Error al cargar las categorías');
      const datos = await respuesta.json();
      setListaCategorias(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  
  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
  }, []);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarProducto = async () => {
    if (!nuevoProducto.nombre_producto || !nuevoProducto.id_categoria || 
        !nuevoProducto.precio_unitario || !nuevoProducto.stock) {
      setErrorCarga("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarproducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el producto');

      await obtenerProductos();
      setNuevoProducto({
        nombre_producto: '',
        descripcion_producto: '',
        id_categoria: '',
        precio_unitario: '',
        stock: '',
        imagen: ''
      });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const eliminarProducto = async () => {
    if (!ProductoAEliminar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarproductos/${ProductoAEliminar.id_producto}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el producto');
      }

      await obtenerProductos();
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1);
      setProductoAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminacion(true);
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setProductoEditado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const actualizarProductos = async () => {
    if (
      !productoEditado?.nombre_producto ||
      !productoEditado?.descripcion_producto ||
      !productoEditado?.id_categoria ||
      !productoEditado?.precio_unitario ||
      !productoEditado?.stock
    ) {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/actualizarproductos/${productoEditado.id_producto}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre_producto: productoEditado.nombre_producto,
            descripcion_producto: productoEditado.descripcion_producto,
            id_categoria: productoEditado.id_categoria,
            precio_unitario: productoEditado.precio_unitario,
            stock: productoEditado.stock,
            imagen: productoEditado.imagen // Incluir imagen
          }),
        }
      );

      if (!respuesta.ok) {
        const errorData = await respuesta.json(); // Obtener detalles del error
        throw new Error(errorData.mensaje || `Error ${respuesta.status}: ${respuesta.statusText}`);
      }

      await obtenerProductos();
      setMostrarModalEdicion(false);
      setProductoEditado(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message); // Mostrar el mensaje de error en la vista
      console.error('Error al actualizar:', error);
    }
  };

  const abrirModalEdicion = (producto) => {
    setProductoEditado(producto);
    setMostrarModalEdicion(true);
  };

  
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    establecerPaginaActual(1);
    
    const filtradas = ListaProducto.filter(
      (producto) =>
        producto.nombre_producto.toLowerCase().includes(texto) ||
        producto.descripcion_producto.toLowerCase().includes(texto)
    );
    setProductoFiltradas(filtradas);
  };

  const productoPaginadas = productoFiltradas.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const generarPDFProductos = () => {
    const doc = new jsPDF();

    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, 220, 30, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text("Lista de productos", doc.internal.pageSize.getWidth() / 2, 18, { align: "center" });

    const columnas = ["ID", "Nombre", "Descripción", "Categoría", "Precio", "Stock"];
    const filas = productoFiltradas.map(producto => [
      producto.id_producto,
      producto.nombre_producto,
      producto.descripcion_producto,
      producto.id_categoria,
      `C$ ${producto.precio_unitario}`,
      producto.stock
    ]);

    const totalPaginas = '{total_pages_count_string}';

    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 40,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
      margin: { top: 20, left: 14, right: 14 },
      tableWidth: "auto",
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 'auto' },
      },
      pageBreak: "auto",
      rowPageBreak: "auto",
      
      didDrawPage: function (data) {
        
        const alturaPagina = doc.internal.pageSize.getHeight();
        const anchoPagina = doc.internal.pageSize.getWidth();
        
        const numeroPagina = doc.internal.getNumberOfPages();
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const piePagina = `Página ${numeroPagina} de ${totalPaginas}`;
        doc.text(piePagina, anchoPagina / 2 + 15, alturaPagina - 10, { align: "center" });
      },
    });

    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPaginas);
    }

    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const nombreArchivo = `productos_${dia}${mes}${anio}.pdf`;

    doc.save(nombreArchivo);
  };

  const generarPDFDetalleProducto = (producto) => {
    const pdf = new jsPDF();
    const anchoPagina = pdf.internal.pageSize.getWidth();

    
    pdf.setFillColor(28, 41, 51);
    pdf.rect(0, 0, 220, 30, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.text(producto.nombre_producto, anchoPagina / 2, 18, { align: "center" });

    let posicionY = 50;

    if (producto.imagen) {
      const base64Prefix = 'data:image/jpeg;base64,'; // Asegura compatibilidad con Base64
      const imagenConPrefijo = producto.imagen.startsWith(base64Prefix)
        ? producto.imagen
        : base64Prefix + producto.imagen;
      try {
        const propiedadesImagen = pdf.getImageProperties(imagenConPrefijo);
        const anchoImagen = 100;
        const altoImagen = (propiedadesImagen.height * anchoImagen) / propiedadesImagen.width;
        const posicionX = (anchoPagina - anchoImagen) / 2;
        pdf.addImage(imagenConPrefijo, "JPEG", posicionX, 40, anchoImagen, altoImagen);
        posicionY = 40 + altoImagen + 10;
      } catch (error) {
        console.error('Error al generar imagen en PDF:', error);
      }
    }

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.text(`Descripción: ${producto.descripcion_producto}`, anchoPagina / 2, posicionY, { align: "center" });
    pdf.text(`Categoría: ${producto.id_categoria}`, anchoPagina / 2, posicionY + 10, { align: "center" });
    pdf.text(`Precio: $${producto.precio_unitario}`, anchoPagina / 2, posicionY + 20, { align: "center" });
    pdf.text(`Stock: ${producto.stock}`, anchoPagina / 2, posicionY + 38, { align: "center" });

    pdf.save(`${producto.nombre_producto}.pdf`);
  };

  const exportarExcelProductos = () => {
    const datos = productoFiltradas.map((producto) => ({
      ID: producto.id_producto,
      Nombre: producto.nombre_producto,
      Descripcion: producto.descripcion_producto,
      Id_Categoria: producto.id_categoria,
      Precio: parseFloat(producto.precio_unitario),
      Stock: producto.stock
    }));

    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Productos');

    const excelBuffer = XLSX.write(libro, { bookType: 'xlsx', type: 'array' });

    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const nombreArchivo = `Productos_${dia}${mes}${anio}.xlsx`;

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, nombreArchivo);
  };

  
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Productos</h4>
        {errorCarga && <div className="text-danger mb-3">{errorCarga}</div>} {/* Mostrar errores */}
        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
              Nuevo Producto
            </Button>
          </Col>
          <Col lg={3} md={4} sm={4} xs={5}>
            <Button
              className="mb-3"
              onClick={generarPDFProductos}
              variant="secondary"
              style={{ width: "100%" }}
            >
              Generar reporte PDF
            </Button>
          </Col>
          <Col lg={3} md={4} sm={4} xs={5}>
            <Button
              className="mb-3"
              onClick={exportarExcelProductos}
              variant="secondary"
              style={{ width: "100%" }}
            >
              Generar Excel
            </Button>
          </Col>
          <Col lg={6} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>
        <br />
        <TablaProductos
          productos={productoPaginadas}
          cargando={cargando}
          error={errorCarga}
          totalElementos={ListaProducto.length}
          elementosPorPagina={elementosPorPagina}
          paginaActual={paginaActual}
          establecerPaginaActual={establecerPaginaActual}
          abrirModalEdicion={abrirModalEdicion}
          abrirModalEliminacion={abrirModalEliminacion}
          generarPDFDetalleProducto={generarPDFDetalleProducto}
        />
       
        <ModalRegistroProducto
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoProducto={nuevoProducto}
          manejarCambioInput={manejarCambioInput}
          agregarProducto={agregarProducto}
          errorCarga={errorCarga}
          categorias={listaCategorias}
        />
        <ModalEliminacionProductos
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarProducto={eliminarProducto}
        />
        
        <ModalEdicionProductos
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          productoEditado={productoEditado}
          manejarCambioInputEdicion={manejarCambioInputEdicion}
          actualizarProducto={actualizarProductos}
          errorCarga={errorCarga}
       
       />
      </Container>
    </>
  );
};


export default Productos;