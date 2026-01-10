/**
 * User Controller Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

import { UserController } from '../../controllers/user.controller';
import prisma from '../../utils/prisma';
import {
  mockUsers,
  createMockAuthRequest,
  createMockResponse,
  createMockNext,
  createPaginationQuery,
} from '../utils';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(() => {
    userController = new UserController();
    vi.clearAllMocks();
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const req = createMockAuthRequest(mockUsers.admin);
      const res = createMockResponse();
      const next = createMockNext();

      const mockProfile = {
        id: 'profile-123',
        userId: mockUsers.admin.id,
        bio: 'Test bio',
        company: 'constructon',
        jobTitle: 'Admin',
        address: '123 Main St',
        city: 'Harare',
        country: 'Zimbabwe',
      };

      vi.mocked(prisma.userProfile.findUnique).mockResolvedValue(mockProfile as any);

      await userController.getProfile(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
      expect(response.data.profile).toEqual(mockProfile);
    });

    it('should return null profile for new user', async () => {
      const req = createMockAuthRequest(mockUsers.client);
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.userProfile.findUnique).mockResolvedValue(null);

      await userController.getProfile(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
      expect(response.data.profile).toBeNull();
    });
  });

  describe('updateProfile', () => {
    it('should update existing profile', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        body: {
          bio: 'Updated bio',
          company: 'New Company',
          jobTitle: 'Senior Admin',
          city: 'Bulawayo',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      const updatedProfile = {
        id: 'profile-123',
        userId: mockUsers.admin.id,
        bio: 'Updated bio',
        company: 'New Company',
        jobTitle: 'Senior Admin',
        city: 'Bulawayo',
        country: 'Zimbabwe',
      };

      vi.mocked(prisma.userProfile.upsert).mockResolvedValue(updatedProfile as any);

      await userController.updateProfile(req as any, res as any, next);

      expect(prisma.userProfile.upsert).toHaveBeenCalledWith({
        where: { userId: mockUsers.admin.id },
        update: expect.objectContaining({ bio: 'Updated bio' }),
        create: expect.objectContaining({ userId: mockUsers.admin.id }),
      });
      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
      expect(response.data.profile.bio).toBe('Updated bio');
    });

    it('should create profile if not exists', async () => {
      const req = createMockAuthRequest(mockUsers.client, {
        body: {
          bio: 'New profile bio',
          company: 'Client Corp',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      const newProfile = {
        id: 'profile-new',
        userId: mockUsers.client.id,
        bio: 'New profile bio',
        company: 'Client Corp',
      };

      vi.mocked(prisma.userProfile.upsert).mockResolvedValue(newProfile as any);

      await userController.updateProfile(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
    });
  });

  describe('updatePreferences', () => {
    it('should update user preferences', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        body: {
          preferences: {
            notifications: { email: true, push: false },
            theme: 'dark',
          },
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.userProfile.upsert).mockResolvedValue({
        id: 'profile-123',
        userId: mockUsers.admin.id,
        preferences: { notifications: { email: true, push: false }, theme: 'dark' },
      } as any);

      await userController.updatePreferences(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
    });
  });

  describe('updateAvatar', () => {
    it('should update user avatar URL', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        body: {
          avatarUrl: 'https://example.com/avatars/new-avatar.jpg',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.update).mockResolvedValue({
        id: mockUsers.admin.id,
        avatarUrl: 'https://example.com/avatars/new-avatar.jpg',
      } as any);

      await userController.updateAvatar(req as any, res as any, next);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUsers.admin.id },
        data: { avatarUrl: 'https://example.com/avatars/new-avatar.jpg' },
        select: { id: true, avatarUrl: true },
      });
      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
    });
  });

  describe('listUsers', () => {
    it('should list users with pagination', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        query: createPaginationQuery(1, 10),
      });
      const res = createMockResponse();
      const next = createMockNext();

      const usersList = [mockUsers.admin, mockUsers.projectManager, mockUsers.client];

      vi.mocked(prisma.user.findMany).mockResolvedValue(usersList as any);
      vi.mocked(prisma.user.count).mockResolvedValue(3);

      await userController.listUsers(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
      expect(response.data.items).toHaveLength(3);
      expect(response.data.pagination.totalItems).toBe(3);
    });

    it('should filter users by role', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        query: { ...createPaginationQuery(), role: 'CLIENT' },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.findMany).mockResolvedValue([mockUsers.client] as any);
      vi.mocked(prisma.user.count).mockResolvedValue(1);

      await userController.listUsers(req as any, res as any, next);

      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ role: 'CLIENT' }),
        })
      );
    });

    it('should search users by name or email', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        query: { ...createPaginationQuery(), search: 'john' },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.findMany).mockResolvedValue([mockUsers.client] as any);
      vi.mocked(prisma.user.count).mockResolvedValue(1);

      await userController.listUsers(req as any, res as any, next);

      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: expect.arrayContaining([
              expect.objectContaining({ firstName: expect.any(Object) }),
            ]),
          }),
        })
      );
    });
  });

  describe('getUserById', () => {
    it('should return user by ID', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        params: { id: mockUsers.client.id },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        ...mockUsers.client,
        profile: { bio: 'Client bio' },
      } as any);

      await userController.getUserById(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
      expect(response.data.user.id).toBe(mockUsers.client.id);
    });

    it('should return 404 for non-existent user', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        params: { id: 'non-existent-id' },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

      await userController.getUserById(req as any, res as any, next);

      expect(next).toHaveBeenCalled();
      const error = next.mock.calls[0][0];
      expect(error.statusCode).toBe(404);
    });
  });

  describe('updateUser', () => {
    it('should update user details', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        params: { id: mockUsers.client.id },
        body: {
          firstName: 'Updated',
          lastName: 'Name',
          role: 'PROJECT_MANAGER',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.update).mockResolvedValue({
        ...mockUsers.client,
        firstName: 'Updated',
        lastName: 'Name',
        role: 'PROJECT_MANAGER',
      } as any);

      await userController.updateUser(req as any, res as any, next);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUsers.client.id },
        data: expect.objectContaining({
          firstName: 'Updated',
          lastName: 'Name',
          role: 'PROJECT_MANAGER',
        }),
        select: expect.any(Object),
      });
      expect(res.json).toHaveBeenCalled();
    });

    it('should deactivate user', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        params: { id: mockUsers.client.id },
        body: { isActive: false },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.update).mockResolvedValue({
        ...mockUsers.client,
        isActive: false,
      } as any);

      await userController.updateUser(req as any, res as any, next);

      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ isActive: false }),
        })
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete user', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        params: { id: mockUsers.client.id },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.delete).mockResolvedValue(mockUsers.client as any);

      await userController.deleteUser(req as any, res as any, next);

      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: mockUsers.client.id },
      });
      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
    });
  });
});
