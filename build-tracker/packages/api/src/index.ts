/**
 * Build Tracker API Entry Point
 */

import app from './app';
import config, { validateConfig } from './config';
import logger from './utils/logger';
import prisma from './utils/prisma';

async function main() {
  try {
    // Validate configuration
    validateConfig();

    // Test database connection
    await prisma.$connect();
    logger.info('Database connected successfully');

    // Start server
    const server = app.listen(config.port, config.host, () => {
      logger.info(
        `Server running on http://${config.host}:${config.port} in ${config.env} mode`
      );
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      logger.info(`${signal} received. Shutting down gracefully...`);

      server.close(async () => {
        logger.info('HTTP server closed');
        await prisma.$disconnect();
        logger.info('Database connection closed');
        process.exit(0);
      });

      // Force shutdown after 30s
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 30000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();
