import React, { useContext } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About.jsx";
import Collection from "./components/Collection.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact.jsx";
import Product from "./components/Product.jsx";
import { UserDataContext } from "./contextapi/UserContext.jsx";

import Language from "./components/Language.jsx";
import ProductDetailspage from "./components/ProductDetailspage.jsx";
import CollectionPage from "./components/CollectionPage.jsx";
import Checkout from "./components/Checkout.jsx";
import Order from "./components/Order.jsx";
import Cart from "./components/Cart.jsx";
import Chatbot from "./components/Chatbot.jsx";
const App = () => {
  const { userData } = useContext(UserDataContext);
  return (
    <>
   
      <ToastContainer
        position="top-left"
        hideProgressBar={true}
        autoClose={1000}
        theme="dark"
        toastStyle={{
          background: "#18181b",
          color: "#fafafa",
          borderRadius: "10px",
          fontWeight: "500",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
        }}
      />

      {userData && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={userData ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={userData ? <Navigate to="/home" /> : <Login />}
        />

        <Route
          path="/signup"
          element={userData ? <Navigate to="/home" /> : <Signup />}
        />
        <Route
          path="/about"
          element={userData ? <About /> : <Navigate to="/login" />}
        />
        <Route
          path="/collection"
          element={userData ? <CollectionPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/product"
          element={userData ? <Product /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={userData ? <Contact /> : <Navigate to="/login" />}
        />
         <Route
          path="/productDetails/:id"
          element={userData ? <ProductDetailspage /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={userData ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/checkout"
          element={userData ? <Checkout /> : <Navigate to="/login" />}
        />
        <Route
          path="/order"
          element={userData ? <Order /> : <Navigate to="/login" />}
        />
      </Routes>
      {userData && <Chatbot />}
    </>
  );
};

export default App;
