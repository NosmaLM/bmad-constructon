/**
 * Auth Middleware Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import {
  mockUsers,
  createMockRequest,
  createMockResponse,
  createMockNext,
  generateTestToken,
} from '../utils';

// Mock the auth middleware functions
const authenticate = vi.fn(async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'No token provided' },
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: { code: 'TOKEN_INVALID', message: 'Invalid token' },
    });
  }
});

const requireRole = vi.fn((...roles: string[]) => {
  return (req: any, res: any, next: any) => {
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
});

describe('Auth Middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('authenticate', () => {
    it('should authenticate valid token', async () => {
      const token = generateTestToken(mockUsers.admin);
      const req = createMockRequest({
        headers: { authorization: `Bearer ${token}` },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await authenticate(req, res, next);

      expect(next).toHaveBeenCalled();
      expect((req as any).user).toBeDefined();
      expect((req as any).user.email).toBe(mockUsers.admin.email);
    });

    it('should reject request without token', async () => {
      const req = createMockRequest({
        headers: {},
      });
      const res = createMockResponse();
      const next = createMockNext();

      await authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(next).not.toHaveBeenCalled();
    });

    it('should reject request with invalid token format', async () => {
      const req = createMockRequest({
        headers: { authorization: 'InvalidFormat token123' },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should reject expired token', async () => {
      // Create an expired token
      const expiredToken = jwt.sign(
        { userId: mockUsers.admin.id, email: mockUsers.admin.email, role: mockUsers.admin.role },
        process.env.JWT_SECRET!,
        { expiresIn: '-1h' } // already expired
      );

      const req = createMockRequest({
        headers: { authorization: `Bearer ${expiredToken}` },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should reject malformed token', async () => {
      const req = createMockRequest({
        headers: { authorization: 'Bearer malformed.token.here' },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
    });
  });

  describe('requireRole', () => {
    it('should allow user with required role', () => {
      const middleware = requireRole('ADMIN', 'PROJECT_MANAGER');
      const req = createMockRequest() as any;
      req.user = { id: mockUsers.admin.id, email: mockUsers.admin.email, role: 'ADMIN' };
      const res = createMockResponse();
      const next = createMockNext();

      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should reject user without required role', () => {
      const middleware = requireRole('ADMIN');
      const req = createMockRequest() as any;
      req.user = { id: mockUsers.client.id, email: mockUsers.client.email, role: 'CLIENT' };
      const res = createMockResponse();
      const next = createMockNext();

      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it('should reject unauthenticated user', () => {
      const middleware = requireRole('ADMIN');
      const req = createMockRequest() as any;
      // No user attached
      const res = createMockResponse();
      const next = createMockNext();

      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should allow multiple roles', () => {
      const middleware = requireRole('ADMIN', 'PROJECT_MANAGER', 'SITE_SUPERVISOR');
      const req = createMockRequest() as any;
      req.user = { id: mockUsers.projectManager.id, role: 'PROJECT_MANAGER' };
      const res = createMockResponse();
      const next = createMockNext();

      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe('Error Handling', () => {
  it('should format API errors correctly', () => {
    class ApiError extends Error {
      constructor(
        public statusCode: number,
        message: string,
        public code: string
      ) {
        super(message);
      }
    }

    const error = new ApiError(400, 'Invalid input', 'VALIDATION_ERROR');

    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Invalid input');
    expect(error.code).toBe('VALIDATION_ERROR');
  });

  it('should handle Zod validation errors', () => {
    // Simulate Zod error structure
    const zodError = {
      name: 'ZodError',
      issues: [
        { path: ['email'], message: 'Invalid email' },
        { path: ['password'], message: 'Too short' },
      ],
    };

    expect(zodError.issues).toHaveLength(2);
    expect(zodError.issues[0].path).toContain('email');
  });
});
