import React from "react";
import { Link } from "react-router-dom";

const OrderSummary = ({ link, buttonText }) => {
  return (
    <div className="flex h-fit min-w-[280px] shrink-0 flex-col gap-3 rounded-[8px] bg-[#E9E9E9] px-6 py-5 text-nowrap md:min-w-[340px] md:px-10">
      <h2 className="text-dark font-semibold">Order Summary</h2>
      <div className="flex flex-col gap-3 border-b border-b-[#d9d9d9] pb-3 md:gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-[#555]">Price</h3>
          <span className="font-lato text-dark text-sm">$99.23</span>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-sm text-[#555]">Shipping</h3>
          <span className="font-lato text-dark text-sm">$0</span>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-sm text-[#555]">Tax</h3>
          <span className="font-lato text-dark text-sm">$0</span>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-sm text-[#555]">Discount Price</h3>
          <span className="font-lato text-dark text-sm">$47.10</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <input type="checkbox" id="jeevic-points" />
            <label htmlFor="jeevic-points" className="text-sm text-[#555]">
              Jeevic Points
            </label>
          </div>
          <span className="font-lato text-dark text-sm">100</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-dark text-sm font-bold">Total Price</h3>
        <span className="font-lato text-dark text-sm font-bold">$110.23</span>
      </div>
      <Link
        to={link}
        className="mt-5 flex h-14 cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-[#4172DC] px-14 uppercase"
      >
        <img src="/images/package-icon.svg" alt="" role="presentation" />
        <span className="text-sm text-white sm:text-base">{buttonText}</span>
      </Link>
    </div>
  );
};

export default OrderSummary;
