import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import * as Yup from "yup";
import { useFormik } from "formik";

import "../../css/administrator.css";

export const Administrator = () => {
  const [menues, setMenues] = useState([]);
  const [menuEditable, setMenuEditable] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [createOrEdit, setCreateOrEdit] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-menues`)
      .then((response) => response.json())
      .then((loquerecibo) => setMenues(loquerecibo));
  }, []);
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  const deleteMenu = async (id) => {
    const resp = await axios.delete(
      `${import.meta.env.VITE_SERVER_URI}/api/delete-menu/${id}`,
      {
        headers,
      }
    );
    const { status } = resp;

    if (status === 200) {
      const deleteMenuOnRender = menues.filter((menu) => menu.id !== id);
      setMenues(deleteMenuOnRender);
    }
  };

  const updateMenu = async (menu) => {
    const { name, description, id, price, imagen } = menu;

    if (!name || !description || price === null || price === '' || !imagen) {
      alert('Todos los campos son obligatorios. Por favor, llénelos todos.');
      return;
    }

    const resp = await axios.put(
      `${import.meta.env.VITE_SERVER_URI}/api/update-menu`,
      {
        id_menu: id,
        modify: {
          name,
          description,
          imagen,
          price,
        },
      },
      {
        headers,
      }
    );
    const { status } = resp;

    if (status === 200) {
      const othersMenues = menues.filter((prev) => prev.id !== menu.id);
      setMenues([...othersMenues, menues]);
    }

    setShowForm(false);
    setShowButtons(true);
  };

  const createMenu = async (menu) => {
    const { name, description, price, imagen } = menu;

    if (!name || !description || price === null || price === '' || !imagen) {
      alert('All fields are required. Please fill them all out.');
      return;
    }

    const resp = await axios.post(
      `${import.meta.env.VITE_SERVER_URI}/api/create-menu`,
      {
        name,
        description,
        imagen,
        price,
      },
      {
        headers: { ...headers, accept: "application/json" },
      }
    );
    const { status } = resp;

    if (status === 201) {
      const othersMenues = menues.filter((prev) => prev.id !== menu.id);
      setMenues([...othersMenues, menu]);
    }

    setShowForm(false);
    setShowButtons(true);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("* Campo obligatorio")
      .min(2, "El nombre debe tener al menos 3 caracteres"),
    description: Yup.string()
      .required("* Campo obligatorio")
      .min(2, "La descripción debe tener al menos 3 caracteres"),
    imagen: Yup.string()
      .required("* Campo obligatorio")
      .min(2, "La imagen debe tener al menos 3 caracteres"),
    price: Yup.string()
      .required("* Campo obligatorio")
      .min(1, "El precio debe tener al menos 6 caracteres"),
});

const initialValues = {
  name: "",
  description: "",
  imagen: "",
  price: "",
};

const formik = useFormik({
  initialValues,
  validationSchema,
});

  const handleDelete = (id, name) => {
    let validator = window.confirm(
      `Are you sure you want to delete the menu ${name}?`
    );
    if (validator) deleteMenu(id);
  };

  const handleEdit = (menu) => {
    setShowForm(true);
    setMenuEditable(menu);
    setCreateOrEdit("edit");
    setShowButtons(false);
  };

  const handleCreate = () => {
    setShowForm(true);
    setMenuEditable({});
    setCreateOrEdit("create");
    setShowButtons(false);
  };
  return (
    <Container id="admin" className="admin-container">
      <h1 className="h1admin">Admin</h1>
      {!showForm && (
        <table id="responsive-table" className="table">
          <thead className="thead-dark">
            <tr id="thead">
              <th id="th" scope="col">
                Name
              </th>
              <th id="th" scope="col">
                Description
              </th>
              <th id="th" scope="col">
                Price
              </th>
              <th id="th" scope="col">
                Bottons
              </th>
            </tr>
          </thead>
          <tbody id="tbody">
            {menues.map((menu) => (
              <tr key={menu.id}>
                <td id="td" data-label="Name:" className="letra_tabla">
                  {menu.name}
                </td>
                <td id="td" data-label="Description:" className="letra_tabla">
                  {menu.description}
                </td>
                <td id="td" data-label="Price:" className="letra_tabla">
                  {menu.price}
                </td>
                <td>
                  <button
                    id="botonEliminar"
                    className="btn btn-danger mr-2 mb-2"
                    onClick={() => handleDelete(menu.id, menu.name)}
                  >
                    Delete
                  </button>
                  <button
                    id="botonEditar"
                    className="btn btn-warning mr-2 mb-2 "
                    onClick={() => handleEdit(menu)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showButtons && (
        <button className="button-create" onClick={handleCreate}>
          Create a new
        </button>
      )}
      {showForm && (
        <form className="responsive-form">
          <div className="form-group">
            <label className="labes">
              <h3 className="h3-admin">Name</h3>
              <input
               required
                type="text"
                value={menuEditable.name}
                onChange={(event) =>
                  setMenuEditable((prev) => {
                    return { ...prev, name: event.target.value };
                  })
                }
              />
            </label>
          </div>
          <div className="form-group">
            <label className="label-admins">
              <h4 className="h3-admin">Description</h4>
              <textarea
                className="textarea-admin"
                required
                value={menuEditable.description}
                onChange={(event) =>
                  setMenuEditable((prev) => {
                    return { ...prev, description: event.target.value };
                  })
                }
              ></textarea>
            </label>
          </div>
          <div className="form-group">
            <label className="labes">
              <h3 className="h3-admin">Price</h3>
              <input
               required
                type="number"
                value={menuEditable.price}
                onChange={(event) =>
                  setMenuEditable((prev) => {
                    return { ...prev, price: event.target.value };
                  })
                }
              ></input>
            </label>
          </div>
          <div className="form-group">
            <label className="labes">
              <h3 className="h3-admin">Image</h3>
              <input
                required
                type="text"
                value={menuEditable.imagen}
                onChange={(event) =>
                  setMenuEditable((prev) => {
                    return { ...prev, imagen: event.target.value };
                  })
                }
              />
            </label>
          </div>
          {createOrEdit === "edit" && (
            <>
            <button
                id="botoncrear"
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setShowButtons(true);
                }}
              >
                Cancel
              </button>
              <button
                id="botoncrear"
                type="button"
                onClick={() => updateMenu(menuEditable)}
                disabled={!formik.isValid}
              >
                Edit
              </button>
            </>
          )}
          {createOrEdit === "create" && (
            <>
              <button
                id="botoncrear"
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setShowButtons(true);
                }}
              >
                Cancel
              </button>
              <button
                id="botoncrear"
                type="button"
                onClick={() => createMenu(menuEditable)}
                disabled={!formik.isValid}
              >
                Create
              </button>
            </>
          )}
        </form>
      )}
    </Container>
  );
};
