import React from "react";
import { useGetWishList } from "../../services/queries/WishListQueries";
import { useRemoveFromWishList } from "../../services/mutations/WishListMutations";
import { useGetProductsByIds } from "../../services/queries/ProductQueries";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const {
    data: wishlistItems = [],
    isLoading: wishlistLoading,
    error,
  } = useGetWishList();
  const removeFromWishList = useRemoveFromWishList();

  const productIds = wishlistItems.map((item) => item.product_id);

  const { data: products = [], isLoading: productsLoading } =
    useGetProductsByIds(productIds);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishList.mutateAsync({ product_id: productId });
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  if (wishlistLoading || productsLoading)
    return <div>Loading your wishlist...</div>;
  if (error) return <div className="text-red-500">Error loading wishlist</div>;

  return (
    <div className="space-y-6">
      <h2 className="mb-6 text-2xl font-semibold">My Wishlist</h2>
      {products.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          Your wishlist is empty
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {products.map((product) => (
            <li key={product.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={product.image_url[0] || "/placeholder-image.jpg"}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <Link to={`/product-page/${product.id}`} className="text-lg font-medium text-gray-900 hover:text-blue-600">
                    {product.name}
                  </Link>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <p className="text-lg font-semibold text-gray-900">₹{product.price.toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromWishlist(product.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
