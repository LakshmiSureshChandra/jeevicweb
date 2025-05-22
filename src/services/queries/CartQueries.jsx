import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../lib/api";

export function useGetCart() {
  return useQuery({ queryKey: ["cart"], queryFn: getCart });
}
