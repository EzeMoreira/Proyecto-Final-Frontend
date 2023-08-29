import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import logo from "../../Coffe-img/logo.png"
import { FaSearch } from 'react-icons/fa'; 
import { FaShoppingCart } from 'react-icons/fa';

const getCursos = async () => {
	const resp = await axios(
		`${import.meta.env.VITE_SERVER_URI}/api/read-courses`
	)
	const { data } = resp
	// console.log(data)
	return data
}



export const NavBar = () => {
	const [cursos, setCursos] = useState()
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("user")) {
			getCursos().then(cursos => setCursos(cursos))
		}
	}, [])

	const handleClick = () => {
		localStorage.clear()
		navigate("/login")
	}

	return (
		<Navbar bg="black" >
			<Container className="nav-size">
				<Navbar.Brand href="#home" >
					<NavLink  to="/" >
						<div className="image-container">
							<img src={logo} alt="portada1" className="img-fluid logo"/>
						</div>
					</NavLink>
				</Navbar.Brand>
				<Nav className="me-auto ">
					<div className="palabras">
						<NavLink to="/" className="fs-4">HOME</NavLink>
						{!localStorage.getItem("user") && (
							<>
								<NavLink to="/login" className="fs-4">LOGIN</NavLink>
								<NavLink to="/about" className="fs-4">CONTACT US</NavLink>
							</>
						)}
						<NavLink to="/menu" className="fs-4">PRODUCTS</NavLink>
					</div>
					<NavLink to="/favoritos" activeClassName="active-link" className="fs-4"><FaShoppingCart /></NavLink>
					<NavLink to="" activeClassName="active-link" className="fs-4"><FaSearch /></NavLink>

					{localStorage.getItem("user") && (
						<NavDropdown title="Cursos" id="basic-nav-dropdown">
							{cursos?.map(curso => (
								<NavLink key={curso.id} to={`/course/${curso.id}`}>
									{curso.title}
								</NavLink>
							))}
						</NavDropdown>
					)}
				</Nav>
				{localStorage.getItem("user") && (
					<>
						{localStorage.getItem("role") === "admin" && (
							<Nav>
								<NavLink to="/administrator">Administrador</NavLink>
							</Nav>
						)}
						<Button onClick={handleClick} variant="light">
							Cerrare Sesione
						</Button>
					</>
				)}
			</Container>
		</Navbar>
	)
}
