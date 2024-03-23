import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";
import "./App.css";
import TablaContactos from "./components/TablaContacto";
import ModalContacto from "./components/ModalContacto";

function App() {
  const [contactos, setContactos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editar, setEditar] = useState(null);

  async function getContactos() {
    const response = await fetch("/api/contacto/lista");
    if (response.ok) {
      const data = await response.json();
      setContactos(data);
    }
  }

  async function postContacto(contactos) {
    const response = await fetch("/api/contacto/guardar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactos),
    });
    if (response.ok) {
      setMostrarModal(!mostrarModal);
      getContactos();
    }
  }

  const editarContacto = async (contacto) => {
    const response = await fetch(`/api/contacto/editar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contacto),
    });
    if (response.ok) {
      setMostrarModal(!mostrarModal);
      getContactos();
    }
  };

  const eliminarContacto = async (contacto) => {
    let respuesta = window.confirm("¿Desea eliminar el contacto?");

    if (!respuesta) {
      return;
    }
    const response = await fetch(`/api/contacto/eliminar/${contacto}`, {
      method: "DELETE",
    });
    if (response.ok) {
      getContactos();
    }
  };

  useEffect(() => {
    getContactos();
  }, []);
  return (
    <Container>
      <Row className="mt-5">
        <Col sm="12">
          <Card>
            <CardHeader>
              <h3>Lista de Contactos</h3>
            </CardHeader>
            <CardBody>
              <Button
                color="success"
                size="sm"
                onClick={() => setMostrarModal(!mostrarModal)}
              >
                Nuevo Contacto
              </Button>
              <hr />
              <TablaContactos
                contactos={contactos}
                setEditar={setEditar}
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                eliminarContacto={eliminarContacto}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ModalContacto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        postContacto={postContacto}
        editarContacto={editarContacto}
        setEditar={setEditar}
        editar={editar}
      />
    </Container>
  );
}

export default App;
