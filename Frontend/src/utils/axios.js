import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_Backend_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to add auth token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;