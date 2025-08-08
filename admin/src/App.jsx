import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lists from "./pages/Lists";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import { UserDataContext } from "./context/UserContext.jsx";
import Navbar from "./components/Navbar";
import Edit from "./pages/Editlisting.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Editlisting from "./pages/Editlisting.jsx";
const App = () => {
  const { admin, setAdmin } = useContext(UserDataContext);
  return (
    <div>
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
      <Navbar />
      {admin ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Editlisting />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
