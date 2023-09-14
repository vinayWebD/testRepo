import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-base-url.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // setting a default timeout
});

export default api;
