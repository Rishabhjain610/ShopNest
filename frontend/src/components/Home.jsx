
import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import Background from './Background';
import Product from './Product';
import Ourpolicy from './Ourpolicy';
import Footer from './Footer';
const Home = () => {
  const [heroCount, setHeroCount] = useState(0);

  const heroData = [
    { text1: "Discover Amazing", text2: "Products Today" },
    { text1: "Shop the Latest", text2: "Trends Now" },
    { text1: "Quality You Can", text2: "Trust Always" },
    { text1: "Your Style,", text2: "Your Choice" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev + 1) % heroData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
     <div className="min-h-[100svh] bg-black text-white relative overflow-hidden">
      <Background heroCount={heroCount} />
      {/* pt-16 to offset fixed navbar on small screens */}
      <div className="relative z-10 flex items-center justify-center min-h-[100svh] px-4 sm:px-6 lg:px-8 pt-16">
        <Hero
          heroData={heroData[heroCount]}
          heroCount={heroCount}
          setHeroCount={setHeroCount}
        />
      </div>
    </div>
    <Product />
    <Ourpolicy/>
    <Footer/>
    </>
   
  );
};

export default Home;