import React from 'react';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  // Handle array of image URLs
  const imageUrl = Array.isArray(item?.image) ? item.image[0] : item.image;
  
  // Add null checks and default values
  const price = Number(item?.price) || 0;
  const quantity = Number(item?.quantity) || 0;
  const name = item?.name || '';
  const image = imageUrl || '/placeholder-image.jpg';
  const id = item?.id;

  if (!name) return null; // Don't render invalid items

  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div className="flex items-center space-x-4">
        <img 
          src={image} 
          alt={name} 
          className="w-16 h-16 object-cover rounded" 
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-gray-500">₹{price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => updateQuantity(id, -1)}
            className="px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={!id || quantity <= 1}
          >
            -
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button 
            onClick={() => updateQuantity(id, 1)}
            className="px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={!id}
          >
            +
          </button>
        </div>
        <button 
          onClick={() => removeItem(id)}
          className="text-red-500 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed"
          disabled={!id}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;