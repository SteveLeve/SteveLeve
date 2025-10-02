import { Hono } from 'hono';
import { corsMiddleware, errorHandler, requestLogger } from './middleware';
import contact from './routes/contact';
import type { Env, ApiResponse } from './types';

// Create main Hono app
const app = new Hono<{ Bindings: Env }>();

// Apply global middleware
app.use('*', requestLogger);
app.use('*', corsMiddleware);
app.use('*', errorHandler);

// Health check endpoint
app.get('/', (c) => {
  const response: ApiResponse = {
    success: true,
    message: 'Consulting Website API',
    data: {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: [
        'GET / - API info',
        'GET /contact/health - Contact API health check',
        'POST /contact/submit - Submit contact form',
      ],
    },
  };
  return c.json(response);
});

// Mount contact routes
app.route('/contact', contact);

// 404 handler
app.notFound((c) => {
  const response: ApiResponse = {
    success: false,
    error: 'Endpoint not found',
    data: {
      path: c.req.path,
      method: c.req.method,
    },
  };
  return c.json(response, 404);
});

export default app;