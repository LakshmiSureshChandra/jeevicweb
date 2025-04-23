import React, { useEffect, useState } from "react";
import {
  ProductPageSlide,
  ProductPageSlider,
} from "../pages/product/ProductPageSlider";

const youMightLikeData = [
  {
    image: "/images/product-img-1.jpg",
    name: "SHORT PRINTED DRESS",
    price: "$64",
    originalPrice: "$129.99",
    discount: "40%",
  },
  {
    image: "/images/product-img-1.jpg",
    name: "SHORT PRINTED DRESS",
    price: "$64",
    originalPrice: "$129.99",
    discount: "40%",
  },
  {
    image: "/images/product-img-1.jpg",
    name: "SHORT PRINTED DRESS",
    price: "$64",
    originalPrice: "$129.99",
    discount: "40%",
  },
  {
    image: "/images/product-img-1.jpg",
    name: "SHORT PRINTED DRESS",
    price: "$64",
    originalPrice: "$129.99",
    discount: "40%",
  },
  {
    image: "/images/product-img-1.jpg",
    name: "SHORT PRINTED DRESS",
    price: "$64",
    originalPrice: "$129.99",
    discount: "40%",
  },
  {
    image: "/images/product-img-1.jpg",
    name: "SHORT PRINTED DRESS",
    price: "$64",
    originalPrice: "$129.99",
    discount: "40%",
  },
  {
    image: "/images/product-img-1.jpg",
    name: "SHORT PRINTED DRESS",
    price: "$64",
    originalPrice: "$129.99",
    discount: "40%",
  },
  {
    image: "/images/product-img-1.jpg",
    name: "SHORT PRINTED DRESS",
    price: "$64",
    originalPrice: "$129.99",
    discount: "40%",
  },
];

const getPerPage = () => {
  if (window.innerWidth >= 1280) return 4; // xl
  if (window.innerWidth >= 878) return 3; // md
  if (window.innerWidth >= 550) return 2; // sm
  return 1;
};

const YouMightLike = () => {
  const [perPage, setPerPage] = useState(getPerPage);

  useEffect(() => {
    const handleResize = () => setPerPage(getPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section>
      <ProductPageSlider gap={0} perPage={perPage} title="You may also like">
        {youMightLikeData.map((productData, i) => {
          return (
            <ProductPageSlide key={i}>
              <Card {...productData} />
            </ProductPageSlide>
          );
        })}
      </ProductPageSlider>
    </section>
  );
};

export default YouMightLike;

const Card = ({ image, name, price, originalPrice, discount }) => {
  return (
    <button className="flex max-w-[300px] items-center gap-3 text-start">
      <img src={image} className="w-[100px]" alt="product image" />
      <div className="flex flex-col justify-center gap-3">
        <h2 className="text-dark text-sm font-bold lg:text-base">{name}</h2>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold text-[#FF5C00] md:text-sm">
            {price}
          </span>
          <span className="text-[12px] font-semibold text-[#969696] line-through md:text-sm">
            {originalPrice}
          </span>
          <span className="font-lato rounded-[4px] bg-[#FF5C00] p-0.5 px-1 text-[12px] text-[#f9f9f9] lg:px-1.5">
            -{discount}
          </span>
        </div>
        <button className="text-dark flex cursor-pointer items-center justify-center gap-2 self-start rounded-[8px] border border-[#7b7b7b] bg-transparent px-3 py-2 text-sm font-semibold md:px-4">
          <span>{price} </span>
          <span className="text-nowrap">Shop Now</span>
        </button>
      </div>
    </button>
  );
};
