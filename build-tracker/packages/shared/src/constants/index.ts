/**
 * Build Tracker Constants
 */

// API Routes
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    ME: '/auth/me',
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    PROFILE: '/users/profile',
    PREFERENCES: '/users/preferences',
    AVATAR: '/users/avatar',
  },
  PROJECTS: {
    BASE: '/projects',
    BY_ID: (id: string) => `/projects/${id}`,
    PHASES: (projectId: string) => `/projects/${projectId}/phases`,
    TASKS: (projectId: string) => `/projects/${projectId}/tasks`,
    MILESTONES: (projectId: string) => `/projects/${projectId}/milestones`,
    PAYMENTS: (projectId: string) => `/projects/${projectId}/payments`,
    MEDIA: (projectId: string) => `/projects/${projectId}/media`,
    ISSUES: (projectId: string) => `/projects/${projectId}/issues`,
    MESSAGES: (projectId: string) => `/projects/${projectId}/messages`,
    REPORTS: (projectId: string) => `/projects/${projectId}/reports`,
    ACTIVITY: (projectId: string) => `/projects/${projectId}/activity`,
    SUMMARY: (projectId: string) => `/projects/${projectId}/summary`,
  },
  TASKS: {
    BASE: '/tasks',
    BY_ID: (id: string) => `/tasks/${id}`,
    COMPLETE: (id: string) => `/tasks/${id}/complete`,
    ASSIGN: (id: string) => `/tasks/${id}/assign`,
  },
  PAYMENTS: {
    BASE: '/payments',
    BY_ID: (id: string) => `/payments/${id}`,
    RECORD: (id: string) => `/payments/${id}/record`,
  },
  ISSUES: {
    BASE: '/issues',
    BY_ID: (id: string) => `/issues/${id}`,
    RESOLVE: (id: string) => `/issues/${id}/resolve`,
  },
  NOTIFICATIONS: {
    BASE: '/notifications',
    MARK_READ: '/notifications/mark-read',
    REGISTER_PUSH: '/notifications/push-token',
  },
  MEDIA: {
    UPLOAD_URL: '/media/upload-url',
    BY_ID: (id: string) => `/media/${id}`,
  },
  TEMPLATES: {
    BASE: '/templates',
    BY_ID: (id: string) => `/templates/${id}`,
  },
  DASHBOARD: {
    CLIENT: '/dashboard/client',
    MANAGER: '/dashboard/manager',
  },
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// File upload limits
export const FILE_LIMITS = {
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_VIDEO_SIZE: 100 * 1024 * 1024, // 100MB
  MAX_DOCUMENT_SIZE: 25 * 1024 * 1024, // 25MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/quicktime', 'video/webm'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
} as const;

// Project phase templates
export const DEFAULT_PHASES = [
  { name: 'Site Preparation', orderIndex: 1 },
  { name: 'Foundation', orderIndex: 2 },
  { name: 'Structural Work', orderIndex: 3 },
  { name: 'Roofing', orderIndex: 4 },
  { name: 'Electrical & Plumbing', orderIndex: 5 },
  { name: 'Interior Finishing', orderIndex: 6 },
  { name: 'Exterior Finishing', orderIndex: 7 },
  { name: 'Smart Home Installation', orderIndex: 8 },
  { name: 'Landscaping', orderIndex: 9 },
  { name: 'Final Inspection', orderIndex: 10 },
] as const;

// Status colors for UI
export const STATUS_COLORS = {
  PROJECT: {
    DRAFT: '#9CA3AF',
    PENDING_APPROVAL: '#F59E0B',
    APPROVED: '#3B82F6',
    IN_PROGRESS: '#10B981',
    ON_HOLD: '#EF4444',
    COMPLETED: '#6366F1',
    CANCELLED: '#6B7280',
  },
  TASK: {
    TODO: '#9CA3AF',
    IN_PROGRESS: '#3B82F6',
    IN_REVIEW: '#F59E0B',
    COMPLETED: '#10B981',
    BLOCKED: '#EF4444',
    CANCELLED: '#6B7280',
  },
  PAYMENT: {
    PENDING: '#F59E0B',
    PROCESSING: '#3B82F6',
    COMPLETED: '#10B981',
    FAILED: '#EF4444',
    REFUNDED: '#8B5CF6',
    CANCELLED: '#6B7280',
  },
  ISSUE: {
    LOW: '#9CA3AF',
    MEDIUM: '#F59E0B',
    HIGH: '#F97316',
    CRITICAL: '#EF4444',
  },
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM d, yyyy',
  DISPLAY_WITH_TIME: 'MMM d, yyyy h:mm a',
  API: 'yyyy-MM-dd',
  API_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss'Z'",
} as const;

// Error codes
export const ERROR_CODES = {
  // Authentication
  INVALID_CREDENTIALS: 'AUTH_001',
  TOKEN_EXPIRED: 'AUTH_002',
  TOKEN_INVALID: 'AUTH_003',
  UNAUTHORIZED: 'AUTH_004',
  EMAIL_NOT_VERIFIED: 'AUTH_005',

  // Validation
  VALIDATION_ERROR: 'VAL_001',
  INVALID_INPUT: 'VAL_002',

  // Resources
  NOT_FOUND: 'RES_001',
  ALREADY_EXISTS: 'RES_002',
  CONFLICT: 'RES_003',

  // Permissions
  FORBIDDEN: 'PERM_001',
  INSUFFICIENT_PERMISSIONS: 'PERM_002',

  // Server
  INTERNAL_ERROR: 'SRV_001',
  SERVICE_UNAVAILABLE: 'SRV_002',

  // Rate limiting
  RATE_LIMITED: 'RATE_001',
} as const;

// Regex patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_ZW: /^(\+263|0)(7[1-8])\d{7}$/,
  PHONE_INTL: /^\+[1-9]\d{6,14}$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
} as const;
