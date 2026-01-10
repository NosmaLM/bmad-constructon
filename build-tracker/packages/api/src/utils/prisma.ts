/**
 * Prisma Client Singleton
 */

import { PrismaClient } from '@prisma/client';
import config from '../config';
import logger from './logger';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: config.isDevelopment
      ? [
          { emit: 'event', level: 'query' },
          { emit: 'stdout', level: 'error' },
          { emit: 'stdout', level: 'warn' },
        ]
      : [{ emit: 'stdout', level: 'error' }],
  });
};

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (config.isDevelopment) {
  globalThis.prisma = prisma;

  // Log queries in development
  prisma.$on('query' as never, (e: { query: string; duration: number }) => {
    logger.debug(`Query: ${e.query}`);
    logger.debug(`Duration: ${e.duration}ms`);
  });
}

export default prisma;
