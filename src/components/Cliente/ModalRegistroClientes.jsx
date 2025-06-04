// components/clientes/ModalRegistroClientes.jsx
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroClientes = ({
  mostrarModalRegistro = false,
  setMostrarModalRegistro = () => {},
  nuevoCliente = {
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    celular: "",
    direccion: "",
    cedula: ""
  },
  manejarCambioInput = () => {},
  agregarCliente = () => {},
  errorCarga = null
}) => {

  const validarLetras = (e) => {
  const charCode = e.which ? e.which : e.keyCode;

  // Permitir solo letras (A-Z, a-z)
  if (
    (charCode < 65 || charCode > 90) && // Letras mayúsculas
    (charCode < 97 || charCode > 122) && // Letras minúsculas
    charCode !== 8 && // Retroceso
    charCode !== 46 && // Borrar
    charCode !== 9 // Tab
  ) {
    e.preventDefault(); // Evita que se escriba el carácter
  }
};
  // Función para validar que los campos obligatorios no estén vacíos
  const validacionFormulario = () => {
    return (
      nuevoCliente.primer_nombre.trim() !== "" &&
      nuevoCliente.segundo_nombre.trim() !== "" &&
      nuevoCliente.primer_apellido.trim() !== "" &&
      nuevoCliente.segundo_apellido.trim() !== "" &&
      nuevoCliente.celular.trim() !== "" &&
      nuevoCliente.direccion.trim() !== "" &&
      nuevoCliente.cedula.trim() !== ""
  );
};

  return (
    <Modal
      show={mostrarModalRegistro}
      onHide={() => setMostrarModalRegistro(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formPrimerNombreCliente">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={nuevoCliente.primer_nombre || ""}
              onChange={manejarCambioInput}
              onKeyDown={validarLetras}
              placeholder="Ingresa el primer nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSegundoNombreCliente">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="segundo_nombre"
              value={nuevoCliente.segundo_nombre || ""}
              onChange={manejarCambioInput}
              placeholder="Ingresa el segundo nombre (máx. 20 caracteres)"
              maxLength={20}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrimerApellidoCliente">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={nuevoCliente.primer_apellido || ""}
              onChange={manejarCambioInput}
              placeholder="Ingresa el primer apellido (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSegundoApellidoCliente">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="segundo_apellido"
              value={nuevoCliente.segundo_apellido || ""}
              onChange={manejarCambioInput}
              placeholder="Ingresa el segundo apellido (máx. 20 caracteres)"
              maxLength={20}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCelularCliente">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="text"
              name="celular"
              value={nuevoCliente.celular || ""}
              onChange={manejarCambioInput}
              placeholder="Ingresa el celular (máx. 12 caracteres)"
              maxLength={12}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDireccionCliente">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={nuevoCliente.direccion || ""}
              onChange={manejarCambioInput}
              placeholder="Ingresa la dirección (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCedulaCliente">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={nuevoCliente.cedula || ""}
              onChange={manejarCambioInput}
              placeholder="Ingresa la cédula (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setMostrarModalRegistro(false)}
        >
          Cancelar
        </Button>
        <Button variant="primary" 
        onClick={agregarCliente}
        disabled={!validacionFormulario()}> // Deshabilita el botón si la validación falla
          Guardar Cliente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroClientes;