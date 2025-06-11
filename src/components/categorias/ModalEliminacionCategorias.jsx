import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalEliminacionCategorias = ({ mostrarModal, setMostrarModal, categoria, eliminarCategoria }) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar la categoría <strong>{categoria?.nombre_categoria}</strong>?
        </p>
        <p>Esta acción no se puede deshacer.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            eliminarCategoria(categoria.id_categoria);
            setMostrarModal(false);
          }}
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionCategorias;