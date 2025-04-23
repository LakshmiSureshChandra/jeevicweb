import React from "react";
import Hero from "./Hero";
import Reviews from "./Reviews";
import ReviewSlider from "./ReviewSlider";
import YouMightLike from "../../components/YouMightLike";

const ProductPage = () => {
  return (
    <main className="flex w-full justify-center">
      <div className="w-[90%] max-w-[1440px]">
        <Hero />
        <Reviews />
        <ReviewSlider />
        <YouMightLike />
      </div>
    </main>
  );
};

export default ProductPage;
