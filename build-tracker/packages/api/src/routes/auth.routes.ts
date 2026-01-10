/**
 * Authentication Routes
 */

import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware';

const router = Router();
const controller = new AuthController();

// Public routes
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/refresh', controller.refreshToken);
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset-password', controller.resetPassword);
router.post('/verify-email', controller.verifyEmail);

// Protected routes
router.get('/me', authenticate, controller.me);
router.post('/logout', authenticate, controller.logout);
router.post('/change-password', authenticate, controller.changePassword);

export default router;
