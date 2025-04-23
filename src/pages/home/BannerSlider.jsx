import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import React, { useState } from "react";

const bannerSlides = [Banner01Slide, Banner01Slide, Banner01Slide];

const BannerSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <section className="my-16 hidden items-center bg-[#F7DDD0] px-22 lg:flex">
      <button
        className="cursor-pointer"
        onClick={() =>
          setSlideIndex((prev) =>
            prev > 0 ? prev - 1 : bannerSlides.length - 1,
          )
        }
      >
        <ArrowLeft01Icon />
      </button>

      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-600"
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {bannerSlides.map((BannerSlide, i) => (
            <div key={i} className="w-full shrink-0">
              <BannerSlide />
            </div>
          ))}
        </div>
      </div>

      <button
        className="cursor-pointer"
        onClick={() =>
          setSlideIndex((prev) =>
            prev < bannerSlides.length - 1 ? prev + 1 : 0,
          )
        }
      >
        <ArrowRight01Icon />
      </button>
    </section>
  );
};

export default BannerSlider;

function Banner01Slide() {
  return (
    <div className="flex w-full shrink-0 items-center justify-evenly px-2">
      <div className="flex flex-col gap-4">
        <h2 className="font-lato text-xl font-bold text-[#465D6B] xl:text-2xl">
          MAGSAFE
        </h2>
        <p className="font-lato max-w-[24em] text-lg/snug font-medium text-[#555] xl:text-xl/snug">
          Snap on a magnetic case, wallet, or both. And get faster wireless
          charging.
        </p>
      </div>
      <img src="/images/Iphone.png" alt="iphones" />
    </div>
  );
}
