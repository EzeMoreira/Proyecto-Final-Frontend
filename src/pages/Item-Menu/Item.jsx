import { useState, useEffect, useContext  } from "react";
import { DataContext } from "../../components/DataContext/DataContext";
import Swal from 'sweetalert2'
import "../../css/menu.css";

export const Item = ({ name, price, id, imagen }) => {
  const [menu, setMenu] = useState([]);
  const { addCart } = useContext(DataContext);

  const [localInputValue, setLocalInputValue] = useState(1);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-menues`)
      .then((response) => response.json())
      .then((loquerecibo) => setMenu(loquerecibo));
  }, []);

  const handleInputChange2 = (event) => {
    let inputValue = event.target.value;
  
    inputValue = inputValue.length > 0 ? Math.min(parseInt(inputValue), 5) : 1;
  
    setLocalInputValue(inputValue);
  }
  
  
  
  const handleAddToCart = () => {
    const itemToAdd = { name, price, id, imagen, cantidad: localInputValue }; 
    addCart(itemToAdd); 
    setLocalInputValue(1)
    Swal.fire({
      icon: 'success',
      title: 'Ready',
      text: 'Product added correctly',
      timer: '900'
    })
  };

  return (
    <div>
      <div className="item">
        <figure>
          <img src={imagen} width={400} height={400} alt={name} />
        </figure>
        <div className="info-product">
          <div>{name}</div>
          <div className="menu-input">
              <h5>Choose Quantity</h5>
              <input
                placeholder="¿How many menus do you want?"
                type="number"
                min={1}
                max={5}
                value={localInputValue}
                onChange={handleInputChange2}
                required
              />
            </div>
          <div className="item-price">${price}</div>
            <button onClick={handleAddToCart}>+ Add to cart</button>
       </div>
      </div>
    </div>
  );
};