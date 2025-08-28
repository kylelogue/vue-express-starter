import bcrypt from 'bcryptjs';
import { prisma } from '../../prisma/client.js';
import { generateTokens, verifyToken } from '../../utils/auth.js';

interface RegisterUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: Date;
}

interface AuthResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}

interface RefreshResponse {
  accessToken: string;
}

export const registerUser = async (userData: RegisterUserData): Promise<AuthResponse> => {
  const { email, password, firstName, lastName } = userData;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
    }
  });

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user.id);

  // Save refresh token
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken }
  });

  return {
    user,
    accessToken,
    refreshToken
  };
};

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { email, password } = credentials;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password);
  
  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user.id);

  // Save refresh token
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken }
  });

  // Return user data without password
  const userResponse: UserResponse = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    createdAt: user.createdAt,
  };

  return {
    user: userResponse,
    accessToken,
    refreshToken
  };
};

export const refreshAccessToken = async (refreshToken: string): Promise<RefreshResponse> => {
  if (!refreshToken) {
    throw new Error('Refresh token required');
  }

  try {
    // Verify refresh token
    const decoded = verifyToken(refreshToken);
    
    // Find user with this refresh token
    const user = await prisma.user.findFirst({
      where: { 
        id: decoded.id,
        refreshToken 
      }
    });

    if (!user) {
      throw new Error('Invalid refresh token');
    }

    // Generate new access token
    const { accessToken } = generateTokens(user.id);

    return { accessToken };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

export const logoutUser = async (refreshToken: string): Promise<void> => {
  if (!refreshToken) {
    return;
  }

  // Clear refresh token from database
  await prisma.user.updateMany({
    where: { refreshToken },
    data: { refreshToken: null }
  });
};