import { Context, Next } from 'hono';
import type { ApiResponse } from './types';

// CORS middleware
export const corsMiddleware = async (c: Context, next: Next) => {
  // Set CORS headers
  c.header('Access-Control-Allow-Origin', '*'); // In production, set to specific domain
  c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  c.header('Access-Control-Max-Age', '86400');

  // Handle preflight requests
  if (c.req.method === 'OPTIONS') {
    return c.text('', 204);
  }

  await next();
};

// Rate limiting middleware (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const rateLimitMiddleware = (maxRequests: number = 10, windowMs: number = 60000) => {
  return async (c: Context, next: Next) => {
    const clientIP = c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For') || 'unknown';
    const now = Date.now();
    
    // Clean up expired entries
    for (const [ip, data] of rateLimitMap.entries()) {
      if (now > data.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
    
    const clientData = rateLimitMap.get(clientIP);
    
    if (!clientData) {
      // First request from this IP
      rateLimitMap.set(clientIP, { count: 1, resetTime: now + windowMs });
    } else if (now > clientData.resetTime) {
      // Reset window
      rateLimitMap.set(clientIP, { count: 1, resetTime: now + windowMs });
    } else if (clientData.count >= maxRequests) {
      // Rate limit exceeded
      const response: ApiResponse = {
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
      };
      return c.json(response, 429);
    } else {
      // Increment count
      clientData.count++;
    }
    
    await next();
  };
};

// Error handling middleware
export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    console.error('Unhandled error:', error);
    
    const response: ApiResponse = {
      success: false,
      error: 'Internal server error',
    };
    
    return c.json(response, 500);
  }
};

// Request logging middleware
export const requestLogger = async (c: Context, next: Next) => {
  const start = Date.now();
  const method = c.req.method;
  const url = c.req.url;
  const userAgent = c.req.header('User-Agent') || 'unknown';
  const clientIP = c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For') || 'unknown';
  
  console.log(`[${new Date().toISOString()}] ${method} ${url} - IP: ${clientIP} - UA: ${userAgent}`);
  
  await next();
  
  const duration = Date.now() - start;
  const status = c.res.status;
  
  console.log(`[${new Date().toISOString()}] ${method} ${url} - ${status} - ${duration}ms`);
};