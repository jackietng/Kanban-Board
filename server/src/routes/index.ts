import { Router, Request, Response } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);

router.use('/api', authenticateToken, apiRoutes);

router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'API is working' });
});

export default router;