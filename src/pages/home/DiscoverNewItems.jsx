import { ArrowRight01Icon } from "hugeicons-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNewItems, getAllCategories } from "../../lib/api";

const DiscoverNewItems = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getNewItems();
      const categoriesData = await getAllCategories();
      // Only take the first 3 items from the products data
      setProducts(productsData.data.slice(0, 3));
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  // Helper to get category name by id
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  return (
    <section className="flex w-full flex-col gap-8">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row md:items-baseline">
        <h2 className="text-2xl font-medium md:text-3xl">Discover New Items</h2>
      </div>

      <div className="relative w-full">
        <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 hide-scrollbar
          sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-x-visible
          lg:grid lg:grid-cols-3">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="w-[280px] flex-none first:ml-4 last:mr-4
                sm:w-full sm:first:ml-0 sm:last:mr-0"
            >
              <NewItemsProductCard
                product={product}
                categoryName={getCategoryName(product.category_id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewItemsProductCard = ({ product, categoryName }) => {
  const imageUrls = product.image_url;
  const primaryImage = imageUrls[0];
  const hoverImage = imageUrls[1] || primaryImage;

  return (
    <div className="group h-full w-full overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Primary image */}
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity duration-300 ease-in-out"
          style={{ backgroundImage: `url(${primaryImage})` }}
        />
        {/* Hover image */}
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          style={{ backgroundImage: `url(${hoverImage})` }}
        />
      </div>

      <div className="bg-black bg-opacity-50 p-3 flex flex-col items-center justify-between gap-2 xl:flex-row">
        <div className="flex flex-col items-center xl:items-start">
          <h3 className="text-sm font-semibold text-white md:text-base">
            {categoryName}
          </h3>
        </div>
        <Link
          to={`/category/${product.category_id}`}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#D9D9D9] bg-transparent px-3 py-1.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black"
        >
          <span className="whitespace-nowrap">Shop Now</span>
        </Link>
      </div>
    </div>
  );
};

export default DiscoverNewItems;
