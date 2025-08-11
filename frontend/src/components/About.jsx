import React from 'react';
import { 
  FiTarget, 
  FiHeart, 
  FiTrendingUp, 
  FiUsers, 
  FiAward, 
  FiGlobe,
  FiShield,
  FiTruck,
  FiThumbsUp,
  FiStar,
  FiMapPin,
  FiMail,
  FiPhone
} from 'react-icons/fi';
import { FaStore } from 'react-icons/fa';

const About = () => {
  const stats = [
    { icon: <FiUsers className="w-8 h-8" />, number: "50,000+", label: "Happy Customers" },
    { icon: <FiTruck className="w-8 h-8" />, number: "100,000+", label: "Orders Delivered" },
    { icon: <FiGlobe className="w-8 h-8" />, number: "25+", label: "Countries Served" },
    { icon: <FiAward className="w-8 h-8" />, number: "99.5%", label: "Customer Satisfaction" }
  ];

  const values = [
    {
      icon: <FiTarget className="w-8 h-8" />,
      title: "Quality First",
      description: "We never compromise on quality. Every product is carefully selected and tested to meet our high standards."
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Customer Love",
      description: "Our customers are at the heart of everything we do. Their satisfaction is our greatest achievement."
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Trust & Security",
      description: "We provide a secure shopping environment with reliable payment processing and data protection."
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Innovation",
      description: "We continuously evolve and innovate to provide the best shopping experience for our customers."
    }
  ];

  const team = [
    {
      name: "Rishabh Jain",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description: "Visionary leader with 15+ years in e-commerce"
    },
    {
      name: "Rishabh Jain",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description: "Tech innovator passionate about user experience"
    },
    {
      name: "Rishabh Jain",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description: "Design expert with an eye for fashion trends"
    }
  ];

  const milestones = [
    { year: "2020", event: "ShopNest Founded", description: "Started with a vision to revolutionize online shopping" },
    { year: "2021", event: "First 10K Customers", description: "Reached our first major milestone of satisfied customers" },
    { year: "2022", event: "International Expansion", description: "Expanded to serve customers across 25 countries" },
    { year: "2023", event: "Award Recognition", description: "Received 'Best E-commerce Platform' award" },
    { year: "2024", event: "50K+ Community", description: "Built a thriving community of loyal customers" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full h-16 w-16 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <FaStore className="text-white text-2xl" />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                ShopNest
              </h1>
            </div>
            
            <p className="text-xl lg:text-2xl text-blue-200 mb-8 leading-relaxed">
              Your trusted destination for premium shopping experiences
            </p>
            
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Since 2020, we've been dedicated to bringing you the finest products, exceptional service, 
              and a shopping experience that exceeds expectations. Join our community of satisfied customers 
              who trust us for quality, reliability, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  ShopNest was born from a simple yet powerful vision: to create an online shopping 
                  experience that feels personal, trustworthy, and delightful. We noticed that while 
                  e-commerce was growing rapidly, many platforms were losing the human touch that makes 
                  shopping truly enjoyable.
                </p>
                <p className="text-lg">
                  Founded in 2020 by a team of passionate entrepreneurs, we set out to bridge the gap 
                  between convenience and connection. Today, we're proud to serve thousands of customers 
                  worldwide, offering carefully curated products and exceptional service.
                </p>
                <p className="text-lg">
                  Our journey is just beginning. Every day, we work to innovate, improve, and create 
                  new ways to serve our community better. Your trust and satisfaction drive everything we do.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl p-8 border border-blue-500/20">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
                  alt="Our team" 
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Building Dreams Together</h3>
                  <p className="text-blue-200">Our dedicated team working to serve you better</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Our Values
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              These core principles guide every decision we make and every interaction we have with our customers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white w-fit mb-6 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              The passionate individuals behind ShopNest who work tirelessly to bring you the best shopping experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-2xl border border-blue-500/20 text-center group hover:border-blue-500/40 transition-all duration-300">
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-700 group-hover:border-blue-500 transition-all duration-300"
                  />
                  <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-400 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Our Journey
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Key milestones that shaped our growth and commitment to excellence.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-8 mb-12 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-4 h-4 rounded-full shadow-lg shadow-blue-500/30"></div>
                  {index !== milestones.length - 1 && (
                    <div className="w-0.5 h-20 bg-gradient-to-b from-blue-500 to-blue-600 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl border border-blue-500/20">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-bold border border-blue-500/30">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        {milestone.event}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl border border-blue-500/20 p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Have questions about our products or services? We'd love to hear from you. 
                  Our team is here to help and support you every step of the way.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg shadow-lg shadow-blue-500/25">
                      <FiMapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Our Office</p>
                      <p className="text-blue-200">123 Shopping Street, Fashion District, Mumbai 400001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg shadow-lg shadow-blue-500/25">
                      <FiPhone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <p className="text-blue-200">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg shadow-lg shadow-blue-500/25">
                      <FiMail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-blue-200">hello@shopnest.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-2xl p-8">
                  <FiThumbsUp className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Ready to Start Shopping?
                  </h3>
                  <p className="text-blue-200 mb-6">
                    Join thousands of satisfied customers who trust ShopNest for their shopping needs.
                  </p>
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105">
                    Explore Our Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;