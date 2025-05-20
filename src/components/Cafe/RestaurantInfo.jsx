import React from 'react';
import { FaStar } from 'react-icons/fa';

const RestaurantInfo = () => {
  return (
    <div className="py-2">
      <h1 className="text-3xl font-semibold text-gray-900 md:mb-0 mb-1">Jeevic Cafe</h1>
      <p className="text-sm text-gray-500 md:mb-0 mb-1">South Indian, North Indian, Biryani, Chinese, Desserts, Beverages</p>
      
      {/* Mobile ratings (displayed in a row) */}
      <div className="md:hidden flex items-center space-x-3 my-2">
        <div className="flex items-center space-x-1">
          <div className="bg-green-100 px-2 py-0.5 rounded flex items-center">
            <span className="text-green-600 font-semibold text-sm">7.3</span>
            <FaStar className="text-green-600 ml-1 text-xs" />
          </div>
          <span className="text-xs text-gray-600">DINING</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <div className="bg-green-100 px-2 py-0.5 rounded flex items-center">
            <span className="text-green-600 font-semibold text-sm">4.3</span>
            <FaStar className="text-green-600 ml-1 text-xs" />
          </div>
          <span className="text-xs text-gray-600">DELIVERY</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-400">Jubilee Hills • 1.3 km • ₹350 for two • 11:30am - 11pm</p>
      
      {/* Desktop ratings (displayed in the original layout) */}
      <div className="hidden md:flex justify-end items-center mt-2 space-x-1 absolute top-16 right-40">
        <div className="bg-green-100 px-2 py-1 rounded-lg flex items-center">
          <span className="text-green-600 font-semibold text-sm">4.3</span>
          <FaStar className="text-green-600 ml-1" />
        </div>
        <div className="text-xs flex flex-col justify-center">
          <p className="font-semibold">7,987</p>
          <p className="text-gray-500">Dining ratings</p>
        </div>
        
        <div className="bg-green-100 px-2 py-1 rounded-lg flex items-center ml-4">
          <span className="text-green-600 font-semibold text-sm">4.2</span>
          <FaStar className="text-green-600 ml-1" />
        </div>
        <div className="text-xs flex flex-col justify-center">
          <p className="font-semibold">4,396</p>
          <p className="text-gray-500">Delivery ratings</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;