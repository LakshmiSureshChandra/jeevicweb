import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../apis/OrdersApi";

export function useCreateOrder() {
  return useMutation({
    mutationFn: (data) => createOrder(data),
    onError: (error) => console.log(error),
    onSuccess: (data) => console.log(data),
  });
}
