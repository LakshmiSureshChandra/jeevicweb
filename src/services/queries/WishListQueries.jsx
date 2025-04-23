export function useGetWishList() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: useGetWishList,
  });
}
