/**
 * Build Tracker Entity Types
 * Core domain entities
 */

import {
  UserRole,
  ProjectStatus,
  PhaseStatus,
  TaskStatus,
  TaskPriority,
  PaymentStatus,
  PaymentMethod,
  Currency,
  MediaType,
  IssueType,
  IssueSeverity,
  IssueStatus,
  NotificationType,
  DeviceType,
  DeviceStatus,
  ContractorSpecialty,
} from './enums';

// Base entity with common fields
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// User & Authentication
export interface User extends BaseEntity {
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginAt?: Date;
  timezone: string;
  locale: string;
}

export interface UserProfile extends BaseEntity {
  userId: string;
  bio?: string;
  company?: string;
  jobTitle?: string;
  address?: string;
  city?: string;
  country?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: NotificationPreferences;
  theme: 'light' | 'dark' | 'system';
  language: string;
  currency: Currency;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  projectUpdates: boolean;
  milestones: boolean;
  payments: boolean;
  issues: boolean;
  messages: boolean;
}

// Project
export interface Project extends BaseEntity {
  name: string;
  description?: string;
  clientId: string;
  projectManagerId?: string;
  villaTemplateId?: string;
  plotNumber?: string;
  plotAddress: string;
  plotSize?: number;
  status: ProjectStatus;
  startDate?: Date;
  estimatedEndDate?: Date;
  actualEndDate?: Date;
  totalBudget: number;
  budgetSpent: number;
  currency: Currency;
  progressPercentage: number;
  coverImageUrl?: string;
  coordinates?: GeoCoordinates;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

// Villa Template
export interface VillaTemplate extends BaseEntity {
  name: string;
  code: string;
  description?: string;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  basePrice: number;
  features: string[];
  floorPlanUrl?: string;
  renderUrls: string[];
  isActive: boolean;
}

// Project Phase
export interface ProjectPhase extends BaseEntity {
  projectId: string;
  name: string;
  description?: string;
  orderIndex: number;
  status: PhaseStatus;
  startDate?: Date;
  endDate?: Date;
  progressPercentage: number;
  budgetAllocated: number;
  budgetSpent: number;
}

// Task
export interface Task extends BaseEntity {
  projectId: string;
  phaseId?: string;
  parentTaskId?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  dueDate?: Date;
  completedAt?: Date;
  estimatedHours?: number;
  actualHours?: number;
  orderIndex: number;
}

// Milestone
export interface Milestone extends BaseEntity {
  projectId: string;
  phaseId?: string;
  name: string;
  description?: string;
  targetDate: Date;
  completedDate?: Date;
  isCompleted: boolean;
  paymentTrigger: boolean;
  paymentAmount?: number;
}

// Payment
export interface Payment extends BaseEntity {
  projectId: string;
  milestoneId?: string;
  invoiceNumber: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  method?: PaymentMethod;
  dueDate: Date;
  paidAt?: Date;
  description?: string;
  receiptUrl?: string;
  transactionRef?: string;
}

// Media
export interface Media extends BaseEntity {
  projectId: string;
  phaseId?: string;
  taskId?: string;
  uploadedById: string;
  type: MediaType;
  fileName: string;
  fileUrl: string;
  thumbnailUrl?: string;
  fileSize: number;
  mimeType: string;
  caption?: string;
  metadata?: MediaMetadata;
}

export interface MediaMetadata {
  width?: number;
  height?: number;
  duration?: number;
  gpsCoordinates?: GeoCoordinates;
  capturedAt?: Date;
}

// Issue
export interface Issue extends BaseEntity {
  projectId: string;
  phaseId?: string;
  taskId?: string;
  reportedById: string;
  assignedToId?: string;
  title: string;
  description: string;
  type: IssueType;
  severity: IssueSeverity;
  status: IssueStatus;
  resolvedAt?: Date;
  resolution?: string;
}

// Notification
export interface Notification extends BaseEntity {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  readAt?: Date;
  actionUrl?: string;
}

// Message / Communication
export interface Message extends BaseEntity {
  projectId: string;
  senderId: string;
  content: string;
  attachments: string[];
  isSystemMessage: boolean;
}

// Contractor
export interface Contractor extends BaseEntity {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  specialty: ContractorSpecialty;
  rating?: number;
  isVerified: boolean;
  isActive: boolean;
}

// Smart Home Device
export interface SmartDevice extends BaseEntity {
  projectId: string;
  name: string;
  type: DeviceType;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  status: DeviceStatus;
  lastOnlineAt?: Date;
  configuration?: Record<string, unknown>;
}

// Weather Data (for project site)
export interface WeatherData extends BaseEntity {
  projectId: string;
  recordedAt: Date;
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  conditions: string;
  workSuitable: boolean;
}

// Daily Report
export interface DailyReport extends BaseEntity {
  projectId: string;
  date: Date;
  submittedById: string;
  workersOnSite: number;
  workDescription: string;
  materialsUsed?: string;
  issues?: string;
  weatherConditions: string;
  photoIds: string[];
}
