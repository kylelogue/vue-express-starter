import { api } from './api';
import type { User } from './auth';

export interface ProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ProfileResponse {
  user: User;
}

export const userService = {
  async getProfile(): Promise<ProfileResponse> {
    return api.get<ProfileResponse>('/users/profile');
  },

  async updateProfile(profileData: ProfileData): Promise<ProfileResponse> {
    return api.put<ProfileResponse>('/users/profile', profileData);
  },

  async changePassword(passwordData: PasswordData): Promise<void> {
    return api.put<void>('/users/password', passwordData);
  },
};
