import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import React from "react";

export const ProductPageSlider = ({ perPage, gap, title, children }) => {
  return (
    <Splide
      hasTrack={false}
      options={{
        perPage: perPage,
        gap: gap,
        pagination: false,
      }}
      className="w-full"
    >
      <div className="flex w-full items-center justify-between">
        <h2 className="text-dark font-bold uppercase">{title}</h2>
        <SliderArrows />
      </div>

      <SplideTrack className="my-6">{children}</SplideTrack>
    </Splide>
  );
};

export const ProductPageSlide = SplideSlide;

const SliderArrows = () => {
  return (
    <div className="splide__arrows flex rounded border border-[#d9d9d9] py-1">
      <button
        className="splide__arrow splide__arrow--prev !static rotate-180 !bg-transparent px-1"
        style={{ transform: "translateY(0px)" }}
      >
        <ArrowLeft01Icon />
      </button>
      <div className="mx-1 min-h-[90%] w-[1px] bg-[#d9d9d9]"></div>
      <button
        className="splide__arrow splide__arrow--next !static !bg-transparent px-1"
        style={{ transform: "translateY(0px)" }}
      >
        <ArrowRight01Icon />
      </button>
    </div>
  );
};
