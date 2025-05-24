import React from 'react';
import { FaShareAlt } from'react-icons/fa';

const RestaurantInfo = () => {
  return (
    <div className='flex justify-between items-start'>
      <div className="py-2 flex-grow">
        <h1 className="text-3xl font-semibold text-gray-900 md:mb-0 mb-1">Jeevic Cafe</h1>
        <p className="text-sm text-gray-400">Nallagandla • 6:00am - 12am</p>
      </div>
      <button className="flex items-center space-x-1 px-2 py-1 border border-gray-300 rounded-md whitespace-nowrap text-sm">
        <FaShareAlt className="h-3 w-3 text-blue-400" />
        <span>Share</span>
      </button>
    </div>
  );
};

export default RestaurantInfo;