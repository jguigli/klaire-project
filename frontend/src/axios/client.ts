import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const apiURL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: apiURL,
  timeout: 120000, // timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


export default instance;