/**
 * Project Controller Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ProjectController } from '../../controllers/project.controller';
import prisma from '../../utils/prisma';
import {
  mockUsers,
  mockProjects,
  mockTasks,
  createMockAuthRequest,
  createMockResponse,
  createMockNext,
  createPaginationQuery,
} from '../utils';

describe('ProjectController', () => {
  let projectController: ProjectController;

  beforeEach(() => {
    projectController = new ProjectController();
    vi.clearAllMocks();
  });

  describe('listProjects', () => {
    it('should list projects for admin', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        query: createPaginationQuery(),
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.project.findMany).mockResolvedValue([
        mockProjects.active,
        mockProjects.completed,
      ] as any);
      vi.mocked(prisma.project.count).mockResolvedValue(2);

      await projectController.listProjects(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
      expect(response.data.items).toHaveLength(2);
    });

    it('should filter projects by client for CLIENT role', async () => {
      const req = createMockAuthRequest(mockUsers.client, {
        query: createPaginationQuery(),
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.project.findMany).mockResolvedValue([mockProjects.active] as any);
      vi.mocked(prisma.project.count).mockResolvedValue(1);

      await projectController.listProjects(req as any, res as any, next);

      expect(prisma.project.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ clientId: mockUsers.client.id }),
        })
      );
    });

    it('should filter projects by status', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        query: { ...createPaginationQuery(), status: 'IN_PROGRESS' },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.project.findMany).mockResolvedValue([mockProjects.active] as any);
      vi.mocked(prisma.project.count).mockResolvedValue(1);

      await projectController.listProjects(req as any, res as any, next);

      expect(prisma.project.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ status: 'IN_PROGRESS' }),
        })
      );
    });
  });

  describe('getProjectById', () => {
    it('should return project with details', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        params: { id: mockProjects.active.id },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.project.findUnique).mockResolvedValue({
        ...mockProjects.active,
        client: mockUsers.client,
        projectManager: mockUsers.projectManager,
        villaTemplate: { id: 'template-123', name: 'Modern Villa' },
        phases: [],
        _count: { tasks: 5, milestones: 3, payments: 2, issues: 1, media: 10 },
      } as any);

      await projectController.getProjectById(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
      expect(response.data.project.id).toBe(mockProjects.active.id);
    });

    it('should return 404 for non-existent project', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        params: { id: 'non-existent-id' },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.project.findUnique).mockResolvedValue(null);

      await projectController.getProjectById(req as any, res as any, next);

      expect(next).toHaveBeenCalled();
      const error = next.mock.calls[0][0];
      expect(error.statusCode).toBe(404);
    });
  });

  describe('getProjectSummary', () => {
    it('should return project summary', async () => {
      const req = createMockAuthRequest(mockUsers.client, {
        params: { id: mockProjects.active.id },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.project.findUnique).mockResolvedValue({
        ...mockProjects.active,
        phases: [{ id: 'phase-1', name: 'Foundation', status: 'IN_PROGRESS' }],
        milestones: [{ id: 'ms-1', name: 'Foundation Complete' }],
        activities: [{ id: 'act-1', description: 'Work started' }],
        _count: { payments: 1, issues: 2 },
      } as any);

      await projectController.getProjectSummary(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
      expect(response.data.currentPhase).toBeDefined();
      expect(response.data.upcomingMilestones).toBeDefined();
    });
  });

  describe('createProject', () => {
    it('should create a new project', async () => {
      const req = createMockAuthRequest(mockUsers.projectManager, {
        body: {
          name: 'New Villa Project',
          description: 'Test project',
          clientId: mockUsers.client.id,
          villaTemplateId: 'template-123',
          plotNumber: 'PLT-100',
          plotAddress: '100 Test Street',
          plotSize: 500,
          startDate: '2024-07-01',
          estimatedEndDate: '2025-06-30',
          totalBudget: 120000,
          currency: 'USD',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.project.create).mockResolvedValue({
        id: 'new-project-123',
        name: 'New Villa Project',
        clientId: mockUsers.client.id,
        client: mockUsers.client,
      } as any);

      await projectController.createProject(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
      expect(response.data.project.name).toBe('New Villa Project');
    });
  });

  describe('updateProject', () => {
    it('should update project', async () => {
      const req = createMockAuthRequest(mockUsers.projectManager, {
        params: { id: mockProjects.active.id },
        body: {
          name: 'Updated Project Name',
          status: 'ON_HOLD',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.project.update).mockResolvedValue({
        ...mockProjects.active,
        name: 'Updated Project Name',
        status: 'ON_HOLD',
      } as any);

      await projectController.updateProject(req as any, res as any, next);

      expect(prisma.project.update).toHaveBeenCalledWith({
        where: { id: mockProjects.active.id },
        data: expect.objectContaining({ name: 'Updated Project Name' }),
      });
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('deleteProject', () => {
    it('should delete project', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        params: { id: mockProjects.completed.id },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.project.delete).mockResolvedValue(mockProjects.completed as any);

      await projectController.deleteProject(req as any, res as any, next);

      expect(prisma.project.delete).toHaveBeenCalledWith({
        where: { id: mockProjects.completed.id },
      });
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('Phase Operations', () => {
    describe('getPhases', () => {
      it('should return project phases', async () => {
        const req = createMockAuthRequest(mockUsers.client, {
          params: { id: mockProjects.active.id },
        });
        const res = createMockResponse();
        const next = createMockNext();

        const mockPhases = [
          { id: 'phase-1', name: 'Foundation', orderIndex: 1 },
          { id: 'phase-2', name: 'Structure', orderIndex: 2 },
        ];

        vi.mocked(prisma.projectPhase.findMany).mockResolvedValue(mockPhases as any);

        await projectController.getPhases(req as any, res as any, next);

        expect(res.json).toHaveBeenCalled();
        const response = res._getData();
        expect(response.data.phases).toHaveLength(2);
      });
    });

    describe('createPhase', () => {
      it('should create a new phase', async () => {
        const req = createMockAuthRequest(mockUsers.projectManager, {
          params: { id: mockProjects.active.id },
          body: {
            name: 'Electrical',
            description: 'Electrical installation',
            orderIndex: 5,
          },
        });
        const res = createMockResponse();
        const next = createMockNext();

        vi.mocked(prisma.projectPhase.create).mockResolvedValue({
          id: 'phase-new',
          projectId: mockProjects.active.id,
          name: 'Electrical',
        } as any);

        await projectController.createPhase(req as any, res as any, next);

        expect(res.status).toHaveBeenCalledWith(201);
      });
    });

    describe('updatePhase', () => {
      it('should update phase', async () => {
        const req = createMockAuthRequest(mockUsers.projectManager, {
          params: { id: mockProjects.active.id, phaseId: 'phase-1' },
          body: { status: 'COMPLETED', progressPercentage: 100 },
        });
        const res = createMockResponse();
        const next = createMockNext();

        vi.mocked(prisma.projectPhase.update).mockResolvedValue({
          id: 'phase-1',
          status: 'COMPLETED',
          progressPercentage: 100,
        } as any);

        await projectController.updatePhase(req as any, res as any, next);

        expect(res.json).toHaveBeenCalled();
      });
    });
  });

  describe('Task Operations', () => {
    describe('getTasks', () => {
      it('should return project tasks with pagination', async () => {
        const req = createMockAuthRequest(mockUsers.projectManager, {
          params: { id: mockProjects.active.id },
          query: createPaginationQuery(),
        });
        const res = createMockResponse();
        const next = createMockNext();

        vi.mocked(prisma.task.findMany).mockResolvedValue([
          mockTasks.todo,
          mockTasks.inProgress,
        ] as any);
        vi.mocked(prisma.task.count).mockResolvedValue(2);

        await projectController.getTasks(req as any, res as any, next);

        expect(res.json).toHaveBeenCalled();
        const response = res._getData();
        expect(response.data.items).toHaveLength(2);
      });
    });

    describe('createTask', () => {
      it('should create a new task', async () => {
        const req = createMockAuthRequest(mockUsers.projectManager, {
          params: { id: mockProjects.active.id },
          body: {
            phaseId: 'phase-1',
            title: 'Install windows',
            description: 'Install all ground floor windows',
            priority: 'MEDIUM',
            dueDate: '2024-08-01',
          },
        });
        const res = createMockResponse();
        const next = createMockNext();

        vi.mocked(prisma.task.create).mockResolvedValue({
          id: 'task-new',
          projectId: mockProjects.active.id,
          title: 'Install windows',
        } as any);

        await projectController.createTask(req as any, res as any, next);

        expect(res.status).toHaveBeenCalledWith(201);
      });
    });

    describe('updateTask', () => {
      it('should update task status', async () => {
        const req = createMockAuthRequest(mockUsers.projectManager, {
          params: { id: mockProjects.active.id, taskId: mockTasks.todo.id },
          body: { status: 'IN_PROGRESS' },
        });
        const res = createMockResponse();
        const next = createMockNext();

        vi.mocked(prisma.task.update).mockResolvedValue({
          ...mockTasks.todo,
          status: 'IN_PROGRESS',
        } as any);

        await projectController.updateTask(req as any, res as any, next);

        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('deleteTask', () => {
      it('should delete task', async () => {
        const req = createMockAuthRequest(mockUsers.projectManager, {
          params: { id: mockProjects.active.id, taskId: mockTasks.todo.id },
        });
        const res = createMockResponse();
        const next = createMockNext();

        vi.mocked(prisma.task.delete).mockResolvedValue(mockTasks.todo as any);

        await projectController.deleteTask(req as any, res as any, next);

        expect(prisma.task.delete).toHaveBeenCalledWith({
          where: { id: mockTasks.todo.id },
        });
      });
    });
  });

  describe('Milestone Operations', () => {
    describe('getMilestones', () => {
      it('should return project milestones', async () => {
        const req = createMockAuthRequest(mockUsers.client, {
          params: { id: mockProjects.active.id },
        });
        const res = createMockResponse();
        const next = createMockNext();

        const mockMilestones = [
          { id: 'ms-1', name: 'Foundation Complete', targetDate: new Date() },
          { id: 'ms-2', name: 'Roof Complete', targetDate: new Date() },
        ];

        vi.mocked(prisma.milestone.findMany).mockResolvedValue(mockMilestones as any);

        await projectController.getMilestones(req as any, res as any, next);

        expect(res.json).toHaveBeenCalled();
        const response = res._getData();
        expect(response.data.milestones).toHaveLength(2);
      });
    });

    describe('createMilestone', () => {
      it('should create milestone', async () => {
        const req = createMockAuthRequest(mockUsers.projectManager, {
          params: { id: mockProjects.active.id },
          body: {
            name: 'Handover',
            description: 'Final handover to client',
            targetDate: '2024-12-31',
            paymentRequired: true,
            paymentAmount: 25000,
          },
        });
        const res = createMockResponse();
        const next = createMockNext();

        vi.mocked(prisma.milestone.create).mockResolvedValue({
          id: 'ms-new',
          name: 'Handover',
          projectId: mockProjects.active.id,
        } as any);

        await projectController.createMilestone(req as any, res as any, next);

        expect(res.status).toHaveBeenCalledWith(201);
      });
    });
  });

  describe('Payment Operations', () => {
    describe('getPayments', () => {
      it('should return project payments', async () => {
        const req = createMockAuthRequest(mockUsers.client, {
          params: { id: mockProjects.active.id },
        });
        const res = createMockResponse();
        const next = createMockNext();

        const mockPayments = [
          { id: 'pay-1', amount: 50000, status: 'COMPLETED' },
          { id: 'pay-2', amount: 25000, status: 'PENDING' },
        ];

        vi.mocked(prisma.payment.findMany).mockResolvedValue(mockPayments as any);

        await projectController.getPayments(req as any, res as any, next);

        expect(res.json).toHaveBeenCalled();
        const response = res._getData();
        expect(response.data.payments).toHaveLength(2);
      });
    });

    describe('createPayment', () => {
      it('should create payment with invoice number', async () => {
        const req = createMockAuthRequest(mockUsers.projectManager, {
          params: { id: mockProjects.active.id },
          body: {
            amount: 15000,
            currency: 'USD',
            dueDate: '2024-08-15',
            description: 'Phase 3 payment',
          },
        });
        const res = createMockResponse();
        const next = createMockNext();

        vi.mocked(prisma.payment.count).mockResolvedValue(2);
        vi.mocked(prisma.payment.create).mockResolvedValue({
          id: 'pay-new',
          invoiceNumber: 'INV-PROJECT--003',
          amount: 15000,
        } as any);

        await projectController.createPayment(req as any, res as any, next);

        expect(res.status).toHaveBeenCalledWith(201);
      });
    });

    describe('recordPayment', () => {
      it('should record payment completion', async () => {
        const req = createMockAuthRequest(mockUsers.projectManager, {
          params: { id: mockProjects.active.id, paymentId: 'pay-1' },
          body: {
            transactionReference: 'TXN-12345',
            paymentMethod: 'BANK_TRANSFER',
          },
        });
        const res = createMockResponse();
        const next = createMockNext();

        vi.mocked(prisma.payment.update).mockResolvedValue({
          id: 'pay-1',
          status: 'COMPLETED',
          paidAt: new Date(),
        } as any);

        await projectController.recordPayment(req as any, res as any, next);

        expect(prisma.payment.update).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({ status: 'COMPLETED' }),
          })
        );
      });
    });
  });

  describe('Media Operations', () => {
    describe('getMedia', () => {
      it('should return project media with pagination', async () => {
        const req = createMockAuthRequest(mockUsers.client, {
          params: { id: mockProjects.active.id },
          query: createPaginationQuery(),
        });
        const res = createMockResponse();
        const next = createMockNext();

        const mockMedia = [
          { id: 'media-1', type: 'PHOTO', url: 'https://example.com/photo1.jpg' },
          { id: 'media-2', type: 'PHOTO', url: 'https://example.com/photo2.jpg' },
        ];

        vi.mocked(prisma.media.findMany).mockResolvedValue(mockMedia as any);
        vi.mocked(prisma.media.count).mockResolvedValue(2);

        await projectController.getMedia(req as any, res as any, next);

        expect(res.json).toHaveBeenCalled();
        const response = res._getData();
        expect(response.data.items).toHaveLength(2);
      });
    });

    describe('getUploadUrl', () => {
      it('should return upload URL', async () => {
        const req = createMockAuthRequest(mockUsers.projectManager, {
          params: { id: mockProjects.active.id },
          body: {
            filename: 'photo.jpg',
            contentType: 'image/jpeg',
          },
        });
        const res = createMockResponse();
        const next = createMockNext();

        await projectController.getUploadUrl(req as any, res as any, next);

        expect(res.json).toHaveBeenCalled();
        const response = res._getData();
        expect(response.success).toBe(true);
      });
    });

    describe('deleteMedia', () => {
      it('should delete media', async () => {
        const req = createMockAuthRequest(mockUsers.projectManager, {
          params: { id: mockProjects.active.id, mediaId: 'media-1' },
        });
        const res = createMockResponse();
        const next = createMockNext();

        vi.mocked(prisma.media.delete).mockResolvedValue({ id: 'media-1' } as any);

        await projectController.deleteMedia(req as any, res as any, next);

        expect(prisma.media.delete).toHaveBeenCalledWith({
          where: { id: 'media-1' },
        });
      });
    });
  });

  describe('Issue Operations', () => {
    describe('getIssues', () => {
      it('should return project issues', async () => {
        const req = createMockAuthRequest(mockUsers.projectManager, {
          params: { id: mockProjects.active.id },
        });
        const res = createMockResponse();
        const next = createMockNext();

        const mockIssues = [
          { id: 'issue-1', title: 'Material delay', status: 'OPEN' },
        ];

        vi.mocked(prisma.issue.findMany).mockResolvedValue(mockIssues as any);

        await projectController.getIssues(req as any, res as any, next);

        expect(res.json).toHaveBeenCalled();
        const response = res._getData();
        expect(response.data.issues).toHaveLength(1);
      });
    });

    describe('createIssue', () => {
      it('should create issue', async () => {
        const req = createMockAuthRequest(mockUsers.projectManager, {
          params: { id: mockProjects.active.id },
          body: {
            title: 'Weather delay',
            description: 'Heavy rain affecting work',
            category: 'WEATHER',
            severity: 'MEDIUM',
          },
        });
        const res = createMockResponse();
        const next = createMockNext();

        vi.mocked(prisma.issue.create).mockResolvedValue({
          id: 'issue-new',
          title: 'Weather delay',
          reportedById: mockUsers.projectManager.id,
        } as any);

        await projectController.createIssue(req as any, res as any, next);

        expect(res.status).toHaveBeenCalledWith(201);
      });
    });
  });

  describe('Message Operations', () => {
    describe('getMessages', () => {
      it('should return project messages', async () => {
        const req = createMockAuthRequest(mockUsers.client, {
          params: { id: mockProjects.active.id },
          query: createPaginationQuery(),
        });
        const res = createMockResponse();
        const next = createMockNext();

        const mockMessages = [
          { id: 'msg-1', content: 'Hello', sender: mockUsers.projectManager },
        ];

        vi.mocked(prisma.message.findMany).mockResolvedValue(mockMessages as any);
        vi.mocked(prisma.message.count).mockResolvedValue(1);

        await projectController.getMessages(req as any, res as any, next);

        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('sendMessage', () => {
      it('should send message', async () => {
        const req = createMockAuthRequest(mockUsers.client, {
          params: { id: mockProjects.active.id },
          body: { content: 'When will the roof be completed?' },
        });
        const res = createMockResponse();
        const next = createMockNext();

        vi.mocked(prisma.message.create).mockResolvedValue({
          id: 'msg-new',
          content: 'When will the roof be completed?',
          senderId: mockUsers.client.id,
          sender: mockUsers.client,
        } as any);

        await projectController.sendMessage(req as any, res as any, next);

        expect(res.status).toHaveBeenCalledWith(201);
      });
    });
  });

  describe('Daily Report Operations', () => {
    describe('getDailyReports', () => {
      it('should return daily reports', async () => {
        const req = createMockAuthRequest(mockUsers.client, {
          params: { id: mockProjects.active.id },
        });
        const res = createMockResponse();
        const next = createMockNext();

        const mockReports = [
          { id: 'report-1', date: new Date(), workersPresent: 8, workHours: 8 },
        ];

        vi.mocked(prisma.dailyReport.findMany).mockResolvedValue(mockReports as any);

        await projectController.getDailyReports(req as any, res as any, next);

        expect(res.json).toHaveBeenCalled();
        const response = res._getData();
        expect(response.data.reports).toHaveLength(1);
      });
    });

    describe('createDailyReport', () => {
      it('should create daily report', async () => {
        const req = createMockAuthRequest(mockUsers.projectManager, {
          params: { id: mockProjects.active.id },
          body: {
            date: '2024-07-01',
            weather: 'Sunny',
            temperature: 28,
            workersPresent: 12,
            workHours: 8,
            activitiesCompleted: ['Concrete pouring', 'Rebar installation'],
            notes: 'Good progress today',
          },
        });
        const res = createMockResponse();
        const next = createMockNext();

        vi.mocked(prisma.dailyReport.create).mockResolvedValue({
          id: 'report-new',
          date: new Date('2024-07-01'),
          submittedById: mockUsers.projectManager.id,
        } as any);

        await projectController.createDailyReport(req as any, res as any, next);

        expect(res.status).toHaveBeenCalledWith(201);
      });
    });
  });

  describe('Activity Operations', () => {
    describe('getActivity', () => {
      it('should return project activity log', async () => {
        const req = createMockAuthRequest(mockUsers.client, {
          params: { id: mockProjects.active.id },
          query: createPaginationQuery(),
        });
        const res = createMockResponse();
        const next = createMockNext();

        const mockActivities = [
          { id: 'act-1', type: 'MILESTONE_COMPLETED', description: 'Foundation complete' },
          { id: 'act-2', type: 'PHOTO_UPLOADED', description: 'New photos added' },
        ];

        vi.mocked(prisma.activity.findMany).mockResolvedValue(mockActivities as any);
        vi.mocked(prisma.activity.count).mockResolvedValue(2);

        await projectController.getActivity(req as any, res as any, next);

        expect(res.json).toHaveBeenCalled();
        const response = res._getData();
        expect(response.data.items).toHaveLength(2);
      });
    });
  });
});
