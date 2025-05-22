import React from "react";
import StarRating from "../../components/ui/StarRating";
import { ProductPageSlider, ProductPageSlide } from "./ProductPageSlider";

const ReviewSlider = ({ reviews }) => {
  return (
    <section className="my-12 bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 p-6 border-b border-gray-200">Customer Feedback</h2>
      <ProductPageSlider gap="2rem" perPage={1} title="">
        {reviews.map((review, i) => (
          <ProductPageSlide key={i}>
            <ReviewSlide
              stars={review.rating}
              shortReview={review.comment}
              author={review.user_name || "Anonymous"}
              created_at={review.created_at}
            />
          </ProductPageSlide>
        ))}
      </ProductPageSlider>
    </section>
  );
};

const ReviewSlide = ({ stars, shortReview, author, created_at }) => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <StarRating stars={stars} />
        <p className="text-lg font-semibold text-gray-700">{stars}/5</p>
      </div>
      <h3 className="text-xl font-bold text-gray-800">{shortReview}</h3>
      <p className="text-sm text-gray-600">
        By <span className="font-medium">{author}</span> on {new Date(created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ReviewSlider;
