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
import CategoriesMenu from "./CategoriesMenu";
import SettingsMenu from "./SettingsMenu";
import CartMenu from "./CartMenu";
import cardData from "../../data/cartData";
import settingsData from "../../data/settingsData";

const Header = () => {
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

  return (
    <header
      className="relative flex w-full justify-center lg:justify-end"
      ref={headerRef}
    >
      {/* Cafe transition overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-blue-600 transition-all duration-700 flex items-center justify-center ${
          cafeTransition ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className={`text-white text-6xl font-bold transition-transform duration-500 ${
          cafeTransition ? "scale-100" : "scale-50"
        }`}>
          Jeevic Cafe
        </div>
      </div>

      <div className="z-20 hidden w-[95%] items-center justify-between bg-white py-6 lg:flex">
        <Link
          to="/"
          onClick={() => setPopupActive(false)}
          className="text-[40px] font-semibold text-black"
        >
          Jeevic
        </Link>

        <div className="flex rounded-[4px] border-1 border-[#D9D9D9] p-2">
          <input
            type="text"
            className="pr-3 outline-none"
            placeholder="Search Products"
          />
          <CategoriesMenu categoriesData={categoriesData} />
          <button className="ml-4 cursor-pointer">
            <Search01Icon />
          </button>
        </div>

        <nav>
          <ul className="flex gap-3 xl:gap-8">
            {parsedData ? (
              <>
                <li>
                  <SettingsMenu dropDownData={settingsData}>
                    <UserIcon aria-hidden />
                    <span className="hidden xl:block">
                      {parsedData.firstName}
                    </span>
                  </SettingsMenu>
                </li>
                <li>
                  <Link
                    to="/products/wishlist"
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <FavouriteIcon />
                    <span className="hidden xl:block">Favourites</span>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() => {
                    setPopupActive(!popupActive);
                  }}
                >
                  <UserIcon aria-hidden />
                  <span className="hidden xl:block">Sign In</span>
                </button>
              </li>
            )}

            <li className="flex gap-3">
              <CartMenu cartProducts={cardData} />
              <div className="hidden aspect-square w-[25px] items-center justify-center rounded-full bg-[#FF7A00] xl:flex">
                3
              </div>
            </li>
          </ul>
        </nav>

        <button 
          onClick={handleCafeClick}
          className="bg-blue flex h-fit items-center rounded-l-[5px] px-16 py-3 text-[30px] font-bold text-white transition-all duration-300 hover:bg-blue-700"
        >
          Cafe
        </button>
      </div>

      <div
        className={`absolute z-10 flex h-full w-full items-center justify-center gap-16 bg-[#fff] transition-all duration-300 ${!popupActive && "pointer-events-none"}`}
        style={{
          transform: popupActive ? "translateY(100%)" : "translateY(95%)",
          opacity: popupActive ? "100" : "0",
        }}
      >
        <Link
          to="/sign-up"
          tabIndex={popupActive ? 0 : -1}
          onClick={() => setPopupActive(false)}
          className="flex h-[50px] w-[400px] cursor-pointer items-center justify-center rounded-[6px] border border-black bg-transparent text-2xl font-medium"
        >
          Login
        </Link>
        <Link
          to="/sign-up"
          tabIndex={popupActive ? 0 : -1}
          onClick={() => setPopupActive(false)}
          className="bg-blue flex h-[50px] w-[400px] cursor-pointer items-center justify-center rounded-[6px] text-2xl font-medium text-white"
        >
          Sign Up
        </Link>
      </div>

      <div className="flex w-[90%] flex-col gap-6 py-4 lg:hidden">
        <div className="flex w-full items-center justify-between">
          <SettingsMenu dropDownData={settingsData}>
            <button
              onClick={() => {
                setIsHamOpen(!isHamOpen);
              }}
              className="cursor-pointer"
            >
              {isHamOpen ? <MultiplicationSignIcon /> : <Menu01Icon />}
            </button>
          </SettingsMenu>
          <Link
            to="/"
            onClick={() => setPopupActive(false)}
            className="text-3xl font-semibold text-black"
          >
            Jeevic
          </Link>
          <nav>
            <ul className="flex gap-3 xl:gap-8">
              <li>
                <Link
                  to="/products/wishlist"
                  className="flex cursor-pointer items-center gap-2"
                >
                  <FavouriteIcon />
                  <span className="hidden xl:block">Favourites</span>
                </Link>
              </li>

              <li className="flex gap-3">
                <CartMenu cartProducts={cardData} />
                <div className="hidden aspect-square w-[25px] items-center justify-center rounded-full bg-[#FF7A00] xl:flex">
                  3
                </div>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex rounded-[4px] border-1 border-[#D9D9D9] p-2">
            <input
              type="text"
              className="w-full pr-3 text-sm outline-none placeholder:text-sm"
              placeholder="Search"
            />
            <CategoriesMenu categoriesData={categoriesData} />
            <button className="ml-2 cursor-pointer sm:ml-4">
              <Search01Icon />
            </button>
          </div>

          <button 
            onClick={handleCafeClick}
            className="bg-blue flex w-full cursor-pointer justify-between rounded-[4px] px-3 py-2 font-bold text-white"
          >
            <span>CAFE</span>
            <ArrowRight01Icon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
