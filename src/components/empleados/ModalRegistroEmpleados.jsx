// ModalRegistroCategoria.jsx
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroEmpleados = ({
  mostrarModal,
  setMostrarModal,
  nuevoEmpleado,
  manejarCambioInput,
  agregarEmpleado,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formprimernombreEmpleado">
            <Form.Label>primer_nombre</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={nuevoEmpleado.primer_nombre}
              onChange={manejarCambioInput}
              placeholder="Ingresa el primer nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formsegundonombreEmpleado">
            <Form.Label>segundo_nombre</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="segundo_nombre"
              value={nuevoEmpleado.segundo_nombre}
              onChange={manejarCambioInput}
              placeholder="Ingresa la segundo nombre (máx. 100 caracteres)"
              maxLength={100}
            />

            </Form.Group>
          <Form.Group className="mb-3" controlId="formprimerapellidoEmpleado">
            <Form.Label>primer_apellido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="primer_apellido"
              value={nuevoEmpleado.primer_apellido}
              onChange={manejarCambioInput}
              placeholder="Ingresa el primer apellido (máx. 100 caracteres)"
              maxLength={100}
            />

            </Form.Group>
          <Form.Group className="mb-3" controlId="formsegundoapellidoEmpleado">
            <Form.Label>segundo_apellido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="segundo_apellido"
              value={nuevoEmpleado.segundo_apellido}
              onChange={manejarCambioInput}
              placeholder="Ingresa el segundo apellido (máx. 100 caracteres)"
              maxLength={100}
            />

</Form.Group>
          <Form.Group className="mb-3" controlId="formcelularEmpleado">
            <Form.Label>celular</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="celular"
              value={nuevoEmpleado.celular}
              onChange={manejarCambioInput}
              placeholder="Ingresa el celular (máx. 50 caracteres)"
              maxLength={100}
            />

</Form.Group>
          <Form.Group className="mb-3" controlId="formcargoEmpleado">
            <Form.Label>cargo</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="cargo"
              value={nuevoEmpleado.cargo}
              onChange={manejarCambioInput}
              placeholder="Ingresa el primer direccion (máx. 100 caracteres)"
              maxLength={100}
            />

</Form.Group>
          <Form.Group className="mb-3" controlId="formfechaContratacion">
            <Form.Label>fecha_contratacion</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="fecha_contratacion"
              value={nuevoEmpleado.fecha_contratacion}
              onChange={manejarCambioInput}
              placeholder="Ingresa el primer cedula (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>
          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setMostrarModal(false);
        }}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={agregarEmpleado}>
          Guardar Empleado
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroEmpleados;
