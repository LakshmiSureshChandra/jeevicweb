import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Hero from "./Hero";
import Reviews from "./Reviews";
import ReviewSlider from "./ReviewSlider";
import YouMightLike from "../../components/YouMightLike";
import { getReviewsByProductId, getAverageRatingByProductId, getProductById } from "../../lib/api"; // Import API functions

const ProductPage = () => {
  const { product_id } = useParams();
  const location = useLocation();
  const [productData, setProductData] = useState(location.state || null); // Use state from location
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // If no product data from state, fetch it
        if (!productData) {
          const product = await getProductById(product_id);
          setProductData({ product });
        }

        // Fetch reviews and rating
        const [reviewsData, avgRating] = await Promise.all([
          getReviewsByProductId(product_id),
          getAverageRatingByProductId(product_id)
        ]);

        setReviews(reviewsData);
        setAverageRating(avgRating);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [product_id, productData]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
  }

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
