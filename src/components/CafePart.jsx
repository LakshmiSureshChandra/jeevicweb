import React from 'react';
import RestaurantInfo from './Cafe/RestaurantInfo';
import PhotoGallery from './Cafe/PhotoGallery';
import ContentTabs from './Cafe/ContentTabs';
import Header from './Cafe/Header';

function CafePart() {
  return (
    <div className="min-h-screen mx-auto  md:px-12 px-4">
      <Header />
      <RestaurantInfo />
      <PhotoGallery />
      <ContentTabs />
    </div>
  );
}

export default CafePart;