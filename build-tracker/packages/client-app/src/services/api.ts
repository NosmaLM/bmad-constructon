/**
 * API Service
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';

// API base URL from environment or default
const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000/api/v1';

class ApiService {
  private client: AxiosInstance;
  private authToken: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.authToken) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Handle specific error codes
        if (error.response?.status === 401) {
          // Token expired or invalid
          // The auth store will handle refresh
        }
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token: string | null) {
    this.authToken = token;
  }

  get(url: string, params?: object) {
    return this.client.get(url, { params });
  }

  post(url: string, data?: object) {
    return this.client.post(url, data);
  }

  put(url: string, data?: object) {
    return this.client.put(url, data);
  }

  patch(url: string, data?: object) {
    return this.client.patch(url, data);
  }

  delete(url: string) {
    return this.client.delete(url);
  }
}

export const api = new ApiService();
export default api;
