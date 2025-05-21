import React, { useState, useRef, useEffect } from "react";

const Hero = () => {

  const [heroData] = useState({
    mediaType: 'video',
    mediaUrl: 'https://jeevic-prod.s3.ap-south-1.amazonaws.com/jv-uploads/productvideo.mp4',
    title: 'Kimonos, Caftans & Pareos',
    description: 'Poolside glam included From $4.99',
    buttonText: 'SHOP NOW'
  });

  return (
    <section className="relative w-full h-screen">
      <div className="absolute inset-0">
        {heroData.mediaType === 'image' ? (
          <img 
            src={heroData.mediaUrl} 
            alt="Hero media" 
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <video 
              className="w-full h-full object-cover" 
              src='https://jeevic-prod.s3.ap-south-1.amazonaws.com/jv-uploads/productvideo.mp4'
              width="1440"
              height="680"
              autoPlay
              playsInline
              loop
              muted
            />
            <div className="absolute bottom-8 right-8 flex gap-2">
            </div>
          </>
        )}
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-8">
        <h2 className="text-4xl font-semibold mb-4">{heroData.title}</h2>
        <p className="text-2xl mb-6">{heroData.description}</p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition-colors">
          {heroData.buttonText}
        </button>
      </div>
    </section>
  );
};

export default Hero;
