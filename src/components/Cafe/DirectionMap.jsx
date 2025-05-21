import React from 'react';
import { FaCopy, FaDirections, FaMapMarkerAlt } from 'react-icons/fa';
// import { MapPin, Copy } from 'lucide-react';

const DirectionMap = () => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="h-40 bg-gray-200 relative">
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://i.pinimg.com/736x/b0/79/09/b079096855c0edbaba47d93c67f18853.jpg)' 
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center">
              <FaMapMarkerAlt className='text-white' />
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm text-gray-700">Plot 365, 6/4, Road 10, Jubilee Hills, Hyderabad</p>
      </div>
    </div>
  );
};

export default DirectionMap;