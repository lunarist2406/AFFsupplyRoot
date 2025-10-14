import axios from "axios";

const api = axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000, // timeout 5s
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      const token = JSON.parse(user).token; 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
