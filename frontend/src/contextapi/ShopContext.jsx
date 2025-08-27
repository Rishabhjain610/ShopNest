import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthDataContext } from "./AuthContext";
import { UserDataContext } from "./UserContext";
import axios from "axios";

export const ShopDataContext = createContext();
const ShopContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const { serverUrl } = useContext(AuthDataContext);
  const { userData } = useContext(UserDataContext);
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

  // Add to cart logic
  const addTocart = async (id, size) => {
    // If no size is selected, do nothing
    if (!size) {
      return;
    }

    // Create a deep copy of the current cart to avoid direct mutation
    let cartData = structuredClone(cartItem||{});

    // Check if the product (id) already exists in the cart
    if (cartData[id]) {
      // If the selected size for this product already exists in the cart
      if (cartData[id][size]) {
        // Increase the quantity for that size
        cartData[id][size].quantity += 1;
      } else {
        // If the size doesn't exist, add it with quantity 1
        cartData[id][size] = { quantity: 1 };
      }
    } else {
      // If the product doesn't exist in the cart, create a new entry
      cartData[id] = {};
      // Add the selected size with quantity 1
      cartData[id][size] = { quantity: 1 };
    }
    // Update the cart state with the new cart data
    setCartItem(cartData);
    // Log the updated cart for debugging
    console.log(cartData);
    if (userData) {
      try {
        const response = await axios.post(
          `${serverUrl}/api/cart/add`,
          {
            id,
            size,
          },
          {
            withCredentials: true,
          }
        );
        console.log("Product added to cart:", response.data);
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    }
  };

  const getUserCart = async () => {
    if (userData) {
      try {
        const response = await axios.post(
          `${serverUrl}/api/cart/user`,
          {},
          {
            withCredentials: true,
          }
        );
        setCartItem(response.data.cartData);
        console.log("User cart fetched:", response.data.cartData);
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    }
  };



  const updatequantity = async (id, size, quantity) => {

    let cartData = structuredClone(cartItem);
    if (cartData[id] && cartData[id][size]) {
      cartData[id][size].quantity = quantity;
      setCartItem(cartData);
    }
    if (userData) {
      try {
        const response = await axios.post(
          `${serverUrl}/api/cart/update`,
          {
            id,
            size,
            quantity,
          },
          {
            withCredentials: true,
          }
        );
        setCartItem(response.data.cartData);
        console.log("Cart updated:", response.data);
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };










  const getCartAmount =  () => {
    let totalAmount = 0; // Initialize total amount
    console.log("Calculating cart amount for: getcart amount", cartItem);
    // Loop through each product in the cart
    for (const items in cartItem) {
      // Find the product details from the products array using product ID
      const product = products.products.find((prod) => prod._id === items);

      // Loop through each size for the current product
      for (const item in cartItem[items]) {
        try {
          // Check if the cart entry exists and is valid
          if (cartItem[items][item].quantity > 0) {
            // Multiply quantity of this size by product price and add to total
            totalAmount += cartItem[items][item].quantity * product.price;
          }
        } catch (error) {
          // Log any errors that occur during calculation
          console.error("Error calculating cart amount:", error);
        }
      }
    }
    // Return the total cart amount
    return totalAmount;
  };




  const getcartcount = () => {
    let totalcount = 0;
    for (const id in cartItem) {
      for (const size in cartItem[id]) {
        totalcount += cartItem[id][size].quantity;
      }
    }
    return totalcount;
  };

  useEffect(() => {
    getproducts();
  }, []);
  useEffect(() => {
    getUserCart();
  }, [userData]);

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
    cartItem,
    getcartcount,
    setCartItem,
    addTocart,
    getUserCart,
    updatequantity,
    getCartAmount

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
