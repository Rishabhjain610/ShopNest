import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaList, FaPlus, FaShoppingCart } from 'react-icons/fa';

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <>
      {/* desktop / tablet */}
      <aside className="hidden md:flex flex-col w-60 h-screen bg-white text-gray-800 border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link
            to="/"
            className={`flex items-center p-2 rounded-lg transition ${
              pathname === '/' 
                ? 'bg-gray-100 text-blue-600 border-l-4 border-blue-600' 
                : 'hover:bg-gray-50'
            }`}
          >
            <FaHome className="mr-3" /> Dashboard
          </Link>
          <Link
            to="/lists"
            className={`flex items-center p-2 rounded-lg transition ${
              pathname === '/lists' 
                ? 'bg-gray-100 text-blue-600 border-l-4 border-blue-600' 
                : 'hover:bg-gray-50'
            }`}
          >
            <FaList className="mr-3" /> List Items
          </Link>
          <Link
            to="/add"
            className={`flex items-center p-2 rounded-lg transition ${
              pathname === '/add' 
                ? 'bg-gray-100 text-blue-600 border-l-4 border-blue-600' 
                : 'hover:bg-gray-50'
            }`}
          >
            <FaPlus className="mr-3" /> Add Item
          </Link>
          <Link
            to="/orders"
            className={`flex items-center p-2 rounded-lg transition ${
              pathname === '/orders' 
                ? 'bg-gray-100 text-blue-600 border-l-4 border-blue-600' 
                : 'hover:bg-gray-50'
            }`}
          >
            <FaShoppingCart className="mr-3" /> View Orders
          </Link>
        </nav>
      </aside>

      {/* mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md md:hidden flex justify-around border-t border-gray-200 py-2">
        <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <FaHome className="text-xl" />
          <span className="text-xs">Dashboard</span>
        </Link>
        <Link to="/lists" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <FaList className="text-xl" />
          <span className="text-xs">Lists</span>
        </Link>
        <Link to="/add" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <FaPlus className="text-xl" />
          <span className="text-xs">Add</span>
        </Link>
        <Link to="/orders" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <FaShoppingCart className="text-xl" />
          <span className="text-xs">Orders</span>
        </Link>
      </nav>
    </>
  );
};

export default Sidebar;