import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import "../../css/user.css"

export const Users = () => {
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
      `${import.meta.env.VITE_SERVER_URI}/api/deleteuser/${id}`,
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
    const { id, role, email } = user;

    const resp = await axios.put(
      `${import.meta.env.VITE_SERVER_URI}/api/updateuser`,
      {
        id_user: id,
        modify: {
          role,
          email,
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

  const handleDelete = (id, email) => {
    let validator = window.confirm(
      `Are you sure you want to delete the user ${email}?`
    );
    if (validator) deleteUser(id);
  };

  const handleEdit = (user) => {
    setShowForm(true);
    setuserEditable(user);
    setCreateOrEdit("edit");
  };

  return (
    <Container
      className="admin-container"
     
    >
      <h1 id="h1usuario">Users</h1>
      <br />
      {!showForm && (
        <table id="responsive-table" className="table">
          <thead className="thead-dark" style={{ border: "1px solid #ccc" }}>
            <tr id="administradorUsuarios"></tr>
            <tr id="thead" style={{ color: "white" }}>
              <th scope="col">Role</th>

              <th scope="col">Email</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody style={{ border: "1px solid #ccc" }}>
            {users.length > 0 &&
              users.map((user) => (
                <tr key={user.id}>
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
                      style={{
                        backgroundColor: "#372214",
                        borderStyle: "none",
                      }}
                      onClick={() => handleDelete(user.id, user.email)}
                    >
                      Delete
                    </button>
                    <button
                      id="botonEditar"
                      className="btn btn-danger mr-2 mb-2"
                      style={{
                        backgroundColor: "black",
                        borderStyle: "none",
                        marginLeft: "0.5rem",
                      }}
                      onClick={() => handleEdit(user)}
                    >
                      Edit
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
            <label style={{ color: "black", marginRight: "1rem" }}>role</label>
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
            <label style={{ color: "black", marginRight: "1rem" }}>Email</label>
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
            <button
              type="button"
              style={{
                backgroundColor: "#372214",
                borderStyle: "none",
                color: "white",
              }}
              onClick={() => updateUser(userEditable)}
            >
              Editar
            </button>
          )}
        </form>
      )}
    </Container>
  );
};
