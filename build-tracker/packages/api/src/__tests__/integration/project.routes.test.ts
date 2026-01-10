/**
 * Project Routes Integration Tests
 */

import request from 'supertest';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { createTestApp, createMockPrisma, testUsers, testProjects, generateToken } from './testApp';

describe('Project Routes Integration', () => {
  let app: ReturnType<typeof createTestApp>;
  let mockPrisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    mockPrisma = createMockPrisma();
    app = createTestApp(mockPrisma);
    vi.clearAllMocks();
  });

  describe('GET /api/v1/projects', () => {
    it('should list projects for authenticated user', async () => {
      const token = generateToken(testUsers.client);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);
      vi.mocked(mockPrisma.project.findMany).mockResolvedValue([testProjects.active] as any);
      vi.mocked(mockPrisma.project.count).mockResolvedValue(1);

      const response = await request(app)
        .get('/api/v1/projects')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.items).toHaveLength(1);
      expect(response.body.data.items[0].name).toBe(testProjects.active.name);
    });

    it('should reject unauthenticated request', async () => {
      const response = await request(app)
        .get('/api/v1/projects')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/projects/:id', () => {
    it('should return project details', async () => {
      const token = generateToken(testUsers.client);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);
      vi.mocked(mockPrisma.project.findUnique).mockResolvedValue(testProjects.active as any);

      const response = await request(app)
        .get(`/api/v1/projects/${testProjects.active.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.project.id).toBe(testProjects.active.id);
    });

    it('should return 404 for non-existent project', async () => {
      const token = generateToken(testUsers.client);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);
      vi.mocked(mockPrisma.project.findUnique).mockResolvedValue(null);

      const response = await request(app)
        .get('/api/v1/projects/non-existent-id')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('POST /api/v1/projects (Manager only)', () => {
    it('should create project for project manager', async () => {
      const token = generateToken(testUsers.projectManager);
      const newProject = {
        name: 'New Villa Project',
        description: 'Test project',
        clientId: testUsers.client.id,
        villaTemplateId: 'template-123',
        plotNumber: 'PLT-100',
        totalBudget: 150000,
      };

      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.projectManager as any);
      vi.mocked(mockPrisma.project.create).mockResolvedValue({
        id: 'new-project-id',
        ...newProject,
      } as any);

      const response = await request(app)
        .post('/api/v1/projects')
        .set('Authorization', `Bearer ${token}`)
        .send(newProject)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.project.name).toBe(newProject.name);
    });

    it('should create project for admin', async () => {
      const token = generateToken(testUsers.admin);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.admin as any);
      vi.mocked(mockPrisma.project.create).mockResolvedValue({
        id: 'new-project-id',
        name: 'Admin Project',
      } as any);

      const response = await request(app)
        .post('/api/v1/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Admin Project' })
        .expect(201);

      expect(response.body.success).toBe(true);
    });

    it('should reject client creating project', async () => {
      const token = generateToken(testUsers.client);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);

      const response = await request(app)
        .post('/api/v1/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Client Project' })
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('FORBIDDEN');
    });
  });

  describe('PUT /api/v1/projects/:id (Manager only)', () => {
    it('should update project for project manager', async () => {
      const token = generateToken(testUsers.projectManager);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.projectManager as any);
      vi.mocked(mockPrisma.project.update).mockResolvedValue({
        ...testProjects.active,
        name: 'Updated Name',
      } as any);

      const response = await request(app)
        .put(`/api/v1/projects/${testProjects.active.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Updated Name' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.project.name).toBe('Updated Name');
    });

    it('should reject client updating project', async () => {
      const token = generateToken(testUsers.client);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);

      const response = await request(app)
        .put(`/api/v1/projects/${testProjects.active.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Updated Name' })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/v1/projects/:id (Manager only)', () => {
    it('should delete project for admin', async () => {
      const token = generateToken(testUsers.admin);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.admin as any);
      vi.mocked(mockPrisma.project.delete).mockResolvedValue(testProjects.active as any);

      const response = await request(app)
        .delete(`/api/v1/projects/${testProjects.active.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(mockPrisma.project.delete).toHaveBeenCalledWith({
        where: { id: testProjects.active.id },
      });
    });

    it('should reject client deleting project', async () => {
      const token = generateToken(testUsers.client);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);

      const response = await request(app)
        .delete(`/api/v1/projects/${testProjects.active.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Project Tasks', () => {
    describe('GET /api/v1/projects/:id/tasks', () => {
      it('should list project tasks', async () => {
        const token = generateToken(testUsers.client);
        vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);
        vi.mocked(mockPrisma.task.findMany).mockResolvedValue([
          { id: 'task-1', title: 'Task 1', status: 'TODO' },
          { id: 'task-2', title: 'Task 2', status: 'IN_PROGRESS' },
        ] as any);
        vi.mocked(mockPrisma.task.count).mockResolvedValue(2);

        const response = await request(app)
          .get(`/api/v1/projects/${testProjects.active.id}/tasks`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.items).toHaveLength(2);
      });
    });

    describe('POST /api/v1/projects/:id/tasks', () => {
      it('should create task', async () => {
        const token = generateToken(testUsers.projectManager);
        vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.projectManager as any);
        vi.mocked(mockPrisma.task.create).mockResolvedValue({
          id: 'task-new',
          projectId: testProjects.active.id,
          title: 'New Task',
          status: 'TODO',
        } as any);

        const response = await request(app)
          .post(`/api/v1/projects/${testProjects.active.id}/tasks`)
          .set('Authorization', `Bearer ${token}`)
          .send({ title: 'New Task', priority: 'HIGH' })
          .expect(201);

        expect(response.body.success).toBe(true);
        expect(response.body.data.task.title).toBe('New Task');
      });
    });
  });

  describe('Project Milestones', () => {
    it('should list project milestones', async () => {
      const token = generateToken(testUsers.client);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);
      vi.mocked(mockPrisma.milestone.findMany).mockResolvedValue([
        { id: 'ms-1', name: 'Foundation Complete' },
        { id: 'ms-2', name: 'Roof Complete' },
      ] as any);

      const response = await request(app)
        .get(`/api/v1/projects/${testProjects.active.id}/milestones`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.milestones).toHaveLength(2);
    });
  });

  describe('Project Payments', () => {
    it('should list project payments', async () => {
      const token = generateToken(testUsers.client);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);
      vi.mocked(mockPrisma.payment.findMany).mockResolvedValue([
        { id: 'pay-1', amount: 50000, status: 'COMPLETED' },
        { id: 'pay-2', amount: 25000, status: 'PENDING' },
      ] as any);

      const response = await request(app)
        .get(`/api/v1/projects/${testProjects.active.id}/payments`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.payments).toHaveLength(2);
    });
  });

  describe('Project Media', () => {
    it('should list project media', async () => {
      const token = generateToken(testUsers.client);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);
      vi.mocked(mockPrisma.media.findMany).mockResolvedValue([
        { id: 'media-1', type: 'PHOTO', url: 'https://example.com/photo1.jpg' },
      ] as any);
      vi.mocked(mockPrisma.media.count).mockResolvedValue(1);

      const response = await request(app)
        .get(`/api/v1/projects/${testProjects.active.id}/media`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.items).toHaveLength(1);
    });
  });

  describe('Project Issues', () => {
    it('should list project issues', async () => {
      const token = generateToken(testUsers.projectManager);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.projectManager as any);
      vi.mocked(mockPrisma.issue.findMany).mockResolvedValue([
        { id: 'issue-1', title: 'Material delay', status: 'OPEN' },
      ] as any);

      const response = await request(app)
        .get(`/api/v1/projects/${testProjects.active.id}/issues`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.issues).toHaveLength(1);
    });

    it('should create issue', async () => {
      const token = generateToken(testUsers.projectManager);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.projectManager as any);
      vi.mocked(mockPrisma.issue.create).mockResolvedValue({
        id: 'issue-new',
        title: 'Weather delay',
        projectId: testProjects.active.id,
        reportedById: testUsers.projectManager.id,
      } as any);

      const response = await request(app)
        .post(`/api/v1/projects/${testProjects.active.id}/issues`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Weather delay', category: 'WEATHER', severity: 'MEDIUM' })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.issue.title).toBe('Weather delay');
    });
  });

  describe('Project Messages', () => {
    it('should list project messages', async () => {
      const token = generateToken(testUsers.client);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);
      vi.mocked(mockPrisma.message.findMany).mockResolvedValue([
        { id: 'msg-1', content: 'Hello', senderId: testUsers.projectManager.id },
      ] as any);
      vi.mocked(mockPrisma.message.count).mockResolvedValue(1);

      const response = await request(app)
        .get(`/api/v1/projects/${testProjects.active.id}/messages`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.items).toHaveLength(1);
    });

    it('should send message', async () => {
      const token = generateToken(testUsers.client);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);
      vi.mocked(mockPrisma.message.create).mockResolvedValue({
        id: 'msg-new',
        content: 'When will the roof be done?',
        projectId: testProjects.active.id,
        senderId: testUsers.client.id,
      } as any);

      const response = await request(app)
        .post(`/api/v1/projects/${testProjects.active.id}/messages`)
        .set('Authorization', `Bearer ${token}`)
        .send({ content: 'When will the roof be done?' })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.message.content).toBe('When will the roof be done?');
    });
  });
});
