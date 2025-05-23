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
      setProducts(productsData.data);
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
    <section className="flex w-full flex-col gap-12">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row md:items-baseline">
        <h2 className="text-2xl font-medium md:text-3xl">Discover New Items</h2>
      </div>

      <div className="hide-scrollbar flex justify-around gap-6 overflow-x-scroll lg:grid lg:grid-cols-3">
        {products.map((product) => (
          <NewItemsProductCard
            key={product.id}
            product={product}
            categoryName={getCategoryName(product.category_id)}
          />
        ))}
      </div>
    </section>
  );
};

export default DiscoverNewItems;

// NewItemsProductCard Component
const NewItemsProductCard = ({ product, categoryName }) => {
  const imageUrls = product.image_url;
  const primaryImage = imageUrls[0];
  const hoverImage = imageUrls[1] || primaryImage;

  return (
    <div className="group h-full min-w-[350px] shrink-0">
      <div className="relative min-h-[250px] overflow-hidden rounded-t-[8px] lg:min-h-[400px]">
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

      <div className="bg-opacity-50 flex flex-col items-center justify-between gap-2 rounded-b-[8px] bg-black p-5 xl:flex-row">
        <div className="flex flex-col items-center justify-between xl:items-start">
          <h3 className="text-sm font-semibold text-white md:text-base xl:text-lg">
            {categoryName}
          </h3>
        </div>
        <Link
          to={`/category/${product.category_id}`}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#D9D9D9] bg-transparent px-3 py-2 text-sm font-semibold text-white lg:px-6 lg:py-3 lg:text-base"
        >
          <span className="text-nowrap">Shop Now</span>
        </Link>
      </div>
    </div>
  );
};
