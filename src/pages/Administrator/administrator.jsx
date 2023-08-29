import { useState, useEffect } from "react"
import axios from "axios"
import Container from "react-bootstrap/Container"

import "../../css/administrador.css"

export const Administrador = () => {
	const [menues, setMenues] = useState([])
	const [menuEditable, setMenuEditable] = useState({})
	const [showForm, setShowForm] = useState(false)
	const [showButtons, setShowButtons] = useState(true);
	const [createOrEdit, setCreateOrEdit] = useState("")

	useEffect(() => {
		fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-menues`)
			.then(response => response.json())
			.then(loquerecibo => setMenues(loquerecibo))
	}, [])
	const headers = {
		Authorization: "Bearer " + localStorage.getItem("token"),
	  };

	const deleteMenu = async id => {
		const resp = await axios.delete(
			`${import.meta.env.VITE_SERVER_URI}/api/delete-menu/${id}`,
			{
				headers,
			}
		)
		const { status } = resp

		if (status === 200) {
			const deleteMenuOnRender = menues.filter(menu => menu.id !== id)
			setMenues(deleteMenuOnRender)
		}
	}

	const updateMenu = async menu => {
		const { title, detail, id, precio, categoria, img } = menu

		const resp = await axios.put(
			`${import.meta.env.VITE_SERVER_URI}/api/update-menu`,
			{
				id_menu: id,
				modify: {
					title,
					detail,
					img,
					precio,
					categoria,
				},
			},
			{
				headers,
			}
		)
		const { status } = resp

		if (status === 200) {
			const othersMenues = menues.filter(prev => prev.id !== menu.id)
			setMenues([...othersMenues, menu])
		}
		setShowForm(false);
		setShowButtons(true);
	}

	const createMenu = async menu => {
		const { title, detail, img, precio, categoria } = menu

		const resp = await axios.post(
			`${import.meta.env.VITE_SERVER_URI}/api/create-menu`,
			{
				title,
                img,
                detail,
                precio,
                categoria,
			},
			{
				headers: { ...headers, accept: "application/json"},
			}
		)
		const { status } = resp

		if (status === 201) {
			const othersMenues = menues.filter(prev => prev.id !== menu.id)
			setMenues([...othersMenues, menu])
		}
		setShowForm(false);
		setShowButtons(true);
	}

	const handleDelete = (id, title) => {
		let validator = window.confirm(
			`Está seguro que quiere eliminar el menu ${title}?`
		)
		if (validator) deleteMenu(id)
	}

	const handleEdit = menu => {
		setShowForm(true)
		setMenuEditable(menu)
		setCreateOrEdit("edit")
		setShowButtons(false);
	}

	const handleCreate = () => {
		setShowForm(true)
		setMenuEditable({})
		setCreateOrEdit("create")
		setShowButtons(false);
	}
	return (
		<Container id="admin">
			<h1>Admin</h1>
			{!showForm && (
				<table id="responsive-table" className="table">
					<thead className="thead-dark">
					    <tr id="administrador">
							<td>Administrador de Menus</td>
						</tr>
						<tr id="thead">
							<th id="th" scope="col">Titulo</th>
							<th id="th" scope="col">Detalle</th>
							<th id="th" scope="col">Categoria</th>
							<th id="th" scope="col">Precio</th>
							<th id="th" scope="col">Botones</th>
						</tr>
					</thead>
					<tbody id="tbody">
						{menues.map(menu => (
							<tr key={menu.id}>
								<td id="td" data-label="Titulo:" className="letra_tabla">{menu.title}</td>
								<td id="td" data-label="Detalle:" className="letra_tabla">{menu.detail}</td>
								<td id="td" data-label="Categoria:" className="letra_tabla">{menu.categoria}</td>
								<td id="td" data-label="Precio:" className="letra_tabla">{menu.precio}</td>
								<td>
									<button id="botonEliminar"
										className="btn btn-danger mr-2 mb-2"
										onClick={() =>
											handleDelete(menu.id, menu.title)
										}
									>
										Eliminar
									</button>
									<button id="botonEditar"
										className="btn btn-warning mr-2 mb-2 "
										onClick={() => handleEdit(menu)}
									>
										Editar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{showButtons && ( <button onClick={handleCreate}>Crear nuevo</button>)}
			{showForm && (
				<form>
					<div id="label">
						<label><h3 id="h3" >Título</h3></label>
						<input
							type="text"
							value={menuEditable.title}
							onChange={event =>
								setMenuEditable(prev => {
									return { ...prev, title: event.target.value }
								})
							}
						/>
					</div>
					<div id="label">
						<label><h4 id="h3" >Descripcion</h4></label>
						<textarea
							value={menuEditable.detail}
							onChange={event =>
								setMenuEditable(prev => {
									return { ...prev, detail: event.target.value }
								})
							}
						></textarea>
					</div>
					<div id="label">
						<label><h3 id="h3" >Categoria</h3></label>
						<textarea
							value={menuEditable.categoria}
							onChange={event =>
								setMenuEditable(prev => {
									return { ...prev, categoria: event.target.value }
								})
							}
						></textarea>
					</div>
					<div id="label">
						<label><h3 id="h3" >Precio</h3></label>
						<textarea
							value={menuEditable.precio}
							onChange={event =>
								setMenuEditable(prev => {
									return { ...prev, precio: event.target.value }
								})
							}
						></textarea>
					</div>
					<div id="label">
						<label><h3 id="h3" >Imagen</h3></label>
						<input
							type="text"
							value={menuEditable.img}
							onChange={event =>
								setMenuEditable(prev => {
									return { ...prev, img: event.target.value }
								})
							}
						/>
					</div>
					{createOrEdit === "edit" && (
						<button id="botoncrear" 
							type="button"
							onClick={() => updateMenu(menuEditable)}
						>
							Editar
						</button>
					)}
					{createOrEdit === "create" && (
						<button id="botoncrear" 
							type="button"
							onClick={() => createMenu(menuEditable)}
						>
							Crear
						</button>
					)}
				</form>
			)}
		</Container>
	)
}