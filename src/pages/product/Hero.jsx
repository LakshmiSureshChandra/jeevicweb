import React, { useState, useRef, useEffect } from "react";
import {
  MinusSignIcon,
  PlusSignIcon,
  ShoppingBagAddIcon,
} from "hugeicons-react";
import { Link } from "react-router-dom";
import { useAddToCart } from "../../services/mutations/CartMutations";
import { addToWishlist, removeFromWishlist, getWishlist } from "../../lib/api";

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
  const [quantity, setQuantity] = useState(1);
  const [show360View, setShow360View] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
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

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) return;

      try {
        const wishlist = await getWishlist();
        const isInWishlist = wishlist.some(
          (item) => item.product_id === id
        );
        setIsFavorite(isInWishlist);
      } catch (error) {
        console.error("Failed to fetch wishlist status:", error);
      }
    };

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

      await addToCartMutation.mutateAsync({
        product_id: productData.product.id, // fixed here
        quantity: quantity,
        meta_data: metaDataToSend,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
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

  return (
    <section className="flex flex-col gap-8 lg:flex-row lg:gap-14">
      <div className="mx-auto flex w-full flex-col-reverse gap-1 md:w-[70%] md:flex-row lg:w-full">
        <div
          ref={sideImagesRef}
          className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hidden md:flex md:w-[15%] md:flex-col md:gap-2 md:overflow-y-auto"
          style={{ height: "400px" }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`w-full cursor-pointer transition-all duration-300 ${currentImageIndex === index
                  ? "border-2 border-blue-500"
                  : "opacity-50 hover:opacity-100"
                }`}
              alt={`product side image ${index + 1}`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
        <div ref={mainImageRef} className="relative w-full md:w-[85%]">
          <img
            src={images[currentImageIndex]}
            className={`w-full shrink-0 object-cover transition-transform duration-300 ${zoom ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}`}
            alt="product main image"
            onClick={handleZoom}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
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
                className={`h-2 w-2 rounded-full ${currentImageIndex === index ? "bg-blue-500" : "bg-gray-300"
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
            className={`cursor-pointer rounded-full p-2 shadow-md transition-colors duration-200 ${isFavorite ? "bg-red-100" : "bg-white hover:bg-gray-100"
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
              <h3 className="text-dark">Size</h3>
              <div className="flex flex-wrap gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${selectedSize === variant
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
                      className={`h-8 w-8 rounded-full border-2 transition-transform ${selectedColor === colorName
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
            <Link
              to="/checkout"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-[#434343] bg-transparent py-3 transition-colors hover:bg-gray-100 md:py-4"
            >
              <ShoppingBagAddIcon />
              <span>Buy Now</span>
            </Link>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Available: {availability_count} in stock
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