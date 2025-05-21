import React from 'react';

const PhotoGallery = () => {
  const images = [
    'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ];

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;