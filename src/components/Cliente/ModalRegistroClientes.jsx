import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroClientes = ({
  mostrarModalRegistro,
  setMostrarModalRegistro,
  ClienteNuevo,
  manejarCambioInputRegistro,
  registrarCliente,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModalRegistro} onHide={() => setMostrarModalRegistro(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formPrimerNombreCliente">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={ClienteNuevo?.primer_nombre || ""}
              onChange={manejarCambioInputRegistro}
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
              value={ClienteNuevo?.segundo_nombre || ""}
              onChange={manejarCambioInputRegistro}
              placeholder="Ingresa el segundo nombre (máx. 20 caracteres)"
              maxLength={20}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrimerApellidoCliente">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={ClienteNuevo?.primer_apellido || ""}
              onChange={manejarCambioInputRegistro}
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
              value={ClienteNuevo?.segundo_apellido || ""}
              onChange={manejarCambioInputRegistro}
              placeholder="Ingresa el segundo apellido (máx. 20 caracteres)"
              maxLength={20}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCelularCliente">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="text"
              name="celular"
              value={ClienteNuevo?.celular || ""}
              onChange={manejarCambioInputRegistro}
              placeholder="Ingresa el celular (máx. 8 caracteres)"
              maxLength={8}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDireccionCliente">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="direccion"
              value={ClienteNuevo?.direccion || ""}
              onChange={manejarCambioInputRegistro}
              placeholder="Ingresa la dirección (máx. 150 caracteres)"
              maxLength={150}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCedulaCliente">
            <Form.Label>Cedula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={ClienteNuevo?.cedula || ""}
              onChange={manejarCambioInputRegistro}
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
        <Button variant="secondary" onClick={() => setMostrarModalRegistro(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={registrarCliente}>
          Registrar Cliente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroClientes;