import { QueryClient } from "@tanstack/react-query";
import { addToWishList, removeFromWishList } from "../apis/WishListApi";

export function useAddToWishList() {
  const queryClient = QueryClient();

  return useMutation({
    mutationFn: (data) => addToWishList(data),
    onError: (error) => console.log(error),
    onSuccess: (data) => console.log(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        console.log("invalidated");
      }
    },
  });
}

export function useRemoveFromWishList() {
  const queryClient = QueryClient();

  return useMutation({
    mutationFn: (data) => removeFromWishList(data),
    onError: (error) => console.log(error),
    onSuccess: (data) => console.log(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        console.log("invalidated");
      }
    },
  });
}
