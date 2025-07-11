import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from "hugeicons-react";

const Header = () => {
  const navigate = useNavigate();
  const [convenienceTransition, setConvenienceTransition] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("access_token");
      setIsLoggedIn(!!token);
    };
  
    checkToken(); // Check on mount
  
    window.addEventListener("storage", checkToken); // React to changes
  
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const handleConvenienceClick = () => {
    setConvenienceTransition(true);
    setTimeout(() => {
      setConvenienceTransition(false);
      navigate('/');
    }, 1000);
  };

  return (
    <header className="flex justify-between items-center bg-white  py-4">
      {/* Transition overlay */}
      <div
        className={`fixed inset-0 z-50 bg-orange-500 transition-all duration-700 flex items-center justify-center ${
          convenienceTransition ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className={`text-white text-6xl font-semibold transition-transform duration-500 ${
          convenienceTransition ? "scale-100" : "scale-50"
        }`}>
          Jeevic Store
        </div>
      </div>
      
      {/* Existing header content */}
      <div className="flex items-center gap-12">
        <div className="rounded">
          <img src="/jeeviclogo.png" alt="JEEVIC" className="h-12 w-auto object-contain" />
        </div>
      </div>

      <div className="flex items-center gap-6">
      <button 
          onClick={handleConvenienceClick}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors text-sm md:text-base"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Convenience</span>
        </button>

        <div className="flex items-center space-x-4">
          {/* Sign In Button */}
          <button 
            className="flex items-center gap-2 hover:text-blue transition-colors"
            onClick={() => isLoggedIn ? navigate('/profile') : navigate('/sign-in')}
          >
            <UserIcon className="w-5 h-5" />
            <span className="text-sm font-medium">{isLoggedIn ? 'Profile' : 'Sign In'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;