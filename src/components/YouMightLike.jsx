import React from "react";
import { Link } from "react-router-dom";
import {
  ProductPageSlide,
  ProductPageSlider,
} from "../pages/product/ProductPageSlider";

const YouMightLike = ({ similarProducts }) => {
  if (!Array.isArray(similarProducts) || similarProducts.length === 0) {
    return null;
  }

  return (
    <ProductPageSlider 
      perPage={{ default: 2, md: 3, lg: 4, xl: 5 }} 
      gap={{ default: "0.5rem", md: "1rem" }} 
      title="You Might Also Like"
    >
      {similarProducts.map((product) => (
        <ProductPageSlide key={product.id}>
          <Link to={`/product-page/${product.id}`} className="block group relative p-2 sm:p-4">
            <div className="relative">
              <img
                src={product.image_url[0]}
                alt={product.name}
                className="w-full h-32 sm:h-48 object-contain rounded-lg"
              />
              <div className="mt-2">
                <h3 className="text-xs sm:text-sm font-medium text-gray-700 truncate">{product.name}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                  <p className="text-sm sm:text-lg font-bold text-gray-900">₹{Number(product.price).toFixed(2)}</p>
                  {product.meta_data && product.meta_data.slashed_price && (
                    <p className="text-xs sm:text-sm text-gray-500 line-through">
                      ₹{Number(product.meta_data.slashed_price).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
              {product.meta_data && product.meta_data.discount && (
                <span className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-white text-xs px-1 py-0.5 sm:px-2 sm:py-1 rounded-full">
                  {product.meta_data.discount}% OFF
                </span>
              )}
            </div>
          </Link>
        </ProductPageSlide>
      ))}
    </ProductPageSlider>
  );
};

export default YouMightLike;