import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("une erreur est survenue:", error);
    return Promise.reject(new Error(error));
  },
);

export { API_URL };
export default instance;
