import { useQuery } from "@tanstack/react-query";
import { getProductsByIds } from "../../lib/api";

export function useGetProductsByIds(productIds) {
  return useQuery({
    queryKey: ["products-by-ids", productIds],
    queryFn: () => getProductsByIds(productIds),
    enabled: productIds.length > 0, // avoid firing if no ids
  });
}
