import React from 'react';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin,
  FiYoutube,
  FiHeart,
  FiArrowUp,
  FiSend
} from 'react-icons/fi';
import { FaStore } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Orders', href: '/orders' },
    { name: 'Collections', href: '/collection' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Size Guide', href: '/size-guide' }
  ];

  const customerService = [
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns & Exchanges', href: '/returns' },
    { name: 'Track Your Order', href: '/track' },
    { name: 'Payment Methods', href: '/payment' },
    { name: 'Customer Support', href: '/support' },
    { name: 'Bulk Orders', href: '/bulk' }
  ];

  const policies = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refund' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'Sitemap', href: '/sitemap' }
  ];

  const socialLinks = [
    { icon: <FiFacebook className="w-5 h-5" />, href: '#', name: 'Facebook' },
    { icon: <FiTwitter className="w-5 h-5" />, href: '#', name: 'Twitter' },
    { icon: <FiInstagram className="w-5 h-5" />, href: '#', name: 'Instagram' },
    { icon: <FiLinkedin className="w-5 h-5" />, href: '#', name: 'LinkedIn' },
    { icon: <FiYoutube className="w-5 h-5" />, href: '#', name: 'YouTube' }
  ];

  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Stay in the Loop
              </h3>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and special offers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <FiMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105 flex items-center justify-center gap-2">
                  <FiSend className="w-5 h-5" />
                  Subscribe
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full h-12 w-12 flex items-center justify-center shadow-lg">
                  <FaStore className="text-white text-xl" />
                </div>
                <h2 className="font-bold text-2xl text-white">ShopNest</h2>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Your trusted online shopping destination. We bring you the latest fashion trends, 
                quality products, and exceptional customer service all in one place.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                    <FiMapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Our Address</p>
                    <p className="text-gray-400 text-sm">123 Shopping Street, Fashion District, Mumbai 400001</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                    <FiPhone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Call Us</p>
                    <p className="text-gray-400 text-sm">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                    <FiMail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email Us</p>
                    <p className="text-gray-400 text-sm">support@shopnest.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Customer Service</h3>
              <ul className="space-y-3">
                {customerService.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Legal</h3>
              <ul className="space-y-3">
                {policies.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Social Links */}
              <div className="flex items-center gap-6">
                <p className="text-gray-400 font-medium">Follow Us:</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.name}
                      className="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Copyright */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>&copy; {currentYear} ShopNest. Made with</span>
                <FiHeart className="w-4 h-4 text-red-500" />
                <span>in India. All rights reserved.</span>
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 shadow-lg shadow-blue-500/25"
                aria-label="Back to top"
              >
                <FiArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Payment & Security Badges */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <p className="text-gray-500 text-sm">Secure payments powered by industry leaders</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="bg-gray-800 px-3 py-1 rounded">SSL Secured</span>
                <span className="bg-gray-800 px-3 py-1 rounded">PCI Compliant</span>
                <span className="bg-gray-800 px-3 py-1 rounded">ISO Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;