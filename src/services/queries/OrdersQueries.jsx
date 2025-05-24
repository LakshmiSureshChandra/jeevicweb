import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../../lib/api";

export function useGetOrdersByUserID() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getUserOrders,
  });
}

export function useGetOrder(orderId) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const orders = await getUserOrders();
      const order = orders.find(order => order.id === orderId);
      if (!order) {
        throw new Error(`Order with ID ${orderId} not found`);
      }
      return order;
    },
    enabled: !!orderId,
  });
}
