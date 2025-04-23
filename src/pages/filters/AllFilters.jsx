import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  GridViewIcon,
  MultiplicationSignIcon,
  Search01Icon,
} from "hugeicons-react";
import { Accordion } from "radix-ui";
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import DualRangeSlider from "../../components/ui/DualRangeSlider";

const modelFilters = [
  { name: "Short", count: 60 },
  { name: "Mid-length", count: 10 },
  { name: "Sweater", count: 56 },
  { name: "Party Dresses", count: 80 },
  { name: "Regular Fit", count: 100 },
];

const styleFilters = [
  { name: "Casual", checked: false },
  { name: "Business casual", checked: false },
  { name: "Bohemian", checked: false },
  { name: "Minimalist", checked: false },
  { name: "Uniqlo", checked: false },
  { name: "Zara", checked: false },
  { name: "Gucci", checked: false },
  { name: "Mango", checked: false },
  { name: "Ralph Lauren", checked: false },
  { name: "Calvin Klein", checked: false },
  { name: "Rachel Pally", checked: false },
];

const colorFilters = [
  { hash: "#FF2E00", color: "Red", checked: false },
  { hash: "#FCE1D8", color: "Peach", checked: false },
  { hash: "#4285F4", color: "Blue", checked: false },
  { hash: "#FF9800", color: "Orange", checked: false },
  { hash: "#FFEB3B", color: "Yellow", checked: false },
  { hash: "#4CAF50", color: "Green", checked: false },
  { hash: "#9C27B0", color: "Purple", checked: false },
  { hash: "#FF80AB", color: "Pink", checked: false },
  { hash: "#795548", color: "Brown", checked: false },
  { hash: "#212121", color: "Black", checked: false },
  { hash: "#9E9E9E", color: "Gray", checked: false },
  { hash: "#FFFFFF", color: "White", checked: false },
];

const sizeFilters = [
  { size: "2XS", checked: false },
  { size: "XS", checked: false },
  { size: "S", checked: false },
  { size: "M", checked: false },
  { size: "L", checked: false },
  { size: "XL", checked: false },
  { size: "2XL", checked: false },
  { size: "3XL", checked: false },
];

const AllFilters = ({ showFilter, setShowFilter }) => {
  const min = 200;
  const max = 500;
  const [values, setValues] = useState([min, max]);

  const handleInputChange = (index, event) => {
    const newValue = Number(event.target.value);
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
  };

  const handleBlur = (index) => {
    const newValues = [...values];

    if (index === 0) {
      newValues[0] = Math.max(min, Math.min(values[0], values[1]));
    }
    if (index === 1) {
      newValues[1] = Math.min(max, Math.max(values[1], values[0]));
    }

    setValues(newValues);
  };

  return (
    <div
      className={`absolute md:relative md:block ${showFilter ? "block" : "hidden"}`}
    >
      <div className="fixed top-0 left-0 h-screen w-full overflow-y-scroll bg-white py-8 shadow-lg sm:w-[350px] md:sticky md:top-5 md:w-[250px] md:p-2 md:py-0 md:shadow-none lg:w-[320px] 2xl:w-[400px]">
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
              "MODEL",
              "STYLE",
              "COLORS",
              "SIZE",
              "PRICE",
            ]}
          >
            <FilterSection label="BRAND">
              <div className="border-dark flex items-center justify-between rounded-[4px] border bg-transparent p-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-2 outline-none"
                />
                <Search01Icon tabIndex={0} className="cursor-pointer" />
              </div>
            </FilterSection>

            <FilterSection label="MODEL">
              <div className="flex flex-col gap-5">
                {modelFilters.map((modelFilter, i) => {
                  return (
                    <div
                      key={i}
                      tabIndex={0}
                      className="flex w-full cursor-pointer items-center justify-between"
                    >
                      <span className="text-sm text-[#555]">
                        {modelFilter.name}
                      </span>
                      <span className="text-[13px] text-[#9d9d9d]">
                        {modelFilter.count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </FilterSection>

            <FilterSection label="STYLE">
              <div className="flex flex-col gap-5">
                {styleFilters.map((styleFilter, i) => {
                  return (
                    <div tabIndex={0} className="flex items-center gap-3">
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

            <FilterSection label="COLORS">
              <div className="flex flex-wrap gap-3">
                {colorFilters.map((colorFilter, i) => {
                  return (
                    <input
                      key={i}
                      title={colorFilter.color}
                      type="checkbox"
                      id={`color-checkbox-${i}`}
                      name="color"
                      className="relative aspect-square w-[30px] cursor-pointer appearance-none rounded-full border border-[#333] checked:after:absolute checked:after:inset-0 checked:after:m-auto checked:after:h-4 checked:after:w-4 checked:after:bg-[url('/images/tick-mark.svg')] checked:after:bg-cover checked:after:bg-center checked:after:bg-no-repeat checked:after:content-['']"
                      style={{ backgroundColor: colorFilter.hash }}
                    />
                  );
                })}
              </div>
            </FilterSection>

            <FilterSection label="SIZE">
              <div className="flex flex-wrap gap-3">
                {sizeFilters.map((sizeFilter, i) => {
                  return (
                    <input
                      key={i}
                      type="checkbox"
                      id={`size-checkbox-${i}`}
                      name="size"
                      data-content={sizeFilter.size}
                      className="after:font-lato transtion-all relative flex h-8 w-12 cursor-pointer appearance-none items-center justify-center rounded-[8px] border border-[#d9d9d9] bg-transparent text-sm duration-300 after:font-bold after:text-[#555] after:content-[attr(data-content)] checked:bg-[#D1E2EB]"
                    />
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
                <div className="flex items-center justify-center gap-8">
                  <div className="flex flex-col gap-1 text-sm text-[#969696]">
                    <span>Minimum</span> <span>$200</span>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-[#969696]">
                    <span>Maximum</span> <span>$500</span>
                  </div>
                </div>
              </div>
            </FilterSection>
          </Accordion.Root>

          <p className="my-6 px-5 text-[#555]">878 products found</p>
        </div>
      </div>
    </div>
  );
};

export default AllFilters;

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
