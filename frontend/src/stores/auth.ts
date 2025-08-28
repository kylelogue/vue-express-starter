import { defineStore } from 'pinia';
import {
  authService,
  type LoginCredentials,
  type RegisterData,
  type User,
  type AuthResponse,
} from '@/services/auth';

export interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    initialized: false,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.user,
    userFullName: (state): string => {
      if (!state.user) return '';
      return `${state.user.firstName} ${state.user.lastName}`;
    },
  },

  actions: {
    async initialize(): Promise<void> {
      if (this.initialized) return;

      this.loading = true;

      try {
        if (authService.isAuthenticated()) {
          await this.getCurrentUser();
        }
      } catch {
        // If getting current user fails, clear auth state
        this.clearAuth();
      } finally {
        this.loading = false;
        this.initialized = true;
      }
    },

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
      this.loading = true;

      try {
        const response = await authService.login(credentials);
        this.user = response.user;
        return response;
      } catch (error) {
        this.clearAuth();
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async register(userData: RegisterData): Promise<AuthResponse> {
      this.loading = true;

      try {
        const response = await authService.register(userData);
        this.user = response.user;
        return response;
      } catch (error) {
        this.clearAuth();
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout(): Promise<void> {
      this.loading = true;

      try {
        await authService.logout();
      } finally {
        this.clearAuth();
        this.loading = false;
      }
    },

    async getCurrentUser(): Promise<User> {
      try {
        const response = await authService.getCurrentUser();
        this.user = response.user;
        return response.user;
      } catch (error) {
        this.clearAuth();
        throw error;
      }
    },

    async refreshToken(): Promise<string> {
      try {
        return await authService.refreshToken();
      } catch (error) {
        this.clearAuth();
        throw error;
      }
    },

    updateUser(userData: Partial<User>): void {
      if (this.user) {
        this.user = { ...this.user, ...userData };
      }
    },

    clearAuth(): void {
      this.user = null;
      if (authService.getAccessToken()) {
        localStorage.removeItem('accessToken');
      }
    },
  },
});
