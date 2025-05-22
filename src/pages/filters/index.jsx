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
import { getProductsBySubCategory, getAllSubCategories, getSubcategoriesById } from "../../lib/api"; // Import API functions

const Filters = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { category, subCategory } = useParams();
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const subCategoryId = subCategory; // Assuming subCategory is the ID
        const productsData = await getProductsBySubCategory(subCategoryId);
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const fetchSubCategoryName = async () => {
      try {
        const subCategoryData = await getSubcategoriesById(subCategory);
        setSubCategoryName(subCategoryData.name);
      } catch (error) {
        console.error("Failed to fetch subcategory name:", error);
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
    fetchSubCategoryName();
    fetchSubCategories();
  }, [subCategory]);

  return (
    <>
      <Banner
        setShowFilter={setShowFilter}
        subCategory={subCategoryName} // Pass subcategory name
        totalProducts={products.length} // Pass total products count
      />
      <div className="flex w-full justify-center">
        <div className="flex flex-col md:flex-row w-full md:w-[95%] lg:w-[90%] gap-4 md:gap-6 lg:gap-8 py-4 md:py-6 lg:py-8 px-4 md:px-0">
          <AllFilters showFilter={showFilter} setShowFilter={setShowFilter} />
          <FilterProducts products={products} />
        </div>
      </div>
    </>
  );
};

// Banner component
const Banner = ({ subCategory, setShowFilter, totalProducts }) => {
  return (
    <div className="flex w-full justify-center md:bg-[#E9E9E9]">
      <div className="flex w-[90%] max-w-[1440px] flex-col justify-between gap-4 py-6 md:flex-row">
        <div className="flex items-center gap-8">
          <h2 className="text-dark text-xl font-semibold capitalize">
            {subCategory}
          </h2>
          <span className="text-[#555]">{totalProducts} items</span> {/* Display total products */}
        </div>
        <div className="flex rounded-[4px] border border-[#e9e9e9]">
          <SortBy />
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

// AllFilters component
const AllFilters = ({ showFilter, setShowFilter }) => {
  const styleFilters = [
    { name: "Minimalist", checked: false },
    { name: "Uniqlo", checked: false },
    { name: "Zara", checked: false },
    { name: "Gucci", checked: false },
    { name: "Mango", checked: false },
    { name: "Ralph Lauren", checked: false },
    { name: "Calvin Klein", checked: false },
    { name: "Rachel Pally", checked: false },
  ];

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
      <div className="h-full w-full overflow-y-auto bg-white py-4 px-4 shadow-lg md:sticky md:top-5 md:w-full lg:w-[250px] xl:w-[300px] md:p-2 md:py-0 md:shadow-none">
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
            defaultValue={[
              "BRAND",
              "PRICE",
            ]}
          >

            <FilterSection label="BRAND">
              <div className="flex flex-col gap-5">
                {styleFilters.map((styleFilter, i) => {
                  return (
                    <div key={i} tabIndex={0} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="scale-125"
                        id={`style-checkbox-${i}`}
                      />
                      <label
                        htmlFor={`style-checkbox-${i}`}
                        className="cursor-pointer text-[#555]"
                      >
                        {styleFilter.name}
                      </label>
                    </div>
                  );
                })}
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
                  min={min}
                  max={max}
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
    <div className="flex-1 w-full">
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        {products.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
    </div>
  );
};

// Helper components
const SortBy = () => {
  return (
    <Select.Root>
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
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="discount">Discount</SelectItem>
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
