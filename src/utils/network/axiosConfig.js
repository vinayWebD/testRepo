import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-base-url.com',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
  timeout: 10000, // setting a default timeout
});

export default api;
