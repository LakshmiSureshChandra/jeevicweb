import React from 'react';
import { FaCalendar, FaDirections, FaShareAlt, FaStar } from 'react-icons/fa';
// import { MapPin, Share2, Star, Calendar } from 'lucide-react';

const ActionButtons = () => {
  return (
    <div className="flex overflow-x-auto gap-2 py-4 mb-4">
      <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md whitespace-nowrap">
        <FaDirections className="h-4 w-4 text-blue-400" />
        <span>Direction</span>
      </button>
      
      <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md whitespace-nowrap">
        <FaShareAlt className="h-4 w-4 text-blue-400" />
        <span>Share</span>
      </button>
      
      <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md whitespace-nowrap">
        <FaStar className='h-4 w-4 text-blue-400'/>
        <span>Reviews</span>
      </button>
      
      <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md whitespace-nowrap">
        <FaCalendar className='h-4 w-4 text-blue-400'/>
        <span>Book a table</span>
      </button>
    </div>
  );
};

export default ActionButtons;