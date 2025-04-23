import api from "../../lib/api";

export const requestAccountAccess = async (data) => {
  return await api.post("auth/login-request", data);
};

export const verifyAccountAccess = async (data) => {
  try {
    const response = await api.post("auth/verify-account-access", data);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
};
