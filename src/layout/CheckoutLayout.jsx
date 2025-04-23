import React from "react";
import YouMightLike from "../components/YouMightLike";
import { Outlet, useLocation } from "react-router-dom";

const steps = [
  { path: "/checkout", name: "Cart (3)" },
  { path: "/checkout/customer-info", name: "Customer Info" },
  { path: "/checkout/order-information", name: "Order Information" },
];

const CheckoutLayout = () => {
  const location = useLocation();
  const normalPath = location.pathname.replace(/\/$/, "");

  return (
    <main className="flex w-full justify-center py-12">
      <div className="flex w-[90%] max-w-[1440px] flex-col gap-12">
        <div className="flex w-full justify-center">
          <ul className="flex gap-24 font-bold uppercase">
            {steps.map((step, index) => {
              return (
                <li
                  key={index}
                  className={`${normalPath === step.path ? "font-bold" : "opacity-50"}`}
                >
                  {step.name}
                </li>
              );
            })}
          </ul>
        </div>
        <Outlet />
        <YouMightLike />
      </div>
    </main>
  );
};

export default CheckoutLayout;
