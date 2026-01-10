/**
 * Project Controller
 */

import { Response, NextFunction } from 'express';
import { AuthRequest, ApiError } from '../middleware';
import prisma from '../utils/prisma';
import { ERROR_CODES, sanitizePagination } from '@build-tracker/shared';
import { UserRole } from '@prisma/client';

export class ProjectController {
  /**
   * List projects for current user
   */
  listProjects = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { page, limit, offset } = sanitizePagination(req.query);
      const { status } = req.query;
      const user = req.user!;

      const where: any = {};

      // Filter based on user role
      if (user.role === UserRole.CLIENT) {
        where.clientId = user.id;
      } else if (user.role === UserRole.PROJECT_MANAGER) {
        where.projectManagerId = user.id;
      }

      if (status) {
        where.status = status;
      }

      const [projects, totalItems] = await Promise.all([
        prisma.project.findMany({
          where,
          skip: offset,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            client: {
              select: { id: true, firstName: true, lastName: true },
            },
            projectManager: {
              select: { id: true, firstName: true, lastName: true },
            },
            villaTemplate: {
              select: { id: true, name: true, code: true },
            },
          },
        }),
        prisma.project.count({ where }),
      ]);

      res.json({
        success: true,
        data: {
          items: projects,
          pagination: {
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            hasMore: page * limit < totalItems,
          },
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get project by ID
   */
  getProjectById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const project = await prisma.project.findUnique({
        where: { id },
        include: {
          client: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          projectManager: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          villaTemplate: true,
          phases: { orderBy: { orderIndex: 'asc' } },
          _count: {
            select: {
              tasks: true,
              milestones: true,
              payments: true,
              issues: true,
              media: true,
            },
          },
        },
      });

      if (!project) {
        throw new ApiError(404, 'Project not found', ERROR_CODES.NOT_FOUND);
      }

      res.json({
        success: true,
        data: { project },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get project summary
   */
  getProjectSummary = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const project = await prisma.project.findUnique({
        where: { id },
        include: {
          phases: {
            where: { status: 'IN_PROGRESS' },
            take: 1,
          },
          milestones: {
            where: { isCompleted: false },
            orderBy: { targetDate: 'asc' },
            take: 3,
          },
          activities: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
          _count: {
            select: {
              payments: { where: { status: 'PENDING' } },
              issues: { where: { status: 'OPEN' } },
            },
          },
        },
      });

      if (!project) {
        throw new ApiError(404, 'Project not found', ERROR_CODES.NOT_FOUND);
      }

      res.json({
        success: true,
        data: {
          project,
          currentPhase: project.phases[0] || null,
          upcomingMilestones: project.milestones,
          recentActivity: project.activities,
          pendingPayments: project._count.payments,
          openIssues: project._count.issues,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create a new project
   */
  createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        description,
        clientId,
        villaTemplateId,
        plotNumber,
        plotAddress,
        plotSize,
        startDate,
        estimatedEndDate,
        totalBudget,
        currency,
        coordinates,
      } = req.body;

      const project = await prisma.project.create({
        data: {
          name,
          description,
          clientId: clientId || req.user!.id,
          projectManagerId: req.user!.id,
          villaTemplateId,
          plotNumber,
          plotAddress,
          plotSize,
          startDate: startDate ? new Date(startDate) : undefined,
          estimatedEndDate: estimatedEndDate ? new Date(estimatedEndDate) : undefined,
          totalBudget,
          currency: currency || 'USD',
          latitude: coordinates?.latitude,
          longitude: coordinates?.longitude,
        },
        include: {
          client: {
            select: { id: true, firstName: true, lastName: true },
          },
        },
      });

      res.status(201).json({
        success: true,
        data: { project },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update project
   */
  updateProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const project = await prisma.project.update({
        where: { id },
        data: updateData,
      });

      res.json({
        success: true,
        data: { project },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete project
   */
  deleteProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await prisma.project.delete({ where: { id } });

      res.json({
        success: true,
        data: { message: 'Project deleted successfully' },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  // Phase methods
  getPhases = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const phases = await prisma.projectPhase.findMany({
        where: { projectId: id },
        orderBy: { orderIndex: 'asc' },
      });
      res.json({ success: true, data: { phases }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  createPhase = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const phase = await prisma.projectPhase.create({
        data: { ...req.body, projectId: id },
      });
      res.status(201).json({ success: true, data: { phase }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  updatePhase = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { phaseId } = req.params;
      const phase = await prisma.projectPhase.update({
        where: { id: phaseId },
        data: req.body,
      });
      res.json({ success: true, data: { phase }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  // Task methods
  getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { page, limit, offset } = sanitizePagination(req.query);
      const [tasks, totalItems] = await Promise.all([
        prisma.task.findMany({
          where: { projectId: id },
          skip: offset,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: { assignee: { select: { id: true, firstName: true, lastName: true } } },
        }),
        prisma.task.count({ where: { projectId: id } }),
      ]);
      res.json({
        success: true,
        data: { items: tasks, pagination: { page, limit, totalItems, totalPages: Math.ceil(totalItems / limit), hasMore: page * limit < totalItems } },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const task = await prisma.task.create({
        data: { ...req.body, projectId: id },
      });
      res.status(201).json({ success: true, data: { task }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const task = await prisma.task.update({
        where: { id: taskId },
        data: req.body,
      });
      res.json({ success: true, data: { task }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      await prisma.task.delete({ where: { id: taskId } });
      res.json({ success: true, data: { message: 'Task deleted' }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  // Milestone methods
  getMilestones = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const milestones = await prisma.milestone.findMany({
        where: { projectId: id },
        orderBy: { targetDate: 'asc' },
      });
      res.json({ success: true, data: { milestones }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  createMilestone = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const milestone = await prisma.milestone.create({
        data: { ...req.body, projectId: id },
      });
      res.status(201).json({ success: true, data: { milestone }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  updateMilestone = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { milestoneId } = req.params;
      const milestone = await prisma.milestone.update({
        where: { id: milestoneId },
        data: req.body,
      });
      res.json({ success: true, data: { milestone }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  // Payment methods
  getPayments = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const payments = await prisma.payment.findMany({
        where: { projectId: id },
        orderBy: { dueDate: 'asc' },
      });
      res.json({ success: true, data: { payments }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  createPayment = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const count = await prisma.payment.count({ where: { projectId: id } });
      const invoiceNumber = `INV-${id.slice(0, 8).toUpperCase()}-${(count + 1).toString().padStart(3, '0')}`;
      const payment = await prisma.payment.create({
        data: { ...req.body, projectId: id, invoiceNumber },
      });
      res.status(201).json({ success: true, data: { payment }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  recordPayment = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { paymentId } = req.params;
      const payment = await prisma.payment.update({
        where: { id: paymentId },
        data: { ...req.body, status: 'COMPLETED', paidAt: new Date() },
      });
      res.json({ success: true, data: { payment }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  // Media methods
  getMedia = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { page, limit, offset } = sanitizePagination(req.query);
      const [media, totalItems] = await Promise.all([
        prisma.media.findMany({
          where: { projectId: id },
          skip: offset,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.media.count({ where: { projectId: id } }),
      ]);
      res.json({
        success: true,
        data: { items: media, pagination: { page, limit, totalItems, totalPages: Math.ceil(totalItems / limit), hasMore: page * limit < totalItems } },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  getUploadUrl = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // TODO: Implement S3 presigned URL generation
      res.json({
        success: true,
        data: { uploadUrl: '', mediaId: '', expiresAt: '' },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  deleteMedia = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { mediaId } = req.params;
      await prisma.media.delete({ where: { id: mediaId } });
      res.json({ success: true, data: { message: 'Media deleted' }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  // Issue methods
  getIssues = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const issues = await prisma.issue.findMany({
        where: { projectId: id },
        orderBy: { createdAt: 'desc' },
        include: {
          reportedBy: { select: { id: true, firstName: true, lastName: true } },
          assignedTo: { select: { id: true, firstName: true, lastName: true } },
        },
      });
      res.json({ success: true, data: { issues }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  createIssue = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const issue = await prisma.issue.create({
        data: { ...req.body, projectId: id, reportedById: req.user!.id },
      });
      res.status(201).json({ success: true, data: { issue }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  updateIssue = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { issueId } = req.params;
      const issue = await prisma.issue.update({
        where: { id: issueId },
        data: req.body,
      });
      res.json({ success: true, data: { issue }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  // Message methods
  getMessages = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { page, limit, offset } = sanitizePagination(req.query);
      const [messages, totalItems] = await Promise.all([
        prisma.message.findMany({
          where: { projectId: id },
          skip: offset,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: { sender: { select: { id: true, firstName: true, lastName: true, avatarUrl: true } } },
        }),
        prisma.message.count({ where: { projectId: id } }),
      ]);
      res.json({
        success: true,
        data: { items: messages, pagination: { page, limit, totalItems, totalPages: Math.ceil(totalItems / limit), hasMore: page * limit < totalItems } },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  sendMessage = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const message = await prisma.message.create({
        data: { ...req.body, projectId: id, senderId: req.user!.id },
        include: { sender: { select: { id: true, firstName: true, lastName: true } } },
      });
      res.status(201).json({ success: true, data: { message }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  // Activity methods
  getActivity = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { page, limit, offset } = sanitizePagination(req.query);
      const [activities, totalItems] = await Promise.all([
        prisma.activity.findMany({
          where: { projectId: id },
          skip: offset,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.activity.count({ where: { projectId: id } }),
      ]);
      res.json({
        success: true,
        data: { items: activities, pagination: { page, limit, totalItems, totalPages: Math.ceil(totalItems / limit), hasMore: page * limit < totalItems } },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  // Daily Report methods
  getDailyReports = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const reports = await prisma.dailyReport.findMany({
        where: { projectId: id },
        orderBy: { date: 'desc' },
        include: { submittedBy: { select: { id: true, firstName: true, lastName: true } } },
      });
      res.json({ success: true, data: { reports }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };

  createDailyReport = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const report = await prisma.dailyReport.create({
        data: { ...req.body, projectId: id, submittedById: req.user!.id },
      });
      res.status(201).json({ success: true, data: { report }, timestamp: new Date().toISOString() });
    } catch (error) {
      next(error);
    }
  };
}
