import React, { useEffect, useRef, useState } from "react";
import {
  Menu01Icon,
  MultiplicationSignIcon,
  Search01Icon,
  UserIcon,
  ShoppingBag01Icon,
} from "hugeicons-react";
import { Link, useNavigate } from "react-router-dom";
import { DropdownMenu, Popover } from "radix-ui";
import categoriesData from "../../data/categoriesData";
import cardData from "../../data/cartData";
import CartMenu from "./CartMenu";
import { useGetCart } from "../../services/queries/CartQueries";

const Header = () => {
  // Add new state for active category
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const timeoutRef = useRef(null);
  const [popupActive, setPopupActive] = useState(false);
  const [cafeTransition, setCafeTransition] = useState(false);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState(cardData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const parsedData = JSON.parse(localStorage.getItem("userData"));
  const { data: cartData = [] } = useGetCart();
  const cartItemCount = cartData.length;

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
    }, 500);
  };

  const updateCartQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item,
      ),
    );
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("access_token");
      setIsLoggedIn(!!token);
    };

    checkToken(); // Check on mount

    window.addEventListener("storage", checkToken); // React to changes

    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return (
    <header
      className="relative flex h-20 w-full justify-center lg:justify-end"
      ref={headerRef}
    >
      {/* Hamburger Menu Button */}
      <button
        className="p-2 lg:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <MultiplicationSignIcon className="h-6 w-6" />
        ) : (
          <Menu01Icon className="h-6 w-6" />
        )}
      </button>
      {/* Cafe transition overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-blue-600 transition-all duration-700 ${
          cafeTransition ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`text-6xl font-semibold text-white transition-transform duration-500 ${
            cafeTransition ? "scale-100" : "scale-50"
          }`}
        >
          Jeevic Cafe
        </div>
      </div>

      <div className="flex w-[95%] items-center justify-between bg-white">
        <div className="flex items-center gap-12">
          <Link
            to="/"
            onClick={() => setPopupActive(false)}
            className="flex h-12 items-center"
          >
            <img
              src="/jeeviclogo.png"
              alt="Jeevic Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Main Categories Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {categoriesData.map((category, index) => (
                <li
                  key={index}
                  className="group"
                  onMouseEnter={() => handleMouseEnter(category)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={`/category/${category.catid}`}
                    className="text-dark hover:text-blue block py-4 text-sm whitespace-nowrap transition-colors xl:text-base"
                  >
                    {category.title}
                  </Link>

                  {activeCategory === category && (
                    <div
                      className={`fixed top-[80px] left-0 z-50 w-screen bg-white shadow-md transition-all duration-300 ease-in-out ${dropdownVisible ? "visible translate-y-0 opacity-100" : "invisible translate-y-[-8px] opacity-0"} `}
                    >
                      <div className="mx-auto max-w-[1440px] px-6 py-4">
                        <div className="grid grid-cols-8 gap-3">
                          {category.items.map((item, idx) => (
                            <Link
                              key={idx}
                              to={
                                typeof item === "string"
                                  ? `/category/${item.toLowerCase().replace(/\s+/g, "-")}`
                                  : item.link
                              }
                              className="group/item hover:text-blue flex flex-col items-center gap-1.5 transition-colors"
                            >
                              <div className="flex aspect-square h-20 w-20 items-center justify-center overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={
                                    typeof item === "string"
                                      ? item
                                      : item.category
                                  }
                                  className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                                />
                              </div>
                              <span className="w-full text-center text-xs font-medium">
                                {typeof item === "string"
                                  ? item
                                  : item.category}
                              </span>
                            </Link>
                          ))}
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
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden items-center rounded-lg bg-gray-50 px-4 py-2 md:flex">
            <input
              type="text"
              placeholder="Search products..."
              className="w-64 bg-transparent text-sm outline-none"
            />
            <Search01Icon className="hover:text-blue h-5 w-5 cursor-pointer text-gray-500 transition-colors" />
          </div>

          {/* Mobile Search Icon and Overlay */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileSearchOpen(true)}>
              <Search01Icon className="h-6 w-6" />
            </button>

            {/* Mobile Search Overlay */}
            <div
              className={`fixed inset-0 z-50 bg-white transition-all duration-300 ${isMobileSearchOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"} `}
            >
              <div className="flex items-center justify-between border-b p-4">
                <div className="mr-4 flex flex-1 items-center rounded-lg bg-gray-50 px-4 py-2">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-transparent text-sm outline-none"
                    autoFocus
                  />
                  <Search01Icon className="h-5 w-5 text-gray-500" />
                </div>
                <button
                  onClick={() => setIsMobileSearchOpen(false)}
                  className="p-2"
                >
                  <MultiplicationSignIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Cart Button with Dropdown */}
          <Popover.Root>
            <Popover.Trigger className="hover:text-blue relative flex items-center gap-2 transition-colors">
              <div className="relative">
                <ShoppingBag01Icon className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <div className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {cartItemCount}
                  </div>
                )}
              </div>
              <span className="hidden text-sm font-medium md:inline">Cart</span>
            </Popover.Trigger>

            <Popover.Content className="z-50 mt-2 w-72 rounded-lg bg-white p-4 shadow-lg">
              <CartMenu
                cartItems={cartItems}
                updateQuantity={updateCartQuantity}
                onCheckout={() => navigate("/checkout")}
              />
            </Popover.Content>
          </Popover.Root>

          {/* Sign In / Profile Button - Hidden on mobile */}
          <button
            className="hover:text-blue hidden items-center gap-2 transition-colors lg:flex"
            onClick={() =>
              isLoggedIn ? navigate("/profile") : navigate("/sign-in")
            }
          >
            <UserIcon className="h-5 w-5" />
            <span className="text-sm font-medium">
              {isLoggedIn ? "Profile" : "Sign In"}
            </span>
          </button>

          {/* Cafe Toggle */}
          <button
            onClick={handleCafeClick}
            className="group relative mr-4 flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-2.5 text-white transition-all duration-300 hover:shadow-lg"
          >
            <div className="absolute inset-0 origin-left scale-x-0 transform bg-gradient-to-r from-orange-400 to-red-500 transition-transform duration-500 group-hover:scale-x-100" />

            <span className="relative flex items-center gap-2">
              <span className="relative text-sm font-medium">Cafe</span>
            </span>
          </button>
        </div>
        {/* Mobile Menu Overlay */}
        <div
          className={`bg-opacity-50 fixed inset-0 z-40 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"} lg:hidden`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`fixed top-0 right-0 z-50 h-full w-[80%] max-w-sm transform bg-white transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} overflow-y-auto lg:hidden`}
        >
          <div className="p-4">
            {/* Sign In / Profile Button for Mobile */}
            <button
              className="flex w-full items-center gap-2 border-b py-3"
              onClick={() => {
                setIsMobileMenuOpen(false);
                isLoggedIn ? navigate("/profile") : navigate("/sign-in");
              }}
            >
              <UserIcon className="h-5 w-5" />
              <span className="text-sm font-medium">
                {isLoggedIn ? "Profile" : "Sign In"}
              </span>
            </button>

            {/* Mobile Categories */}
            <div className="mt-4 space-y-2">
              {categoriesData.map((category, index) => (
                <div key={index} className="border-b">
                  <button
                    className="flex w-full items-center justify-between py-3"
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === category ? null : category,
                      )
                    }
                  >
                    <span className="text-sm font-medium">
                      {category.title}
                    </span>
                    <span
                      className={`text-sm transition-transform ${expandedCategory === category ? "rotate-180" : ""}`}
                    >
                      {expandedCategory === category ? "−" : "+"}
                    </span>
                  </button>

                  {expandedCategory === category && (
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4">
                      {category.items.map((item, idx) => (
                        <Link
                          key={idx}
                          to={
                            typeof item === "string"
                              ? `/category/${item.toLowerCase().replace(/\s+/g, "-")}`
                              : item.link
                          }
                          className="flex flex-col items-center gap-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="h-16 w-16">
                            <img
                              src={`/images/categories/${(typeof item === "string" ? item : item.category).toLowerCase().replace(/\s+/g, "-")}.png`}
                              alt={
                                typeof item === "string" ? item : item.category
                              }
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <span className="text-center text-xs">
                            {typeof item === "string" ? item : item.category}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
