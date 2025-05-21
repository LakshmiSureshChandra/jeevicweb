import React from "react";
import Hero from "./Hero";
import DiscoverNewItems from "./DiscoverNewItems";
import productsData from "../../data/productsData.json";
import { Link } from "react-router-dom";
import { ArrowRight01Icon } from "hugeicons-react";

const Home = () => {

  const ProductCard = ({ product }) => (
    <div className="group relative flex-shrink-0 w-full h-full overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{product.discount} OFF
          </span>
        </div>
      </div>
      <div className="p-2.5 flex flex-col h-[calc(100%-75%)]">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-gray-900 font-bold text-sm line-clamp-1">{product.name}</h3>
          <div className="flex flex-col items-end">
            <span className="text-red-600 text-sm font-bold">{product.discountedPrice}</span>
            <span className="text-gray-500 text-xs line-through">{product.originalPrice}</span>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );

  return (
    <main>
      <h1 className="sr-only">Home</h1>
      <Hero />

      <div className="mt-8 mb-8 flex justify-center md:mt-12 lg:mt-21">
        <div className="flex w-[98%] flex-col gap-8">
          <section className="w-full py-12 bg-gray-50">
            <div className="flex flex-col gap-8">

              <div className="flex flex-col lg:flex-row gap-6 px-4">
                {/* Featured Banner */}
                <div className="lg:hidden w-full">
                  <div className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[16/9] lg:aspect-[4/5] overflow-hidden">
                      <video
                        src="/flash-sale.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-100"
                      />
                    </div>
                    <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center">
                      <h3 className="text-white font-bold text-2xl mb-1">Flash Sale</h3>
                      <p className="text-white/90 text-sm mb-4">Discover amazing deals with up to 50% off</p>
                      <Link
                        to="/products/flash-sales"
                        className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block w-[600px] flex-shrink-0">
                  <div className="group relative h-[97%] overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[4/5] overflow-hidden">
                      <video
                        src="/flash-sale.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-100"
                      />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="text-left">
                        <h3 className="text-white font-bold text-5xl mb-3">Flash Sale</h3>
                        <p className="text-white/90 text-lg mb-6 max-w-[80%]">Discover amazing deals with up to 50% off</p>
                        <Link
                          to="/products/flash-sales"
                          className="inline-flex items-center bg-white text-black px-8 py-3 rounded-full text-base font-medium hover:bg-black hover:text-white transition-colors duration-300"
                        >
                          View All
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid of Products */}
                <div className="w-full lg:flex-1">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
                    {/* First Row */}
                    <div className="contents">
                      {productsData.flashSaleCards.slice(1, window.innerWidth < 768 ? 4 : 6).map((product, index) => (
                        <div key={index} className="w-full">
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                    {/* Second Row */}
                    <div className="contents">
                      {productsData.flashSaleCards.slice(window.innerWidth < 768 ? 4 : 6, window.innerWidth < 768 ? 7 : 11).map((product, index) => (
                        <div key={index + (window.innerWidth < 768 ? 4 : 6)} className="w-full">
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <DiscoverNewItems />
          <section className="w-full py-2">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-2xl font-semibold">Just For You</h2>
                <Link
                  to="/products/just-for-you"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                >
                  View all
                  <ArrowRight01Icon className="w-4 h-4" />
                </Link>
              </div>

              <div className="relative">
                <div className="flex overflow-x-auto gap-6 px-4 pb-4 hide-scrollbar snap-x snap-mandatory">
                  {productsData.justForYouCards.map((product, index) => (
                    <div
                      key={index}
                      className="group relative flex-shrink-0 w-[280px] overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 snap-start"
                    >
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white md:group-hover:scale-110 md:group-hover:p-6 transition-all duration-300">
                        <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                        <p className="text-sm text-white/90 mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold">{product.discountedPrice}</span>
                            <span className="ml-2 text-xs line-through text-white/70">{product.originalPrice}</span>
                          </div>
                          <button className="bg-white text-black px-3 py-1.5 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300">
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* Gifting Section */}
          <section className="flex flex-col gap-6">
            <h2 className="text-3xl font-semibold text-center">Gifting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <Link
                to="/category/gifts"
                className="relative overflow-hidden group"
              >
                <img
                  src="/images/browse-gifts.jpg"
                  alt="Browse Gifts"
                  className="w-full h-[400px] md:h-[800px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-white text-2xl font-semibold">Browse Gifts</span>
                </div>
              </Link>

              <Link
                to="/create-gift"
                className="relative overflow-hidden group"
              >
                <img
                  src="/images/create-gift.jpg"
                  alt="Create Custom Gift"
                  className="w-full h-[400px] md:h-[800px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-white text-2xl font-semibold">Create Custom Gift</span>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Home;
