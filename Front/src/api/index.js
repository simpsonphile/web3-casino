import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const auth = (address, signature, message) =>
  apiClient.post(`/auth`, {
    address,
    signature,
    message,
  });

export const checkIfAddressExist = () => apiClient.get(`/check-wallet-address`);

export const registerNickname = (nickname) =>
  apiClient.post(`/register-nickname`, { nickname });

export const logOut = () => apiClient.post("/log-out");
