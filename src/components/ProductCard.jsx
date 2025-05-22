import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FavouriteButton from "./ui/FavouriteButton";
import { ShoppingBag03Icon } from "hugeicons-react";
import { useAddToCart } from "../services/mutations/CartMutations";
import { addToWishlist, removeFromWishlist } from "../lib/api";

const ProductCard = ({
  id,
  image,
  name,
  description,
  discountedPrice,
  originalPrice,
  discount,
  onAddToGift,
}) => {
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const addToCartMutation = useAddToCart();

  const handleCartClick = async (e) => {
    e.stopPropagation();
    try {
      await addToCartMutation.mutateAsync({
        product_id: id,
        quantity: 1,
      });
      setIsInCart(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleFavoriteToggle = async (e) => {
    e.stopPropagation();
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
    <div
      className="group relative w-full cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
      onClick={() => navigate(`/product-page/${id}`)} // Updated to include product ID
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <button 
            className={`p-2 rounded-full shadow-md transition-all duration-200 
              ${isInCart 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'}
              ${isInCart ? '' : 'md:opacity-0 md:group-hover:opacity-100'}`}
            onClick={handleCartClick}
            disabled={addToCartMutation.isPending}
          >
            <ShoppingBag03Icon className="w-5 h-5" />
          </button>
          <div className={`${isFavorite ? '' : 'md:opacity-0 md:group-hover:opacity-100'}`}>
            <FavouriteButton liked={isFavorite} setLiked={handleFavoriteToggle} />
          </div>
        </div>
      </div>

      <div className="p-3 md:p-4">
        {discount && (
          <div className="mb-1 md:hidden">
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
              -{discount}
            </span>
          </div>
        )}
        <h3 className="mb-1 text-base md:text-lg font-semibold text-gray-800 line-clamp-1">{name}</h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">{discountedPrice}</span>
            {originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">{originalPrice}</span>
            )}
          </div>
          {discount && (
            <span className="hidden md:inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
              -{discount}
            </span>
          )}
        </div>

        <div className="mt-2">
          <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
      </div>
      
      {onAddToGift && (
        <button
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={(e) => {
            e.stopPropagation();
            onAddToGift();
          }}
        >
          Add to Gift
        </button>
      )}
    </div>
  );
};

export default ProductCard;
