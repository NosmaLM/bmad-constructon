/**
 * User Controller
 */

import { Response, NextFunction } from 'express';
import { AuthRequest, ApiError } from '../middleware';
import prisma from '../utils/prisma';
import { ERROR_CODES, sanitizePagination } from '@build-tracker/shared';

export class UserController {
  /**
   * Get current user's profile
   */
  getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const profile = await prisma.userProfile.findUnique({
        where: { userId: req.user!.id },
      });

      res.json({
        success: true,
        data: { profile },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update current user's profile
   */
  updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { bio, company, jobTitle, address, city, country } = req.body;

      const profile = await prisma.userProfile.upsert({
        where: { userId: req.user!.id },
        update: { bio, company, jobTitle, address, city, country },
        create: {
          userId: req.user!.id,
          bio,
          company,
          jobTitle,
          address,
          city,
          country,
        },
      });

      res.json({
        success: true,
        data: { profile },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update user preferences
   */
  updatePreferences = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { preferences } = req.body;

      const profile = await prisma.userProfile.upsert({
        where: { userId: req.user!.id },
        update: { preferences },
        create: { userId: req.user!.id, preferences },
      });

      res.json({
        success: true,
        data: { profile },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update user avatar
   */
  updateAvatar = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { avatarUrl } = req.body;

      const user = await prisma.user.update({
        where: { id: req.user!.id },
        data: { avatarUrl },
        select: { id: true, avatarUrl: true },
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
   * List all users (admin)
   */
  listUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { page, limit, offset } = sanitizePagination(req.query);
      const { role, search } = req.query;

      const where: any = {};
      if (role) where.role = role;
      if (search) {
        where.OR = [
          { firstName: { contains: search as string, mode: 'insensitive' } },
          { lastName: { contains: search as string, mode: 'insensitive' } },
          { email: { contains: search as string, mode: 'insensitive' } },
        ];
      }

      const [users, totalItems] = await Promise.all([
        prisma.user.findMany({
          where,
          skip: offset,
          take: limit,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            isActive: true,
            createdAt: true,
            lastLoginAt: true,
          },
        }),
        prisma.user.count({ where }),
      ]);

      res.json({
        success: true,
        data: {
          items: users,
          pagination: {
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            hasMore: page * limit < totalItems,
          },
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get user by ID (admin)
   */
  getUserById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
          avatarUrl: true,
          role: true,
          isActive: true,
          isEmailVerified: true,
          createdAt: true,
          lastLoginAt: true,
          profile: true,
        },
      });

      if (!user) {
        throw new ApiError(404, 'User not found', ERROR_CODES.NOT_FOUND);
      }

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
   * Update user (admin)
   */
  updateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, phoneNumber, role, isActive } = req.body;

      const user = await prisma.user.update({
        where: { id },
        data: { firstName, lastName, phoneNumber, role, isActive },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
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
   * Delete user (admin)
   */
  deleteUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await prisma.user.delete({ where: { id } });

      res.json({
        success: true,
        data: { message: 'User deleted successfully' },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };
}
