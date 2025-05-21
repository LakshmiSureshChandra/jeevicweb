import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FavouriteButton from "./ui/FavouriteButton";
import { ShoppingBag03Icon } from "hugeicons-react";

const ProductCard = ({
  image,
  name,
  description,
  discountedPrice,
  originalPrice,
  discount,
}) => {
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCartClick = (e) => {
    e.stopPropagation();
    setIsInCart(!isInCart);
    // Add to cart logic here
  };

  return (
    <div
      className="group relative w-full max-w-[250px] cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
      onClick={() => navigate("/product-page")}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <button 
            className={`p-2 rounded-full shadow-md transition-colors duration-200 ${
              isInCart ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={handleCartClick}
          >
            <ShoppingBag03Icon className="w-5 h-5" />
          </button>
          <FavouriteButton liked={isFavorite} setLiked={setIsFavorite} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold text-gray-800">{name}</h3>
        <p className="mb-2 text-sm text-gray-600 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">{discountedPrice}</span>
            {originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">{originalPrice}</span>
            )}
          </div>
          {discount && (
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
              -{discount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
