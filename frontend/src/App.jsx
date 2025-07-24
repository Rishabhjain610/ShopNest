import React, { useContext } from "react";
import "./App.css";
import { Routes, Route,Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { UserDataContext } from "./contextapi/UserContext.jsx";
import { AuthDataContext } from "./contextapi/AuthContext.jsx";
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
        <Route path="/" element={userData?<Home />:<Navigate to="/login" />} />
        <Route 
          path="/login" 
          element={userData ? <Navigate to="/" /> : <Login />} 
        />
        
        
        <Route 
          path="/signup" 
          element={userData ? <Navigate to="/" /> : <Signup />} 
        />
      </Routes>
    </>
  );
};

export default App;
