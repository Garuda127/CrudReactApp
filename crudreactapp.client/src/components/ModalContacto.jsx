import { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const modelContacto = {
  idContacto: 0,
  nombre: "",
  correo: "",
  telefono: "",
};

export default function ModalContacto({
  mostrarModal,
  setMostrarModal,
  postContacto,
  editar,
  setEditar,
  editarContacto,
}) {
  const [contacto, setContacto] = useState(modelContacto);

  const enviarDatos = () => {
    if (contacto.idContacto === 0) {
      postContacto(contacto);
    }
    if (contacto.idContacto !== 0) {
      editarContacto(contacto);
    }
  };

  function actualizarDatos(e) {
    setContacto({ ...contacto, [e.target.name]: e.target.value });
  }

  const cerrarModal = () => {
    setMostrarModal(!mostrarModal);
    setContacto(modelContacto);
    setEditar(null);
  };

  useEffect(() => {
    if (editar !== null) {
      setContacto(editar);
    } else {
      setContacto(modelContacto);
    }
  }, [editar]);
  return (
    <Modal isOpen={mostrarModal}>
      <ModalHeader>
        {contacto.idContacto === 0 ? "Nuevo contacto" : "Editar contacto"}
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              onChange={(e) => actualizarDatos(e)}
              name="nombre"
              value={contacto.nombre}
            />
          </FormGroup>
          <FormGroup>
            <Label>Correo</Label>
            <Input
              onChange={(e) => actualizarDatos(e)}
              name="correo"
              value={contacto.correo}
            />
          </FormGroup>
          <FormGroup>
            <Label>Telefono</Label>
            <Input
              onChange={(e) => actualizarDatos(e)}
              name="telefono"
              value={contacto.telefono}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" size="sm" onClick={() => enviarDatos()}>
          Guardar
        </Button>
        <Button color="danger" size="sm" onClick={cerrarModal}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}
