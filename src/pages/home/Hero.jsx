import React, { useState, useEffect } from "react";
import { getMainBanner } from "../../lib/api";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getMainBanner();
        setHeroData(data);
      } catch (error) {
        console.error("Failed to fetch main banner:", error);
      }
    };

    fetchBanner();
  }, []);

  if (!heroData) return null;

  const handleNavigation = () => {
    if (heroData.linkto?.type === "category") {
      navigate(`/category/${heroData.linkto.id}`);
    } else if (heroData.linkto?.type === "subcategory") {
      navigate(`/subcategory/${heroData.linkto.id}`);
    } else if (heroData.linkto?.type === "product") {
      navigate(`/product-page/${heroData.linkto.id}`);
    }
  };

  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0">
        {heroData.image ? (
          <img
            src={heroData.image}
            alt="Hero banner"
            className="h-full w-full object-cover"
          />
        ) : heroData.video ? (
          <>
            <video
              className="h-full w-full object-cover"
              src={heroData.video}
              width="1440"
              height="680"
              autoPlay
              playsInline
              loop
              muted
            />
            <div className="absolute right-8 bottom-8 flex gap-2"></div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-800">
            <p className="text-lg text-white">No media available</p>
          </div>
        )}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
        <h2 className="mb-4 text-center text-4xl font-semibold">
          {heroData.text1}
        </h2>
        <p className="mb-6 text-center text-2xl">{heroData.text2}</p>
        <button
          className="rounded-full bg-blue-600 px-8 py-3 text-lg text-white transition-colors hover:bg-blue-700"
          onClick={handleNavigation}
        >
          {heroData.buttontext}
        </button>
      </div>
    </section>
  );
};

export default Hero;
