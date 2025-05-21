import React, { useState, useEffect } from 'react';
import { PlusIcon, MinusIcon, XIcon, ShoppingCartIcon, ClockIcon, HomeIcon } from 'lucide-react';

const MenuCategoryItem = ({ name, active = false, onClick }) => (
  <button
    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      active ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
    onClick={onClick}
  >
    {name}
  </button>
);

const MenuItem = ({ item, onAddToCart, quantity }) => (
  <div className="flex items-center space-x-4 p-4 border-b border-gray-200 last:border-b-0">
    <img src={item.photo} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
    <div className="flex-grow">
      <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
    </div>
    <div className="flex flex-col items-end">
      <div className="text-orange-500 font-semibold mb-2">₹{item.price}</div>
      {quantity === 0 ? (
        <button onClick={() => onAddToCart(item)} className="bg-orange-500 text-white rounded-full p-1">
          <PlusIcon size={16} />
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <button onClick={() => onAddToCart(item, -1)} className="bg-gray-200 rounded-full p-1">
            <MinusIcon size={16} />
          </button>
          <span>{quantity}</span>
          <button onClick={() => onAddToCart(item)} className="bg-orange-500 text-white rounded-full p-1">
            <PlusIcon size={16} />
          </button>
        </div>
      )}
    </div>
  </div>
);

const OrderCart = ({ cart, onClose, onUpdateQuantity }) => (
  <div className="fixed bottom-16 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm w-full max-h-96 flex flex-col z-[9999]">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold">Order Cart</h3>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
        <XIcon size={20} />
      </button>
    </div>
    <div className="flex-grow overflow-y-auto">
      {Object.entries(cart).map(([itemName, { item, quantity }]) => (
        <div key={itemName} className="flex justify-between items-center mb-2">
          <span>{item.name} x {quantity}</span>
          <div className="flex items-center space-x-2">
            <button onClick={() => onUpdateQuantity(item, -1)} className="text-gray-500 hover:text-gray-700">
              <MinusIcon size={16} />
            </button>
            <button onClick={() => onUpdateQuantity(item, 1)} className="text-gray-500 hover:text-gray-700">
              <PlusIcon size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold">Total:</span>
        <span className="font-semibold">₹{Object.values(cart).reduce((total, { item, quantity }) => total + item.price * quantity, 0)}</span>
      </div>
      <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
        Pay Now
      </button>
    </div>
  </div>
);

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('South Indian');
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [orderType, setOrderType] = useState('pickup');

  const categories = [
    'South Indian', 'North Indian', 'Biryani', 'Chinese', 'Desserts', 'Beverages',
  ];

  const menuItems = {
    'South Indian': [
      { name: 'Masala Dosa', price: 80, photo: '/images/masala-dosa.jpg', description: 'Crispy crepe filled with spiced potatoes' },
      { name: 'Idli Sambar', price: 60, photo: '/images/idli-sambar.jpg', description: 'Steamed rice cakes with lentil soup' },
      { name: 'Vada', price: 50, photo: '/images/vada.jpg', description: 'Crispy lentil fritters' },
    ],
    'North Indian': [
      { name: 'Butter Chicken', price: 220, photo: '/images/butter-chicken.jpg', description: 'Creamy tomato-based chicken curry' },
      { name: 'Paneer Tikka', price: 180, photo: '/images/paneer-tikka.jpg', description: 'Grilled cottage cheese with spices' },
      { name: 'Naan', price: 30, photo: '/images/naan.jpg', description: 'Soft leavened flatbread' },
    ],
    // Add items for other categories
  };

  const handleAddToCart = (item, change = 1) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (!newCart[item.name]) {
        newCart[item.name] = { item, quantity: 0 };
      }
      newCart[item.name].quantity += change;
      if (newCart[item.name].quantity <= 0) {
        delete newCart[item.name];
      }
      return newCart;
    });
  };

  const totalItems = Object.values(cart).reduce((sum, { quantity }) => sum + quantity, 0);

  return (
    <div className="bg-white rounded-lg md:border md:border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
        <div className="mt-4 flex items-center space-x-4">
          <button
            onClick={() => setOrderType('pickup')}
            className={`flex items-center space-x-2 ${orderType === 'pickup' ? 'text-orange-500' : 'text-gray-600'}`}
          >
            <ClockIcon size={20} />
            <span>Pickup</span>
          </button>
          <button
            onClick={() => setOrderType('delivery')}
            className={`flex items-center space-x-2 ${orderType === 'delivery' ? 'text-orange-500' : 'text-gray-600'}`}
          >
            <HomeIcon size={20} />
            <span>Delivery</span>
          </button>
        </div>
        {orderType === 'pickup' && (
          <select className="mt-2 p-2 border border-gray-300 rounded-md">
            <option>Select pickup time</option>
            {/* Add time options */}
          </select>
        )}
        {orderType === 'delivery' && (
          <button className="mt-2 p-2 border border-gray-300 rounded-md text-left w-full">
            Select delivery address
          </button>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <MenuCategoryItem
              key={category}
              name={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>

        <div className="space-y-4">
          {menuItems[activeCategory]?.map((item) => (
            <MenuItem
              key={item.name}
              item={item}
              onAddToCart={handleAddToCart}
              quantity={cart[item.name]?.quantity || 0}
            />
          ))}
        </div>
      </div>

      {totalItems > 0 && !showCart && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-4 right-4 bg-orange-500 text-white rounded-full p-3 shadow-lg z-[9999]"
        >
          <ShoppingCartIcon size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {totalItems}
          </span>
        </button>
      )}

      {showCart && (
        <OrderCart
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={handleAddToCart}
        />
      )}
    </div>
  );
};

export default Menu;
