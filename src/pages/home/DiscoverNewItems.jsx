import { ArrowRight01Icon } from "hugeicons-react";
import React from "react";
import productsData from "../../data/productsData.json";
import { Link } from "react-router-dom";

const DiscoverNewItems = () => {
  return (
    <section className="flex w-full flex-col gap-12">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row md:items-baseline">
        <div className="flex items-baseline">
          <h2 className="text-2xl font-medium md:text-3xl">
            Discover New Items
          </h2>
        </div>
      </div>

      <div className="hide-scrollbar flex justify-around gap-6 overflow-x-scroll lg:grid lg:grid-cols-3">
        {productsData.discoverNewItemCards.map((discoverNewItemCard, i) => {
          return <NewItemsProductCard key={i} {...discoverNewItemCard} />;
        })}
      </div>
    </section>
  );
};

export default DiscoverNewItems;

const NewItemsProductCard = ({ image, hoverImage = image, name }) => {
  return (
    <div className="group h-full min-w-[250px] shrink-0">
      <div className="relative min-h-[250px] rounded-t-[8px] overflow-hidden lg:min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 ease-in-out"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          style={{ backgroundImage: `url(${hoverImage})` }}
        />
      </div>

      <div className="bg-black bg-opacity-50% flex flex-col items-center justify-between gap-2 rounded-b-[8px] p-5 xl:flex-row">
        <div className="flex flex-col items-center justify-between xl:items-start">
          <h3 className="text-sm font-semibold text-white md:text-base xl:text-lg">
            {name}
          </h3>
        </div>
        <Link
          to="/product-page"
          className="flex cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#D9D9D9] bg-transparent px-3 py-2 text-sm font-semibold text-white lg:px-6 lg:py-3 lg:text-base"
        >
          <span className="text-nowrap">Shop Now</span>
        </Link>
      </div>
    </div>
  );
};
