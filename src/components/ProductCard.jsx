import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag03Icon } from "hugeicons-react";
import { useAddToCart } from "../services/mutations/CartMutations";
import { useRemoveFromCart } from "../services/mutations/CartMutations";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  getCart,
  removeFromCart,
} from "../lib/api";

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
  updated_at,
}) => {
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const addToCartMutation = useAddToCart();
  const removeFromMutation = useRemoveFromCart();
  const fetchData = async () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      try {
        const wishlist = await getWishlist();
        const cart = await getCart();

        // Check if the current product is in the wishlist
        const isFavoriteProduct = wishlist.some(
          (item) => item.product_id === id,
        );
        setIsFavorite(isFavoriteProduct);

        // Check if the current product is in the cart
        const isCartProduct = cart.some((item) => item.product_id === id);
        setIsInCart(isCartProduct);
      } catch (error) {
        console.error("Failed to fetch wishlist or cart:", error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const handleCartClick = async (e) => {
    e.stopPropagation();
    try {
      if (isInCart) {
        await removeFromMutation.mutateAsync({
          product_id: id,
        });
        setIsInCart(false);
        fetchData();
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
      fetchData();
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };
  // const primaryImage = image && image.length > 0 ? image_url[0] : "";
  // console.log(image_url);
  return (
    <div
      className="group relative w-full cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
      onClick={() =>
        navigate(`/product-page/${id}`, {
          state: {
            product: {
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
              updated_at,
            },
          },
        })
      }
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image_url[0]}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <button
            className={`cursor-pointer rounded-full p-2 shadow-md transition-all duration-200 ${
              isInCart
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } ${isInCart ? "" : "md:opacity-0 md:group-hover:opacity-100"}`}
            onClick={handleCartClick}
            disabled={addToCartMutation.isPending}
          >
            <ShoppingBag03Icon className="h-5 w-5" />
          </button>
          <button
            className={`cursor-pointer rounded-full p-2 shadow-md transition-colors duration-200 ${
              isFavorite ? "bg-red-100" : "bg-white hover:bg-gray-100"
            } flex h-10 w-10 items-center justify-center ${
              isFavorite ? "" : "md:opacity-0 md:group-hover:opacity-100"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteToggle(e);
            }}
          >
            <HeartIcon filled={isFavorite} />
          </button>
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
        <h3 className="mb-1 line-clamp-1 text-base font-semibold text-gray-800 md:text-lg">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">{price}</span>
            {meta_data.slashed_price && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {meta_data.slashed_price}
              </span>
            )}
          </div>
          {meta_data.discount && (
            <span className="hidden rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 md:inline-block">
              -{meta_data.discount}%
            </span>
          )}
        </div>

        <div className="mt-2">
          <p className="line-clamp-2 text-xs text-gray-600 md:text-sm">
            {description}
          </p>
        </div>
      </div>

      {onAddToGift && (
        <button
          className="mt-2 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
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
