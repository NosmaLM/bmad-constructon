/**
 * Build Tracker API Types
 * Request/Response types for REST API
 */

import { User, Project } from './entities';
import { UserRole, ProjectStatus, TaskStatus, PaymentStatus } from './enums';

// Generic API Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  timestamp: string;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// Authentication
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role?: UserRole;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// User
export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  timezone?: string;
  locale?: string;
}

export interface UpdateUserPreferencesRequest {
  theme?: 'light' | 'dark' | 'system';
  language?: string;
  currency?: string;
  notifications?: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
    projectUpdates?: boolean;
    milestones?: boolean;
    payments?: boolean;
    issues?: boolean;
    messages?: boolean;
  };
}

// Project
export interface CreateProjectRequest {
  name: string;
  description?: string;
  clientId?: string;
  villaTemplateId?: string;
  plotNumber?: string;
  plotAddress: string;
  plotSize?: number;
  startDate?: string;
  estimatedEndDate?: string;
  totalBudget: number;
  currency?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  projectManagerId?: string;
  status?: ProjectStatus;
  startDate?: string;
  estimatedEndDate?: string;
  totalBudget?: number;
  coverImageUrl?: string;
}

export interface ProjectFilters {
  status?: ProjectStatus | ProjectStatus[];
  clientId?: string;
  projectManagerId?: string;
  startDateFrom?: string;
  startDateTo?: string;
}

export interface ProjectSummary {
  project: Project;
  currentPhase?: {
    id: string;
    name: string;
    progress: number;
  };
  recentActivity: ActivityItem[];
  upcomingMilestones: {
    id: string;
    name: string;
    targetDate: Date;
  }[];
  pendingPayments: number;
  openIssues: number;
}

// Task
export interface CreateTaskRequest {
  projectId: string;
  phaseId?: string;
  parentTaskId?: string;
  title: string;
  description?: string;
  priority?: string;
  assigneeId?: string;
  dueDate?: string;
  estimatedHours?: number;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: string;
  assigneeId?: string;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
}

export interface TaskFilters {
  projectId?: string;
  phaseId?: string;
  status?: TaskStatus | TaskStatus[];
  assigneeId?: string;
  priority?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
}

// Payment
export interface CreatePaymentRequest {
  projectId: string;
  milestoneId?: string;
  amount: number;
  currency?: string;
  dueDate: string;
  description?: string;
}

export interface RecordPaymentRequest {
  method: string;
  transactionRef?: string;
  paidAt?: string;
  receiptUrl?: string;
}

export interface PaymentFilters {
  projectId?: string;
  status?: PaymentStatus | PaymentStatus[];
  dueDateFrom?: string;
  dueDateTo?: string;
}

// Issue
export interface CreateIssueRequest {
  projectId: string;
  phaseId?: string;
  taskId?: string;
  title: string;
  description: string;
  type: string;
  severity: string;
  assignedToId?: string;
}

export interface UpdateIssueRequest {
  title?: string;
  description?: string;
  severity?: string;
  status?: string;
  assignedToId?: string;
  resolution?: string;
}

// Media
export interface UploadMediaRequest {
  projectId: string;
  phaseId?: string;
  taskId?: string;
  type: string;
  caption?: string;
}

export interface MediaUploadResponse {
  uploadUrl: string;
  mediaId: string;
  expiresAt: string;
}

// Message
export interface SendMessageRequest {
  projectId: string;
  content: string;
  attachments?: string[];
}

// Daily Report
export interface CreateDailyReportRequest {
  projectId: string;
  date: string;
  workersOnSite: number;
  workDescription: string;
  materialsUsed?: string;
  issues?: string;
  weatherConditions: string;
  photoIds?: string[];
}

// Activity Feed
export interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description?: string;
  projectId: string;
  userId?: string;
  userName?: string;
  userAvatar?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

// Dashboard Stats
export interface ClientDashboardStats {
  activeProjects: number;
  totalInvested: number;
  pendingPayments: number;
  upcomingMilestones: number;
}

export interface ManagerDashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalTasks: number;
  completedTasks: number;
  openIssues: number;
  teamMembers: number;
}

// Notifications
export interface MarkNotificationReadRequest {
  notificationIds: string[];
}

export interface NotificationFilters {
  isRead?: boolean;
  type?: string | string[];
}

// Push Notification Registration
export interface RegisterPushTokenRequest {
  token: string;
  platform: 'ios' | 'android' | 'web';
  deviceId?: string;
}
