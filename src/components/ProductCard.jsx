import React, { useState } from "react";
import StarRating from "./ui/StarRating";
import FavouriteButton from "./ui/FavouriteButton";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({
  image,
  name,
  description,
  stars,
  noOfReviews,
  originalPrice,
  discountedPrice,
  discount,
}) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="min-w-[190px] shrink-0 cursor-pointer rounded-[10px] shadow-[0px_0px_12.132px_0px_rgba(0,0,0,0.10)]"
      tabIndex={0}
      onClick={() => navigate("/product-page")}
    >
      <div
        className="flex h-[180px] items-start justify-end rounded-t-[10px] bg-cover bg-center bg-no-repeat p-3 md:h-[240px] lg:h-[290px]"
        style={{ backgroundImage: `url(${image})` }}
      >
        <button className="flex aspect-square w-8 cursor-pointer items-center justify-center rounded-full border border-[#d9d9d9] bg-[#f9f9f94d]">
          <img src="/images/shopping-bag-icon.svg" alt="add to cart" />
        </button>
      </div>

      <div className="p-5">
        <div className="flex flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <h3 className="font-bold md:text-lg xl:text-xl">{name}</h3>
            <FavouriteButton liked={liked} setLiked={setLiked} />
          </div>
          <p className="font-lato max-w-[200px] text-[12px] font-semibold text-[#969696] md:text-sm">
            {description}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex">
            <StarRating stars={stars} />
          </div>
          <p className="font-lato text-sm text-[#969696]">({noOfReviews})</p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-[#FF5C00] md:text-base">
            {discountedPrice}
          </span>
          <span className="text-sm font-semibold text-[#969696] line-through md:text-base">
            {originalPrice}
          </span>
          <span className="font-lato rounded-[4px] bg-[#FF5C00] p-0.5 px-1 text-sm text-[12px] text-[#f9f9f9] md:px-1.5">
            -{discount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
