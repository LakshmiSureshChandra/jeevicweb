import React, { useState } from 'react';

const MenuCategoryItem = ({ name, active = false, onClick }) => (
  <div
    className={`flex items-center border border-yellow-200 rounded-full px-3 py-2 space-x-2 whitespace-nowrap cursor-pointer ${
      active ? 'bg-yellow-50' : ''
    }`}
    onClick={onClick}
  >
    <span className="text-yellow-700 text-sm">◆</span>
    <span className={`text-sm ${active ? 'font-semibold text-yellow-900' : 'text-yellow-800'}`}>
      {name}
    </span>
    <span className="text-yellow-700 text-sm">◆</span>
  </div>
);

const TopDishItem = ({ name }) => (
  <div className="flex items-center border border-yellow-200 rounded-full px-3 py-2 space-x-2 whitespace-nowrap">
    <span className="text-yellow-700 text-sm">◆</span>
    <span className="text-sm text-yellow-800">{name}</span>
    <span className="text-yellow-700 text-sm">◆</span>
  </div>
);

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('South Indian');

  const categories = [
    'South Indian', 'North Indian', 'Biryani', 'Chinese', 'Desserts', 'Beverages',
  ];

  const topDishes = [
    'Jaggery Ice Cream', 'Bangla Kodi', 'Coriander Chicken',
    'Ragi Sankati', 'Spicy Food', 'Crispy Corn',
  ];

  return (
    <div className="md:border md:border-gray-200 rounded-lg md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Menu</h2>
        <button className="text-red-400 text-sm flex items-center">
          See all menus <span className="ml-1">▸</span>
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-yellow-800 mb-3">Cuisines</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map((category) => (
            <MenuCategoryItem
              key={category}
              name={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-yellow-800 mb-3">Top dishes</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {topDishes.map((dish) => (
            <TopDishItem key={dish} name={dish} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
