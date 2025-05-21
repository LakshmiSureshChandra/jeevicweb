import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { useGetGiftOptions } from '../services/queries/GiftOptionQueries';

const CreateGift = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { data: eligibleItems, isLoading, error } = useGetGiftOptions();

  const addItemToGift = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
                {item.name}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {selectedItems.length > 0 && (
          <Link
            to="/order-confirmation"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Proceed to Order
          </Link>
        )}
      </div>
      
      {/* Filters */}
      <div className="mb-8">
        {/* Add your filter components here */}
      </div>
      
      {/* Eligible Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {eligibleItems && eligibleItems.map((item) => (
          <ProductCard
            key={item.id}
            {...item}
            onAddToGift={() => addItemToGift(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateGift;