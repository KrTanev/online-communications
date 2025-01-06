import axios from 'axios';

export const commonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const axiosClient = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10 * 1000,
  headers: {
    ...commonHeaders,
  },
});

// ? Before request
axiosClient.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ? After request
axiosClient.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const responseStatusCode = error.response ? error.response.status : null;
    if (responseStatusCode === 401 || responseStatusCode === 403) {
      //   handleLogout() logic;
    }

    return Promise.reject(error);
  },
);
