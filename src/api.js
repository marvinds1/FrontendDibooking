import axios from 'axios';
import { backendEndpoint } from './backend';

const TOKEN_KEY = 'token';

const api = axios.create({
  baseURL: backendEndpoint,
  withCredentials: true,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshing = null;

function refreshAccessToken() {
  if (!refreshing) {
    refreshing = axios
      .post(`${backendEndpoint}/api/user/token`, null, { withCredentials: true })
      .then((res) => {
        localStorage.setItem(TOKEN_KEY, res.data.token);
        return res.data.token;
      })
      .finally(() => {
        refreshing = null;
      });
  }
  return refreshing;
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const isAuthCall = original && original.url && original.url.startsWith('/api/user/');
    if (error.response && error.response.status === 401 && !original._retry && !isAuthCall) {
      original._retry = true;
      try {
        const token = await refreshAccessToken();
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
    return Promise.reject(error);
  },
);

export const errorMessage = (error, fallback) => (
  (error && error.response && error.response.data && error.response.data.message) || fallback
);

export default api;
