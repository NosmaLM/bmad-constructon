/**
 * User Routes
 */

import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, requireAdmin } from '../middleware';

const router = Router();
const controller = new UserController();

// All routes require authentication
router.use(authenticate);

// User profile
router.get('/profile', controller.getProfile);
router.put('/profile', controller.updateProfile);
router.put('/preferences', controller.updatePreferences);
router.put('/avatar', controller.updateAvatar);

// Admin routes
router.get('/', requireAdmin, controller.listUsers);
router.get('/:id', requireAdmin, controller.getUserById);
router.put('/:id', requireAdmin, controller.updateUser);
router.delete('/:id', requireAdmin, controller.deleteUser);

export default router;
