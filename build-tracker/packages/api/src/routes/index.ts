/**
 * API Routes
 */

import { Router } from 'express';

import authRoutes from './auth.routes';
import projectRoutes from './project.routes';
import userRoutes from './user.routes';

const router = Router();

// Auth routes
router.use('/auth', authRoutes);

// User routes
router.use('/users', userRoutes);

// Project routes
router.use('/projects', projectRoutes);

export default router;
