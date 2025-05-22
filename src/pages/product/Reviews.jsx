import React from "react";
import StarRating from "../../components/ui/StarRating";

const Reviews = ({ reviews, averageRating }) => {
  const total = reviews.length;
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  const percentData = Object.entries(ratingCounts).reduce(
    (acc, [key, value]) => {
      acc[key] = Math.round((value / total) * 100);
      return acc;
    },
    {}
  );

  return (
    <section className="mt-12 bg-gray-50 rounded-lg p-8 shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Customer Reviews ({total})</h2>
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/3">
          <h3 className="text-xl font-semibold text-gray-700">Overall Rating</h3>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-blue-600">{averageRating !== null ? averageRating.toFixed(1) : 'N/A'}</span>
            <StarRating stars={averageRating || 0} />
          </div>
          <p className="text-sm text-gray-500">Based on {total} reviews</p>
        </div>
        <div className="w-full md:w-2/3">
          {[5, 4, 3, 2, 1].map((star) => (
            <Reviewbar
              key={star}
              stars={star}
              percent={percentData[star] || 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviewbar = ({ stars, percent }) => {
  return (
    <div className="flex items-center gap-4 mb-2">
      <span className="text-sm font-medium text-gray-600 w-16">{stars} Stars</span>
      <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <span className="text-sm font-medium text-gray-600 w-12">{percent}%</span>
    </div>
  );
};

export default Reviews;
