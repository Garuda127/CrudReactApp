import { Table, Button } from "reactstrap";
export default function TablaContactos({
  contactos,
  setEditar,
  mostrarModal,
  setMostrarModal,
  eliminarContacto,
}) {
  const enviarDatos = (contacto) => {
    setEditar(contacto);
    setMostrarModal(!mostrarModal);
  };

  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Telefono</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {contactos.length < 1 ? (
          <tr>
            <td colSpan={4}>No hay contactos</td>
          </tr>
        ) : (
          contactos.map((contacto) => (
            <tr key={contacto.idContacto}>
              <td>{contacto.nombre}</td>
              <td>{contacto.correo}</td>
              <td>{contacto.telefono}</td>
              <td>
                <Button
                  className="me-2"
                  onClick={() => enviarDatos(contacto)}
                  color="primary"
                  size="sm"
                >
                  Editar
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => eliminarContacto(contacto.idContacto)}
                >
                  Elminar
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
