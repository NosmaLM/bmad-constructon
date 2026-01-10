/**
 * App Integration Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';

// Create a minimal test app
function createTestApp() {
  const app = express();
  app.use(express.json());

  // Health check
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '0.1.0',
      environment: 'test',
    });
  });

  // Mock API routes
  app.get('/api/v1/test', (req, res) => {
    res.json({ success: true, data: { message: 'test' } });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Route not found' },
    });
  });

  return app;
}

describe('App', () => {
  let app: express.Application;

  beforeEach(() => {
    app = createTestApp();
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
      expect(response.body.timestamp).toBeDefined();
      expect(response.body.version).toBe('0.1.0');
    });
  });

  describe('API Routes', () => {
    it('should return success for valid routes', async () => {
      const response = await request(app).get('/api/v1/test');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/api/v1/unknown');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('Request Parsing', () => {
    it('should parse JSON body', async () => {
      const app = express();
      app.use(express.json());
      app.post('/test', (req, res) => {
        res.json({ received: req.body });
      });

      const response = await request(app)
        .post('/test')
        .send({ name: 'test', value: 123 })
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.received).toEqual({ name: 'test', value: 123 });
    });
  });
});
