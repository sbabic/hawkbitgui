import axios from 'axios';
import { signOut } from 'next-auth/react';

const axiosInstance = axios.create({
  baseURL: '/api/hawkbit',
  headers: {
    Accept: 'application/json, application/hal+json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      signOut({ callbackUrl: '/login?error=unauthorized' });
    }
    return response;
  },
  (error) => {
    if (error.status === 401) {
      signOut({ callbackUrl: '/login?error=unauthorized' });
    }
    if (error.response) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      exceptionClass: 'NetworkError',
      errorCode: error.code || 'UNKNOWN_ERROR',
      message: error.message || 'An unexpected error occurred',
    });
  }
);

export default axiosInstance;
