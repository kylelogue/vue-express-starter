import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, refreshAccessToken, logoutUser } from './auth.service.js';

interface RegisterRequest extends Request {
  body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const register = async (req: RegisterRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const result = await registerUser({
      email,
      password,
      firstName,
      lastName
    });

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      user: result.user,
      accessToken: result.accessToken
    });
  } catch (error: any) {
    if (error.message === 'User with this email already exists') {
      res.status(409).json({
        error: {
          message: error.message,
          status: 409
        }
      });
      return;
    }
    next(error);
  }
};

export const login = async (req: LoginRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const result = await loginUser({ email, password });

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      user: result.user,
      accessToken: result.accessToken
    });
  } catch (error: any) {
    if (error.message === 'Invalid email or password') {
      res.status(401).json({
        error: {
          message: error.message,
          status: 401
        }
      });
      return;
    }
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken as string;

    const result = await refreshAccessToken(refreshToken);

    res.json({
      accessToken: result.accessToken
    });
  } catch (error: any) {
    res.status(401).json({
      error: {
        message: error.message,
        status: 401
      }
    });
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken as string;
    
    await logoutUser(refreshToken);

    // Clear refresh token cookie
    res.clearCookie('refreshToken');

    res.json({
      message: 'Logged out successfully'
    });
  } catch (error: any) {
    next(error);
  }
};

export const me = async (req: Request, res: Response): Promise<void> => {
  // User is available from the authorize middleware
  res.json({
    user: req.user
  });
};