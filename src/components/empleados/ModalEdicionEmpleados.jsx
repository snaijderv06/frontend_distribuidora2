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
          <Form.Group className="mb-3" controlId="formNombreEmpleado">
            <Form.Label>Nombre del Empleado</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={EmpleadoEditado?.primer_nombre || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNombre2Empleado">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="segundo_nombre"
              value={EmpleadoEditado?.segundo_nombre || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la descripción (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formApellidoEmpleado">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="primer_apellido"
              value={EmpleadoEditado?.primer_apellido || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la descripción (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formApellido2Empleado">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="segundo_apellido"
              value={EmpleadoEditado?.segundo_apellido || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la descripción (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCelularEmpleado">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="celular"
              value={EmpleadoEditado?.celular || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la descripción (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCargoEmpleado">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="cargo"
              value={EmpleadoEditado?.cargo || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la descripción (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFechacontratacionEmpleado">
            <Form.Label>Fecha Contratación</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="fecha_contratacion"
              value={EmpleadoEditado?.fecha_contratacion || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la descripción (máx. 100 caracteres)"
              maxLength={100}
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

