import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addToWishlist, removeFromWishlist } from "../../lib/api";

export function useAddToWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addToWishlist(data),
    onError: (error) => console.error(error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    }
  });
}

export function useRemoveFromWishList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => removeFromWishlist(data),
    onError: (error) => console.error(error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    }
  });
}
