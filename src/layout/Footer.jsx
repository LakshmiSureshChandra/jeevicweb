import {
  ArrowDown01Icon,
  Facebook01Icon,
  InstagramIcon,
  SentIcon,
} from "hugeicons-react";
import React from "react";
import { Link } from "react-router-dom";

const footerLinks = {
  Company: ["About Us", "Our Store", "Contact Us"],
  "Career Opportunities": ["Selling Programs", "Advertise", "Cooperation"],
  "How to Buy": [
    "Making Payments",
    "Delivery Options",
    "Buyer Protection",
    "New User Guide",
  ],
  Help: ["FAQ", "Contact Us", "Privacy Policy"],
};

const Footer = () => {
  return (
    <footer className="w-full bg-white">
      <div className="flex w-full flex-col items-center">
        {/* Newsletter Section */}
        <div className="relative w-full bg-gradient-to-r from-blue-600 to-blue-400 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Subscribe to Our Newsletter
              </h2>
              <p className="max-w-2xl text-lg text-white/90">
                Stay updated with our latest offers, new arrivals, and exclusive discounts
              </p>
              <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full px-6 py-3 outline-none"
                />
                <button className="rounded-full bg-blue-800 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-900">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-16 md:grid-cols-4 lg:gap-12">
          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h3 className="mb-6 text-lg font-semibold text-gray-900">{title}</h3>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gray-600 transition-colors hover:text-blue-600"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
            <p className="text-sm text-gray-600">
              © 2024 Jeevic Store. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-600 transition-colors hover:text-blue-600">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 transition-colors hover:text-blue-600">
                <Facebook01Icon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
