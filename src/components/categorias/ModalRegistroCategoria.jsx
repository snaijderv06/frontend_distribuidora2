import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalRegistroCategorias = ({
  mostrarModal,
  setMostrarModal,
  nuevaCategoria,
  manejarCambioInput,
  registrarCategoria,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Nueva Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorCarga && <p style={{ color: 'red' }}>{errorCarga}</p>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de la Categoría</Form.Label>
            <Form.Control
              type="text"
              name="nombre_categoria"
              value={nuevaCategoria.nombre_categoria || ''}
              onChange={manejarCambioInput}
              placeholder="Ingrese el nombre"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion_categoria"
              value={nuevaCategoria.descripcion_categoria || ''}
              onChange={manejarCambioInput}
              placeholder="Ingrese la descripción"
              maxLength={100}
              rows={3}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={registrarCategoria}>
          Registrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCategorias;