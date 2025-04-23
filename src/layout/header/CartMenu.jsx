import { ShoppingBag03Icon } from "hugeicons-react";
import { Popover } from "radix-ui";
import React from "react";
import { Link } from "react-router-dom";

const CartMenu = ({ cartProducts }) => {
  return (
    <Popover.Root>
      <Popover.Trigger className="flex cursor-pointer items-center gap-2">
        <ShoppingBag03Icon aria-hidden />
        <span className="hidden xl:block">Cart</span>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="z-20 mt-6 flex w-[300px] flex-col gap-5 rounded-[8px] bg-[#fff] p-5 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.10)]">
          <div className="flex flex-col gap-4">
            {cartProducts.map((product, i) => (
              <div
                key={i}
                className="flex items-center gap-6 border-b border-b-[#D9D9D9] pb-4"
              >
                <img src={product.image} alt={product.name} />
                <div className="flex flex-col gap-1">
                  <h3 className="font-lato text-dark text-sm font-bold">
                    {product.name}
                  </h3>
                  <span className="font-lato text-[#555]">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="font-lato flex items-center gap-8">
            <span className="text-sm font-bold text-[#555]">Total:</span>{" "}
            <span className="text-dark font-extrabold">$130.09</span>
          </p>
          <div className="font-lato flex w-full items-center gap-2">
            <Popover.Close asChild>
              <Link
                to="/checkout"
                className="flex w-full cursor-pointer items-center justify-center rounded-[4px] border border-[#434343] bg-transparent py-2 font-bold text-[#434343]"
              >
                Checkout
              </Link>
            </Popover.Close>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default CartMenu;
