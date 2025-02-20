import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  user: {
    id: string;
    email: string;
    role: string;
  }
}

const getUserFromToken = (): { id: string } | null => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return { id: decoded.user.id };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_Backend_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export { api as default, getUserFromToken };