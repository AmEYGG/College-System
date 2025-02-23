import axios from 'axios';

// Add a response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Forbidden access
      alert('You do not have permission to access this resource.');
    }
    return Promise.reject(error);
  }
);

export default axios;