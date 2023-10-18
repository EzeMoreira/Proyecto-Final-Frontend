import { useState, useEffect, useContext  } from "react";
import { DataContext } from "../../components/DataContext/DataContext";
import "../../css/menu.css";

export const Item = ({ name, price, id, imagen }) => {
  const [menu, setMenu] = useState([]);
  const { addCart } = useContext(DataContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-menues`)
      .then((response) => response.json())
      .then((loquerecibo) => setMenu(loquerecibo));
  }, []);

  
  const handleAddToCart = () => {
    const itemToAdd = { name, price, id, imagen }; 
    addCart(itemToAdd); 
  };

  return (
    <div>
      <div className="item">
        <figure>
          <img src={imagen} width={400} height={400} alt={name} />
        </figure>
        <div className="info-product">
          <div>{name}</div>
          <div className="item-price">${price}</div>
            <button onClick={handleAddToCart}>+ Add to cart</button>
       </div>
      </div>
    </div>
  );
};