
import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import Background from './Background';

const Home = () => {
  const [heroCount, setHeroCount] = useState(0);
  
  // Hero data
  const heroData = [
    {
      text1: "Discover Amazing",
      text2: "Products Today"
    },
    {
      text1: "Shop the Latest",
      text2: "Trends Now"
    },
    {
      text1: "Quality You Can",
      text2: "Trust Always"
    },
    {
      text1: "Your Style,",
      text2: "Your Choice"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Background heroCount={heroCount} />
      <div className="relative z-10 flex items-center justify-center h-screen px-4 sm:px-8">
        <Hero 
          heroData={heroData[heroCount]} 
          heroCount={heroCount} 
          setHeroCount={setHeroCount} 
        />
      </div>
    </div>
  );
};

export default Home;