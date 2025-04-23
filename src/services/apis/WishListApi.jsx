import api from "../../lib/api";

export const getWishList = async () => {
  return await api.get("wishlist");
};

export const addToWishList = async (id) => {
  return await api.post("wishlist", id);
};

export const removeFromWishList = async (id) => {
  return await api.delete("wishlist", id);
};
