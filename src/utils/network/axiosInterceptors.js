import api from './axiosConfig';

api.interceptors.request.use(
  (config) => {
    // For instance, add authentication headers
    const token = localStorage.getItem('token'); // adjust based on your auth storage mechanism
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Global error handling logic
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors, maybe redirect to login or refresh token
    }
    return Promise.reject(error);
  },
);
