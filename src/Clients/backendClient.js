import axios from "axios";

export const backendClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});


backendClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("task-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
