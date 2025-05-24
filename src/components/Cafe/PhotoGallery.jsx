import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhotoGallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const response = await axios.get('https://api.jeevic.com/banner/cafeweb');
        if (response.data.success && response.data.data.rows.length > 0) {
          setImages(response.data.data.rows[0].images);
        }
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load gallery images');
        setIsLoading(false);
      }
    };

    fetchBannerImages();
  }, []);

  if (isLoading) {
    return <div className="h-[300px] flex items-center justify-center">Loading gallery...</div>;
  }

  if (error) {
    return <div className="h-[300px] flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-1 overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
      <div className="col-span-7 md:col-span-8 h-full">
        <img 
          src={images[0]} 
          alt="Restaurant interior" 
          className="h-full w-full object-cover"
        />
      </div>
      <div className="col-span-5 md:col-span-4 grid grid-rows-2 gap-1 h-full">
        <div className="row-span-1 h-full">
          <img 
            src={images[1]} 
            alt="Restaurant food" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="row-span-1 grid grid-cols-2 gap-1 h-full">
          <div className="col-span-1 h-full">
            <img 
              src={images[2]} 
              alt="Restaurant ambiance" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="col-span-1 h-full relative">
            <img 
              src={images[3]} 
              alt="Restaurant dish" 
              className="h-full w-full object-cover"
            />
            {images.length > 4 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">+{images.length - 4}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;