import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
          {/* About Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3">About SharePlate</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              SharePlate is a community-driven platform that connects food donors and recipients, reducing food waste and helping those in need.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="text-gray-400 text-sm sm:text-base space-y-2">
              <li><a href="#" className="hover:text-green-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-2xl"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-2xl"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors text-2xl"><Instagram /></a>
              <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors text-2xl"><Linkedin /></a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm sm:text-base">
          &copy; {new Date().getFullYear()} SharePlate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;