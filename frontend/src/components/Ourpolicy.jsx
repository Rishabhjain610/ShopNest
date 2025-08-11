import React, { useState } from 'react';
import { 
  FiShield, 
  FiTruck, 
  FiRefreshCw, 
  FiCreditCard, 
  FiLock, 
  FiHeadphones,
  FiCheck,
  FiClock,
  FiGift,
  FiStar,
  FiChevronRight,
  FiAward
} from 'react-icons/fi';

const Ourpolicy = () => {
  const [activePolicy, setActivePolicy] = useState(0);

  const policies = [
    {
      id: 0,
      icon: <FiTruck className="w-8 h-8" />,
      title: "Free Shipping",
      subtitle: "Worldwide Delivery",
      description: "Free shipping on all orders over ₹999. Fast and reliable delivery to your doorstep.",
      details: [
        "Free delivery on orders above ₹999",
        "Express shipping available",
        "Track your order in real-time",
        "Delivery within 2-7 business days",
        "International shipping to 50+ countries"
      ],
      intensity: "400"
    },
    {
      id: 1,
      icon: <FiRefreshCw className="w-8 h-8" />,
      title: "Easy Returns",
      subtitle: "30-Day Return Policy",
      description: "Not satisfied? Return your items within 30 days for a full refund or exchange.",
      details: [
        "30-day return window",
        "Free return shipping",
        "Full refund or exchange",
        "No questions asked policy",
        "Easy online return process"
      ],
      intensity: "500"
    },
    {
      id: 2,
      icon: <FiCreditCard className="w-8 h-8" />,
      title: "Secure Payment",
      subtitle: "Multiple Payment Options",
      description: "Your payment information is secure with our encrypted payment gateway.",
      details: [
        "SSL encrypted transactions",
        "Multiple payment methods",
        "Credit/Debit cards accepted",
        "UPI & Digital wallets",
        "EMI options available"
      ],
      intensity: "600"
    },
    {
      id: 3,
      icon: <FiHeadphones className="w-8 h-8" />,
      title: "24/7 Support",
      subtitle: "Customer Service",
      description: "Our dedicated support team is available round the clock to help you.",
      details: [
        "24/7 customer support",
        "Live chat assistance",
        "Email support within 2 hours",
        "Phone support available",
        "Multilingual support team"
      ],
      intensity: "700"
    }
  ];

  const features = [
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Secure Shopping",
      description: "Your data is protected with industry-standard security measures.",
      intensity: "400"
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      title: "Quality Guaranteed",
      description: "We ensure all products meet our high-quality standards.",
      intensity: "500"
    },
    {
      icon: <FiStar className="w-6 h-6" />,
      title: "Premium Service",
      description: "Experience exceptional service from order to delivery.",
      intensity: "600"
    },
    {
      icon: <FiGift className="w-6 h-6" />,
      title: "Special Offers",
      description: "Enjoy exclusive deals and seasonal promotions.",
      intensity: "700"
    }
  ];

  const activeTheme = policies[activePolicy];

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-3 mb-8">
            <FiShield className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-semibold">Our Policies</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
            Your Trust,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Our Promise
            </span>
          </h2>
          
          <p className="text-gray-300 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            We're committed to providing you with an exceptional shopping experience. 
            Here are our policies that ensure your satisfaction and security.
          </p>
        </div>

        {/* Main Policies Section */}
        <div className="grid lg:grid-cols-5 gap-8 mb-20">
          {/* Policy Cards - Left Side */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6">Choose a Policy</h3>
            {policies.map((policy, index) => (
              <div
                key={policy.id}
                onClick={() => setActivePolicy(index)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
                  activePolicy === index
                    ? `bg-blue-${policy.intensity}/10 border-blue-${policy.intensity}/40 shadow-xl shadow-blue-${policy.intensity}/20`
                    : 'bg-gray-800/50 border-gray-700 hover:border-gray-600 shadow-md hover:shadow-lg hover:bg-gray-800/70'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl transition-all duration-300 ${
                    activePolicy === index 
                      ? `bg-gradient-to-r from-blue-${policy.intensity} to-blue-${parseInt(policy.intensity) + 100} text-white shadow-lg shadow-blue-${policy.intensity}/30` 
                      : 'bg-gray-700 text-gray-300 group-hover:bg-gray-600'
                  }`}>
                    {policy.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`text-xl font-bold mb-1 transition-colors ${
                      activePolicy === index ? `text-blue-${policy.intensity}` : 'text-white'
                    }`}>
                      {policy.title}
                    </h4>
                    <p className={`text-sm font-medium transition-colors ${
                      activePolicy === index ? `text-blue-${parseInt(policy.intensity) + 200}` : 'text-gray-400'
                    }`}>
                      {policy.subtitle}
                    </p>
                  </div>
                  
                  <FiChevronRight className={`w-5 h-5 transition-all duration-300 ${
                    activePolicy === index 
                      ? `rotate-90 text-blue-${policy.intensity}` 
                      : 'text-gray-400'
                  }`} />
                </div>
              </div>
            ))}
          </div>

          {/* Active Policy Details - Right Side */}
          <div className="lg:col-span-3">
            <div className={`p-8 lg:p-10 rounded-3xl border-2 shadow-xl transition-all duration-500 bg-blue-${activeTheme.intensity}/5 border-blue-${activeTheme.intensity}/30 shadow-blue-${activeTheme.intensity}/10`}>
              <div className="flex items-center gap-6 mb-8">
                <div className={`p-5 rounded-2xl bg-gradient-to-r from-blue-${activeTheme.intensity} to-blue-${parseInt(activeTheme.intensity) + 100} text-white shadow-xl shadow-blue-${activeTheme.intensity}/30`}>
                  {activeTheme.icon}
                </div>
                <div>
                  <h3 className={`text-3xl font-bold mb-2 text-blue-${activeTheme.intensity}`}>
                    {activeTheme.title}
                  </h3>
                  <p className={`text-lg font-semibold text-blue-${parseInt(activeTheme.intensity) + 200}`}>
                    {activeTheme.subtitle}
                  </p>
                </div>
              </div>
              
              <p className="text-lg mb-8 leading-relaxed text-gray-300">
                {activeTheme.description}
              </p>
              
              <div className="space-y-4">
                <h4 className={`text-xl font-bold mb-6 text-blue-${activeTheme.intensity}`}>
                  Key Features:
                </h4>
                {activeTheme.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/30 border border-gray-700">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-blue-${activeTheme.intensity} to-blue-${parseInt(activeTheme.intensity) + 100} flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <FiCheck className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-base font-medium text-gray-200">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Why Choose ShopNest?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-gray-800/50 border-2 border-gray-700 hover:border-gray-600 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 hover:bg-gray-800/70"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r from-blue-${feature.intensity} to-blue-${parseInt(feature.intensity) + 100} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-${feature.intensity}/30`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl rounded-3xl border-2 border-gray-600 p-8 lg:p-12 shadow-xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
                <FiLock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white">
                Shop with Complete Confidence
              </h3>
            </div>
            
            <p className="text-gray-300 text-lg lg:text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
              Your satisfaction is our top priority. Every purchase is backed by our comprehensive policies 
              ensuring a completely worry-free shopping experience from start to finish.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 shadow-blue-500/25">
                Start Shopping Now
              </button>
              <button className="border-2 border-gray-600 hover:border-blue-500 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-blue-500/10">
                Contact Our Support
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-600">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">50K+</div>
                <div className="text-gray-400 font-medium">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">99.9%</div>
                <div className="text-gray-400 font-medium">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-400 font-medium">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 opacity-20">
        <FiShield className="w-24 h-24 text-blue-500 animate-pulse" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-20">
        <FiTruck className="w-20 h-20 text-blue-400 animate-bounce" />
      </div>
    </section>
  );
};

export default Ourpolicy;