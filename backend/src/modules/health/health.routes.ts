import { Router } from 'express';
import { healthCheck } from './health.controller.js';

export const healthRoutes = Router();

// Health check endpoint
healthRoutes.get('/', healthCheck);