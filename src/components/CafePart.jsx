import React from 'react';
import RestaurantInfo from './Cafe/RestaurantInfo';
import ActionButtons from './Cafe/ActionButtons';
import PhotoGallery from './Cafe/PhotoGallery';
import ContentTabs from './Cafe/ContentTabs';
import Header from './Cafe/Header';

function CafePart() {
  return (
    <div className="min-h-screen mx-auto max-w-7xl md:px-12 px-4">
      <Header />
      <RestaurantInfo />
      <ActionButtons />
      <PhotoGallery />
      <ContentTabs />
    </div>
  );
}

export default CafePart;