-- Build Tracker Initial Migration
-- Generated from Prisma schema

-- =============================================================================
-- ENUMS
-- =============================================================================

CREATE TYPE "UserRole" AS ENUM ('CLIENT', 'PROJECT_MANAGER', 'SITE_SUPERVISOR', 'CONTRACTOR', 'ADMIN', 'SUPER_ADMIN');

CREATE TYPE "ProjectStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED');

CREATE TYPE "PhaseStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'DELAYED', 'BLOCKED');

CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'IN_REVIEW', 'COMPLETED', 'BLOCKED', 'CANCELLED');

CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED');

CREATE TYPE "PaymentMethod" AS ENUM ('BANK_TRANSFER', 'MOBILE_MONEY', 'CARD', 'CASH', 'CRYPTO');

CREATE TYPE "Currency" AS ENUM ('USD', 'ZWL', 'ZAR', 'GBP');

CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT', 'FLOOR_PLAN', 'DRONE_FOOTAGE', 'THREE_D_RENDER');

CREATE TYPE "IssueType" AS ENUM ('DEFECT', 'DELAY', 'SAFETY', 'MATERIAL', 'WEATHER', 'OTHER');

CREATE TYPE "IssueSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

CREATE TYPE "IssueStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

CREATE TYPE "NotificationType" AS ENUM ('PROJECT_UPDATE', 'MILESTONE_REACHED', 'PAYMENT_DUE', 'PAYMENT_RECEIVED', 'ISSUE_REPORTED', 'ISSUE_RESOLVED', 'DOCUMENT_UPLOADED', 'MESSAGE_RECEIVED', 'TASK_ASSIGNED', 'TASK_COMPLETED', 'WEATHER_ALERT');

CREATE TYPE "DeviceType" AS ENUM ('CAMERA', 'SENSOR', 'DRONE', 'SMART_LOCK', 'THERMOSTAT', 'LIGHTING', 'ALARM');

CREATE TYPE "DeviceStatus" AS ENUM ('ONLINE', 'OFFLINE', 'ERROR', 'MAINTENANCE');

CREATE TYPE "ContractorSpecialty" AS ENUM ('GENERAL', 'ELECTRICAL', 'PLUMBING', 'HVAC', 'ROOFING', 'FLOORING', 'PAINTING', 'LANDSCAPING', 'MASONRY', 'CARPENTRY', 'SMART_HOME', 'SOLAR', 'SECURITY');

-- =============================================================================
-- TABLES
-- =============================================================================

-- Users
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'CLIENT',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginAt" TIMESTAMP(3),
    "timezone" TEXT NOT NULL DEFAULT 'Africa/Harare',
    "locale" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- User Profiles
CREATE TABLE "user_profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "bio" TEXT,
    "company" TEXT,
    "jobTitle" TEXT,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "preferences" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- Refresh Tokens
CREATE TABLE "refresh_tokens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- Push Tokens
CREATE TABLE "push_tokens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "deviceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "push_tokens_pkey" PRIMARY KEY ("id")
);

-- Villa Templates
CREATE TABLE "villa_templates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "squareMeters" DOUBLE PRECISION NOT NULL,
    "basePrice" DECIMAL(12,2) NOT NULL,
    "features" TEXT[],
    "floorPlanUrl" TEXT,
    "renderUrls" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "villa_templates_pkey" PRIMARY KEY ("id")
);

-- Projects
CREATE TABLE "projects" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "clientId" UUID NOT NULL,
    "projectManagerId" UUID,
    "villaTemplateId" UUID,
    "plotNumber" TEXT,
    "plotAddress" TEXT NOT NULL,
    "plotSize" DOUBLE PRECISION,
    "status" "ProjectStatus" NOT NULL DEFAULT 'DRAFT',
    "startDate" TIMESTAMP(3),
    "estimatedEndDate" TIMESTAMP(3),
    "actualEndDate" TIMESTAMP(3),
    "totalBudget" DECIMAL(12,2) NOT NULL,
    "budgetSpent" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "currency" "Currency" NOT NULL DEFAULT 'USD',
    "progressPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "coverImageUrl" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- Project Phases
CREATE TABLE "project_phases" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "projectId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "orderIndex" INTEGER NOT NULL,
    "status" "PhaseStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "progressPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "budgetAllocated" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "budgetSpent" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_phases_pkey" PRIMARY KEY ("id")
);

-- Tasks
CREATE TABLE "tasks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "projectId" UUID NOT NULL,
    "phaseId" UUID,
    "parentTaskId" UUID,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'TODO',
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "assigneeId" UUID,
    "dueDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "estimatedHours" DOUBLE PRECISION,
    "actualHours" DOUBLE PRECISION,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- Milestones
