import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { DataContext } from "../DataContext/DataContext";
import CartIcon from "../CartIcon/CartIcon";
import logo from "../../Coffe-img/logo.png";
import "../../css/navBar.css";

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
	const { cart } = useContext(DataContext);
  const [cartItems] = useState([]);

  const handleClick = () => {
    let validator = window.confirm(`Esta seguro que desea cerrar sesion?`);
    if (validator) {
      localStorage.clear();
      window.location.reload();
      window.location.href = "/";
    }
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav>
      <Link to="/" className="title-nav">
        <div>
          <img src={logo} alt="portada1" className="logo" />
        </div>
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/menu">Menu</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact Us</NavLink>
        </li>
        {!localStorage.getItem("user") && (
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
        )}
        {localStorage.getItem("user") && (
          <>
            {localStorage.getItem("role") === "admin" && (
              <li>
                <NavLink to="/administrator">Admin</NavLink>
              </li>
            )}
            <li>
								<NavLink to="/carrito"><CartIcon itemCount={cartItemCount}/>{cart.length}</NavLink>
						</li>
            <li>
              <NavLink className="button-nav" onClick={handleClick}>Log out</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
