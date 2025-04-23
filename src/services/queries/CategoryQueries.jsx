import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../apis/CategoryApi";

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
