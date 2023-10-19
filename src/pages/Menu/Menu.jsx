import { useState, useEffect } from "react";
import { Item } from "../Item-Menu/Item";
import "../../css/menu.css"

export const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-menues`)
      .then((response) => response.json())
      .then((loquerecibo) => setMenuItems(loquerecibo));
  }, []);

  return (
    <>
      <h1 className="title-menu"> Menu </h1>
      <h3 className="title2">To make your purchase add the product to the shopping cart.</h3>
      <div className="container-items">
        {menuItems.map((product) => (
          <Item key={product.id} {...product} />
        ))}
      </div>
    </>
  );
};
