import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ShopDataContext } from "../contextapi/ShopContext";
import { useContext } from "react";

const Card = ({ name, image, id, price }) => {
  const { currency } = useContext(ShopDataContext);

  return (
    <Link to={`/product/${id}`} className="block group">
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-700 hover:border-gray-500 transform hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Hover Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Content */}
        <div className="p-6 text-white">
          {/* Product Name */}
          <h3 className="font-bold text-xl text-white mb-4 line-clamp-2 group-hover:text-gray-100 transition-colors duration-300 leading-tight min-h-[3.5rem]">
            {name}
          </h3>

          {/* Price and Cart Section */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {currency}{price}
              </span>
              <span className="text-sm text-gray-400 mt-1">Free shipping</span>
            </div>

            <button 
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation when clicking cart
                // Add to cart logic here
              }}
              className="bg-white text-black p-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 group-hover:rotate-12"
            >
              <FiShoppingCart className="w-6 h-6" />
            </button>
          </div>

          {/* Decorative Bottom Border */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </Link>
  );
};

export default Card;