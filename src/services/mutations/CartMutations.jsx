import { QueryClient, useMutation } from "@tanstack/react-query";
import { addToCart, removeFromCart, updateCart } from "../apis/CartApi";

export function useAddToCart() {
  const queryClient = QueryClient();

  return useMutation({
    mutationFn: (data) => addToCart(data),
    onError: (error) => console.log(error),
    onSuccess: (data) => console.log(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["cart"] });
        console.log("invalidated");
      }
    },
  });
}

export function useUpdateCart() {
  const queryClient = QueryClient();

  return useMutation({
    mutationFn: (data) => updateCart(data),
    onError: (error) => console.log(error),
    onSuccess: (data) => console.log(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["cart"] });
        console.log("invalidated");
      }
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = QueryClient();

  return useMutation({
    mutationFn: (data) => removeFromCart(data),
    onError: (error) => console.log(error),
    onSuccess: (data) => console.log(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["cart"] });
        console.log("invalidated");
      }
    },
  });
}
