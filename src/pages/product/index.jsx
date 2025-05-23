import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Hero from "./Hero";
import Reviews from "./Reviews";
import ReviewSlider from "./ReviewSlider";
import YouMightLike from "../../components/YouMightLike";
import { getReviewsByProductId, getAverageRatingByProductId, getProductById, getSimilarProducts } from "../../lib/api";

const ProductPage = () => {
  const { product_id } = useParams();
  const location = useLocation();
  const [productData, setProductData] = useState(location.state || null); // Use state from location
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Always fetch product data if not available from state
        if (!productData) {
          const product = await getProductById(product_id);
          setProductData({ product });
        }
  
        // Fetch reviews and rating without auth check
        const [reviewsData, avgRating] = await Promise.all([
          getReviewsByProductId(product_id),
          getAverageRatingByProductId(product_id)
        ]);
        setReviews(reviewsData || []);
        setAverageRating(avgRating || 0);
        
        // Fetch similar products
        const similarProductsResponse = await getSimilarProducts(product_id);
        if (similarProductsResponse.success && Array.isArray(similarProductsResponse.data)) {
          setSimilarProducts(similarProductsResponse.data);
        } else {
          console.error("Invalid similar products data:", similarProductsResponse);
          setSimilarProducts([]);
        }

      } catch (error) {
        console.error("Failed to fetch data:", error);
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
          {similarProducts.length > 0 && <YouMightLike similarProducts={similarProducts} />}
        </div>
      )}
    </main>
  );
};

export default ProductPage;
