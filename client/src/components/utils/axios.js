import axios from "axios";

const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, // ✅ use env for production
  baseURL: "/api", // ✅ use env for production
  withCredentials: true, // ✅ important for cookies
});

export default axiosInstance;
