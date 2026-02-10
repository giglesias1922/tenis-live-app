import axios, { AxiosError } from "axios";
import { ENV } from "./env";

export const api = axios.create({
  baseURL: `${ENV.API_BASE_URL}/api`,
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      console.log("GLOBAL STATUS:", error.response?.status);
      console.log("GLOBAL DATA:", error.response?.data);
    }
    return Promise.reject(error);
  }
);