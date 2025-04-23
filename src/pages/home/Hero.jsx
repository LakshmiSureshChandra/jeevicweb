import React from "react";

const Hero = () => {
  return (
    <section className="hidden lg:flex">
      <img src="/images/hero-left.png" alt="women dressed up showing clothes" />

      <div
        className="relative flex w-full flex-col items-center justify-center gap-8 bg-cover bg-no-repeat text-center text-white"
        style={{ backgroundImage: 'url("/images/hero-right-bg.png")' }}
      >
        <h2 className="max-w-[14em] text-2xl font-semibold uppercase xl:max-w-none xl:text-[32px]">
          Kimonos, Caftans & Pareos
        </h2>

        <p className="max-w-[14em] text-xl xl:max-w-none xl:text-[28px]">
          Poolside glam included From $4.99
        </p>

        <button className="flex h-14 cursor-pointer items-center gap-2 rounded-[4px] bg-[#4172DC] px-14">
          <img src="/images/package-icon.svg" alt="" role="presentation" />
          <span>SHOP NOW</span>
        </button>

        <div className="absolute top-1/2 left-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center bg-white text-xl font-semibold">
          <h3 className="text-dark xl:px-8xl:pt-8 px-4 pt-6">
            Summer Essentials
          </h3>
          <span className="pb-6 text-[#ff2e00]">20% off</span>
          <p className="font-lato bg-dark w-full py-3 text-sm font-normal text-white">
            19 Jul-30 Jul
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
