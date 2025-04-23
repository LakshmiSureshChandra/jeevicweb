import React from "react";
import ProductCard from "../../components/ProductCard";
import productsData from "../../data/productsData.json";

const FilterProducts = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {productsData.flashSaleCards.map((cardData, i) => {
          return <ProductCard key={i} {...cardData} />;
        })}
        {productsData.flashSaleCards.map((cardData, i) => {
          return <ProductCard key={i} {...cardData} />;
        })}
      </div>
    </div>
  );
};

export default FilterProducts;
