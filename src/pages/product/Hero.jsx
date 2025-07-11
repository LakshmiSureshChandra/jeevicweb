import React, { useState, useRef, useEffect } from "react";
import {
  MinusSignIcon,
  PlusSignIcon,
  ShoppingBagAddIcon,
} from "hugeicons-react";
import { Link } from "react-router-dom";
import { useAddToCart } from "../../services/mutations/CartMutations";

import { useUpdateCart } from "../../services/mutations/CartMutations";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  getCart,
} from "../../lib/api";
import { useNavigate } from 'react-router-dom';

const HeartIcon = ({ filled }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 24 21"
      fill={filled ? "#ff0800" : "none"}
      className="transition-all duration-300 ease-in-out"
    >
      <path
        d="M12.7153 3.30239L11.9882 4.06262L11.2612 3.3024C8.99957 0.937632 5.3328 0.93763 3.0712 3.3024C0.870342 5.60367 0.802718 9.31235 2.91809 11.6997L8.99556 18.5584C10.6101 20.3806 13.3663 20.3806 14.9808 18.5584L21.0583 11.6996C23.1737 9.31232 23.1061 5.60364 20.9052 3.30238C18.6436 0.937615 14.9769 0.937618 12.7153 3.30239Z"
        stroke={filled ? "none" : "#969696"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "fill 0.3s ease-in-out, stroke 0.3s ease-in-out" }}
      />
    </svg>
  );
};

