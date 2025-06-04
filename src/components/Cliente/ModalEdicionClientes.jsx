// components/empleados/ModalEdicionEmpleados.jsx
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionEmpleados = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  EmpleadoEditado,
  manejarCambioInputEdicion,
  actualizarEmpleado,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formPrimerNombreEmpleado">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={EmpleadoEditado?.primer_nombre || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el primer nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSegundoNombreEmpleado">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="segundo_nombre"
              value={EmpleadoEditado?.segundo_nombre || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el segundo nombre (máx. 20 caracteres)"
              maxLength={20}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrimerApellidoEmpleado">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={EmpleadoEditado?.primer_apellido || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el primer apellido (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSegundoApellidoEmpleado">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="segundo_apellido"
              value={EmpleadoEditado?.segundo_apellido || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el segundo apellido (máx. 20 caracteres)"
              maxLength={20}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCelularEmpleado">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="text"
              name="celular"
              value={EmpleadoEditado?.celular || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el celular (máx. 12 caracteres)"
              maxLength={12}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCargoEmpleado">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              type="text"
              name="cargo"
              value={EmpleadoEditado?.cargo || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el cargo (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFechaContratacion">
            <Form.Label>Fecha de Contratación</Form.Label>
            <Form.Control
              type="date"
              name="fecha_contratacion"
              value={EmpleadoEditado?.fecha_contratacion || ""}
              onChange={manejarCambioInputEdicion}
              required
            />
          </Form.Group>
          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModalEdicion(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={actualizarEmpleado}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionEmpleados;