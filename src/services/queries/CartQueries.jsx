import { useQuery } from "@tanstack/react-query";
import { getCart } from "../apis/CartApi";

export function useGetCart() {
  return useQuery({ queryKey: ["cart"], queryFn: getCart });
}
