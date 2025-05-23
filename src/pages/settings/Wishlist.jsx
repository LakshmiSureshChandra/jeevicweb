import React from 'react';
import { useGetWishList } from '../../services/queries/WishListQueries';
import { useRemoveFromWishList } from '../../services/mutations/WishListMutations';
import ProductCard from '../../components/ProductCard';

const Wishlist = () => {
  const { data: wishlistItems = [], isLoading, error } = useGetWishList();
  const removeFromWishList = useRemoveFromWishList();

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishList.mutateAsync({ product_id: productId });
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  if (isLoading) return <div>Loading your wishlist...</div>;
  if (error) return <div className="text-red-500">Error loading wishlist</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Your wishlist is empty
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.map((item) => (
            <ProductCard
              key={item.product_id}
              id={item.product_id}
              image={item.image_url}
              name={item.name}
              price={item.price}
              description={item.description}
              onRemoveFromWishlist={() => handleRemoveFromWishlist(item.product_id)}
              isInWishlist={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;