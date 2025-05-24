import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Select } from "radix-ui";
import { Accordion } from "radix-ui";
import {
  ArrowDown01Icon,
  GridViewIcon,
  MultiplicationSignIcon,
} from "hugeicons-react";
import DualRangeSlider from "../../components/ui/DualRangeSlider";
import SelectItem from "../../components/ui/SelectItem";
import ProductCard from "../../components/ProductCard";
import { useSearch } from "../../context/SearchContext";

const Search = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { category, subCategory } = useParams();
  const location = useLocation();
  const { searchResults } = useSearch();
  const [products, setProducts] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minMaxPrice, setMinMaxPrice] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [styleFilters, setStyleFilters] = useState([]);

  useEffect(() => {
    const initializeProducts = () => {
      if (location.pathname === '/search' && searchResults?.length > 0) {
        // Handle search results
        setProducts(searchResults);
        setSubCategoryName("Search Results");
        setFilteredProducts(searchResults);

        // Set up filters based on search results
        const uniqueBrands = [...new Set(searchResults.map(product => 
          product.meta_data?.brand || 'Unknown'
        ))];
        setStyleFilters(uniqueBrands.map(brand => ({ name: brand, checked: false })));

        // Calculate price ranges
        const prices = searchResults.map(product => product.price);
        const minPrice = Math.floor(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices));
        setMinMaxPrice([minPrice, maxPrice]);
        setPriceRange([minPrice, maxPrice]);
      }
    };

    initializeProducts();
  }, [searchResults, location.pathname]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply price filter
    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((product) => selectedBrands.includes(product.meta_data.brand));
    }

    // Apply sorting
    if (sortOption === "price-low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [products, priceRange, selectedBrands, sortOption]);

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <>
      <Banner
        setShowFilter={setShowFilter}
        subCategory={subCategoryName}
        totalProducts={filteredProducts.length}
        setSortOption={setSortOption}
      />
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col gap-4 px-4 py-4 md:w-[95%] md:flex-row md:gap-6 md:px-0 md:py-6 lg:w-[90%] lg:gap-8 lg:py-8">
          <AllFilters
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedBrands={selectedBrands}
            styleFilters={styleFilters}
            handleBrandChange={handleBrandChange}
            minMaxPrice={minMaxPrice}
          />
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Banner Component
const Banner = ({ subCategory, setShowFilter, totalProducts, setSortOption }) => {
  return (
    <div className="flex w-full justify-center md:bg-[#E9E9E9]">
      <div className="flex w-[90%] max-w-[1440px] flex-col justify-between gap-4 py-6 md:flex-row">
        <div className="flex items-center gap-8">
          <h2 className="text-dark text-xl font-semibold capitalize">
            {subCategory}
          </h2>
          <span className="text-[#555]">{totalProducts} items</span>
        </div>
        <div className="flex rounded-[4px] border border-[#e9e9e9]">
          <SortBy setSortOption={setSortOption} />
          <button
            onClick={() => setShowFilter(true)}
            className="my-2 flex w-1/2 cursor-pointer items-center justify-center gap-2 border-l border-l-[#e9e9e9] md:hidden"
          >
            <img src="/images/filter-icon.svg" alt="filter icon" />
            <span className="text-sm md:text-base">Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// AllFilters Component
const AllFilters = ({
  showFilter,
  setShowFilter,
  priceRange,
  setPriceRange,
  selectedBrands,
  styleFilters,
  handleBrandChange,
  minMaxPrice,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 bg-white md:relative md:z-auto md:bg-transparent ${
        showFilter ? "block" : "hidden"
      } md:block`}
    >
      <div className="h-full w-full overflow-y-auto bg-white px-4 py-4 shadow-lg md:sticky md:top-5 md:w-full md:p-2 md:py-0 md:shadow-none lg:w-[250px] xl:w-[300px]">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-dark flex items-center gap-4 px-5">
              <GridViewIcon /> <span>All Filters</span>
            </h2>
            <button
              onClick={() => setShowFilter(false)}
              className="mr-5 block cursor-pointer md:hidden"
            >
              <MultiplicationSignIcon />
            </button>
          </div>
          <Accordion.Root
            className="mt-4 flex w-full flex-col"
            type="multiple"
            defaultValue={["BRAND", "PRICE"]}
          >
            <FilterSection label="BRAND">
              <div className="flex flex-col gap-5">
                {styleFilters.map((styleFilter, i) => (
                  <div key={i} tabIndex={0} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="scale-125"
                      id={`style-checkbox-${i}`}
                      checked={selectedBrands.includes(styleFilter.name)}
                      onChange={() => handleBrandChange(styleFilter.name)}
                    />
                    <label
                      htmlFor={`style-checkbox-${i}`}
                      className="cursor-pointer text-[#555]"
                    >
                      {styleFilter.name}
                    </label>
                  </div>
                ))}
              </div>
            </FilterSection>

            <FilterSection label="PRICE">
  <div className="px-5">
    <DualRangeSlider
      min={minMaxPrice[0]}
      max={minMaxPrice[1]}
      value={priceRange}
      onChange={setPriceRange}
      className="mt-2"
    />
    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
      <span>₹{priceRange[0]}</span>
      <span>₹{priceRange[1]}</span>
    </div>
  </div>
</FilterSection>
          </Accordion.Root>
        </div>
      </div>
    </div>
  );
};

// FilterSection Component
const FilterSection = ({ label, children }) => {
    return (
      <Accordion.Item value={label} className="border-b border-[#e9e9e9]">
        <Accordion.Header className="flex">
          <Accordion.Trigger className="group flex w-full items-center justify-between px-5 py-4 text-sm font-medium text-[#555] hover:text-dark">
            {label}
            <ArrowDown01Icon className="text-[#555] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
          <div className="pb-4">{children}</div>
        </Accordion.Content>
      </Accordion.Item>
    );
  };

// SortBy Component
const SortBy = ({ setSortOption }) => {
    return (
        <Select.Root onValueChange={setSortOption}>
        <Select.Trigger className="flex w-1/2 cursor-pointer items-center justify-center gap-1 rounded-[4px] border-[#7B7B7B] bg-transparent p-2.5 text-sm text-[#555] md:w-fit md:border md:text-base">
          <Select.Value placeholder="Sort by order" />
          <Select.Icon>
            <ArrowDown01Icon />
          </Select.Icon>
        </Select.Trigger>
  
        <Select.Portal>
          <Select.Content
            className="shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2) overflow-hidden rounded-md bg-[#e9e9e9]"
            position="popper"
            sideOffset={5}
          >
            <Select.Viewport className="px-5 py-4">
              <Select.Group className="flex flex-col gap-2">
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  };

export default Search;