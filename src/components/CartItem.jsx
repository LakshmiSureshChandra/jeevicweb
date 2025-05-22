import React from 'react';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  // Add null checks and default values
  const price = Number(item?.price) || 0;
  const quantity = Number(item?.quantity) || 0;
  const name = item?.name || 'Unknown Product';
  const image = item?.image || '/placeholder-image.jpg';
  const id = item?.id;

  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div className="flex items-center space-x-4">
        <img src={image} alt={name} className="w-16 h-16 object-cover rounded" />
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => updateQuantity(id, -1)}
            className="px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
            disabled={!id}
          >
            -
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button 
            onClick={() => updateQuantity(id, 1)}
            className="px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
            disabled={!id}
          >
            +
          </button>
        </div>
        <button 
          onClick={() => removeItem(id)}
          className="text-red-500 hover:text-red-700"
          disabled={!id}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;