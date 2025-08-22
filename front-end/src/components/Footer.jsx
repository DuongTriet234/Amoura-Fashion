import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12 my-10 pt-10 text-sm max-w-6xl mx-auto px-4">
        {/* Logo & About */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Amoura Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-relaxed">
            Amoura is dedicated to bringing you premium products with excellent
            service. Your satisfaction is our top priority.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg font-semibold mb-4">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black cursor-pointer transition">Home</li>
            <li className="hover:text-black cursor-pointer transition">
              About Us
            </li>
            <li className="hover:text-black cursor-pointer transition">
              Delivery
            </li>
            <li className="hover:text-black cursor-pointer transition">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-lg font-semibold mb-4">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black transition">📞 +84 270 688 886</li>
            <li className="hover:text-black transition">
              📧 contact@amoura.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <p className="py-5 text-sm text-center text-gray-500">
          © 2025 Amoura. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
