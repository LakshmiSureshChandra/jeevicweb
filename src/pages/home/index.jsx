import React from "react";
import Hero from "./Hero";
import DiscoverNewItems from "./DiscoverNewItems";
import productsData from "../../data/productsData.json";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  getJustForYou,
  getFeaturedBanner,
  getFeaturedProductIds,
  getProductsByIds,
} from "../../lib/api";
import { useState, useEffect } from "react";

const Home = () => {
  const [justForYouProducts, setJustForYouProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [featuredBanner, setFeaturedBanner] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigation = useNavigate();
  useEffect(() => {
    const fetchJustForYou = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return; // Skip API call if not logged in
      }

      setIsLoading(true);
      try {
        const response = await getJustForYou();
        setJustForYouProducts(
          Array.isArray(response) ? response : response?.data || [],
        );
      } catch (error) {
        console.error("Failed to fetch Just For You products:", error);
        setJustForYouProducts([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    const fetchFeaturedContent = async () => {
      try {
        // Fetch featured banner
        const fetchBanner = async () => {
          try {
            const response = await getFeaturedBanner();
            if (response.success && response.data.rows.length > 0) {
              const bannerData = response.data.rows[0].videos[0];
              setFeaturedBanner({
                title: bannerData.text1,
                description: bannerData.text2,
                image_url: bannerData.url,
                link: bannerData.linkto.id,
                buttonText: bannerData.buttontext,
              });
            }
          } catch (error) {
            console.error("Failed to fetch featured banner:", error);
          }
        };

        // Fetch featured products
        const fetchFeaturedProducts = async () => {
          try {
            const response = await getFeaturedProductIds();
            if (response.success && response.data.rows.length > 0) {
              const productIds = response.data.rows[0].productIds;
              console.log("Product IDs:", productIds);
              // if (Array.isArray(productIds) && productIds.length > 0) {
              //   const productDetails = await getProductsByIds(productIds);
              //   console.log("Product Details:", productDetails);
              //   setFeaturedProducts(productDetails.slice(0, 6)); // Limit to 6 products
              // } else {
              //   console.error("No valid product IDs found");
              //   setFeaturedProducts([]);
              // }
              const productDetails = await getProductsByIds(productIds);
              setFeaturedProducts(productDetails);
              console.log(productDetails);
            }
          } catch (error) {
            console.error("Failed to fetch featured products:", error);
            setFeaturedProducts([]);
          }
        };

        // Execute both fetches concurrently
        await Promise.all([fetchBanner(), fetchFeaturedProducts()]);
      } catch (error) {
        console.error("Failed to fetch featured content:", error);
      }
    };

    fetchJustForYou();
    fetchFeaturedContent();
  }, []);
  const handleClick = (product) => {
    navigation(`/product-page/${product.id}`);
    console.log(product);
  };
  const ProductCard = ({ product }) => (
    <div
      className="group relative h-full w-full flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
      onClick={() => {
        handleClick(product);
      }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.image_url[0]}
          alt={product.name}
          className="h-full w-full transform object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          <span className="rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">
            -{product.meta_data.discount} OFF
          </span>
        </div>
      </div>
      <div className="flex h-[calc(100%-75%)] flex-col p-2.5">
        <div className="mb-1 flex items-start justify-between">
          <h3 className="line-clamp-1 text-sm font-bold text-gray-900">
            {product.name}
          </h3>
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-gray-500">
              ₹{product.price}
            </span>
            <span className="text-xs text-red-600 line-through">
              ₹{product.meta_data.slashed_price}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 transition-transform duration-300 group-hover:scale-x-100"></div>
    </div>
  );

  return (
    <main>
      <h1 className="sr-only">Home</h1>
      <Hero />

      <div className="mt-8 mb-8 flex justify-center md:mt-12 lg:mt-21">
        <div className="flex w-[98%] flex-col gap-8">
          <section className="w-full bg-gray-50 py-12">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-center gap-6 px-4 lg:flex-row">
                {/* Featured Banner */}
                <div className="h-full w-full lg:w-1/3">
                  <div className="group relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl">
                    <div className="aspect-[16/9] overflow-hidden lg:aspect-square">
                      {featuredBanner ? (
                        <video
                          src={featuredBanner.image_url}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-cover opacity-100"
                        />
                      ) : (
                        <video
                          src="/flash-sale.mp4"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-cover opacity-100"
                        />
                      )}
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6 md:p-8">
                      <div className="text-left">
                        <h3 className="mb-2 text-3xl font-bold text-white sm:mb-3 sm:text-4xl md:text-5xl">
                          {featuredBanner ? featuredBanner.title : ""}
                        </h3>
                        <p className="mb-4 max-w-[90%] text-sm text-white/90 sm:mb-6 sm:max-w-[80%] sm:text-base md:text-lg">
                          {featuredBanner ? featuredBanner.description : ""}
                        </p>
                        <Link
                          to={
                            featuredBanner
                              ? `/category/${featuredBanner.link}`
                              : ""
                          }
                          className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors duration-300 hover:bg-black hover:text-white sm:px-6 sm:py-2.5 sm:text-base md:px-8 md:py-3"
                        >
                          {featuredBanner ? featuredBanner.buttonText : ""}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid of Products */}
                <div className="w-full lg:w-2/3">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
                    {featuredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <DiscoverNewItems />

          <section className="w-full bg-gray-50 py-1">
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
                  <div className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
                    {justForYouProducts.map((product, index) => (
                      <div
                        key={product.id || index}
                        className="group relative w-[280px] flex-shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                      >
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={product.image_url[0]}
                            alt={product.name}
                            className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="absolute right-0 bottom-0 left-0 p-4 text-white transition-all duration-300 md:group-hover:scale-110 md:group-hover:p-6">
                          <h3 className="mb-1 text-lg font-bold">
                            {product.name}
                          </h3>
                          <p className="mb-3 line-clamp-2 text-sm text-white/90">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-lg font-bold">
                                ₹{product.price}
                              </span>
                              <span className="ml-2 text-xs text-white/70 line-through">
                                ₹{product.meta_data.slashed_price}
                              </span>
                            </div>
                            <Link
                              to={`/product-page/${product.id}`}
                              className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-black transition-colors duration-300 hover:bg-black hover:text-white"
                            >
                              Shop Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center py-8">
                    We are figuring out what you might like.
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Gifting Section */}
          <section className="flex flex-col gap-6">
            <h2 className="text-center text-3xl font-semibold">Gifting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <Link
                to="/category/gifts"
                className="group relative overflow-hidden"
              >
                <img
                  src="/images/browse-gifts.jpg"
                  alt="Browse Gifts"
                  className="h-[400px] w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-[800px]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="text-2xl font-semibold text-white">
                    Browse Gifts
                  </span>
                </div>
              </Link>

              <Link
                to="/create-gift"
                className="group relative overflow-hidden"
              >
                <img
                  src="/images/create-gift.jpg"
                  alt="Create Custom Gift"
                  className="h-[400px] w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-[800px]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="text-2xl font-semibold text-white">
                    Create Custom Gift
                  </span>
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
