import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "../apis/AddressApi";

export function useGetAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });
}
