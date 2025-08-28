import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, refresh, logout, me } from './auth.controller.js';
import { authorize } from '../../middleware/authorize.js';
import { validate } from './auth.validators.js';

export const authRoutes = Router();

// Registration
authRoutes.post('/register', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required'),
  validate
], register);

// Login
authRoutes.post('/login', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validate
], login);

// Refresh token
authRoutes.post('/refresh', refresh);

// Logout
authRoutes.post('/logout', logout);

// Get current user
authRoutes.get('/me', authorize, me);