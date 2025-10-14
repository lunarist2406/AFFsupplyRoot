import axios from "axios";

const api = axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // timeout 15s
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor để tự động attach token nếu có
api.interceptors.request.use(
  (config) => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const userData = JSON.parse(authUser);
      const token = userData.data?.backendToken?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
