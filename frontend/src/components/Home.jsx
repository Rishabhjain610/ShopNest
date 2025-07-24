import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Hero from './Hero';
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center p-4 overflow-hidden">
      <Hero/>
    </div>
  );
};

export default Home;