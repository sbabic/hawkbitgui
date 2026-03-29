import axios from 'axios';
import { signOut } from 'next-auth/react';

const UNAUTHORIZED_CALLBACK_URL = '/login?error=unauthorized';
let isSigningOut = false;

const signOutOnUnauthorized = () => {
  if (isSigningOut) {
    return;
  }

  isSigningOut = true;
  void signOut({ callbackUrl: UNAUTHORIZED_CALLBACK_URL });
};

const axiosInstance = axios.create({
  baseURL: '/api/hawkbit',
  headers: {
    Accept: 'application/json, application/hal+json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      signOutOnUnauthorized();
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
