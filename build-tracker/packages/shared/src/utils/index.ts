/**
 * Build Tracker Shared Utilities
 */

import { PATTERNS, PAGINATION, FILE_LIMITS } from '../constants';

/**
 * Format currency amount
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return PATTERNS.EMAIL.test(email);
}

/**
 * Validate Zimbabwe phone number
 */
export function isValidZimbabwePhone(phone: string): boolean {
  return PATTERNS.PHONE_ZW.test(phone);
}

/**
 * Validate international phone number
 */
export function isValidInternationalPhone(phone: string): boolean {
  return PATTERNS.PHONE_INTL.test(phone);
}

/**
 * Validate UUID format
 */
export function isValidUUID(uuid: string): boolean {
  return PATTERNS.UUID.test(uuid);
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): boolean {
  return PATTERNS.PASSWORD.test(password);
}

/**
 * Get password strength feedback
 */
export function getPasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  else feedback.push('At least 8 characters');

  if (/[a-z]/.test(password)) score++;
  else feedback.push('At least one lowercase letter');

  if (/[A-Z]/.test(password)) score++;
  else feedback.push('At least one uppercase letter');

  if (/\d/.test(password)) score++;
  else feedback.push('At least one number');

  if (/[@$!%*?&]/.test(password)) score++;
  else feedback.push('At least one special character (@$!%*?&)');

  return { score, feedback };
}

/**
 * Sanitize pagination params
 */
export function sanitizePagination(params: {
  page?: number | string;
  limit?: number | string;
}): { page: number; limit: number; offset: number } {
  const page = Math.max(1, Number(params.page) || PAGINATION.DEFAULT_PAGE);
  const limit = Math.min(
    PAGINATION.MAX_LIMIT,
    Math.max(1, Number(params.limit) || PAGINATION.DEFAULT_LIMIT)
  );
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

/**
 * Check if file type is allowed for upload
 */
export function isAllowedFileType(
  mimeType: string,
  category: 'image' | 'video' | 'document'
): boolean {
  switch (category) {
    case 'image':
      return (FILE_LIMITS.ALLOWED_IMAGE_TYPES as readonly string[]).includes(mimeType);
    case 'video':
      return (FILE_LIMITS.ALLOWED_VIDEO_TYPES as readonly string[]).includes(mimeType);
    case 'document':
      return (FILE_LIMITS.ALLOWED_DOCUMENT_TYPES as readonly string[]).includes(mimeType);
    default:
      return false;
  }
}

/**
 * Check if file size is within limits
 */
export function isFileSizeAllowed(
  size: number,
  category: 'image' | 'video' | 'document'
): boolean {
  switch (category) {
    case 'image':
      return size <= FILE_LIMITS.MAX_IMAGE_SIZE;
    case 'video':
      return size <= FILE_LIMITS.MAX_VIDEO_SIZE;
    case 'document':
      return size <= FILE_LIMITS.MAX_DOCUMENT_SIZE;
    default:
      return false;
  }
}

/**
 * Generate initials from name
 */
export function getInitials(firstName: string, lastName?: string): string {
  const first = firstName.charAt(0).toUpperCase();
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return first + last;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Slugify a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Pick specific keys from an object
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * Omit specific keys from an object
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result as Omit<T, K>;
}

/**
 * Calculate project progress based on phases
 */
export function calculateProjectProgress(
  phases: Array<{ progressPercentage: number; orderIndex: number }>
): number {
  if (phases.length === 0) return 0;
  const totalProgress = phases.reduce(
    (sum, phase) => sum + phase.progressPercentage,
    0
  );
  return Math.round(totalProgress / phases.length);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;

  return then.toLocaleDateString();
}
