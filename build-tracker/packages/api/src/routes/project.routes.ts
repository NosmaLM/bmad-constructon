/**
 * Project Routes
 */

import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authenticate, requireManager } from '../middleware';

const router = Router();
const controller = new ProjectController();

// All routes require authentication
router.use(authenticate);

// Project CRUD
router.get('/', controller.listProjects);
router.get('/:id', controller.getProjectById);
router.get('/:id/summary', controller.getProjectSummary);
router.post('/', requireManager, controller.createProject);
router.put('/:id', requireManager, controller.updateProject);
router.delete('/:id', requireManager, controller.deleteProject);

// Phases
router.get('/:id/phases', controller.getPhases);
router.post('/:id/phases', requireManager, controller.createPhase);
router.put('/:id/phases/:phaseId', requireManager, controller.updatePhase);

// Tasks
router.get('/:id/tasks', controller.getTasks);
router.post('/:id/tasks', controller.createTask);
router.put('/:id/tasks/:taskId', controller.updateTask);
router.delete('/:id/tasks/:taskId', requireManager, controller.deleteTask);

// Milestones
router.get('/:id/milestones', controller.getMilestones);
router.post('/:id/milestones', requireManager, controller.createMilestone);
router.put('/:id/milestones/:milestoneId', requireManager, controller.updateMilestone);

// Payments
router.get('/:id/payments', controller.getPayments);
router.post('/:id/payments', requireManager, controller.createPayment);
router.put('/:id/payments/:paymentId/record', requireManager, controller.recordPayment);

// Media
router.get('/:id/media', controller.getMedia);
router.post('/:id/media/upload-url', controller.getUploadUrl);
router.delete('/:id/media/:mediaId', controller.deleteMedia);

// Issues
router.get('/:id/issues', controller.getIssues);
router.post('/:id/issues', controller.createIssue);
router.put('/:id/issues/:issueId', controller.updateIssue);

// Messages
router.get('/:id/messages', controller.getMessages);
router.post('/:id/messages', controller.sendMessage);

// Activity
router.get('/:id/activity', controller.getActivity);

// Daily Reports
router.get('/:id/reports', controller.getDailyReports);
router.post('/:id/reports', controller.createDailyReport);

export default router;
