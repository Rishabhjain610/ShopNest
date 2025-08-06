
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaList, FaPlus, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 transition-colors md:hidden"
      >
        {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 h-screen bg-black text-white border-r border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          <Link
            to="/"
            className={`flex items-center p-3 rounded-lg transition-colors ${
              pathname === '/' 
                ? 'bg-blue-600 text-white border-l-4 border-blue-400' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <FaHome className="mr-3 text-lg" /> Dashboard
          </Link>
          <Link
            to="/lists"
            className={`flex items-center p-3 rounded-lg transition-colors ${
              pathname === '/lists' 
                ? 'bg-blue-600 text-white border-l-4 border-blue-400' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <FaList className="mr-3 text-lg" /> List Items
          </Link>
          <Link
            to="/add"
            className={`flex items-center p-3 rounded-lg transition-colors ${
              pathname === '/add' 
                ? 'bg-blue-600 text-white border-l-4 border-blue-400' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <FaPlus className="mr-3 text-lg" /> Add Item
          </Link>
          <Link
            to="/orders"
            className={`flex items-center p-3 rounded-lg transition-colors ${
              pathname === '/orders' 
                ? 'bg-blue-600 text-white border-l-4 border-blue-400' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <FaShoppingCart className="mr-3 text-lg" /> View Orders
          </Link>
        </nav>
      </aside>

    
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">ShopNest</h1>
            <button
              onClick={toggleSidebar}
              className="p-1 text-gray-400 hover:text-white"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
        </div>
        <nav className="px-4 py-4 space-y-2">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              pathname === '/' 
                ? 'bg-blue-600 text-white border-l-4 border-blue-400' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <FaHome className="mr-3 text-lg" /> Dashboard
          </Link>
          <Link
            to="/lists"
            onClick={() => setIsOpen(false)}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              pathname === '/lists' 
                ? 'bg-blue-600 text-white border-l-4 border-blue-400' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <FaList className="mr-3 text-lg" /> List Items
          </Link>
          <Link
            to="/add"
            onClick={() => setIsOpen(false)}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              pathname === '/add' 
                ? 'bg-blue-600 text-white border-l-4 border-blue-400' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <FaPlus className="mr-3 text-lg" /> Add Item
          </Link>
          <Link
            to="/orders"
            onClick={() => setIsOpen(false)}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              pathname === '/orders' 
                ? 'bg-blue-600 text-white border-l-4 border-blue-400' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <FaShoppingCart className="mr-3 text-lg" /> View Orders
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;