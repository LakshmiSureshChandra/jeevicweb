import { ArrowRight01Icon } from "hugeicons-react";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import productsData from "../data/productsData.json";
import { Link } from "react-router-dom";

const ProductsShowcase = ({ title, data, timer = false }) => {
  return (
    <section className="flex w-full flex-col gap-8 md:gap-12">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:items-baseline sm:gap-0">
        <div className="flex flex-col items-center gap-2 sm:items-baseline md:flex-row md:gap-10">
          <h2 className="text-center text-2xl font-medium md:text-3xl">
            {title}
          </h2>
          {timer && (
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-[#9d9d9d]">Deal of the Day</h3>
              <CountDownTimer />
            </div>
          )}
        </div>

        <Link
          to={`/products/${title.toLowerCase().replace(/\s+/g, "-")}`}
          className="flex cursor-pointer items-center gap-1"
        >
          <span className="text-sm">View all</span>
          <ArrowRight01Icon />
        </Link>
      </div>

      <div className="hide-scrollbar flex gap-8 overflow-x-scroll p-2 lg:grid lg:grid-cols-4">
        {data.map((cardData, i) => {
          return <ProductCard key={i} {...cardData} />;
        })}
      </div>
    </section>
  );
};

export default ProductsShowcase;

const CountDownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function getTimeUntilMidnight() {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const nowIST = new Date(now.getTime() + istOffset);

    const midnight = new Date(nowIST);
    midnight.setUTCHours(24, 0, 0, 0);

    const diff = midnight - nowIST;
    const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
      2,
      "0",
    );
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
      2,
      "0",
    );
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds}`;
  }

  return (
    <p className="font-lato text-dark font-extrabold md:text-lg">{timeLeft}</p>
  );
};
