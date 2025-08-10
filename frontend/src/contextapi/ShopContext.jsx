import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthDataContext } from "./AuthContext";
import axios from "axios";
export const ShopDataContext = createContext();
const ShopContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);
  const currency = "₹";
  const delivery_fees = 40;
  const getproducts = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/product/list`);
      console.log("Products fetched:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getproducts();
  }, []);

  const value = {
    products,
    setProducts,
    serverUrl,
    currency,
    delivery_fees,
    getproducts,
  };
  return (
    <div>
      <ShopDataContext.Provider value={value}>
        {children}
      </ShopDataContext.Provider>
    </div>
  );
};

export default ShopContext;
