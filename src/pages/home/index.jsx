import React from "react";
import Hero from "./Hero";
import DiscoverNewItems from "./DiscoverNewItems";
import productsData from "../../data/productsData.json";
import { Link } from "react-router-dom";
import { getJustForYou } from "../../lib/api";
import { useState, useEffect } from "react";

const Home = () => {

  const [justForYouProducts, setJustForYouProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJustForYou = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return; // Skip API call if not logged in
      }

      setIsLoading(true);
      try {
        const response = await getJustForYou();
        setJustForYouProducts(Array.isArray(response) ? response : response?.data || []);
      } catch (error) {
        console.error("Failed to fetch Just For You products:", error);
        setJustForYouProducts([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchJustForYou();
  }, []);

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

              <div className="flex flex-col lg:flex-row items-center gap-6 px-4">
                {/* Featured Banner */}
                <div className="w-full lg:w-1/3 h-full">
                  <div className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[16/9] lg:aspect-square overflow-hidden">
                      <video
                        src="/flash-sale.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-100"
                      />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="text-left">
                        <h3 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">Flash Sale</h3>
                        <p className="text-white/90 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-[90%] sm:max-w-[80%]">
                          Discover amazing deals with up to 50% off
                        </p>
                        <Link
                          to="/products/flash-sales"
                          className="inline-flex items-center bg-white text-black px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full text-sm sm:text-base font-medium hover:bg-black hover:text-white transition-colors duration-300"
                        >
                          View All
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid of Products */}
                <div className="w-full lg:w-2/3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                    {productsData.flashSaleCards.slice(0, 6).map((product, index) => (
                      <div key={index} className="w-full">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <DiscoverNewItems />
          
          <section className="w-full py-1 bg-gray-50">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-center justify-between gap-2 sm:flex-row md:items-baseline">
                <div className="flex items-baseline">
                  <h2 className="text-2xl font-medium md:text-3xl">
                    Just For You
                  </h2>
                </div>
              </div>

              <div className="relative">
                {isLoading ? (
                  <div className="flex justify-center py-8">Loading...</div>
                ) : justForYouProducts && justForYouProducts.length > 0 ? (
                  <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar snap-x snap-mandatory">
                    {justForYouProducts.map((product, index) => (
                      <div
                        key={product.id || index}
                        className="group relative flex-shrink-0 w-[280px] overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 snap-start"
                      >
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={product.image_url[0]}
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
                              <span className="text-lg font-bold">{product.price}</span>
                              <span className="ml-2 text-xs line-through text-white/70">{product.meta_data.slashed_price}</span>
                            </div>
                            <Link
                              to={`/product-page/${product.id}`}
                              className="bg-white text-black px-3 py-1.5 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300"
                            >
                              Shop Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center py-8">We are figuring out what you might like.</div> 
                )
                }
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