const Hero = ({ productData }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [show360View, setShow360View] = useState(false);
  // Modify these two lines
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const {
    id,
    name,
    description,
    meta_data,
    image_url: images = [],
    price,
    availability_count,
  } = productData.product;
  // Parse meta_data
  const colors = JSON.parse(meta_data?.colors || "[]");
  const variants = JSON.parse(meta_data?.variants || "[]");
  const slashedPrice = meta_data?.slashed_price;
  const discount = meta_data?.discount;
  const updateCartMutation = useUpdateCart();
  const fetchCartItems = async () => {
    try {
      const res = await getCart(); // Ensure getCart is awaited
      setCartItems(Array.isArray(res) ? res : []); // Ensure cartItems is an array
      return res;
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      setCartItems([]); // Fallback to empty array on error
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= availability_count) {
      setQuantity(newQuantity);
    }
  };

  // Remove the dynamic height adjustment useEffect
  useEffect(() => {
    const fetchWishlistStatus = async () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) return;

      try {
        const wishlist = await getWishlist();
        const isInWishlist = wishlist.some((item) => item.product_id === id);
        setIsFavorite(isInWishlist);
      } catch (error) {
        console.error("Failed to fetch wishlist status:", error);
      }
    };

    // Add this new code to select default color and variant
    if (colors.length > 0) {
      setSelectedColor(Object.keys(colors[0])[0]);
    }
    if (variants.length > 0) {
      setSelectedSize(variants[0]);
    }

    fetchCartItems();
    fetchWishlistStatus();
  }, [id]);

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
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
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
    window.addEventListener("resize", adjustSideImagesHeight);

    return () => {
      window.removeEventListener("resize", adjustSideImagesHeight);
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

  const addToCartMutation = useAddToCart();
  const handleAddToCart = async () => {
    try {
      const latestCartItems = await fetchCartItems();

      // Prepare metadata
      const selectedColorCode = colors.find(
        (colorObj) => Object.keys(colorObj)[0] === selectedColor,
      )?.[selectedColor];

      const metaDataToSend = {
        selectedSize: selectedSize,
        selectedColorCode: selectedColorCode,
        selectedColorName: selectedColor,
        slashedPrice: slashedPrice,
        discount: discount,
        price: String(price),
      };
      if (!Array.isArray(latestCartItems) || latestCartItems.length === 0) {
        // 🟢 Cart is empty — directly add
        await addToCartMutation.mutateAsync({
          product_id: id,
          quantity: quantity,
          meta_data: metaDataToSend,
        });
      } else {
        // 🔍 Check if product already exists
        const existingCartItem = latestCartItems.find(
          (item) => item.product_id === id,
        );

        if (existingCartItem) {
          // 🔄 If exists — update quantity
          await updateCartMutation.mutateAsync({
            product_id: id,
            quantity: existingCartItem.quantity + quantity,
            meta_data: existingCartItem.meta_data, // or metaDataToSend if updating
          });
        } else {
          // ➕ Else — add new
          await addToCartMutation.mutateAsync({
            product_id: id,
            quantity: quantity,
            meta_data: metaDataToSend,
          });
        }
      }
    } catch (error) {
      console.error("Failed to add/update cart:", error);
    }
  };

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await removeFromWishlist(id);
      } else {
        await addToWishlist(id);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  const handleBuyNow = () => {
    if (!productData?.product) return;
    
    const orderData = {
      products: [{
        id: productData.product.id,
        name: productData.product.name,
        price: Number(productData.product.price),
        image: productData.product.image_url?.[0] || productData.product.image || '', // Handle both cases
        quantity: quantity,
        selectedSize: selectedSize,
        selectedColor: selectedColor
      }]
    };
    
    navigate('/checkout/confirmation', { 
      state: { orderData }
    });
  };

  return (
    <section className="flex flex-col gap-8 lg:flex-row lg:gap-14">
      <div className="mx-auto flex w-full flex-col-reverse gap-1 md:w-[70%] md:flex-row lg:w-full">
        {/* Side Images with fixed height */}
        <div
          className="hidden md:flex md:w-[15%] md:flex-col md:gap-2 md:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          style={{ height: '500px' }} // Fixed height for side images container
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`aspect-square w-full cursor-pointer object-contain transition-all duration-300 ${
                currentImageIndex === index
                  ? "border-2 border-blue-500"
                  : "opacity-50 hover:opacity-100"
              }`}
              alt={`product side image ${index + 1}`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>

        {/* Main Image with fixed height */}
        <div className="relative w-full md:w-[85%]">
          <div className="h-[500px] w-full"> {/* Fixed height container */}
            <img
              src={images[currentImageIndex]}
              className={`h-full w-full object-contain transition-transform duration-300 ${
                zoom ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
              }`}
              alt="product main image"
              onClick={handleZoom}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </div>
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              onClick={handlePrevImage}
              className="rounded-r-full bg-white/50 p-2"
            >
              &#10094;
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
            <button
              onClick={handleNextImage}
              className="rounded-l-full bg-white/50 p-2"
            >
              &#10095;
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2 md:hidden">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentImageIndex === index ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product details section */}
      <div className="flex w-full flex-col gap-8">
        <div className="flex w-full justify-between">
          <div className="text-dark flex flex-col gap-2">
            <h2 className="text-xl font-bold uppercase lg:text-[22px]">
              {name}
            </h2>
            <p className="text-gray-600">{description}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-blue-600">₹{price}</span>
              {slashedPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ₹{slashedPrice}
                </span>
              )}
              {discount && (
                <span className="text-sm font-semibold text-green-600">
                  ({discount}% off)
                </span>
              )}
            </div>
          </div>
          <button
            className={`cursor-pointer rounded-full p-2 shadow-md transition-colors duration-200 ${
              isFavorite ? "bg-red-100" : "bg-white hover:bg-gray-100"
            } flex h-10 w-10 items-center justify-center`}
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteToggle();
            }}
          >
            <HeartIcon filled={isFavorite} />
          </button>
        </div>

        {/* Size and Color selection */}
        <div className="flex flex-col gap-5">
          {variants.length > 0 && (
            <div className="flex items-baseline gap-6">
              <h3 className="text-dark">Variant</h3>
              <div className="flex flex-wrap gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      selectedSize === variant
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedSize(variant)}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          {colors.length > 0 && (
            <div className="flex items-center gap-6">
              <h3 className="text-dark">Color</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((colorObj) => {
                  const colorName = Object.keys(colorObj)[0];
                  const colorCode = colorObj[colorName];
                  return (
                    <button
                      key={colorName}
                      className={`h-8 w-8 rounded-full border-2 transition-transform ${
                        selectedColor === colorName
                          ? "scale-110 border-gray-800"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: colorCode }}
                      onClick={() => setSelectedColor(colorName)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="flex items-center gap-6">
            <h3 className="text-dark">Quantity</h3>
            <div className="flex items-center gap-4 rounded border border-[#C4C4C4] bg-transparent px-4 py-2 text-[#C4C4C4]">
              <button
                className="cursor-pointer disabled:opacity-50"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity === 1}
              >
                <MinusSignIcon />
              </button>
              <span className="font-lato text-dark font-bold md:text-lg">
                {quantity}
              </span>
              <button
                className="cursor-pointer disabled:opacity-50"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity === availability_count}
              >
                <PlusSignIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Add to Cart and Buy Now buttons */}
        <div className="mt-8 flex flex-col gap-4 md:gap-5">
          <div className="flex flex-col gap-4 sm:flex-row md:gap-5">
            <button
              className="flex w-full cursor-pointer items-center justify-center rounded bg-blue-500 py-3 text-white uppercase transition-colors hover:bg-blue-600 md:py-4"
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending}
            >
              {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-[#434343] bg-transparent py-3 transition-colors hover:bg-gray-100 md:py-4"
              disabled={!selectedSize || !selectedColor}
            >
              <ShoppingBagAddIcon />
              <span>Buy Now</span>
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Available: {availability_count} in stock
        </div>

        <div className="text-sm text-gray-600">
          {/* Add long description */}
          {meta_data?.long_description && (
  <div className="mt-6 border-t pt-6">
    <h3 className="text-lg font-semibold mb-3">Product Description</h3>
    <div className="prose prose-sm max-w-none">
      {meta_data.long_description.split('\n\n').map((paragraph, index) => {
        // Handle bullet points (lines starting with emojis)
        if (paragraph.match(/^[•🔊🔋📶🎙️🎧⚡🎮🛠️]/m)) {
          const [title, ...points] = paragraph.split('\n');
          return (
            <div key={index} className="mb-4">
              <h4 className="font-medium text-gray-800">{title}</h4>
              <ul className="list-none space-y-1 mt-2">
                {points.map((point, idx) => {
                  const [emoji, ...text] = point.trim().split(' ');
                  return (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <span className="text-gray-800 shrink-0">{emoji}</span>
                      <span>{text.join(' ')}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }
        
        // Handle sections with colons (like "Ideal For:")
        if (paragraph.includes(':')) {
          const [title, content] = paragraph.split(':');
          return (
            <div key={index} className="mb-4">
              <h4 className="font-medium text-gray-800">{title.trim()}:</h4>
              <div className="mt-2 text-gray-600">
                {content.trim().split('\n').map((line, idx) => (
                  <p key={idx} className="mb-1">{line.trim()}</p>
                ))}
              </div>
            </div>
          );
        }

        // Regular paragraphs
        return (
          <p key={index} className="mb-4 text-gray-600">
            {paragraph.trim()}
          </p>
        );
      })}
    </div>
  </div>
)}
        </div>
      </div>

      {/* 360 View modal */}
      {show360View && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="relative h-[80vh] w-[80vw] rounded-lg bg-white p-4">
            <button
              onClick={() => setShow360View(false)}
              className="absolute top-4 right-4 text-2xl"
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
