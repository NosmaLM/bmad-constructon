/**
 * Auth Routes Integration Tests
 */

import request from 'supertest';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { createTestApp, createMockPrisma, testUsers, generateToken } from './testApp';

describe('Auth Routes Integration', () => {
  let app: ReturnType<typeof createTestApp>;
  let mockPrisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    mockPrisma = createMockPrisma();
    app = createTestApp(mockPrisma);
    vi.clearAllMocks();
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user', async () => {
      const newUser = {
        email: 'newuser@example.com',
        password: 'Password123!',
        firstName: 'New',
        lastName: 'User',
      };

      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(null);
      vi.mocked(mockPrisma.user.create).mockResolvedValue({
        id: 'new-user-id',
        email: newUser.email.toLowerCase(),
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: 'CLIENT',
        isActive: true,
      } as any);
      vi.mocked(mockPrisma.refreshToken.create).mockResolvedValue({
        id: 'token-id',
        token: 'refresh-token-123',
        userId: 'new-user-id',
      } as any);

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(newUser)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(newUser.email.toLowerCase());
      expect(response.body.data.tokens.accessToken).toBeDefined();
      expect(response.body.data.tokens.refreshToken).toBeDefined();
    });

    it('should reject registration with existing email', async () => {
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.client as any);

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: testUsers.client.email,
          password: 'Password123!',
          firstName: 'Test',
          lastName: 'User',
        })
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('ALREADY_EXISTS');
    });

    it('should reject registration with missing fields', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({ email: 'test@example.com' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login with valid credentials', async () => {
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.admin as any);
      vi.mocked(mockPrisma.refreshToken.create).mockResolvedValue({
        id: 'token-id',
        token: 'refresh-token-123',
        userId: testUsers.admin.id,
      } as any);

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: testUsers.admin.email,
          password: 'Password123!',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(testUsers.admin.email);
      expect(response.body.data.tokens.accessToken).toBeDefined();
    });

    it('should reject login with invalid email', async () => {
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(null);

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'Password123!',
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('INVALID_CREDENTIALS');
    });

    it('should reject login for inactive user', async () => {
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue({
        ...testUsers.client,
        isActive: false,
      } as any);

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: testUsers.client.email,
          password: 'Password123!',
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });

    it('should reject login with missing credentials', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'test@example.com' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/auth/me', () => {
    it('should return current user with valid token', async () => {
      const token = generateToken(testUsers.admin);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.admin as any);

      const response = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(testUsers.admin.email);
    });

    it('should reject request without token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/me')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });

    it('should reject request with invalid token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('TOKEN_INVALID');
    });

    it('should reject request with malformed authorization header', async () => {
      const response = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', 'InvalidFormat token')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/v1/auth/logout', () => {
    it('should logout and delete refresh tokens', async () => {
      const token = generateToken(testUsers.admin);
      vi.mocked(mockPrisma.user.findUnique).mockResolvedValue(testUsers.admin as any);
      vi.mocked(mockPrisma.refreshToken.deleteMany).mockResolvedValue({ count: 1 });

      const response = await request(app)
        .post('/api/v1/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(mockPrisma.refreshToken.deleteMany).toHaveBeenCalledWith({
        where: { userId: testUsers.admin.id },
      });
    });

    it('should reject logout without authentication', async () => {
      const response = await request(app)
        .post('/api/v1/auth/logout')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});
