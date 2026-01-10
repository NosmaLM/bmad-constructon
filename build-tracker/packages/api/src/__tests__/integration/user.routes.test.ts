/**
 * User Routes Integration Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import { createTestApp, createMockPrisma, testUsers, generateToken } from './testApp';

describe('User Routes Integration', () => {
  let app: ReturnType<typeof createTestApp>;
  let mockPrisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    mockPrisma = createMockPrisma();
    app = createTestApp(mockPrisma);
    vi.clearAllMocks();
  });

  describe('GET /api/v1/users/profile', () => {
    it('should return user profile', async () => {
      const token = generateToken(testUsers.client);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);
      vi.mocked(mockPrisma.userProfile.findUnique).mockResolvedValue({
        id: 'profile-123',
        userId: testUsers.client.id,
        bio: 'Test bio',
        company: 'Test Company',
      } as any);

      const response = await request(app)
        .get('/api/v1/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.profile.bio).toBe('Test bio');
    });

    it('should return null for user without profile', async () => {
      const token = generateToken(testUsers.client);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);
      vi.mocked(mockPrisma.userProfile.findUnique).mockResolvedValue(null);

      const response = await request(app)
        .get('/api/v1/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.profile).toBeNull();
    });

    it('should reject unauthenticated request', async () => {
      const response = await request(app)
        .get('/api/v1/users/profile')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/users/profile', () => {
    it('should update user profile', async () => {
      const token = generateToken(testUsers.client);
      const updateData = {
        bio: 'Updated bio',
        company: 'New Company',
        city: 'Harare',
      };

      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);
      vi.mocked(mockPrisma.userProfile.upsert).mockResolvedValue({
        id: 'profile-123',
        userId: testUsers.client.id,
        ...updateData,
      } as any);

      const response = await request(app)
        .put('/api/v1/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.profile.bio).toBe('Updated bio');
    });
  });

  describe('GET /api/v1/users (Admin only)', () => {
    it('should list users for admin', async () => {
      const token = generateToken(testUsers.admin);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.admin as any);
      vi.mocked(mockPrisma.user.findMany).mockResolvedValue([
        testUsers.admin,
        testUsers.projectManager,
        testUsers.client,
      ] as any);
      vi.mocked(mockPrisma.user.count).mockResolvedValue(3);

      const response = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.items).toHaveLength(3);
      expect(response.body.data.pagination.totalItems).toBe(3);
    });

    it('should reject non-admin users', async () => {
      const token = generateToken(testUsers.client);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);

      const response = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('FORBIDDEN');
    });

    it('should reject project manager users', async () => {
      const token = generateToken(testUsers.projectManager);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.projectManager as any);

      const response = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/users/:id (Admin only)', () => {
    it('should return user by ID for admin', async () => {
      const token = generateToken(testUsers.admin);
      vi.mocked(mockPrisma.user.findUnique)
        .mockResolvedValueOnce(testUsers.admin as any) // For auth
        .mockResolvedValueOnce(testUsers.client as any); // For get user

      const response = await request(app)
        .get(`/api/v1/users/${testUsers.client.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.id).toBe(testUsers.client.id);
    });

    it('should return 404 for non-existent user', async () => {
      const token = generateToken(testUsers.admin);
      vi.mocked(mockPrisma.user.findUnique)
        .mockResolvedValueOnce(testUsers.admin as any) // For auth
        .mockResolvedValueOnce(null); // User not found

      const response = await request(app)
        .get('/api/v1/users/non-existent-id')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('NOT_FOUND');
    });

    it('should reject non-admin users', async () => {
      const token = generateToken(testUsers.client);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);

      const response = await request(app)
        .get(`/api/v1/users/${testUsers.projectManager.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/v1/users/:id (Admin only)', () => {
    it('should delete user for admin', async () => {
      const token = generateToken(testUsers.admin);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.admin as any);
      vi.mocked(mockPrisma.user.delete).mockResolvedValue(testUsers.client as any);

      const response = await request(app)
        .delete(`/api/v1/users/${testUsers.client.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(mockPrisma.user.delete).toHaveBeenCalledWith({
        where: { id: testUsers.client.id },
      });
    });

    it('should reject non-admin users', async () => {
      const token = generateToken(testUsers.projectManager);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.projectManager as any);

      const response = await request(app)
        .delete(`/api/v1/users/${testUsers.client.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });
});
