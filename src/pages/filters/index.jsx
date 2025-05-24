import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import {
  getProductsBySubCategory,
  getAllSubCategories,
  getSubcategoriesById,
  getProductsByCategory,
  getCategoryById,
} from "../../lib/api"; // Import API functions

const Filters = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { category, subCategory } = useParams();
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minMaxPrice, setMinMaxPrice] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [styleFilters, setStyleFilters] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let productsData = [];
        if (subCategory) {
          // Fetch by subcategory
          productsData = await getProductsBySubCategory(subCategory);
          // Fetch and set subcategory name
          const subCategoryData = await getSubcategoriesById(subCategory);
          setSubCategoryName(subCategoryData.name);
        } else {
          // Fetch by category
          const cat = await getCategoryById(category);
          productsData = await getProductsByCategory(category);
          setSubCategoryName(cat.name); // or setCategoryName if you prefer — depending on your data
        }
        setProducts(productsData);
        const uniqueBrands = [...new Set(productsData.map(product => product.meta_data.brand))];
        setStyleFilters(uniqueBrands.map(brand => ({ name: brand, checked: false })));
        // Calculate min and max prices
        if (productsData.length > 0) {
          const prices = productsData.map(product => product.price);
          const minPrice = Math.floor(Math.min(...prices));
          const maxPrice = Math.ceil(Math.max(...prices));
          setMinMaxPrice([minPrice, maxPrice]);
          setPriceRange([minPrice, maxPrice]); // Set initial price range to min and max
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const subCategoriesData = await getAllSubCategories();
        setSubCategories(subCategoriesData);
      } catch (error) {
        console.error("Failed to fetch subcategories:", error);
      }
    };

    fetchProducts();
    fetchSubCategories();
  }, [category, subCategory]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, priceRange, selectedBrands, sortOption]);

  const applyFiltersAndSort = () => {
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
  };

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
        setSortOption={setSortOption} // Make sure this line is present
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
            minMaxPrice={minMaxPrice}  // Pass minMaxPrice to AllFilters
          />
          <FilterProducts products={filteredProducts} />
        </div>
      </div>
    </>
  );
};

// Update Banner component to accept setSortOption
const Banner = ({ subCategory, setShowFilter, totalProducts, setSortOption }) => {
  return (
    <div className="flex w-full justify-center md:bg-[#E9E9E9]">
      <div className="flex w-[90%] max-w-[1440px] flex-col justify-between gap-4 py-6 md:flex-row">
        <div className="flex items-center gap-8">
          <h2 className="text-dark text-xl font-semibold capitalize">
            {subCategory}
          </h2>
          <span className="text-[#555]">{totalProducts} items</span>{" "}
          {/* Display total products */}
        </div>
        <div className="flex rounded-[4px] border border-[#e9e9e9]">
          <SortBy setSortOption={setSortOption} /> {/* Pass setSortOption here */}
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

// Update AllFilters component to accept selectedBrands and handleBrandChange
const AllFilters = ({
  showFilter,
  setShowFilter,
  priceRange,
  setPriceRange,
  selectedBrands,
  handleBrandChange,
  minMaxPrice, 
  styleFilters
}) => {

  // Add state for price range values
  const [values, setValues] = useState([0, 1000]);
  const min = 0;
  const max = 1000;

  // Add handlers for input changes and blur events
  const handleInputChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const handleBlur = (index) => {
    const newValues = [...values];
    newValues[index] = Math.max(min, Math.min(max, Number(newValues[index])));
    setValues(newValues);
  };

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
              {" "}
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
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-center gap-6">
                  <input
                    className="flex field-sizing-content h-[40px] w-fit min-w-[70px] items-center justify-center rounded border border-[#d9d9d9] bg-transparent px-5"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onBlur={() => handleBlur(0)}
                    value={values[0]}
                    onChange={(e) => handleInputChange(0, e)}
                  />
                  <span className="text-2xl text-[#c4c4c4]">-</span>
                  <input
                    className="flex field-sizing-content h-[40px] w-fit min-w-[70px] items-center justify-center rounded border border-[#d9d9d9] bg-transparent px-5"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={values[1]}
                    onBlur={() => handleBlur(1)}
                    onChange={(e) => handleInputChange(1, e)}
                  />
                </div>
                <DualRangeSlider
                  value={values}
                  onValueChange={setValues}
                  min={minMaxPrice[0]}
                  max={minMaxPrice[1]}
                  step={1}
                />
              </div>
            </FilterSection>
          </Accordion.Root>
        </div>
      </div>
    </div>
  );
};

// FilterProducts component
const FilterProducts = ({ products }) => {
  return (
    <div className="w-full flex-1">
      <div className="xs:grid-cols-2 grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
        {products.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
    </div>
  );
};

// Helper components
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

const FilterSection = ({ label, children }) => {
  return (
    <Accordion.Item
      className="mt-px overflow-hidden shadow-[0_1px_0] shadow-[#D9D9D9] first:mt-0 focus-within:relative focus-within:z-10"
      value={label}
    >
      <Accordion.Header className="flex">
        <Accordion.Trigger className="group flex h-[45px] flex-1 cursor-pointer items-center justify-between px-5 text-[15px] leading-none">
          <span className="text-dark text-sm font-semibold">{label}</span>
          <ArrowDown01Icon
            className="transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="AccordionContent data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown overflow-hidden">
        <div className="px-5 py-[15px]">{children}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
};

export default Filters;
