import React from 'react';

const CartMenu = ({ cartItems, updateQuantity, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="space-y-4">
      <div className={`space-y-4 ${cartItems.length > 3 ? 'max-h-60 overflow-y-auto' : ''}`}>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => updateQuantity(item.id, -1)} className="px-2  rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold">
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)} className="px-2 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t pt-2">
        <p className="font-bold text-right">Total: ${total.toFixed(2)}</p>
      </div>
      <button 
        onClick={onCheckout}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartMenu;