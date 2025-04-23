import React from "react";
import { DropdownMenu } from "radix-ui";
import { ArrowUp01Icon } from "hugeicons-react";
import { Link } from "react-router-dom";
import { useGetCategories } from "../../services/queries/CategoryQueries";

const CategoriesMenu = ({ categoriesData }) => {
  const getCategoriesQuery = useGetCategories();

  console.log(getCategoriesQuery.data);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex cursor-pointer items-center gap-2 border-r-1 border-r-[#e9e9e9] pr-2 sm:pr-4">
        <span className="py-1 text-[12px] text-nowrap sm:text-base">
          All Categories
        </span>
        <ArrowUp01Icon className="rotate-180" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="z-20 mt-4 flex max-h-[400px] !w-screen justify-between overflow-y-scroll bg-[#fff] px-8 py-6 pr-5 shadow-md sm:max-h-none lg:mt-8">
          <div className="hide-scrollbar grid w-full grid-cols-2 gap-x-8 gap-y-4 overflow-y-scroll sm:grid-cols-3 md:grid-cols-4 md:gap-x-12 md:gap-y-8">
            {categoriesData.map((category, i) => (
              <CategoryList
                key={i}
                title={category.title}
                categories={category.items}
                className={category.class}
              />
            ))}
          </div>
          <img
            src="/images/categories-img.png"
            className="hidden lg:block"
            alt="dress showcase"
          />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default CategoriesMenu;

const CategoryList = ({ title, categories, className }) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <DropdownMenu.Label className="text-dark text-sm font-bold tracking-[0.5px] uppercase">
        {title}
      </DropdownMenu.Label>
      <div className="flex flex-col gap-2">
        {categories.map((category, i) => (
          <DropdownMenu.Item
            key={i}
            className="cursor-pointer text-[12px] text-[#555] outline-none md:text-sm"
            asChild
          >
            <Link to={category.link}>{category.category}</Link>
          </DropdownMenu.Item>
        ))}
      </div>
    </div>
  );
};
