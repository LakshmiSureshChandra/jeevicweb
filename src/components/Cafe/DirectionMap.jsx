import React from 'react';
import { FaCopy, FaDirections, FaMapMarkerAlt } from 'react-icons/fa';

const DirectionMap = () => {
  const address = "Shutter no 4 Ground floor, KLC one building, Nallagandla, Hyderabad, Telangana 500019";
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
  };

  const handleGetDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="h-[300px] w-full relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d237.8572319643337!2d78.30909264495453!3d17.47331579524214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3bcb93860079b959%3A0xf018a3ed497b5c93!2sShutter%20no%204%20Ground%20floor%2C%20KLC%20one%20building%2C%20Nallagandla%2C%20Hyderabad%2C%20Telangana%20500019!3m2!1d17.4734241!2d78.309085!5e0!3m2!1sen!2sin!4v1748078066192!5m2!1sen!2sin"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-gray-700">{address}</p>
        <div className="flex gap-3">
          <button 
            onClick={handleCopyAddress}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
          >
            <FaCopy /> Copy Address
          </button>
          <button 
            onClick={handleGetDirections}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
          >
            <FaDirections /> Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectionMap;