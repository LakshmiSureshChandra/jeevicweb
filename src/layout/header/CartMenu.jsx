import React from 'react';
import { useGetCart } from '../../services/queries/CartQueries';
import { useUpdateCart, useRemoveFromCart } from '../../services/mutations/CartMutations';
import { Link } from 'react-router-dom';

const CartMenu = ({ onCheckout }) => {
  const { data: cartData = [], isLoading, error } = useGetCart();
  const updateCartMutation = useUpdateCart();
  const removeCartMutation = useRemoveFromCart();

  const total = cartData.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    const quantity = Number(item?.quantity) || 0;
    return sum + (price * quantity);
  }, 0);

  const handleUpdateQuantity = async (productId, change) => {
    const item = cartData.find(item => item.id === productId);
    if (!item) return;
    
    const newQuantity = item.quantity + change;
    
    try {
      if (newQuantity <= 0) {
        await removeCartMutation.mutateAsync(productId);
      } else {
        await updateCartMutation.mutateAsync({
          product_id: productId,
          quantity: newQuantity
        });
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading cart</div>;

  return (
    <div className="space-y-4">
      {cartData.length === 0 ? (
        <div className="p-4 text-center">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className={`space-y-4 ${cartData.length > 3 ? 'max-h-60 overflow-y-auto' : ''}`}>
            {cartData.map((item) => (
              <div key={item?.id || Math.random()} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img 
                    src={item?.image || '/placeholder-image.jpg'} 
                    alt={item?.name || 'Product'} 
                    className="w-12 h-12 object-cover rounded" 
                  />
                  <div>
                    <p className="font-medium">{item?.name || 'Unknown Product'}</p>
                    <p className="text-sm text-gray-500">
                      ${(Number(item?.price) || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleUpdateQuantity(item?.id, -1)} 
                    className="px-2 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                    disabled={!item?.id || updateCartMutation.isPending}
                  >
                    -
                  </button>
                  <span>{item?.quantity || 0}</span>
                  <button 
                    onClick={() => handleUpdateQuantity(item?.id, 1)} 
                    className="px-2 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                    disabled={!item?.id || updateCartMutation.isPending}
                  >
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
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            disabled={updateCartMutation.isPending}
          >
            {updateCartMutation.isPending ? 'Updating...' : 'Checkout'}
          </button>
        </>
      )}
    </div>
  );
};

export default CartMenu;