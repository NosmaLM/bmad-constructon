/**
 * Test Utilities - Helper functions for testing
 */

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { vi } from 'vitest';

import { AuthRequest } from '../middleware';

// Test user data
export const mockUsers = {
  admin: {
    id: 'user-admin-123',
    email: 'admin@constructon.co.zw',
    firstName: 'Admin',
    lastName: 'User',
    role: 'ADMIN',
    isActive: true,
    passwordHash: '$2a$12$test.hash.password',
    avatarUrl: null,
    phoneNumber: '+263771234567',
    isEmailVerified: true,
    isPhoneVerified: false,
    timezone: 'Africa/Harare',
    locale: 'en',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    lastLoginAt: new Date('2024-06-01'),
  },
  projectManager: {
    id: 'user-pm-123',
    email: 'pm@constructon.co.zw',
    firstName: 'Project',
    lastName: 'Manager',
    role: 'PROJECT_MANAGER',
    isActive: true,
    passwordHash: '$2a$12$test.hash.password',
    avatarUrl: null,
    phoneNumber: '+263772234567',
    isEmailVerified: true,
    isPhoneVerified: false,
    timezone: 'Africa/Harare',
    locale: 'en',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    lastLoginAt: new Date('2024-06-01'),
  },
  client: {
    id: 'user-client-123',
    email: 'client@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'CLIENT',
    isActive: true,
    passwordHash: '$2a$12$test.hash.password',
    avatarUrl: null,
    phoneNumber: '+263773234567',
    isEmailVerified: true,
    isPhoneVerified: false,
    timezone: 'Africa/Harare',
    locale: 'en',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    lastLoginAt: new Date('2024-06-01'),
  },
  inactive: {
    id: 'user-inactive-123',
    email: 'inactive@example.com',
    firstName: 'Inactive',
    lastName: 'User',
    role: 'CLIENT',
    isActive: false,
    passwordHash: '$2a$12$test.hash.password',
    avatarUrl: null,
    phoneNumber: '+263774234567',
    isEmailVerified: false,
    isPhoneVerified: false,
    timezone: 'Africa/Harare',
    locale: 'en',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    lastLoginAt: null,
  },
};

// Test project data
export const mockProjects = {
  active: {
    id: 'project-123',
    name: 'Sunrise Villa - Plot 45',
    description: 'Modern 4-bedroom smart villa',
    status: 'IN_PROGRESS',
    clientId: mockUsers.client.id,
    projectManagerId: mockUsers.projectManager.id,
    villaTemplateId: 'template-123',
    plotNumber: 'PLT-045',
    plotAddress: '45 Sunrise Estate, Borrowdale',
    plotSize: 800,
    totalBudget: 150000,
    amountPaid: 75000,
    currency: 'USD',
    progressPercentage: 45,
    startDate: new Date('2024-03-01'),
    estimatedEndDate: new Date('2024-12-31'),
    actualEndDate: null,
    latitude: -17.7577,
    longitude: 31.0534,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-06-01'),
  },
  completed: {
    id: 'project-456',
    name: 'Sunset Villa - Plot 12',
    description: 'Completed luxury villa',
    status: 'COMPLETED',
    clientId: mockUsers.client.id,
    projectManagerId: mockUsers.projectManager.id,
    villaTemplateId: 'template-456',
    plotNumber: 'PLT-012',
    plotAddress: '12 Sunset Estate, Borrowdale',
    plotSize: 1000,
    totalBudget: 200000,
    amountPaid: 200000,
    currency: 'USD',
    progressPercentage: 100,
    startDate: new Date('2023-01-01'),
    estimatedEndDate: new Date('2023-12-31'),
    actualEndDate: new Date('2023-11-30'),
    latitude: -17.7600,
    longitude: 31.0500,
    createdAt: new Date('2022-12-01'),
    updatedAt: new Date('2023-11-30'),
  },
};

// Test task data
export const mockTasks = {
  todo: {
    id: 'task-123',
    projectId: mockProjects.active.id,
    phaseId: 'phase-123',
    title: 'Install electrical wiring',
    description: 'Complete electrical installation for ground floor',
    status: 'TODO',
    priority: 'HIGH',
    dueDate: new Date('2024-07-15'),
    estimatedHours: 40,
    actualHours: null,
    assigneeId: mockUsers.projectManager.id,
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-06-01'),
  },
  inProgress: {
    id: 'task-456',
    projectId: mockProjects.active.id,
    phaseId: 'phase-123',
    title: 'Plumbing rough-in',
    description: 'Install main plumbing lines',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    dueDate: new Date('2024-07-10'),
    estimatedHours: 24,
    actualHours: 12,
    assigneeId: mockUsers.projectManager.id,
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-06-01'),
  },
};

/**
 * Create a mock Express request object
 */
export function createMockRequest(overrides: Partial<Request> = {}): Partial<Request> {
  return {
    body: {},
    params: {},
    query: {},
    headers: {},
    ...overrides,
  };
}

/**
 * Create a mock authenticated request
 */
export function createMockAuthRequest(
  user: typeof mockUsers.admin,
  overrides: Partial<AuthRequest> = {}
): Partial<AuthRequest> {
  return {
    body: {},
    params: {},
    query: {},
    headers: {
      authorization: `Bearer test-token`,
    },
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName || 'Test',
      lastName: user.lastName || 'User',
    },
    ...overrides,
  };
}

/**
 * Create a mock Express response object
 */
export function createMockResponse(): Partial<Response> & {
  _getData: () => any;
  _getStatusCode: () => number;
} {
  let statusCode = 200;
  let data: any = null;

  const res: any = {
    status: vi.fn().mockImplementation((code: number) => {
      statusCode = code;
      return res;
    }),
    json: vi.fn().mockImplementation((responseData: any) => {
      data = responseData;
      return res;
    }),
    send: vi.fn().mockImplementation((responseData: any) => {
      data = responseData;
      return res;
    }),
    _getData: () => data,
    _getStatusCode: () => statusCode,
  };

  return res;
}

/**
 * Create a mock next function
 */
export function createMockNext() {
  return vi.fn();
}

/**
 * Generate a valid JWT token for testing
 */
export function generateTestToken(user: typeof mockUsers.admin): string {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );
}

/**
 * Create mock refresh token data
 */
export function createMockRefreshToken(userId: string) {
  return {
    id: 'refresh-token-123',
    userId,
    token: 'valid-refresh-token',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    createdAt: new Date(),
  };
}

/**
 * Create mock pagination query
 */
export function createPaginationQuery(page = 1, limit = 20) {
  return { page: String(page), limit: String(limit) };
}

/**
 * Wait for async operations
 */
export function flushPromises(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}
