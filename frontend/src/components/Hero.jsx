
import React from "react";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className="w-full max-w-5xl text-center sm:text-left relative z-20">
      <div className="text-white mb-10 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          {heroData.text1}
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-300 mb-6 sm:mb-8">
          {heroData.text2}
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto sm:mx-0">
          Experience premium quality and exceptional style. Your perfect shopping destination awaits.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <Link
            to="/collection"
            className="inline-flex items-center justify-center px-5 py-3 bg-white text-black font-bold text-base sm:text-lg rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Shop Now
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-5 py-3 bg-transparent border-2 border-white text-white font-bold text-base sm:text-lg rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 mt-8 sm:mt-10">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => setHeroCount(index)}
            className={`transition-all duration-300 transform hover:scale-125 focus:outline-none ${
              heroCount === index ? "text-white" : "text-gray-500 hover:text-gray-300"
            }`}
            aria-label={`Slide ${index + 1}`}
            type="button"
          >
            <GoDotFill className="text-2xl" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;