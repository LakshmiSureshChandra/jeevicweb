import React, { useState, useEffect } from 'react';
import { PlusIcon, MinusIcon, XIcon, ShoppingCartIcon, ClockIcon, HomeIcon } from 'lucide-react';
import { getAddresses } from '../../../lib/api';
import axios from 'axios';

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
  const [activeCategory, setActiveCategory] = useState('');
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [orderType, setOrderType] = useState('pickup');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedPickupTime, setSelectedPickupTime] = useState('');
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories and dishes
  useEffect(() => {
    const fetchCategoriesAndDishes = async () => {
      try {
        setIsLoading(true);
        // Fetch categories
        const categoriesResponse = await axios.get('https://api.jeevic.com/dish/categories');
        const categoriesData = categoriesResponse.data.data;
        setCategories(categoriesData.map(cat => cat.name));
        setActiveCategory(categoriesData[0]?.name || '');

        // Fetch dishes
        const dishesResponse = await axios.get('https://api.jeevic.com/dish/dishes');
        const dishesData = dishesResponse.data.data;

        // Organize dishes by category
        const organizedDishes = categoriesData.reduce((acc, category) => {
          acc[category.name] = dishesData.filter(dish => dish.category_id === category.id);
          return acc;
        }, {});

        setMenuItems(organizedDishes);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch menu data:', err);
        setError('Failed to load menu items');
        setIsLoading(false);
      }
    };

    fetchCategoriesAndDishes();
  }, []);

  // Fetch addresses when component mounts
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getAddresses();
        console.log('Fetched addresses:', response); // Debug log
        setAddresses(response);
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
      }
    };
    fetchAddresses();
  }, []); // Empty dependency array means this runs once on mount

  // Generate pickup time slots
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(3, 0, 0, 0);

    // Round up to next 30-minute interval
    const currentMinutes = now.getMinutes();
    now.setMinutes(currentMinutes + (30 - (currentMinutes % 30)));
    now.setSeconds(0);
    now.setMilliseconds(0);

    let current = now;
    while (current <= tomorrow) {
      slots.push(current.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }));
      current = new Date(current.getTime() + 30 * 60000);
    }
    return slots;
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
          <select
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            value={selectedPickupTime}
            onChange={(e) => setSelectedPickupTime(e.target.value)}
          >
            <option value="">Select pickup time</option>
            {generateTimeSlots().map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        )}
        {orderType === 'delivery' && (
  <div className="mt-2">
    <div className="space-y-4">
      {Array.isArray(addresses) && addresses.map((address) => (
        <div
          key={address.id}
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedAddress === address.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
          }`}
          onClick={() => setSelectedAddress(address.id)}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{address.name}</h3>
              <p className="text-gray-600 mt-1">
                {address.address_line_1}
                {address.address_line_2 !== 'undefined' && `, ${address.address_line_2}`}
              </p>
              <p className="text-gray-600">
                {address.city}, {address.state} - {address.postcode}
              </p>
              <p className="text-gray-600 mt-1">
                Phone: {address.phone_number}
              </p>
            </div>
          </div>
        </div>
      ))}
      {(!addresses || addresses.length === 0) && (
        <p className="text-sm text-gray-500 text-center py-4">
          No saved addresses found. Please add an address in your profile.
        </p>
      )}
    </div>
  </div>
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
              key={item.id}
              item={{
                name: item.name,
                price: item.price,
                photo: item.image_url,
                description: item.description
              }}
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