CREATE TABLE "milestones" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "projectId" UUID NOT NULL,
    "phaseId" UUID,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "completedDate" TIMESTAMP(3),
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "paymentTrigger" BOOLEAN NOT NULL DEFAULT false,
    "paymentAmount" DECIMAL(12,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "milestones_pkey" PRIMARY KEY ("id")
);

-- Payments
CREATE TABLE "payments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "projectId" UUID NOT NULL,
    "milestoneId" UUID,
    "invoiceNumber" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'USD',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "method" "PaymentMethod",
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "description" TEXT,
    "receiptUrl" TEXT,
    "transactionRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- Media
CREATE TABLE "media" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "projectId" UUID NOT NULL,
    "phaseId" UUID,
    "taskId" UUID,
    "uploadedById" UUID NOT NULL,
    "type" "MediaType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "caption" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- Issues
CREATE TABLE "issues" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "projectId" UUID NOT NULL,
    "phaseId" UUID,
    "taskId" UUID,
    "reportedById" UUID NOT NULL,
    "assignedToId" UUID,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "IssueType" NOT NULL,
    "severity" "IssueSeverity" NOT NULL,
    "status" "IssueStatus" NOT NULL DEFAULT 'OPEN',
    "resolvedAt" TIMESTAMP(3),
    "resolution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "issues_pkey" PRIMARY KEY ("id")
);

-- Notifications
CREATE TABLE "notifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "data" JSONB,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "actionUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- Messages
CREATE TABLE "messages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "projectId" UUID NOT NULL,
    "senderId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "attachments" TEXT[],
    "isSystemMessage" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- Contractors
CREATE TABLE "contractors" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "specialty" "ContractorSpecialty" NOT NULL,
    "rating" DOUBLE PRECISION,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contractors_pkey" PRIMARY KEY ("id")
);

-- Smart Devices
CREATE TABLE "smart_devices" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "projectId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DeviceType" NOT NULL,
    "manufacturer" TEXT,
    "model" TEXT,
    "serialNumber" TEXT,
    "status" "DeviceStatus" NOT NULL DEFAULT 'OFFLINE',
    "lastOnlineAt" TIMESTAMP(3),
    "configuration" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "smart_devices_pkey" PRIMARY KEY ("id")
);

-- Weather Data
CREATE TABLE "weather_data" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "projectId" UUID NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "windSpeed" DOUBLE PRECISION NOT NULL,
    "precipitation" DOUBLE PRECISION NOT NULL,
    "conditions" TEXT NOT NULL,
    "workSuitable" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weather_data_pkey" PRIMARY KEY ("id")
);

-- Daily Reports
CREATE TABLE "daily_reports" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "projectId" UUID NOT NULL,
    "date" DATE NOT NULL,
    "submittedById" UUID NOT NULL,
    "workersOnSite" INTEGER NOT NULL,
    "workDescription" TEXT NOT NULL,
    "materialsUsed" TEXT,
    "issues" TEXT,
    "weatherConditions" TEXT NOT NULL,
    "photoIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_reports_pkey" PRIMARY KEY ("id")
);

-- Activities
CREATE TABLE "activities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "projectId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" UUID,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- =============================================================================
-- UNIQUE CONSTRAINTS
-- =============================================================================

ALTER TABLE "users" ADD CONSTRAINT "users_email_key" UNIQUE ("email");
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_userId_key" UNIQUE ("userId");
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_token_key" UNIQUE ("token");
ALTER TABLE "push_tokens" ADD CONSTRAINT "push_tokens_userId_token_key" UNIQUE ("userId", "token");
ALTER TABLE "villa_templates" ADD CONSTRAINT "villa_templates_code_key" UNIQUE ("code");
ALTER TABLE "project_phases" ADD CONSTRAINT "project_phases_projectId_orderIndex_key" UNIQUE ("projectId", "orderIndex");
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoiceNumber_key" UNIQUE ("invoiceNumber");
ALTER TABLE "contractors" ADD CONSTRAINT "contractors_email_key" UNIQUE ("email");
ALTER TABLE "daily_reports" ADD CONSTRAINT "daily_reports_projectId_date_key" UNIQUE ("projectId", "date");

-- =============================================================================
-- INDEXES
-- =============================================================================

