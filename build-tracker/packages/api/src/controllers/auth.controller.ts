/**
 * Authentication Controller
 */

import { ERROR_CODES } from '@build-tracker/shared';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import config from '../config';
import { ApiError, AuthRequest } from '../middleware';
import prisma from '../utils/prisma';


// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export class AuthController {
  /**
   * Register a new user
   */
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = registerSchema.parse(req.body);

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email.toLowerCase() },
      });

      if (existingUser) {
        throw new ApiError(409, 'Email already registered', ERROR_CODES.ALREADY_EXISTS);
      }

      // Hash password
      const passwordHash = await bcrypt.hash(data.password, 12);

      // Create user
      const user = await prisma.user.create({
        data: {
          email: data.email.toLowerCase(),
          passwordHash,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          profile: {
            create: {},
          },
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
        },
      });

      // Generate tokens
      const tokens = await this.generateTokens(user.id, user.email, user.role);

      res.status(201).json({
        success: true,
        data: {
          user,
          tokens,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Login user
   */
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = loginSchema.parse(req.body);

      const user = await prisma.user.findUnique({
        where: { email: data.email.toLowerCase() },
      });

      if (!user) {
        throw new ApiError(401, 'Invalid credentials', ERROR_CODES.INVALID_CREDENTIALS);
      }

      const isValidPassword = await bcrypt.compare(data.password, user.passwordHash);

      if (!isValidPassword) {
        throw new ApiError(401, 'Invalid credentials', ERROR_CODES.INVALID_CREDENTIALS);
      }

      if (!user.isActive) {
        throw new ApiError(401, 'Account is deactivated', ERROR_CODES.UNAUTHORIZED);
      }

      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      // Generate tokens
      const tokens = await this.generateTokens(user.id, user.email, user.role);

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            avatarUrl: user.avatarUrl,
          },
          tokens,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Refresh access token
   */
  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new ApiError(400, 'Refresh token required', ERROR_CODES.INVALID_INPUT);
      }

      const storedToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new ApiError(401, 'Invalid refresh token', ERROR_CODES.TOKEN_INVALID);
      }

      // Delete old refresh token
      await prisma.refreshToken.delete({ where: { id: storedToken.id } });

      // Generate new tokens
      const tokens = await this.generateTokens(
        storedToken.user.id,
        storedToken.user.email,
        storedToken.user.role
      );

      res.json({
        success: true,
        data: { tokens },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get current user
   */
  me = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
          avatarUrl: true,
          role: true,
          isEmailVerified: true,
          isPhoneVerified: true,
          timezone: true,
          locale: true,
          createdAt: true,
          profile: true,
        },
      });

      res.json({
        success: true,
        data: { user },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Logout user
   */
  logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // Delete all refresh tokens for user
      await prisma.refreshToken.deleteMany({
        where: { userId: req.user!.id },
      });

      res.json({
        success: true,
        data: { message: 'Logged out successfully' },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Change password
   */
  changePassword = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
      });

      if (!user) {
        throw new ApiError(404, 'User not found', ERROR_CODES.NOT_FOUND);
      }

      const isValid = await bcrypt.compare(currentPassword, user.passwordHash);

      if (!isValid) {
        throw new ApiError(400, 'Current password is incorrect', ERROR_CODES.INVALID_INPUT);
      }

      const passwordHash = await bcrypt.hash(newPassword, 12);

      await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash },
      });

      // Invalidate all refresh tokens
      await prisma.refreshToken.deleteMany({
        where: { userId: user.id },
      });

      res.json({
        success: true,
        data: { message: 'Password changed successfully' },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Forgot password
   */
  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email: _email } = req.body;

      // Always return success to prevent email enumeration
      // In production, send email with reset link

      res.json({
        success: true,
        data: { message: 'If an account exists, a reset link has been sent' },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Reset password
   */
  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token: _token, newPassword: _newPassword } = req.body;

      // TODO: Implement password reset with token validation

      res.json({
        success: true,
        data: { message: 'Password has been reset' },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Verify email
   */
  verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token: _token } = req.body;

      // TODO: Implement email verification

      res.json({
        success: true,
        data: { message: 'Email verified successfully' },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Generate JWT tokens
   */
  private async generateTokens(userId: string, email: string, role: string) {
    const accessToken = jwt.sign(
      { userId, email, role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn as string }
    );

    const refreshToken = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await prisma.refreshToken.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
    };
  }
}
