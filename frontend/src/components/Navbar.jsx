
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser, FiMenu } from "react-icons/fi";
import { FaStore } from "react-icons/fa";
import { UserDataContext } from "../contextapi/UserContext";
import { AuthDataContext } from "../contextapi/AuthContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userData, setUserData } = useContext(UserDataContext);
  const { serverUrl } = useContext(AuthDataContext);

  const handlelogout = async (e) => {
    // Prevent the Link from navigating
    e.preventDefault();
    try {
      const response = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Logout successful");
        setUserData(null); // Clear user data on logout
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout error");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white px-4 py-3 flex items-center justify-between shadow-xl border-b border-gray-800  fixed top-0 w-full z-50">
      {/* Logo and Brand */}
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

      {/* Navigation Links (Desktop) - Hidden on screens smaller than lg */}
      <div className="hidden lg:flex items-center gap-6 text-base">
        <Link
          to="/"
          className="hover:bg-white hover:text-black px-4 py-2 rounded-full transition-colors duration-200 font-semibold"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="hover:bg-white hover:text-black px-4 py-2 rounded-full transition-colors duration-200 font-semibold"
        >
          About
        </Link>
        <Link
          to="/collections"
          className="hover:bg-white hover:text-black px-4 py-2 rounded-full transition-colors duration-200 font-semibold"
        >
          Collections
        </Link>
        <Link
          to="/orders"
          className="hover:bg-white hover:text-black px-4 py-2 rounded-full transition-colors duration-200 font-semibold"
        >
          Orders
        </Link>
        <Link
          to="/contact"
          className="hover:bg-white hover:text-black px-4 py-2 rounded-full transition-colors duration-200 font-semibold"
        >
          Contact
        </Link>
      </div>

      {/* Right-side Icons */}
      <div className="flex items-center gap-4">
        {/* Search Bar - Hidden on small screens */}
        <div className="relative hidden sm:flex">
          <input
            type="text"
            placeholder="Search..."
            className="w-36 sm:w-48 px-4 py-2 rounded-full bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200 shadow-inner"
          />
          <FiSearch className="absolute right-3 top-2.5 text-white text-xl" />
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="group">
          <FiShoppingCart className="text-2xl text-white group-hover:text-gray-300 transition-colors duration-200" />
        </Link>

        {/* Profile/Login Button */}
        <div className="hidden lg:flex">
            <Link
            to={userData ? "/profile" : "/login"}
            className="flex items-center gap-2 rounded-full px-3 py-1 transition-colors duration-200 border border-gray-700 bg-gray-900 hover:bg-gray-800 shadow-sm"
            >
            {!userData ? (
                <>
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-700 text-white font-bold text-lg border border-gray-500">
                    <FiUser className="text-xl" />
                </span>
                <span className="font-semibold text-white pr-2">Login</span>
                </>
            ) : (
                <>
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-white text-black font-bold text-lg border border-gray-500">
                    {userData.name.slice(0, 1).toUpperCase()}
                </span>
                <button
                    className="font-semibold text-white pr-2"
                    onClick={handlelogout}
                >
                    Logout
                </button>
                </>
            )}
            </Link>
        </div>


        {/* Mobile Menu Button - Visible only on screens smaller than lg */}
        <button
          className="lg:hidden ml-2 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu className="text-2xl text-white" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black bg-opacity-95 flex flex-col items-center gap-4 py-4 z-50 lg:hidden">
          <Link to="/" className="text-white text-lg" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="text-white text-lg" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/collections" className="text-white text-lg" onClick={() => setMenuOpen(false)}>Collections</Link>
          <Link to="/orders" className="text-white text-lg" onClick={() => setMenuOpen(false)}>Orders</Link>
          <Link to="/contact" className="text-white text-lg" onClick={() => setMenuOpen(false)}>Contact</Link>
          <div className="w-full border-t border-gray-700 my-2"></div>
          {/* Profile/Login link for mobile dropdown */}
          <Link
            to={userData ? "/profile" : "/login"}
            className="flex items-center gap-3 text-white text-lg"
            onClick={(e) => {
                if (userData) {
                    handlelogout(e);
                }
                setMenuOpen(false);
            }}
          >
            {!userData ? (
                <>
                    <FiUser /> Login
                </>
            ) : (
                <>
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-white text-black font-bold text-lg">
                        {userData.name.slice(0, 1).toUpperCase()}
                    </span>
                    <span>Logout</span>
                </>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
