import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">


        {/* About Section with Logo */}
        <div>
          <div className="flex items-center mb-3">
            <img
              src={logo}
              alt="Doctor Hub Logo"
              className="w-12 h-12 mr-3"
            />
            <h3 className="text-xl font-bold">Doctor Hub</h3>
          </div>
          <p className="text-sm text-gray-300">
            Your trusted healthcare platform to find and book certified doctors near you.
          </p>
        </div>


        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/doctors" className="hover:underline">Doctors</a></li>
            <li><a href="/about" className="hover:underline">Aboutus</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-3">Contact Us</h4>
          <p className="text-sm text-gray-300">xxx xxx xxxx</p>
          <p className="text-sm text-gray-300">doctorhub@gmail.com</p>
          <p className="text-sm text-gray-300">Hyderabad</p>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-white text-xl">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-white text-xl">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white text-xl">
              <FaTwitter />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-8 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
        © 2025 Doctor Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
