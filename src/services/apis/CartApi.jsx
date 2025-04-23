import api from "../../lib/api";

export const addToCart = async (data) => {
  return await api.post("cart", data);
};

export const updateCart = async (data) => {
  return await api.patch("cart", data);
};

export const removeFromCart = async () => {
  return await api.delete("cart");
};

export const getCart = async () => {
  return await api.get("cart");
};
