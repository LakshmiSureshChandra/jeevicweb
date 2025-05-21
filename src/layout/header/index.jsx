import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight01Icon,
  FavouriteIcon,
  Menu01Icon,
  MultiplicationSignIcon,
  Search01Icon,
  UserIcon,
} from "hugeicons-react";
import { Link, useNavigate } from "react-router-dom";
import { DropdownMenu, Popover } from "radix-ui";
import categoriesData from "../../data/categoriesData";
import SettingsMenu from "./SettingsMenu";
import CartMenu from "./CartMenu";
import cardData from "../../data/cartData";
import settingsData from "../../data/settingsData";

const Header = () => {
  // Add new state for active category
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const timeoutRef = useRef(null);
  const [popupActive, setPopupActive] = useState(false);
  const [isHamOpen, setIsHamOpen] = useState(false);
  const [cafeTransition, setCafeTransition] = useState(false);
  const navigate = useNavigate();

  const parsedData = JSON.parse(localStorage.getItem("userData"));

  const headerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!headerRef.current.contains(e.target)) {
        setPopupActive(false);
      }
    };

    if (popupActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupActive]);

  const handleCafeClick = (e) => {
    e.preventDefault();

    // Start the animation
    setCafeTransition(true);

    // Wait for the animation to complete before navigating
    setTimeout(() => {
      setCafeTransition(false);
      navigate("/cafe");
    }, 800); // Duration slightly longer than the animation
  };

  const handleMouseEnter = (category) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDropdownVisible(true);
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownVisible(false);
      setActiveCategory(null);
    }, 1000);
  };

  return (
    <header className="relative flex h-20 w-full justify-center lg:justify-end" ref={headerRef}>
      {/* Cafe transition overlay */}
      <div
        className={`fixed inset-0 z-50 bg-blue-600 transition-all duration-700 flex items-center justify-center ${
          cafeTransition ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className={`text-white text-6xl font-semibold transition-transform duration-500 ${
          cafeTransition ? "scale-100" : "scale-50"
        }`}>
          Jeevic Cafe
        </div>
      </div>

      <div className="w-[95%] items-center justify-between bg-white flex">
        <div className="flex items-center gap-12">
          <Link
            to="/"
            onClick={() => setPopupActive(false)}
            className="flex items-center h-12"
          >
            <img 
              src="/jeeviclogo.png" 
              alt="Jeevic Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Main Categories Navigation */}
          <nav className="static">
            <ul className="flex items-center gap-8">
              {categoriesData.map((category, index) => (
                <li
                  key={index}
                  className="group"
                  onMouseEnter={() => handleMouseEnter(category)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link 
                    to={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-dark hover:text-blue transition-colors text-sm xl:text-base whitespace-nowrap py-4 block"
                  >
                    {category.title}
                  </Link>

                  {activeCategory === category && (
                    <div
                      className={`
                        fixed left-0 top-[80px] z-50 w-screen bg-white shadow-md 
                        transition-all duration-300 ease-in-out
                        ${dropdownVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-[-8px]'}
                      `}
                    >
                      <div className="max-w-[1440px] mx-auto px-6 py-4">
                        <div className="grid grid-cols-8 gap-3">
                        {category.items.map((item, idx) => (
                            <Link
                              key={idx}
                              to={typeof item === 'string' ? `/category/${item.toLowerCase().replace(/\s+/g, '-')}` : item.link}
                              className="flex flex-col items-center gap-1.5 group/item hover:text-blue transition-colors"
                            >
                              <div className="aspect-square overflow-hidden w-20 h-20 flex items-center justify-center">
                                <img
                                  src={`/images/categories/${(typeof item === 'string' ? item : item.category).toLowerCase().replace(/\s+/g, '-')}.png`}
                                  alt={typeof item === 'string' ? item : item.category}
                                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <span className="text-xs font-medium text-center w-full">
                                {typeof item === 'string' ? item : item.category}
                              </span>
                            </Link>
                          ))}

                          {/* View All Category */}
                          <Link
                            to={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="flex flex-col items-center gap-1.5 group/item hover:text-blue transition-colors"
                          >
                            <div className="aspect-square overflow-hidden flex items-center justify-center rounded-lg w-20 h-20">
                              <ArrowRight01Icon className="w-8 h-8 text-blue group-hover/item:scale-105 transition-transform duration-300" />
                            </div>
                            <span className="text-xs font-medium text-center w-full">
                              View All {category.title}
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Right side elements */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none text-sm w-64"
            />
            <Search01Icon className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue transition-colors" />
          </div>

          {/* Sign In Button */}
          <button className="flex items-center gap-2 hover:text-blue transition-colors">
            <UserIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Sign In</span>
          </button>

          {/* Cafe Toggle */}
          <button 
            onClick={handleCafeClick}
            className="group relative flex items-center mr-4 gap-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            
            <span className="relative flex items-center gap-2 ">
              <span className="text-sm font-medium relative">
                Cafe
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
