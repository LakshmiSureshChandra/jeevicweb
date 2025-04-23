import React from "react";
import { Select } from "radix-ui";
import { ArrowDown01Icon } from "hugeicons-react";
import SelectItem from "../../components/ui/SelectItem";

const Banner = ({ subCategory, setShowFilter }) => {
  return (
    <div className="flex w-full justify-center md:bg-[#E9E9E9]">
      <div className="flex w-[90%] max-w-[1440px] flex-col justify-between gap-4 py-6 md:flex-row">
        <div className="flex items-center gap-8">
          <h2 className="text-dark text-xl font-semibold capitalize">
            {subCategory}
          </h2>
          <span className="text-[#555]">110 items</span>
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

export default Banner;

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
