import React, { useState, useRef, useEffect } from "react";
import FavouriteButton from "../../components/ui/FavouriteButton";
import {
  MinusSignIcon,
  PlusSignIcon,
  ShoppingBagAddIcon,
} from "hugeicons-react";
import { Link } from "react-router-dom";

const sizes = ["XS", "S", "M", "L", "XL"];
const colors = ["#750430", "#00A95D", "#A2D2FC", "#FF7A00"];

const Hero = () => {
  const [quantity, setQuantity] = useState(1);
  const [show360View, setShow360View] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = [
    "/images/product-page-main.jpg",
    "/images/product-page-1.jpg",
    "/images/product-page-2.jpg",
    "/images/product-page-3.jpg",
    "/images/product-page-4.jpg",
    "/images/product-page-5.jpg",
    "/images/product-page-6.jpg",
    "/images/product-page-7.jpg",
  ];

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleZoom = () => {
    setZoom(!zoom);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const mainImageRef = useRef(null);
  const sideImagesRef = useRef(null);

  useEffect(() => {
    const adjustSideImagesHeight = () => {
      if (mainImageRef.current && sideImagesRef.current) {
        sideImagesRef.current.style.maxHeight = `${mainImageRef.current.offsetHeight}px`;
      }
    };

    adjustSideImagesHeight();
    window.addEventListener('resize', adjustSideImagesHeight);

    return () => {
      window.removeEventListener('resize', adjustSideImagesHeight);
    };
  }, []);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextImage();
    } else if (isRightSwipe) {
      handlePrevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // Here you can add logic to save the favorite status to a backend or local storage
  };

  return (
    <section className="flex flex-col gap-8 lg:flex-row lg:gap-14">
      <div className="mx-auto flex w-full flex-col-reverse gap-1 md:w-[70%] md:flex-row lg:w-full">
        <div 
          ref={sideImagesRef} 
          className="hidden md:flex md:w-[15%] md:flex-col md:gap-2 md:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          style={{ height: '400px' }} // Fixed height of 500px
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`w-full cursor-pointer transition-all duration-300 ${
                currentImageIndex === index ? 'border-2 border-blue-500' : 'opacity-50 hover:opacity-100'
              }`}
              alt={`product side image ${index + 1}`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
        <div ref={mainImageRef} className="relative w-full md:w-[85%]">
          <img
            src={images[currentImageIndex]}
            className={`w-full shrink-0 object-cover transition-transform duration-300 ${zoom ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
            alt="product main image"
            onClick={handleZoom}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              onClick={handlePrevImage}
              className="bg-white/50 p-2 rounded-r-full"
            >
              &#10094; {/* Left chevron */}
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
            <button
              onClick={handleNextImage}
              className="bg-white/50 p-2 rounded-l-full"
            >
              &#10095; {/* Right chevron */}
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 md:hidden">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentImageIndex === index ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-8">
        <div className="flex w-full justify-between">
          <div className="text-dark flex flex-col gap-2">
            <h2 className="text-xl font-bold uppercase lg:text-[22px]">
              Short printed dress
            </h2>
            <p className="text-medium md:text-lg">$39.99</p>
          </div>
          <FavouriteButton liked={isFavorite} setLiked={handleFavoriteToggle} />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-baseline gap-6">
            <h3 className="text-dark">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <h3 className="text-dark">Color</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    selectedColor === color ? 'scale-110 border-gray-800' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <h3 className="text-dark">Quantity</h3>
            <div className="flex items-center gap-4 rounded border border-[#C4C4C4] bg-transparent px-4 py-2 text-[#C4C4C4]">
              <button
                className="cursor-pointer disabled:opacity-50"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity === 1}
              >
                <MinusSignIcon />
              </button>
              <span className="font-lato text-dark font-bold md:text-lg">
                {quantity}
              </span>
              <button
                className="cursor-pointer"
                onClick={() => setQuantity(quantity + 1)}
              >
                <PlusSignIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 md:gap-5">
          <div className="flex flex-col gap-4 sm:flex-row md:gap-5">
            <Link
              to="/checkout"
              className="flex w-full cursor-pointer items-center justify-center rounded bg-blue-500 py-3 text-white uppercase transition-colors hover:bg-blue-600 md:py-4"
            >
              Buy now
            </Link>
            <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-[#434343] bg-transparent py-3 transition-colors hover:bg-gray-100 md:py-4">
              <ShoppingBagAddIcon />
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>

      {show360View && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative h-[80vh] w-[80vw] rounded-lg bg-white p-4">
            <button
              onClick={() => setShow360View(false)}
              className="absolute right-4 top-4 text-2xl"
            >
              ×
            </button>
            <div className="h-full w-full">
              <iframe
                src="/360-view.html"
                className="h-full w-full"
                title="360 degree view"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
