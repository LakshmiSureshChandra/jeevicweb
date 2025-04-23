import { Delete02Icon, MinusSignIcon, PlusSignIcon } from "hugeicons-react";
import React, { useState } from "react";
import cartData from "../../data/cartData";
import OrderSummary from "../../components/OrderSummary";

const ViewCart = () => {
  return (
    <section className="flex flex-col items-end justify-between gap-8 lg:flex-row lg:items-start xl:gap-12">
      <div className="w-full">
        <h2 className="text-dark text-xl font-bold">
          Cart <span className="font-medium text-[#9D9D9D]">3</span>
        </h2>
        <div className="mt-8 flex flex-col gap-6">
          {cartData.map((cartProduct, i) => {
            return <ProductDisplay key={i} {...cartProduct} />;
          })}
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <OrderSummary link="/checkout/customer-info" buttonText="Next" />

        <div className="flex">
          <input
            className="w-[70%] rounded-l-[4px] border border-[#7B7B7B] p-2 outline-none"
            type="text"
          />
          <button className="bg-blue h-[56px] shrink-0 rounded-r-[4px] px-2.5 text-sm font-semibold text-nowrap text-white">
            Browse Coupons
          </button>
        </div>

        <div className="">
          <Voucher />
          <Voucher />
        </div>
      </div>
    </section>
  );
};

export default ViewCart;

const Voucher = () => {
  return (
    <div className="shrink-0">
      <div
        style={{ backgroundImage: "url('/images/voucher-bg.png')" }}
        className="flex h-[120px] flex-col gap-2 bg-contain bg-no-repeat px-6 pt-2"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-blue text-lg font-semibold">Voucher</h2>
          <p className="rounded bg-[#FE770240] p-1 text-[12px] font-medium">
            Valid Until 5.16.20
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <img src="/images/shopping-bag.svg" alt="" role="presentation" />
              <h3 className="text-lg font-semibold text-[#202020]">
                First Purchase
              </h3>
            </div>
            <p className="hidden text-sm font-medium text-black sm:block">
              5% off for your next order
            </p>
          </div>
          <button className="bg-blue cursor-pointer rounded-[8px] px-2 py-1 text-sm text-white">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductDisplay = ({ name, image, quantity, price, color }) => {
  const [productQuantity, setProductQuantity] = useState(quantity);
  return (
    <div className="flex items-center justify-between">
      <div className="flex w-[180px] gap-2 sm:w-[200px] sm:gap-4">
        <img
          src={image}
          className="h-[70px] w-auto rounded-[12px] object-cover sm:h-[90px]"
          alt="cart product"
        />
        <div className="gap-0.5s flex flex-col justify-center">
          <h3 className="text-dark text-sm font-medium sm:font-semibold md:text-base">
            {name}
          </h3>
          <div className="hidden items-center gap-2 sm:flex">
            <h4 className="text-sm text-[#555]">Color:</h4>
            <div
              className="aspect-square w-5 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </div>
      </div>

      <span className="font-lato hidden text-sm text-[#555] sm:block md:w-[100px] md:text-base">
        ${price}
      </span>

      <div className="flex items-center gap-2 rounded bg-transparent px-2 py-1 text-[#C4C4C4] sm:border sm:border-[#C4C4C4] md:gap-4 md:px-4 md:py-2">
        <button
          className="cursor-pointer disabled:opacity-50"
          onClick={() =>
            setProductQuantity(productQuantity === 1 ? 1 : productQuantity - 1)
          }
          disabled={productQuantity === 1}
        >
          <MinusSignIcon />
        </button>
        <span className="font-lato text-dark text-sm font-bold md:text-lg">
          {productQuantity}
        </span>
        <button
          className="cursor-pointer"
          onClick={() => setProductQuantity(productQuantity + 1)}
        >
          <PlusSignIcon />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-1 md:justify-start xl:flex-row">
        <span className="font-lato w-[100px] text-center text-sm text-[#555] md:text-base">
          ${(price * productQuantity).toFixed(2)}
        </span>

        <button className="cursor-pointer">
          <Delete02Icon />
        </button>
      </div>
    </div>
  );
};
