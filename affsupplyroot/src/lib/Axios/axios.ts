import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // timeout 5s
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("backendToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
