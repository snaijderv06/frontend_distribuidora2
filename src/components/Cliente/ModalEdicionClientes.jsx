import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionClientes = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  ClienteEditado,
  manejarCambioInputEdicion,
  actualizarCliente,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formPrimerNombreCliente">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={ClienteEditado?.primer_nombre || ""}
              onChange={manejarCambioInputEdicion}
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
              value={ClienteEditado?.segundo_nombre || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el segundo nombre (máx. 20 caracteres)"
              maxLength={20}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrimerApellidoCliente">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={ClienteEditado?.primer_apellido || ""}
              onChange={manejarCambioInputEdicion}
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
              value={ClienteEditado?.segundo_apellido || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el segundo apellido (máx. 20 caracteres)"
              maxLength={20}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCelularCliente">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="text"
              name="celular"
              value={ClienteEditado?.celular || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el celular (máx. 8 caracteres)"
              maxLength={8}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDireccionCliente">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="direccion"
              value={ClienteEditado?.direccion || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la dirección (máx. 150 caracteres)"
              maxLength={150}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCedulaCliente">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={ClienteEditado?.cedula || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la cédula (máx. 14 caracteres)"
              maxLength={14}
              required
            />
          </Form.Group>
          {errorCarga && (
            <div className="text-red-500 mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModalEdicion(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={actualizarCliente}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionClientes;