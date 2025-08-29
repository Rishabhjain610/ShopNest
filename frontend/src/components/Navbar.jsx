import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser, FiMenu } from "react-icons/fi";
import { FaStore } from "react-icons/fa";
import { UserDataContext } from "../contextapi/UserContext";
import { AuthDataContext } from "../contextapi/AuthContext.jsx";
import { ShopDataContext } from "../contextapi/ShopContext";
import { toast } from "react-toastify";
import Language from "./Language.jsx";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { userData, setUserData } = useContext(UserDataContext);
  const { serverUrl } = useContext(AuthDataContext);
  const { search, setSearch, showSearch, setShowSearch, getcartcount } =
    useContext(ShopDataContext);
  const navigate = useNavigate();

  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Logout successful");
        setUserData(null);
        navigate("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout error");
    }
  };

  const initial = (userData?.name || "U").slice(0, 1).toUpperCase();

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white px-4 py-3 flex items-center justify-between shadow-xl border-b border-gray-800 fixed top-0 w-full z-50">
      {/* Logo */}
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

      {/* Links (desktop) */}
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
        {/* fixed to /collection */}
        <Link
          to="/collection"
          className="hover:bg-white hover:text-black px-4 py-2 rounded-full transition-colors duration-200 font-semibold"
        >
          Collections
        </Link>
        <Link
          to="/order"
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
        <span className="">
          <Language />
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <form className="relative hidden sm:flex">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              navigate("/collection");
            }}
            placeholder="Search products..."
            className="w-36 sm:w-56 md:w-72 lg:w-80 px-4 py-2 rounded-full bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200 shadow-inner"
            aria-label="Search"
          />
          <button
            type="submit"
            className="absolute right-2 top-1.5 p-1.5 rounded-full hover:bg-white/10"
          >
            <FiSearch className="text-white text-xl" />
          </button>
        </form>

        <Link to="/cart" className="relative group" aria-label="Cart">
          <FiShoppingCart className="text-2xl text-white group-hover:text-gray-300 transition-colors duration-200" />
          {getcartcount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg">
              {getcartcount()}
            </span>
          )}
        </Link>

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
                  {initial}
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

        <button
          className="sm:hidden ml-1 focus:outline-none"
          onClick={() => setSearchOpen((v) => !v)}
          aria-label="Open search"
        >
          <FiSearch className="text-2xl text-white" />
        </button>

        <button
          className="lg:hidden ml-1 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <FiMenu className="text-2xl text-white" />
        </button>
      </div>

      {searchOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-sm px-4 py-3 border-b border-gray-800 sm:hidden">
          <form onSubmit={submitSearch} className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 rounded-full bg-gray-900 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition"
              aria-label="Search mobile"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black bg-opacity-95 flex flex-col items-center gap-4 py-4 z-50 lg:hidden border-b border-gray-800">
          <Link
            to="/"
            className="text-white text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white text-lg"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/collection"
            className="text-white text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Collections
          </Link>
          <Link
            to="/order"
            className="text-white text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Orders
          </Link>
          <Link
            to="/contact"
            className="text-white text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          <div className="w-full border-t border-gray-700 my-2" />
          <Link
            to={userData ? "/profile" : "/login"}
            className="flex items-center gap-3 text-white text-lg"
            onClick={(e) => {
              if (userData) handlelogout(e);
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
                  {initial}
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
