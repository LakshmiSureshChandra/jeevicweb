import React, { useState } from "react";
import Banner from "./Banner";
import AllFilters from "./AllFilters";
import FilterProducts from "./FilterProducts";
import { useParams } from "react-router-dom";

const Filters = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { category, subCategory } = useParams();
  const displayedCategory = subCategory
    ? subCategory.replace(/-/g, " ")
    : category.replace(/-/g, " ");
  return (
    <>
      <Banner setShowFilter={setShowFilter} subCategory={displayedCategory} />
      <div className="flex w-full justify-center">
        <div className="flex w-[90%] gap-8 py-8 lg:py-20">
          <AllFilters showFilter={showFilter} setShowFilter={setShowFilter} />
          <FilterProducts />
        </div>
      </div>
    </>
  );
};

export default Filters;
