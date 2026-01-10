/**
 * Test Application Factory
 * Creates an Express app configured for integration testing
 */

import express, { Application, Request, Response, NextFunction } from 'express';
import { vi } from 'vitest';
import jwt from 'jsonwebtoken';

// Test JWT secret
export const TEST_JWT_SECRET = 'test-jwt-secret-key-for-testing-purposes';

// Mock user data
export const testUsers = {
  admin: {
    id: 'user-admin-123',
    email: 'admin@constructon.co.zw',
    firstName: 'Admin',
    lastName: 'User',
    role: 'ADMIN',
    isActive: true,
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4r5bK.yVGaXxAMVi', // Password123!
  },
  projectManager: {
    id: 'user-pm-123',
    email: 'pm@constructon.co.zw',
    firstName: 'Project',
    lastName: 'Manager',
    role: 'PROJECT_MANAGER',
    isActive: true,
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4r5bK.yVGaXxAMVi',
  },
  client: {
    id: 'user-client-123',
    email: 'client@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'CLIENT',
    isActive: true,
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4r5bK.yVGaXxAMVi',
  },
};

// Mock project data
export const testProjects = {
  active: {
    id: 'project-123',
    name: 'Sunrise Villa - Plot 45',
    description: 'Modern 4-bedroom smart villa',
    status: 'IN_PROGRESS',
    clientId: testUsers.client.id,
    projectManagerId: testUsers.projectManager.id,
    villaTemplateId: 'template-123',
    plotNumber: 'PLT-045',
    plotAddress: '45 Sunrise Estate, Borrowdale',
    totalBudget: 150000,
    amountPaid: 75000,
    progressPercentage: 45,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

/**
 * Generate a JWT token for testing
 */
export function generateToken(user: typeof testUsers.admin): string {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    TEST_JWT_SECRET,
    { expiresIn: '1h' }
  );
}

/**
 * Create mock Prisma client
 */
export function createMockPrisma() {
  return {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
    userProfile: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
    },
    refreshToken: {
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
    },
    project: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
    projectPhase: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    task: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
    milestone: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    payment: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      count: vi.fn(),
    },
    media: {
      findMany: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
    issue: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    message: {
      findMany: vi.fn(),
      create: vi.fn(),
      count: vi.fn(),
    },
    activity: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
    dailyReport: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
  };
}

/**
 * Create test Express application
 */
