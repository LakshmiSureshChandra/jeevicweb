import api from "../../lib/api";

export const getGiftOptions = async () => {
  return await api.get("giftoption");
};

export const getGiftOption = async (id) => {
  return await api.get(`giftoption/${id}`);
};
