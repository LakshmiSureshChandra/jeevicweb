import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavouriteButton from "./ui/FavouriteButton";
import { ShoppingBag03Icon } from "hugeicons-react";
import { useAddToCart } from "../services/mutations/CartMutations";
import { addToWishlist, removeFromWishlist, getWishlist, getCart } from "../lib/api";

const ProductCard = ({
  id,
  image_url,
  name,
  description,
  meta_data,
  price,
  onAddToGift,
  availability_count,
  category_id,
  subcategory_id,
  created_at,
  updated_at
}) => {
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const addToCartMutation = useAddToCart();

  useEffect(() => {
    const fetchData = async () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        try {
          const wishlist = await getWishlist();
          const cart = await getCart();

          // Check if the current product is in the wishlist
          const isFavoriteProduct = wishlist.some(item => item.product_id === id);
          setIsFavorite(isFavoriteProduct);

          // Check if the current product is in the cart
          const isCartProduct = cart.some(item => item.product_id === id);
          setIsInCart(isCartProduct);
        } catch (error) {
          console.error("Failed to fetch wishlist or cart:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  const handleCartClick = async (e) => {
    e.stopPropagation();
    try {
      if (isInCart) {
        // Logic to remove from cart if needed
      } else {
        await addToCartMutation.mutateAsync({
          product_id: id,
          quantity: 1,
        });
        setIsInCart(true);
      }
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const handleFavoriteToggle = async (e) => {
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
      onClick={() => navigate(`/product-page/${id}`, {
        state: {product:{
          id,
          image_url,
          name,
          description,
          meta_data,
          price,
          onAddToGift,
          availability_count,
          category_id,
          subcategory_id,
          created_at,
          updated_at
        }}
      })}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image_url[0]}
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
          <div className={`${isFavorite ? '' : 'md:opacity-0 md:group-hover:opacity-100'}`} >
            <FavouriteButton liked={isFavorite} setLiked={handleFavoriteToggle} />
          </div>
        </div>
      </div>

      <div className="p-3 md:p-4">
        {meta_data.discount && (
          <div className="mb-1 md:hidden">
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
              -{meta_data.discount}%
            </span>
          </div>
        )}
        <h3 className="mb-1 text-base md:text-lg font-semibold text-gray-800 line-clamp-1">{name}</h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">{price}</span>
            {meta_data.slashed_price && (
              <span className="ml-2 text-sm text-gray-500 line-through">{meta_data.slashed_price}</span>
            )}
          </div>
          {meta_data.discount && (
            <span className="hidden md:inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
              -{meta_data.discount}%
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
