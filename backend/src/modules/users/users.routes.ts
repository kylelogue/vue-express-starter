import { Router } from 'express';
import { body } from 'express-validator';
import { getProfile, updateProfile, changePassword } from './users.controller.js';
import { authorize } from '../../middleware/authorize.js';
import { validate } from '../auth/auth.validators.js';

export const userRoutes = Router();

// All user routes require authentication
userRoutes.use(authorize);

// Get user profile
userRoutes.get('/profile', getProfile);

// Update user profile
userRoutes.put('/profile', [
  body('firstName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('First name cannot be empty'),
  body('lastName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Last name cannot be empty'),
  validate
], updateProfile);

// Change password
userRoutes.put('/password', [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
  validate
], changePassword);