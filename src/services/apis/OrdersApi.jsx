import api from "../../lib/api";

export const getOrdersByUserID = async () => {
  return await api.get("order/user");
};

export const getOrder = async (id) => {
  return await api.get(`order/i/${id}`);
};

export const createOrder = async (data) => {
  return await api.post("order", data);
};
