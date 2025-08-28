import { Request, Response, NextFunction } from 'express';
import { getUserProfile, updateUserProfile, changeUserPassword } from './users.service.js';

interface UpdateProfileRequest extends Request {
  body: {
    firstName?: string;
    lastName?: string;
  };
}

interface ChangePasswordRequest extends Request {
  body: {
    currentPassword: string;
    newPassword: string;
  };
}

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await getUserProfile(req.user!.id);
    res.json({ user });
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).json({
        error: {
          message: error.message,
          status: 404
        }
      });
      return;
    }
    next(error);
  }
};

export const updateProfile = async (req: UpdateProfileRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName } = req.body;
    
    const user = await updateUserProfile(req.user!.id, {
      firstName,
      lastName
    });

    res.json({ user });
  } catch (error: any) {
    next(error);
  }
};

export const changePassword = async (req: ChangePasswordRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const result = await changeUserPassword(req.user!.id, {
      currentPassword,
      newPassword
    });

    res.json(result);
  } catch (error: any) {
    if (error.message === 'User not found' || error.message === 'Current password is incorrect') {
      res.status(400).json({
        error: {
          message: error.message,
          status: 400
        }
      });
      return;
    }
    next(error);
  }
};