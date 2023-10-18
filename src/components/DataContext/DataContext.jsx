import { createContext, useState, useContext} from "react";

export const DataContext = createContext([]);

export const DataProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addCart = (product) => {
    
    setCart((prev) => [...prev, { ...product }]);
   
  };
  const clearCart = () => {
    setCart([]);
  };
  

  return (
    <DataContext.Provider value={{ cart, setCart, addCart, clearCart }}>
      {children}
    </DataContext.Provider>
  );
};
export function useData() {
  return useContext(DataContext);
}