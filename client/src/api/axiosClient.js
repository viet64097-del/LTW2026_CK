import axios from 'axios';
import { logout } from '../redux/authSlice';
import { store } from '../redux/store';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    const { token } = store.getState().auth;
    if (token && !config.skipAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { token } = store.getState().auth;
    if (error.response?.status === 401 && token && error.config?.headers?.Authorization === `Bearer ${token}`) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
