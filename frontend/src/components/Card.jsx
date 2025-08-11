import React from "react";
import { FiShoppingCart, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ShopDataContext } from "../contextapi/ShopContext";
import { useContext } from "react";

const Card = ({ name, image, id, price }) => {
  const { currency } = useContext(ShopDataContext);

  return (
    <Link to={`/product/${id}`} className="block">
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl shadow-2xl transition-all duration-300 overflow-hidden border border-gray-800">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-3xl">
          <img
            src={image}
            alt={name}
            className="w-full h-80 object-cover transition-transform duration-300"
            loading="lazy"
          />

          {/* Gray Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-gray-900/20 to-transparent opacity-60" />

          {/* Quick View Button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                // Quick view logic
              }}
              className="w-10 h-10 bg-black/70 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-white transition-all duration-300"
            >
              <FiEye className="w-4 h-4" />
            </button>
          </div>

          {/* Sale Badge */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            NEW
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-white relative">
          {/* Product Name */}
          <h3 className="font-bold text-xl text-white mb-4 line-clamp-2 leading-tight min-h-[3.5rem]">
            {name}
          </h3>

          {/* Features */}
          <div className="flex gap-2 mb-4">
            <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full border border-gray-600">
              Premium Quality
            </span>
            <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full border border-gray-600">
              Fast Delivery
            </span>
          </div>

          {/* Price and Cart Section */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-gray-100 via-white to-gray-200 bg-clip-text text-transparent">
                  {currency}
                  {price}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {currency}
                  {Math.round(price * 1.2)}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-400 font-medium">
                  Free shipping
                </span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="text-sm text-green-400 font-medium">
                  In Stock
                </span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation when clicking cart
                // Add to cart logic here
              }}
              className="bg-gradient-to-r from-gray-600 to-gray-700 text-white p-4 rounded-2xl transition-all duration-300 shadow-lg"
            >
              <FiShoppingCart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
