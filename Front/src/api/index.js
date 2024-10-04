const API_BASE_PATH = "http://127.0.0.1:2567";

import axios from "axios";

const apiClient = axios.create({
  baseURL: API_BASE_PATH,
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
