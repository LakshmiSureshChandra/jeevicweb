import React from "react";
import { useGetWishList } from "../../services/queries/WishListQueries";
import { useRemoveFromWishList } from "../../services/mutations/WishListMutations";
import { useGetProductsByIds } from "../../services/queries/ProductQueries";
import ProductCard from "../../components/ProductCard";

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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {console.log(products)}
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              image_url={product.image_url}
              name={product.name}
              price={product.price}
              description={product.description}
              meta_data={product.meta_data}
              onRemoveFromWishlist={() => handleRemoveFromWishlist(product._id)}
              isInWishlist={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
