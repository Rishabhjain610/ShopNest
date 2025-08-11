import React, { useState } from 'react';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiHelpCircle,
  FiShoppingBag,
  FiTruck,
  FiRefreshCw,
  FiShield
} from 'react-icons/fi';
import { FaStore } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: "Visit Our Store",
      details: ["123 Shopping Street", "Fashion District, Mumbai 400001", "India"],
      color: "blue"
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 98765 43211", "Mon-Sat: 9AM-8PM"],
      color: "blue"
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: "Email Us",
      details: ["support@shopnest.com", "sales@shopnest.com", "Response within 2 hours"],
      color: "blue"
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 8PM", "Saturday: 10AM - 6PM", "Sunday: 12PM - 4PM"],
      color: "blue"
    }
  ];

  const supportCategories = [
    {
      icon: <FiShoppingBag className="w-8 h-8" />,
      title: "Order Support",
      description: "Help with placing orders, payment issues, and order modifications.",
      topics: ["Order Placement", "Payment Issues", "Order Tracking", "Order Changes"]
    },
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: "Shipping & Delivery",
      description: "Questions about shipping, delivery times, and tracking information.",
      topics: ["Delivery Status", "Shipping Rates", "Express Delivery", "International Shipping"]
    },
    {
      icon: <FiRefreshCw className="w-8 h-8" />,
      title: "Returns & Exchanges",
      description: "Assistance with returns, exchanges, and refund processes.",
      topics: ["Return Process", "Exchange Policy", "Refund Status", "Return Shipping"]
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Account & Security",
      description: "Help with account management, security, and privacy concerns.",
      topics: ["Account Access", "Password Reset", "Privacy Settings", "Security Issues"]
    }
  ];

  const faqItems = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all items in original condition with tags attached."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 25 countries worldwide. Shipping costs vary by location."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email to monitor your package."
    }
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
                <FiMessageSquare className="text-white text-2xl" />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                Contact Us
              </h1>
            </div>
            
            <p className="text-xl lg:text-2xl text-blue-200 mb-8 leading-relaxed">
              We're here to help and answer any questions you might have
            </p>
            
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get in touch with our friendly support team. Whether you need help with an order, 
              have questions about our products, or just want to say hello, we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 border-y border-gray-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-blue-200">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div>
              <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl border border-blue-500/20 p-8 lg:p-10">
                <h2 className="text-3xl font-bold text-white mb-8">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-blue-200 font-medium mb-2">
                        Your Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          required
                        />
                        <FiUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-blue-200 font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="w-full px-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          required
                        />
                        <FiMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-blue-200 font-medium mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Support</option>
                      <option value="shipping">Shipping & Delivery</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="account">Account & Security</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-blue-200 font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-[1.02] flex items-center justify-center gap-3"
                  >
                    <FiSend className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Map & Quick Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl border border-blue-500/20 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Find Us</h3>
                <div className="bg-gray-900 rounded-2xl h-64 flex items-center justify-center border border-gray-700">
                  <div className="text-center">
                    <FiMapPin className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-400">Interactive Map</p>
                    <p className="text-sm text-gray-500">123 Shopping Street, Mumbai</p>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Need Immediate Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                      <FiPhone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Call Now</p>
                      <p className="text-blue-200 text-sm">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                      <FiMail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Live Chat</p>
                      <p className="text-blue-200 text-sm">Available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              How Can We Help?
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Choose a category below to get specific help with your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportCategories.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white w-fit mb-6 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="space-y-2">
                  {category.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <span className="text-blue-200 text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Quick answers to common questions about our products and services.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-blue-500/20 p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg flex-shrink-0">
                    <FiHelpCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl border border-blue-500/20 p-8 lg:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/30">
                <FaStore className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Still Have Questions?
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Can't find what you're looking for? Our customer support team is always ready to help you 
                with any questions or concerns you might have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105">
                  Start Live Chat
                </button>
                <button className="border-2 border-blue-500/50 hover:border-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-blue-500/10">
                  Browse FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;