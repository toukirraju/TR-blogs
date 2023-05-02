import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:9000",
  baseURL: "https://blogpost-server-production.up.railway.app",
});

export default axiosInstance;
