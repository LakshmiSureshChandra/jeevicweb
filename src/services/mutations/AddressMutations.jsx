import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "../apis/AddressApi";

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createAddress(data),
    onError: (error) => console.log(error),
    onSuccess: (data) => console.log(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["addresses"] });
      }
    },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateAddress(id, data),
    onError: (error) => console.log(error),
    onSuccess: (data) => console.log(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["addresses"] });
        console.log("invalidated");
      }
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteAddress(id),
    onError: (error) => console.log(error, "delete address error"),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["addresses"] });
      }
    },
  });
}
