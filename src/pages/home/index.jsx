import React from "react";
import Hero from "./Hero";
import DiscoverNewItems from "./DiscoverNewItems";
import BannerSlider from "./BannerSlider";
import EmailSubscription from "./EmailSubscription";
import ProductsShowcase from "../../components/ProductsShowcase";
import productsData from "../../data/productsData.json";

const Home = () => {
  return (
    <main>
      <h1 className="sr-only">Home</h1>
      <Hero />

      <div className="mt-8 mb-8 flex justify-center md:mt-12 lg:mt-21">
        <div className="flex w-[90%] max-w-[1440px] flex-col gap-16">
          <ProductsShowcase
            title="Flash Sales"
            data={productsData.flashSaleCards}
            timer
          />
          <DiscoverNewItems />
          <ProductsShowcase
            title="Just For You"
            data={productsData.justForYouCards}
          />
          <ProductsShowcase
            title="Gift Options"
            data={productsData.giftOptionCards}
          />
          <ProductsShowcase
            title="Wishlist"
            data={productsData.wishListCards}
          />
        </div>
      </div>

      <BannerSlider />
      <EmailSubscription />
    </main>
  );
};

export default Home;