export function createTestApp(mockPrisma: ReturnType<typeof createMockPrisma>): Application {
  const app = express();

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Auth middleware factory
  const authenticate = async (req: any, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'No token provided' },
        });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, TEST_JWT_SECRET) as any;

      const user = await mockPrisma.user.findUnique({ where: { id: decoded.userId } });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'User not found' },
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Account deactivated' },
        });
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: { code: 'TOKEN_INVALID', message: 'Invalid token' },
      });
    }
  };

  const requireRole = (...roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Not authenticated' },
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          error: { code: 'FORBIDDEN', message: 'Insufficient permissions' },
        });
      }

      next();
    };
  };

  const requireAdmin = requireRole('ADMIN', 'SUPER_ADMIN');
  const requireManager = requireRole('PROJECT_MANAGER', 'ADMIN', 'SUPER_ADMIN');

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // ==================== AUTH ROUTES ====================
  app.post('/api/v1/auth/register', async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' },
        });
      }

      const existing = await mockPrisma.user.findUnique({ where: { email: email.toLowerCase() } });
      if (existing) {
        return res.status(409).json({
          success: false,
          error: { code: 'ALREADY_EXISTS', message: 'Email already registered' },
        });
      }

      const user = await mockPrisma.user.create({
        data: { email: email.toLowerCase(), firstName, lastName },
      });

      const token = generateToken(user);
      const refreshToken = await mockPrisma.refreshToken.create({
        data: { userId: user.id, token: 'refresh-token-123' },
      });

      res.status(201).json({
        success: true,
        data: {
          user: { id: user.id, email: user.email, firstName, lastName, role: user.role },
          tokens: { accessToken: token, refreshToken: refreshToken.token },
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, error: { message: 'Internal error' } });
    }
  });

  app.post('/api/v1/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Email and password required' },
        });
      }

      const user = await mockPrisma.user.findUnique({ where: { email: email.toLowerCase() } });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' },
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Account deactivated' },
        });
      }

      // In real app, would verify password here
      const token = generateToken(user);
      const refreshToken = await mockPrisma.refreshToken.create({
        data: { userId: user.id, token: 'refresh-token-123' },
      });

      res.json({
        success: true,
        data: {
          user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role },
          tokens: { accessToken: token, refreshToken: refreshToken.token },
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, error: { message: 'Internal error' } });
    }
  });

  app.get('/api/v1/auth/me', authenticate, async (req: any, res) => {
    res.json({
      success: true,
      data: { user: req.user },
    });
  });

  app.post('/api/v1/auth/logout', authenticate, async (req: any, res) => {
    await mockPrisma.refreshToken.deleteMany({ where: { userId: req.user.id } });
    res.json({ success: true, data: { message: 'Logged out successfully' } });
  });

  // ==================== USER ROUTES ====================
  app.get('/api/v1/users/profile', authenticate, async (req: any, res) => {
    const profile = await mockPrisma.userProfile.findUnique({ where: { userId: req.user.id } });
    res.json({ success: true, data: { profile } });
  });

  app.put('/api/v1/users/profile', authenticate, async (req: any, res) => {
    const profile = await mockPrisma.userProfile.upsert({
      where: { userId: req.user.id },
      update: req.body,
      create: { userId: req.user.id, ...req.body },
    });
    res.json({ success: true, data: { profile } });
  });

  app.get('/api/v1/users', authenticate, requireAdmin, async (req: any, res) => {
    const users = await mockPrisma.user.findMany({});
    const count = await mockPrisma.user.count({});
    res.json({
      success: true,
      data: {
        items: users,
        pagination: { page: 1, limit: 20, totalItems: count, totalPages: 1 },
      },
    });
  });

  app.get('/api/v1/users/:id', authenticate, requireAdmin, async (req: any, res) => {
    const user = await mockPrisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'User not found' },
      });
    }
    res.json({ success: true, data: { user } });
  });

  app.delete('/api/v1/users/:id', authenticate, requireAdmin, async (req: any, res) => {
    await mockPrisma.user.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: { message: 'User deleted' } });
  });

  // ==================== PROJECT ROUTES ====================
  app.get('/api/v1/projects', authenticate, async (req: any, res) => {
    const projects = await mockPrisma.project.findMany({});
    const count = await mockPrisma.project.count({});
    res.json({
      success: true,
      data: {
        items: projects,
        pagination: { page: 1, limit: 20, totalItems: count, totalPages: 1 },
      },
    });
  });

  app.get('/api/v1/projects/:id', authenticate, async (req: any, res) => {
    const project = await mockPrisma.project.findUnique({ where: { id: req.params.id } });
    if (!project) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Project not found' },
      });
    }
    res.json({ success: true, data: { project } });
  });

  app.post('/api/v1/projects', authenticate, requireManager, async (req: any, res) => {
    const project = await mockPrisma.project.create({ data: req.body });
    res.status(201).json({ success: true, data: { project } });
  });

  app.put('/api/v1/projects/:id', authenticate, requireManager, async (req: any, res) => {
    const project = await mockPrisma.project.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: { project } });
  });

  app.delete('/api/v1/projects/:id', authenticate, requireManager, async (req: any, res) => {
    await mockPrisma.project.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: { message: 'Project deleted' } });
  });

  // Project Tasks
  app.get('/api/v1/projects/:id/tasks', authenticate, async (req: any, res) => {
    const tasks = await mockPrisma.task.findMany({ where: { projectId: req.params.id } });
    const count = await mockPrisma.task.count({ where: { projectId: req.params.id } });
    res.json({
      success: true,
      data: {
        items: tasks,
        pagination: { page: 1, limit: 20, totalItems: count, totalPages: 1 },
      },
    });
  });

  app.post('/api/v1/projects/:id/tasks', authenticate, async (req: any, res) => {
    const task = await mockPrisma.task.create({
      data: { ...req.body, projectId: req.params.id },
    });
    res.status(201).json({ success: true, data: { task } });
  });

  // Project Milestones
  app.get('/api/v1/projects/:id/milestones', authenticate, async (req: any, res) => {
    const milestones = await mockPrisma.milestone.findMany({ where: { projectId: req.params.id } });
    res.json({ success: true, data: { milestones } });
  });

  // Project Payments
  app.get('/api/v1/projects/:id/payments', authenticate, async (req: any, res) => {
    const payments = await mockPrisma.payment.findMany({ where: { projectId: req.params.id } });
    res.json({ success: true, data: { payments } });
  });

  // Project Media
  app.get('/api/v1/projects/:id/media', authenticate, async (req: any, res) => {
    const media = await mockPrisma.media.findMany({ where: { projectId: req.params.id } });
    const count = await mockPrisma.media.count({ where: { projectId: req.params.id } });
    res.json({
      success: true,
      data: {
        items: media,
        pagination: { page: 1, limit: 20, totalItems: count, totalPages: 1 },
      },
    });
  });

  // Project Issues
  app.get('/api/v1/projects/:id/issues', authenticate, async (req: any, res) => {
    const issues = await mockPrisma.issue.findMany({ where: { projectId: req.params.id } });
    res.json({ success: true, data: { issues } });
  });

  app.post('/api/v1/projects/:id/issues', authenticate, async (req: any, res) => {
    const issue = await mockPrisma.issue.create({
      data: { ...req.body, projectId: req.params.id, reportedById: req.user.id },
    });
    res.status(201).json({ success: true, data: { issue } });
  });

  // Project Messages
  app.get('/api/v1/projects/:id/messages', authenticate, async (req: any, res) => {
    const messages = await mockPrisma.message.findMany({ where: { projectId: req.params.id } });
    const count = await mockPrisma.message.count({ where: { projectId: req.params.id } });
    res.json({
      success: true,
      data: {
        items: messages,
        pagination: { page: 1, limit: 50, totalItems: count, totalPages: 1 },
      },
    });
  });

  app.post('/api/v1/projects/:id/messages', authenticate, async (req: any, res) => {
    const message = await mockPrisma.message.create({
      data: { ...req.body, projectId: req.params.id, senderId: req.user.id },
    });
    res.status(201).json({ success: true, data: { message } });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Route not found' },
    });
  });

  // Error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      success: false,
      error: { code: err.code || 'INTERNAL_ERROR', message: err.message },
    });
  });

  return app;
}
