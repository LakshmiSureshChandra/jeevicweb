import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetGiftOptions } from '../services/queries/GiftOptionQueries';
import { useNavigate } from 'react-router-dom';

const GiftCard = ({ item, onAddToGift }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
    <p className="text-gray-600 mb-4">{item.description}</p>
    <p className="text-blue-600 font-bold mb-4">₹{item.price.toFixed(2)}</p>
    <button 
      onClick={() => onAddToGift(item)}
      className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
    >
      Add to Gift
    </button>
  </div>
);

const CreateGift = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const { data: eligibleItems, isLoading, error } = useGetGiftOptions();

  const addItemToGift = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  // Calculate total cost
  const totalCost = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.price, 0);
  }, [selectedItems]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleProceedToOrder = () => {
    if (selectedItems.length === 0) {
      alert('Please add items to your gift box');
      return;
    }

    const giftOrderData = {
      products: [{
        name: 'Custom Gift Box',
        price: totalCost,
        quantity: 1,
        items: selectedItems.map(item => ({
          name: item.name,
          price: item.price
        }))
      }]
    };

    navigate('/checkout/order-confirmation', {
      state: { orderData: giftOrderData }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create Custom Gift</h1>
      
      {/* Gift Box */}
      <div className="bg-gray-100 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Gift Box</h2>
        <div className="flex flex-wrap gap-4">
          <AnimatePresence>
            {selectedItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="bg-white p-2 rounded shadow"
              >
                {item.name} - ₹{item.price.toFixed(2)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {selectedItems.length > 0 && (
          <div className="mt-4">
            <p className="text-lg font-semibold">Total Cost: ₹{totalCost.toFixed(2)}</p>
            <button
              onClick={handleProceedToOrder}
              className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Proceed to Order
            </button>
          </div>
        )}
      </div>
      
      {/* Filters */}
      <div className="mb-8">
        {/* Add your filter components here */}
      </div>
      
      {/* Eligible Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {eligibleItems && eligibleItems.map((item) => (
          <GiftCard
            key={item.id}
            item={item}
            onAddToGift={addItemToGift}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateGift;