import { useMutation } from "@tanstack/react-query";
import { requestAccountAccess, verifyAccountAccess } from "../apis/AuthApi";

export function useRequestAccountAccess() {
  return useMutation({
    mutationFn: (data) => requestAccountAccess(data),
    onSuccess: (data) => console.log(data),
  });
}
export function useVerifyAccountAccess() {
  return useMutation({
    mutationFn: (data) => verifyAccountAccess(data),
    onError: (error) => console.log(error),
    onMutate: (data) => console.log(data),
    onSuccess: (data) => console.log(data),
  });
}
