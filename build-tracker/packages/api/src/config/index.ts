/**
 * Application Configuration
 */

import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenvConfig({ path: resolve(__dirname, '../../../../.env') });

export const config = {
  // Environment
  env: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',

  // Server
  port: parseInt(process.env.API_PORT || '3000', 10),
  host: process.env.API_HOST || 'localhost',
  apiUrl: process.env.API_URL || 'http://localhost:3000',

  // Database
  databaseUrl: process.env.DATABASE_URL || '',

  // Redis
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-development-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },

  // CORS
  cors: {
    origins: (process.env.CORS_ORIGINS || 'http://localhost:8081,http://localhost:19006').split(','),
  },

  // AWS S3
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || 'af-south-1',
    s3Bucket: process.env.AWS_S3_BUCKET || 'build-tracker-uploads',
  },

  // Email
  email: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
    from: process.env.EMAIL_FROM || 'noreply@constructon.co.zw',
  },

  // Push Notifications
  expo: {
    accessToken: process.env.EXPO_ACCESS_TOKEN || '',
  },

  // Sentry
  sentry: {
    dsn: process.env.SENTRY_DSN || '',
    environment: process.env.SENTRY_ENVIRONMENT || 'development',
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },

  // Logging
  logLevel: process.env.LOG_LEVEL || 'debug',

  // Feature Flags
  features: {
    enableSwagger: process.env.ENABLE_SWAGGER === 'true',
    enableGraphQL: process.env.ENABLE_GRAPHQL === 'true',
  },
} as const;

// Validate required configuration in production
export function validateConfig(): void {
  const required: string[] = [];

  if (config.isProduction) {
    if (!config.databaseUrl) required.push('DATABASE_URL');
    if (!config.jwt.secret || config.jwt.secret === 'your-development-secret') {
      required.push('JWT_SECRET');
    }
  }

  if (required.length > 0) {
    throw new Error(
      `Missing required environment variables: ${required.join(', ')}`
    );
  }
}

export default config;
