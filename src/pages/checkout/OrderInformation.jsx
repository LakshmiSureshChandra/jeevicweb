import React from "react";
import cartData from "../../data/cartData";

const OrderInformation = () => {
  return (
    <section>
      <h2 className="text-dark text-xl font-bold">Confirmation</h2>
      <div className="mt-8 flex flex-col gap-5 bg-[#F5F5F5] p-6">
        <div className="border-b border-b-[#d9d9d9] pb-5">
          <h3 className="text-[#4B5157]">Shopping items</h3>
          <div className="mt-3 flex flex-col gap-6">
            {cartData.map((cartProduct, i) => {
              return <ProductDisplay key={i} {...cartProduct} />;
            })}
          </div>
        </div>

        <div className="border-b border-b-[#d9d9d9] pb-5">
          <h3 className="text-[#4B5157]">Payment Method</h3>
          <div className="mt-3 flex w-full items-center justify-between">
            <span className="text-dark font-semibold">Paypal</span>
            <div className="flex h-10 items-center rounded bg-white px-2">
              <img className="" src="/images/paypal.png" alt="paypal" />
            </div>
          </div>
        </div>

        <div className="border-b border-b-[#d9d9d9] pb-5">
          <h3 className="text-[#4B5157]">Shipping Company</h3>
          <div className="mt-3 flex w-full items-center justify-between">
            <span className="text-dark font-semibold">Race Couriers</span>
            <div className="flex h-10 items-center rounded bg-white px-2">
              <img className="" src="/images/race-couriers.png" alt="paypal" />
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <div className="flex w-full justify-between text-sm sm:text-base">
              <span className="text-[#555]">Name</span>
              <span className="text-[#555]">Saina Ghasemi</span>
            </div>

            <div className="flex w-full justify-between">
              <span className="text-[#555]">Country</span>
              <span className="text-[#555]">Australia</span>
            </div>

            <div className="flex w-full justify-between">
              <span className="text-[#555]">Address</span>
              <span className="text-[#555]">10 Beach Street, 2281</span>
            </div>

            <div className="flex w-full justify-between">
              <span className="text-[#555]">City</span>
              <span className="text-[#555]">Melbourne</span>
            </div>

            <div className="flex w-full justify-between">
              <span className="text-[#555]">Phone</span>
              <span className="text-[#555]">(02) 5551 5678</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderInformation;

const ProductDisplay = ({ name, image, quantity, price, color }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex w-[150px] gap-4 sm:w-[300px]">
        <img
          src={image}
          className="h-[90px] w-auto rounded-[12px] object-cover"
          alt="cart product"
        />
        <div className="flex flex-col justify-center gap-2">
          <h3 className="text-dark text-sm font-semibold sm:text-base">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <h4 className="hidden text-sm text-[#555] sm:block">Color:</h4>
            <div
              className="aspect-square w-5 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-lato w-[100px] text-end text-sm text-[#555] sm:text-base">
          ${price}
        </span>
        <span className="font-lato w-[100px] text-end text-sm text-[#555] sm:text-base">
          x{quantity}
        </span>
      </div>

      <span className="font-lato w-[100px] text-end text-sm text-[#555] sm:text-base">
        ${(price * quantity).toFixed(2)}
      </span>
    </div>
  );
};
