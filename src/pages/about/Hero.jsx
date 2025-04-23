import React from "react";

const Hero = () => {
  return (
    <section className="my-12 flex items-center">
      <div className="flex max-w-[900px] flex-col gap-6">
        <h2 className="text-dark text-2xl">Let's get to know Jeevic</h2>

        <p className="text-dark text-5xl/tight font-semibold">
          Providing the best experience to make your{" "}
          <span className="text-blue">Online Shopping</span>{" "}
        </p>

        <p className="text-lg leading-[200%] text-[#555]">
          At Jeevic, we are more than just an online store – we are your
          ultimate destination for an unparalleled shopping experience. Our
          journey began with a simple yet powerful idea: to create a platform
          that not only offers a wide array of products but also fosters a sense
          of community and connection among our customers.
        </p>

        <div className="flex justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-blue text-4xl font-bold">20+</span>
            <h3 className="text-lg text-[#555]">Shopping Category</h3>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-blue text-4xl font-bold">10+</span>
            <h3 className="text-lg text-[#555]">Different Territory</h3>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-blue text-4xl font-bold">4M+</span>
            <h3 className="text-lg text-[#555]">Happy Client</h3>
          </div>
        </div>
      </div>

      <div className="flex h-fit w-full justify-center">
        <div className="relative max-w-[300px] shrink-0 rounded-[10px] bg-[#EAF3FB] px-4 pt-10 pb-8 text-center text-2xl text-[#555]">
          We have made many people satisfied with our Platform
          <div className="absolute top-0 left-1/2 flex aspect-square w-[80px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#e6eef5]">
            <img src="/images/quote-marks.svg" alt="quote marks" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
