/**
 * Authentication Store
 */

import type { User, AuthTokens } from '@build-tracker/shared';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

import { api } from '@/services/api';


interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;

  // Actions
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

const TOKEN_KEY = 'auth_tokens';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,

  initialize: async () => {
    try {
      const tokensJson = await SecureStore.getItemAsync(TOKEN_KEY);

      if (tokensJson) {
        const tokens = JSON.parse(tokensJson) as AuthTokens;
        api.setAuthToken(tokens.accessToken);

        // Fetch current user
        const response = await api.get('/auth/me');
        const user = response.data.data.user;

        set({
          user,
          tokens,
          isAuthenticated: true,
          isInitialized: true,
        });
      } else {
        set({ isInitialized: true });
      }
    } catch (error) {
      // Token invalid or expired, clear storage
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      set({ isInitialized: true });
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });

    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, tokens } = response.data.data;

      // Store tokens securely
      await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(tokens));

      // Set auth header
      api.setAuthToken(tokens.accessToken);

      set({
        user,
        tokens,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true });

    try {
      const response = await api.post('/auth/register', data);
      const { user, tokens } = response.data.data;

      // Store tokens securely
      await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(tokens));

      // Set auth header
      api.setAuthToken(tokens.accessToken);

      set({
        user,
        tokens,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore errors on logout
    }

    // Clear stored tokens
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    // Clear auth header
    api.setAuthToken(null);

    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
    });
  },

  refreshToken: async () => {
    const { tokens } = get();

    if (!tokens?.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await api.post('/auth/refresh', {
        refreshToken: tokens.refreshToken,
      });

      const newTokens = response.data.data.tokens;

      // Update stored tokens
      await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(newTokens));

      // Set new auth header
      api.setAuthToken(newTokens.accessToken);

      set({ tokens: newTokens });
    } catch (error) {
      // Refresh failed, logout
      await get().logout();
      throw error;
    }
  },

  updateUser: (userData: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null,
    }));
  },
}));
