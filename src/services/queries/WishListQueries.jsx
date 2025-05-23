import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "../../lib/api";

export function useGetWishList() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist
  });
}
