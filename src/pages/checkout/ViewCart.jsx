import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetCart } from "../../services/queries/CartQueries";
import {
  useUpdateCart,
  useRemoveFromCart,
} from "../../services/mutations/CartMutations";
import { useGetProductsByIds } from "../../services/queries/ProductQueries";
import CartItem from "../../components/CartItem";
import { Link } from "react-router-dom";

const ViewCart = () => {
  const navigate = useNavigate();
  const { data: cartData = [], isLoading } = useGetCart();
  const updateCartMutation = useUpdateCart();
  const removeCartMutation = useRemoveFromCart();

  // Get product IDs from cart
  const productIds = cartData.map((item) => item.product_id);

  // Fetch products by IDs
  const {
    data: productData = [],
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsByIds(productIds);

  // Map product data for easy lookup
  const productMap = new Map(
    productData.map((product) => [product.id, product]),
  );

  // Combine cart items with corresponding product info
  const enrichedCartData = cartData.map((item) => ({
    ...item,
    product: productMap.get(item.product_id),
  }));

  const total = enrichedCartData.reduce((sum, item) => {
    const price = Number(item.product?.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  const handleUpdateQuantity = async (productId, change) => {
    const item = cartData.find((item) => item.product_id === productId);
    if (!item) return;

    const newQuantity = item.quantity + change;

    try {
      if (newQuantity <= 0) {
        await removeCartMutation.mutateAsync({ product_id: productId });
      } else {
        await updateCartMutation.mutateAsync({
          product_id: productId,
          quantity: newQuantity,
        });
      }
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeCartMutation.mutateAsync({ product_id: productId });
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  if (isLoading || productsLoading)
    return <div className="container mx-auto p-4">Loading...</div>;
  if (productsError)
    return (
      <div className="container mx-auto p-4 text-red-500">
        Error loading products
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-2/3">
          {enrichedCartData.length === 0 ? (
            <div className="py-8 text-center">
              <p className="mb-4 text-gray-500">Your cart is empty</p>
              <Link
                to="/"
                className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enrichedCartData.map((item) => (
                <CartItem
                  key={item.product_id}
                  item={{
                    id: item.product_id,
                    name: item.product?.name,
                    price: item.product?.price,
                    image: item.product?.image_url,
                    quantity: item.quantity,
                  }}
                  updateQuantity={handleUpdateQuantity}
                  removeItem={handleRemoveItem}
                />
              ))}
            </div>
          )}
        </div>
        {enrichedCartData.length > 0 && (
          <div className="lg:w-1/3">
            <div className="rounded-lg bg-gray-50 p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
              <div className="mb-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="mt-2 border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout/confirmation")}
                className="w-full rounded-lg bg-blue-600 py-3 text-white transition-colors hover:bg-blue-700"
                disabled={enrichedCartData.length === 0}
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
