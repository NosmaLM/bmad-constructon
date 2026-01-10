/**
 * Test Setup - Global configuration for all tests
 */

import { vi } from 'vitest';

// Mock @build-tracker/shared package
vi.mock('@build-tracker/shared', () => ({
  ERROR_CODES: {
    ALREADY_EXISTS: 'ALREADY_EXISTS',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    UNAUTHORIZED: 'UNAUTHORIZED',
    TOKEN_INVALID: 'TOKEN_INVALID',
    NOT_FOUND: 'NOT_FOUND',
    INVALID_INPUT: 'INVALID_INPUT',
    FORBIDDEN: 'FORBIDDEN',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
  },
  sanitizePagination: vi.fn((query: any) => ({
    page: parseInt(query?.page || '1', 10),
    limit: parseInt(query?.limit || '20', 10),
    offset: (parseInt(query?.page || '1', 10) - 1) * parseInt(query?.limit || '20', 10),
  })),
  UserRole: {
    ADMIN: 'ADMIN',
    PROJECT_MANAGER: 'PROJECT_MANAGER',
    SITE_SUPERVISOR: 'SITE_SUPERVISOR',
    FIELD_WORKER: 'FIELD_WORKER',
    CLIENT: 'CLIENT',
  },
}));

// Mock @prisma/client enums
vi.mock('@prisma/client', () => ({
  UserRole: {
    ADMIN: 'ADMIN',
    PROJECT_MANAGER: 'PROJECT_MANAGER',
    SITE_SUPERVISOR: 'SITE_SUPERVISOR',
    FIELD_WORKER: 'FIELD_WORKER',
    CLIENT: 'CLIENT',
  },
  ProjectStatus: {
    PLANNING: 'PLANNING',
    IN_PROGRESS: 'IN_PROGRESS',
    ON_HOLD: 'ON_HOLD',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
  },
  TaskStatus: {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    IN_REVIEW: 'IN_REVIEW',
    COMPLETED: 'COMPLETED',
    BLOCKED: 'BLOCKED',
  },
  PrismaClient: vi.fn(),
}));

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-purposes';
process.env.JWT_EXPIRES_IN = '7d';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.REDIS_URL = 'redis://localhost:6379';

// Mock Prisma
vi.mock('../utils/prisma', () => ({
  default: {
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
    notification: {
      findMany: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

// Mock logger
vi.mock('../utils/logger', () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});
