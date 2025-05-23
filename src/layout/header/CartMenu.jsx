import React from "react";
import { useGetCart } from "../../services/queries/CartQueries";
import {
  useUpdateCart,
  useRemoveFromCart,
} from "../../services/mutations/CartMutations";
import { useGetProductsByIds } from "../../services/queries/ProductQueries";
import { Link } from "react-router-dom";

const CartMenu = ({ onCheckout }) => {
  const { data: cartData = [], isLoading, error } = useGetCart();

  if (!localStorage.getItem("access_token")) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-600 mb-4">Sign in to sync your cart across devices</p>
        <Link
          to="/sign-in"
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

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

  // Calculate total price
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

  if (isLoading || productsLoading)
    return <div className="p-4">Loading...</div>;
  if (error || productsError)
    return <div className="p-4 text-red-500">Error loading cart</div>;

  return (
    <div className="space-y-4">
      {enrichedCartData.length === 0 ? (
        <div className="p-4 text-center">
          <p className="mb-4 text-gray-500">Your cart is empty</p>
          <Link
            to="/"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div
            className={`space-y-4 ${enrichedCartData.length > 3 ? "max-h-60 overflow-y-auto" : ""}`}
          >
            {enrichedCartData.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={item.product?.image_url[0] || "/placeholder-image.jpg"}
                    alt={item.product?.name || "Product"}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">
                      {item.product?.name || "Unknown Product"}
                    </p>
                    <p className="text-sm text-gray-500">
                      ₹{(Number(item.product?.price) || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.product_id, -1)}
                    className="rounded-full bg-gray-200 px-2 text-lg font-bold hover:bg-gray-300"
                    disabled={updateCartMutation.isPending}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.product_id, 1)}
                    className="rounded-full bg-gray-200 px-2 text-lg font-bold hover:bg-gray-300"
                    disabled={updateCartMutation.isPending}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-2">
            <p className="text-right font-bold">Total:₹{total.toFixed(2)}</p>
          </div>

          <button
            onClick={onCheckout}
            className="w-full rounded-lg bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
            disabled={updateCartMutation.isPending}
          >
            {updateCartMutation.isPending ? "Updating..." : "Checkout"}
          </button>
        </>
      )}
    </div>
  );
};

export default CartMenu;
