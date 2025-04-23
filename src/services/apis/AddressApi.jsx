import api from "../../lib/api";

export const createAddress = async (data) => {
  return await api.post("address", data);
};

export const updateAddress = async (id, data) => {
  return await api.patch(`address/${id}`, data);
};

export const getAddresses = async () => {
  return await api.get("address");
};

export const deleteAddress = async (id) => {
  const res = await api.delete(`address/${id}`);
  return res;
};
