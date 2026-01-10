/**
 * Auth Controller Tests
 */

import bcrypt from 'bcryptjs';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { AuthController } from '../../controllers/auth.controller';
import prisma from '../../utils/prisma';
import {
  mockUsers,
  createMockRequest,
  createMockAuthRequest,
  createMockResponse,
  createMockNext,
  createMockRefreshToken,
} from '../utils';

// Mock bcrypt
vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('$2a$12$hashed.password'),
    compare: vi.fn(),
  },
}));

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(() => {
    authController = new AuthController();
    vi.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const req = createMockRequest({
        body: {
          email: 'newuser@example.com',
          password: 'Password123!',
          firstName: 'New',
          lastName: 'User',
          phoneNumber: '+263771234567',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
      vi.mocked(prisma.user.create).mockResolvedValue({
        id: 'new-user-123',
        email: 'newuser@example.com',
        firstName: 'New',
        lastName: 'User',
        role: 'CLIENT',
        createdAt: new Date(),
      } as any);
      vi.mocked(prisma.refreshToken.create).mockResolvedValue({
        id: 'token-123',
        token: 'refresh-token',
        userId: 'new-user-123',
        expiresAt: new Date(),
        createdAt: new Date(),
      } as any);

      await authController.register(req as any, res as any, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
      expect(response.data.user).toBeDefined();
      expect(response.data.tokens).toBeDefined();
    });

    it('should reject registration with existing email', async () => {
      const req = createMockRequest({
        body: {
          email: mockUsers.admin.email,
          password: 'Password123!',
          firstName: 'Test',
          lastName: 'User',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUsers.admin as any);

      await authController.register(req as any, res as any, next);

      expect(next).toHaveBeenCalled();
      const error = next.mock.calls[0][0];
      expect(error.statusCode).toBe(409);
    });

    it('should reject registration with invalid email', async () => {
      const req = createMockRequest({
        body: {
          email: 'invalid-email',
          password: 'Password123!',
          firstName: 'Test',
          lastName: 'User',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await authController.register(req as any, res as any, next);

      expect(next).toHaveBeenCalled();
    });

    it('should reject registration with short password', async () => {
      const req = createMockRequest({
        body: {
          email: 'test@example.com',
          password: 'short',
          firstName: 'Test',
          lastName: 'User',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await authController.register(req as any, res as any, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should login user with valid credentials', async () => {
      const req = createMockRequest({
        body: {
          email: mockUsers.admin.email,
          password: 'Password123!',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUsers.admin as any);
      vi.mocked(bcrypt.compare).mockResolvedValue(true as any);
      vi.mocked(prisma.user.update).mockResolvedValue(mockUsers.admin as any);
      vi.mocked(prisma.refreshToken.create).mockResolvedValue({
        id: 'token-123',
        token: 'refresh-token',
        userId: mockUsers.admin.id,
        expiresAt: new Date(),
        createdAt: new Date(),
      } as any);

      await authController.login(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
      expect(response.data.user.email).toBe(mockUsers.admin.email);
      expect(response.data.tokens.accessToken).toBeDefined();
    });

    it('should reject login with invalid email', async () => {
      const req = createMockRequest({
        body: {
          email: 'nonexistent@example.com',
          password: 'Password123!',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

      await authController.login(req as any, res as any, next);

      expect(next).toHaveBeenCalled();
      const error = next.mock.calls[0][0];
      expect(error.statusCode).toBe(401);
    });

    it('should reject login with invalid password', async () => {
      const req = createMockRequest({
        body: {
          email: mockUsers.admin.email,
          password: 'WrongPassword!',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUsers.admin as any);
      vi.mocked(bcrypt.compare).mockResolvedValue(false as any);

      await authController.login(req as any, res as any, next);

      expect(next).toHaveBeenCalled();
      const error = next.mock.calls[0][0];
      expect(error.statusCode).toBe(401);
    });

    it('should reject login for inactive user', async () => {
      const req = createMockRequest({
        body: {
          email: mockUsers.inactive.email,
          password: 'Password123!',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUsers.inactive as any);
      vi.mocked(bcrypt.compare).mockResolvedValue(true as any);

      await authController.login(req as any, res as any, next);

      expect(next).toHaveBeenCalled();
      const error = next.mock.calls[0][0];
      expect(error.statusCode).toBe(401);
    });
  });

  describe('refreshToken', () => {
    it('should refresh token with valid refresh token', async () => {
      const mockRefreshToken = createMockRefreshToken(mockUsers.admin.id);
      const req = createMockRequest({
        body: { refreshToken: mockRefreshToken.token },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.refreshToken.findUnique).mockResolvedValue({
        ...mockRefreshToken,
        user: mockUsers.admin,
      } as any);
      vi.mocked(prisma.refreshToken.delete).mockResolvedValue(mockRefreshToken as any);
      vi.mocked(prisma.refreshToken.create).mockResolvedValue({
        id: 'new-token-123',
        token: 'new-refresh-token',
        userId: mockUsers.admin.id,
        expiresAt: new Date(),
        createdAt: new Date(),
      } as any);

      await authController.refreshToken(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
      expect(response.data.tokens).toBeDefined();
    });

    it('should reject refresh with missing token', async () => {
      const req = createMockRequest({
        body: {},
      });
      const res = createMockResponse();
      const next = createMockNext();

      await authController.refreshToken(req as any, res as any, next);

      expect(next).toHaveBeenCalled();
      const error = next.mock.calls[0][0];
      expect(error.statusCode).toBe(400);
    });

    it('should reject refresh with expired token', async () => {
      const expiredToken = {
        ...createMockRefreshToken(mockUsers.admin.id),
        expiresAt: new Date(Date.now() - 1000), // expired
        user: mockUsers.admin,
      };
      const req = createMockRequest({
        body: { refreshToken: expiredToken.token },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.refreshToken.findUnique).mockResolvedValue(expiredToken as any);

      await authController.refreshToken(req as any, res as any, next);

      expect(next).toHaveBeenCalled();
      const error = next.mock.calls[0][0];
      expect(error.statusCode).toBe(401);
    });
  });

  describe('me', () => {
    it('should return current user profile', async () => {
      const req = createMockAuthRequest(mockUsers.admin);
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        ...mockUsers.admin,
        profile: { bio: 'Test bio' },
      } as any);

      await authController.me(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
      expect(response.data.user.email).toBe(mockUsers.admin.email);
    });
  });

  describe('logout', () => {
    it('should logout user and delete refresh tokens', async () => {
      const req = createMockAuthRequest(mockUsers.admin);
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.refreshToken.deleteMany).mockResolvedValue({ count: 1 });

      await authController.logout(req as any, res as any, next);

      expect(prisma.refreshToken.deleteMany).toHaveBeenCalledWith({
        where: { userId: mockUsers.admin.id },
      });
      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
    });
  });

  describe('changePassword', () => {
    it('should change password with valid current password', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        body: {
          currentPassword: 'OldPassword123!',
          newPassword: 'NewPassword123!',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUsers.admin as any);
      vi.mocked(bcrypt.compare).mockResolvedValue(true as any);
      vi.mocked(prisma.user.update).mockResolvedValue(mockUsers.admin as any);
      vi.mocked(prisma.refreshToken.deleteMany).mockResolvedValue({ count: 1 });

      await authController.changePassword(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
      expect(response.data.message).toContain('changed');
    });

    it('should reject change with incorrect current password', async () => {
      const req = createMockAuthRequest(mockUsers.admin, {
        body: {
          currentPassword: 'WrongPassword!',
          newPassword: 'NewPassword123!',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUsers.admin as any);
      vi.mocked(bcrypt.compare).mockResolvedValue(false as any);

      await authController.changePassword(req as any, res as any, next);

      expect(next).toHaveBeenCalled();
      const error = next.mock.calls[0][0];
      expect(error.statusCode).toBe(400);
    });
  });

  describe('forgotPassword', () => {
    it('should return success regardless of email existence', async () => {
      const req = createMockRequest({
        body: { email: 'any@example.com' },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await authController.forgotPassword(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
    });
  });

  describe('resetPassword', () => {
    it('should reset password with valid token', async () => {
      const req = createMockRequest({
        body: {
          token: 'valid-reset-token',
          newPassword: 'NewPassword123!',
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await authController.resetPassword(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
    });
  });

  describe('verifyEmail', () => {
    it('should verify email with valid token', async () => {
      const req = createMockRequest({
        body: { token: 'valid-verification-token' },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await authController.verifyEmail(req as any, res as any, next);

      expect(res.json).toHaveBeenCalled();
      const response = res._getData();
      expect(response.success).toBe(true);
    });
  });
});
