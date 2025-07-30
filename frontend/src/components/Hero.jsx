
import React from "react";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className="w-full max-w-4xl text-center ml-[-400px] mt-12 sm:text-left relative z-20">
      <div className="text-white mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          {heroData.text1}
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-300 mb-8">
          {heroData.text2}
        </h2>
        <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl">
          Experience premium quality and exceptional style. Your perfect shopping destination awaits.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <Link 
            to="/collections"
            className="inline-flex items-center justify-center px-4 py-2 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Shop Now
          </Link>
          <Link 
            to="/about"
            className="inline-flex items-center justify-center px-4 py-2 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            Learn More
          </Link>
        </div>
      </div>
      
      {/* Navigation dots */}
      <div className="flex items-center justify-center sm:justify-start gap-3 mt-12">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => setHeroCount(index)}
            className={`transition-all duration-300 transform hover:scale-125 focus:outline-none ${
              heroCount === index ? "text-white" : "text-gray-500 hover:text-gray-300"
            }`}
            aria-label={`Slide ${index + 1}`}
          >
            <GoDotFill className="text-2xl" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;