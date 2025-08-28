import { api } from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface User {
  id: string | number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface UserResponse {
  user: User;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);

    if (response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);
    }

    return response;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', userData);

    if (response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);
    }

    return response;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout', {});
    } finally {
      // Always clear local storage, even if logout request fails
      localStorage.removeItem('accessToken');
    }
  },

  async refreshToken(): Promise<string> {
    try {
      const response = await api.post<{ accessToken: string }>('/auth/refresh', {});

      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        return response.accessToken;
      }

      throw new Error('No access token in refresh response');
    } catch (error) {
      localStorage.removeItem('accessToken');
      throw error;
    }
  },

  async getCurrentUser(): Promise<UserResponse> {
    return api.get<UserResponse>('/auth/me');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  },

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  },
};
