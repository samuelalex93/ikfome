import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


export const login = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getRestaurants = async () => {
  const response = await api.get("/restaurants");
  return response.data;
};

export default api;
