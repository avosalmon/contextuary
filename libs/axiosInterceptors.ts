import axios from "axios";

axios.interceptors.request.use(
  async (config) => {
    config.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
