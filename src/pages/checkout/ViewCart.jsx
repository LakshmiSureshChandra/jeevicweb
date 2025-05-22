import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCart } from '../../services/queries/CartQueries';
import { useUpdateCart, useRemoveFromCart } from '../../services/mutations/CartMutations';
import CartItem from '../../components/CartItem';
import { Link } from 'react-router-dom';

const ViewCart = () => {
  const navigate = useNavigate();
  const { data: cartData = [], isLoading } = useGetCart();
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

  const handleRemoveItem = async (productId) => {
    try {
      await removeCartMutation.mutateAsync(productId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  if (isLoading) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {cartData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link 
                to="/" 
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartData.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={handleUpdateQuantity}
                  removeItem={handleRemoveItem}
                />
              ))}
            </div>
          )}
        </div>
        {cartData.length > 0 && (
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/checkout/confirmation')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                disabled={cartData.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCart;
