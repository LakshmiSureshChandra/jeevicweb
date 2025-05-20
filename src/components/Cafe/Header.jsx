import React from 'react';
import { LogIn } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white ">
      <div className="flex items-center ">
        <div className="rounded p-1">
          <img src="jvc-logo.svg" alt="JEEVIC" className="w-[119px] h-[50px]" />
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="text-gray-600 hover:text-gray-900">Log in</button>
        <button className="text-gray-600 hover:text-gray-900">Sign up</button>
      </div>
    </header>
  );
};

export default Header;