import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "hugeicons-react";
import React from "react";
import StarRating from "../../components/ui/StarRating";

import { ProductPageSlider, ProductPageSlide } from "./ProductPageSlider";

const reviewsData = [
  {
    stars: 5,
    shortReview: "Its really amazing",
    author: "Sara machnail",
    advantages: "Color, Size",
    disadvantages: "none",
    longReview:
      "What sets 5 Star Cloth apart from other brands is their ability to create timeless pieces that never go out of style. Their designs are sophisticated and elegant, catering to individuals who appreciate refined fashion. Whether it's a formal event or a casual outing, their clothing effortlessly elevates any ensemble.",
    images: ["/images/review-img-1.png", "/images/review-img-2.png"],
    likes: 2,
    dislikes: 1,
  },
  {
    stars: 5,
    shortReview: "Its really amazing",
    author: "Sara machnail",
    advantages: "Color, Size",
    disadvantages: "none",
    longReview:
      "What sets 5 Star Cloth apart from other brands is their ability to create timeless pieces that never go out of style. Their designs are sophisticated and elegant, catering to individuals who appreciate refined fashion. Whether it's a formal event or a casual outing, their clothing effortlessly elevates any ensemble.",
    images: ["/images/review-img-1.png", "/images/review-img-2.png"],
    likes: 2,
    dislikes: 1,
  },
];

const ReviewSlider = () => {
  return (
    <section className="my-12 flex flex-col gap-12 border-b border-b-[#d9d9d9]">
      <ProductPageSlider gap="8rem" perPage={1} title="ALL REVIEWS">
        {reviewsData.map((reviewData, i) => (
          <ProductPageSlide key={i}>
            <ReviewSlide {...reviewData} />
          </ProductPageSlide>
        ))}
      </ProductPageSlider>
    </section>
  );
};

export default ReviewSlider;

const ReviewSlide = ({
  stars,
  shortReview,
  author,
  advantages,
  disadvantages,
  longReview,
  images,
  likes,
  dislikes,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row">
        <StarRating stars={stars} />
        <div className="flex w-full flex-col gap-8">
          <div className="flex w-full justify-between">
            <div>
              <h3 className="text-dark font-bold">{shortReview}</h3>
              <p className="text-sm text-[#9d9d9d]">By {author}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <h4 className="text-sm text-[#9D9D9D] sm:min-w-[150px] md:text-base">
                Review
              </h4>
              <p className="text-dark text-sm md:text-base">{longReview}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        {images?.map((image, i) => {
          return <img src={image} key={i} alt="product image" />;
        })}
      </div>
    </div>
  );
};
