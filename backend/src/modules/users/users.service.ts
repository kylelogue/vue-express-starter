import bcrypt from 'bcryptjs';
import { prisma } from '../../prisma/client.js';

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UpdateUserData {
  firstName?: string;
  lastName?: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
}

interface PasswordChangeResponse {
  message: string;
}

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const updateUserProfile = async (userId: string, updateData: UpdateUserData): Promise<UserProfile> => {
  const { firstName, lastName } = updateData;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  return updatedUser;
};

export const changeUserPassword = async (userId: string, passwordData: PasswordData): Promise<PasswordChangeResponse> => {
  const { currentPassword, newPassword } = passwordData;

  // Get user with password
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Verify current password
  const isValidPassword = await bcrypt.compare(currentPassword, user.password);
  
  if (!isValidPassword) {
    throw new Error('Current password is incorrect');
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // Update password
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword }
  });

  return { message: 'Password updated successfully' };
};