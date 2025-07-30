import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import { UserDataContext } from "../context/UserContext.jsx";
import axios from "axios";

const Navbar = () => {
  const { admin, setAdmin } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    
    try {
      await axios.get("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
    setAdmin(false);
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white px-4 py-3 flex items-center justify-between shadow-xl border-b border-gray-800 fixed top-0 w-full z-50">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-gray-700 via-gray-900 to-black rounded-full h-10 w-10 flex items-center justify-center shadow-lg border-2 border-white">
          <FaStore className="text-white text-2xl drop-shadow-lg" />
        </div>
        <Link
          to="/"
          className="font-extrabold text-2xl tracking-widest text-white hover:text-gray-300 transition-colors duration-200"
        >
          ShopNest
        </Link>
      </div>

      {/* Logout Button */}
      {admin && (
        <>
          <button className="flex items-center gap-2">
            <span
              onClick={handleLogout}
              className="cursor-pointer flex items-center justify-center h-8 w-8 rounded-full bg-white text-black font-bold text-lg"
            >
              {admin?.email.slice(0, 1).toUpperCase()}
            </span>
            <span
              onClick={handleLogout}
              className="cursor-pointer font-semibold hover:text-gray-300 transition-colors"
            >
              Logout
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