CREATE INDEX "users_email_idx" ON "users"("email");
CREATE INDEX "users_role_idx" ON "users"("role");
CREATE INDEX "refresh_tokens_userId_idx" ON "refresh_tokens"("userId");
CREATE INDEX "refresh_tokens_token_idx" ON "refresh_tokens"("token");
CREATE INDEX "projects_clientId_idx" ON "projects"("clientId");
CREATE INDEX "projects_projectManagerId_idx" ON "projects"("projectManagerId");
CREATE INDEX "projects_status_idx" ON "projects"("status");
CREATE INDEX "project_phases_projectId_idx" ON "project_phases"("projectId");
CREATE INDEX "tasks_projectId_idx" ON "tasks"("projectId");
CREATE INDEX "tasks_phaseId_idx" ON "tasks"("phaseId");
CREATE INDEX "tasks_assigneeId_idx" ON "tasks"("assigneeId");
CREATE INDEX "tasks_status_idx" ON "tasks"("status");
CREATE INDEX "milestones_projectId_idx" ON "milestones"("projectId");
CREATE INDEX "milestones_targetDate_idx" ON "milestones"("targetDate");
CREATE INDEX "payments_projectId_idx" ON "payments"("projectId");
CREATE INDEX "payments_status_idx" ON "payments"("status");
CREATE INDEX "payments_dueDate_idx" ON "payments"("dueDate");
CREATE INDEX "media_projectId_idx" ON "media"("projectId");
CREATE INDEX "media_type_idx" ON "media"("type");
CREATE INDEX "issues_projectId_idx" ON "issues"("projectId");
CREATE INDEX "issues_status_idx" ON "issues"("status");
CREATE INDEX "issues_severity_idx" ON "issues"("severity");
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");
CREATE INDEX "notifications_isRead_idx" ON "notifications"("isRead");
CREATE INDEX "messages_projectId_idx" ON "messages"("projectId");
CREATE INDEX "messages_createdAt_idx" ON "messages"("createdAt");
CREATE INDEX "contractors_specialty_idx" ON "contractors"("specialty");
CREATE INDEX "smart_devices_projectId_idx" ON "smart_devices"("projectId");
CREATE INDEX "smart_devices_type_idx" ON "smart_devices"("type");
CREATE INDEX "weather_data_projectId_recordedAt_idx" ON "weather_data"("projectId", "recordedAt");
CREATE INDEX "daily_reports_projectId_idx" ON "daily_reports"("projectId");
CREATE INDEX "activities_projectId_idx" ON "activities"("projectId");
CREATE INDEX "activities_createdAt_idx" ON "activities"("createdAt");

-- =============================================================================
-- FOREIGN KEYS
-- =============================================================================

-- User Profiles
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Refresh Tokens
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Push Tokens
ALTER TABLE "push_tokens" ADD CONSTRAINT "push_tokens_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Projects
ALTER TABLE "projects" ADD CONSTRAINT "projects_clientId_fkey"
    FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "projects" ADD CONSTRAINT "projects_projectManagerId_fkey"
    FOREIGN KEY ("projectManagerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "projects" ADD CONSTRAINT "projects_villaTemplateId_fkey"
    FOREIGN KEY ("villaTemplateId") REFERENCES "villa_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Project Phases
ALTER TABLE "project_phases" ADD CONSTRAINT "project_phases_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Tasks
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_phaseId_fkey"
    FOREIGN KEY ("phaseId") REFERENCES "project_phases"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_parentTaskId_fkey"
    FOREIGN KEY ("parentTaskId") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assigneeId_fkey"
    FOREIGN KEY ("assigneeId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Milestones
ALTER TABLE "milestones" ADD CONSTRAINT "milestones_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "milestones" ADD CONSTRAINT "milestones_phaseId_fkey"
    FOREIGN KEY ("phaseId") REFERENCES "project_phases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Payments
ALTER TABLE "payments" ADD CONSTRAINT "payments_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "payments" ADD CONSTRAINT "payments_milestoneId_fkey"
    FOREIGN KEY ("milestoneId") REFERENCES "milestones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Media
ALTER TABLE "media" ADD CONSTRAINT "media_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "media" ADD CONSTRAINT "media_phaseId_fkey"
    FOREIGN KEY ("phaseId") REFERENCES "project_phases"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "media" ADD CONSTRAINT "media_taskId_fkey"
    FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "media" ADD CONSTRAINT "media_uploadedById_fkey"
    FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Issues
ALTER TABLE "issues" ADD CONSTRAINT "issues_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "issues" ADD CONSTRAINT "issues_phaseId_fkey"
    FOREIGN KEY ("phaseId") REFERENCES "project_phases"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "issues" ADD CONSTRAINT "issues_taskId_fkey"
    FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "issues" ADD CONSTRAINT "issues_reportedById_fkey"
    FOREIGN KEY ("reportedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "issues" ADD CONSTRAINT "issues_assignedToId_fkey"
    FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Notifications
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Messages
ALTER TABLE "messages" ADD CONSTRAINT "messages_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey"
    FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Smart Devices
ALTER TABLE "smart_devices" ADD CONSTRAINT "smart_devices_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Weather Data
ALTER TABLE "weather_data" ADD CONSTRAINT "weather_data_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Daily Reports
ALTER TABLE "daily_reports" ADD CONSTRAINT "daily_reports_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "daily_reports" ADD CONSTRAINT "daily_reports_submittedById_fkey"
    FOREIGN KEY ("submittedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Activities
ALTER TABLE "activities" ADD CONSTRAINT "activities_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
