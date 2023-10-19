/*import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";

export const User = () => {
  const [users, setUsers] = useState([]);
  const [userEditable, setuserEditable] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [createOrEdit, setCreateOrEdit] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-users`)
      .then((response) => response.json())
      .then((loquerecibo) => setUsers(loquerecibo));
  }, []);

  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  const deleteUser = async (id) => {
    const resp = await axios.delete(
      `${import.meta.env.VITE_SERVER_URI}/api/deleteUser/${id}`,
      {
        headers,
      }
    );
    const { status } = resp;

    if (status === 200) {
      const deleteUser = users.filter((user) => user.id !== id);
      setUsers(deleteUser);
    }
  };

  const updateUser = async (user) => {
    const { id, role, username } = user;

    const resp = await axios.put(
      `${import.meta.env.VITE_SERVER_URI}/api/updateuser`,
      {
        id_user: id,
        modify: {
          role,
          username,
        },
      },
      {
        headers,
      }
    );
    const { status } = resp;

    if (status === 200) {
      const othersusers = users.filter((prev) => prev.id !== user.id);
      setUsers([...othersusers, user]);
    }
    setShowForm(false);
  };

  const handleDelete = (id, username) => {
    let validator = window.confirm(
      `Está seguro que quiere eliminar el user ${username}?`
    );
    if (validator) deleteUser(id);
  };

  const handleEdit = (user) => {
    setShowForm(true);
    setuserEditable(user);
    setCreateOrEdit("edit");
  };

  return (
    <Container id="admin" className="admin-container">
      <h1 id="h1usuario">Usuarios</h1>
      {!showForm && (
        <table id="responsive-table" className="table">
          <thead className="thead-dark">
            <tr id="administradorUsuarios">
              <td>Administrador de usuarios</td>
            </tr>
            <tr id="thead" style={{ color: "white" }}>
              <th scope="col">Usuario</th>
              <th scope="col">Rol</th>

              <th scope="col">Mail</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td id="td" data-label="Usuario:" className="letra_tabla">
                  {user.username}
                </td>
                <td id="td" data-label="Rol:" className="letra_tabla">
                  {user.role}
                </td>

                <td id="td" data-label="Mail:" className="letra_tabla">
                  {user.email}
                </td>
                <td>
                  <button
                    id="botonEliminar"
                    className="btn btn-danger mr-2 mb-2"
                    onClick={() => handleDelete(user.id, user.username)}
                  >
                    Eliminar
                  </button>
                  <button
                    id="botonEditar"
                    className="btn btn-warning mr-2 mb-2 "
                    onClick={() => handleEdit(user)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showForm && (
        <form className="responsive-form">
          <div className="form-group">
            <label>username</label>
            <input
              type="text"
              value={userEditable.username}
              onChange={(event) =>
                setuserEditable((prev) => {
                  return { ...prev, username: event.target.value };
                })
              }
            />
          </div>
          <div className="form-group">
            <label>role</label>
            <textarea
              value={userEditable.role}
              onChange={(event) =>
                setuserEditable((prev) => {
                  return { ...prev, role: event.target.value };
                })
              }
            ></textarea>
          </div>
          <div className="form-group">
            <label>Email</label>
            <textarea
              value={userEditable.email}
              onChange={(event) =>
                setuserEditable((prev) => {
                  return { ...prev, email: event.target.value };
                })
              }
            ></textarea>
          </div>
          {createOrEdit === "edit" && (
            <button type="button" onClick={() => updateUser(userEditable)}>
              Editar
            </button>
          )}
        </form>
      )}
    </Container>
  );
};
*/