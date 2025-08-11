import React, { useState, useEffect, useContext } from "react";
import { FiArrowRight, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ShopDataContext } from "../contextapi/ShopContext";
import Card from "./Card";

const Collection = () => {
  const { products } = useContext(ShopDataContext);
  const [latestproduct, setlatestproduct] = useState([]);

  useEffect(() => {
    if (products && products.products) {
      setlatestproduct(products.products.slice(0, 9));
    }
  }, [products]);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-black to-gray-900/30"></div>
      <div className="absolute top-40 left-8 w-80 h-80 bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-8 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-3xl"></div>

      <div className="relative z-10 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-gray-300 border border-white/20">
                <FiStar className="w-4 h-4" />
                Premium Selection
              </span>
            </div>

            <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-6 tracking-tight leading-none">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Our Collection
              </span>
            </h1>

            <p className="text-xl sm:text-xl md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed px-2">
              Discover exceptional products designed for modern living
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Link
                to="/all-products"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto max-w-xs"
              >
                Shop All
                <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/categories"
                className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/40 text-white font-bold text-lg rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 w-full sm:w-auto max-w-xs"
              >
                Categories
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {latestproduct && latestproduct.length > 0 ? (
              latestproduct.map((item, idx) => (
                <Card
                  key={item._id || idx}
                  name={item.name}
                  image={item.image1}
                  id={item._id}
                  price={item.price}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="w-16 h-16 border-4 border-gray-700 border-t-white rounded-full animate-spin mx-auto mb-8"></div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {products ? "No Products Available" : "Loading Products..."}
                </h3>
                <p className="text-gray-400 text-lg max-w-md mx-auto px-4">
                  {products
                    ? "Check back soon for new arrivals"
                    : "Please wait while we load the collection"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
