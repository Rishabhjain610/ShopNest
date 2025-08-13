import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthDataContext } from "./AuthContext";
import axios from "axios";
export const ShopDataContext = createContext();
const ShopContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
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
  const addTocart = async (id, size) => {
    if (!size) {
      return;
    }
    let cartData = structuredClone(cartItem);
    if (cartData[id][size]) {
      if (cartData[id][size]) {
        cartData[id][size].quantity += 1;
      } else {
        cartData[id][size] = 1;
      }
    } else {
      cartData[id] = {};
      cartData[id][size] = 1;
    }
    setCartItem(cartData);
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
    search,
    setSearch,
    showSearch,
    setShowSearch,
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
