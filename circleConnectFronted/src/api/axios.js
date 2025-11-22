import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_circleConnect,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
