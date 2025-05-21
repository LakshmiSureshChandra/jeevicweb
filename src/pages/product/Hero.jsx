import React, { useState } from "react";
import FavouriteButton from "../../components/ui/FavouriteButton";
import {
  MinusSignIcon,
  PlusSignIcon,
  ShoppingBagAddIcon,
} from "hugeicons-react";
import { Link } from "react-router-dom";

const sizes = ["XS", "S", "M", "L", "XL"];
const colors = ["#750430", "#00A95D", "#A2D2FC", "#FF7A00"];

const Hero = () => {
  const [quantity, setQuantity] = useState(1);
  const [show360View, setShow360View] = useState(false);

  return (
    <section className="flex flex-col gap-8 lg:flex-row lg:gap-14">
      <div className="mx-auto flex w-full flex-col-reverse gap-1 md:w-[70%] md:flex-row lg:w-full">
        <div className="flex shrink-0 md:w-[20%] md:flex-col">
          <img
            src="/images/product-page-1.png"
            className="w-full"
            alt="product side image 1"
          />
          <img
            src="/images/product-page-2.png"
            className="w-full"
            alt="product side image 2"
          />
          <img
            src="/images/product-page-3.png"
            className="w-full"
            alt="product side image 3"
          />
          <img
            src="/images/product-page-4.png"
            className="w-full"
            alt="product side image 4"
          />
        </div>
        <img
          src="/images/product-page-main.png"
          className="w-full shrink-0 object-cover md:w-[80%]"
          alt="product main image"
        />
      </div>

      <div className="flex w-full flex-col gap-8">
        <div className="flex w-full justify-between">
          <div className="text-dark flex flex-col gap-2">
            <h2 className="text-xl font-bold uppercase lg:text-[22px]">
              Short printed dress
            </h2>
            <p className="text-medium md:text-lg">$39.99</p>
          </div>
          <FavouriteButton />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-baseline gap-6">
            <h3 className="text-dark">Size</h3>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {sizes.map((size, i) => (
                  <input
                    type="radio"
                    id={`size-radio-${i}`}
                    name="sizes"
                    key={i}
                    defaultChecked={i === 0}
                    data-content={size}
                    className="after:font-lato transtion-all relative flex h-8 w-12 cursor-pointer appearance-none items-center justify-center rounded-[8px] border border-[#d9d9d9] bg-transparent text-sm duration-300 after:font-bold after:text-[#555] after:content-[attr(data-content)] checked:bg-[#D1E2EB] hover:bg-[#eee]"
                  />
                ))}
              </div>
              <button className="cursor-pointer self-start text-[12px] text-[#FF7A00]">
                Size Guideline
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <h3 className="text-dark">Color</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color, i) => {
                return (
                  <input
                    type="radio"
                    defaultChecked={i === 0}
                    name="colors"
                    id={`color-radio-${i}`}
                    key={i}
                    className="relative aspect-square w-5 cursor-pointer appearance-none rounded-full border-2 border-[#efefef] checked:border-[#000]"
                    style={{ backgroundColor: color }}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <h3 className="text-dark">Quantity</h3>
            <div className="flex items-center gap-4 rounded border border-[#C4C4C4] bg-transparent px-4 py-2 text-[#C4C4C4]">
              <button
                className="cursor-pointer disabled:opacity-50"
                onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}
                disabled={quantity === 1}
              >
                <MinusSignIcon />
              </button>
              <span className="font-lato text-dark font-bold md:text-lg">
                {quantity}
              </span>
              <button
                className="cursor-pointer"
                onClick={() => setQuantity(quantity + 1)}
              >
                <PlusSignIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 md:gap-5">
          <button 
            onClick={() => setShow360View(true)}
            className="text-dark w-full cursor-pointer bg-[#FE770280] py-3 font-bold md:text-lg"
          >
            Show 360 View
          </button>

          {/* Modal for 360 view */}
          {show360View && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative h-[80vh] w-[80vw] rounded-lg bg-white p-4">
                <button
                  onClick={() => setShow360View(false)}
                  className="absolute right-4 top-4 text-2xl"
                >
                  ×
                </button>
                {/* Add your 360 viewer component here */}
                <div className="h-full w-full">
                  {/* Example: You can replace this with your actual 360 viewer */}
                  <iframe
                    src="/360-view.html" // Replace with your actual 360 view URL
                    className="h-full w-full"
                    title="360 degree view"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4 sm:flex-row md:gap-5">
            <Link
              to="/checkout"
              className="bg-blue nd:py-4 flex w-full cursor-pointer items-center justify-center rounded py-3 text-white uppercase"
            >
              Buy now
            </Link>
            <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-[#434343] bg-transparent py-3 md:py-4">
              <ShoppingBagAddIcon />
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
