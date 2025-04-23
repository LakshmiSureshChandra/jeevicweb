import { getOrder, getOrdersByUserID } from "../apis/OrdersApi";

export function useGetOrdersByUserID() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersByUserID,
  });
}

export function useGetOrder(id) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
  });
}
