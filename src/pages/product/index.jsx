import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Hero from "./Hero";
import Reviews from "./Reviews";
import ReviewSlider from "./ReviewSlider";
import YouMightLike from "../../components/YouMightLike";
import { getReviewsByProductId, getAverageRatingByProductId } from "../../lib/api"; // Import API functions

const ProductPage = () => {
  const { product_id } = useParams();
  const location = useLocation();
  const [productData, setProductData] = useState(location.state || null); // Use state from location
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  useEffect(() => {
    if (!productData) {
      console.error("Product data not available in state.");
      return;
    }

    const fetchAdditionalData = async () => {
      try {
        const reviewsData = await getReviewsByProductId(product_id);
        setReviews(reviewsData);

        const avgRating = await getAverageRatingByProductId(product_id);
        setAverageRating(avgRating);
      } catch (error) {
        console.error("Failed to fetch additional product data:", error);
      }
    };

    fetchAdditionalData();
  }, [product_id, productData]);

  return (
    <main className="container mx-auto px-4 py-8">
      {productData && (
        <div className="flex flex-col gap-8">
          <Hero productData={productData} />
          <Reviews reviews={reviews} averageRating={averageRating} />
          <ReviewSlider reviews={reviews} />
          <YouMightLike />
        </div>
      )}
    </main>
  );
};

export default ProductPage;
