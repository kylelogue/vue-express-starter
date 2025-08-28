import { Request, Response } from 'express';
import { prisma } from '../../prisma/client.js';

interface HealthCheckResponse {
  status: string;
  timestamp: string;
  environment: string | undefined;
  services: {
    database: string;
    api: string;
  };
  error?: string;
}

export const healthCheck = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    const healthResponse: HealthCheckResponse = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      services: {
        database: 'healthy',
        api: 'healthy'
      }
    };

    res.json(healthResponse);
  } catch (error: any) {
    console.error('Health check failed:', error);
    
    const healthResponse: HealthCheckResponse = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      services: {
        database: 'unhealthy',
        api: 'healthy'
      },
      error: error.message
    };

    res.status(503).json(healthResponse);
  }
};