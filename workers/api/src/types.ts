import { z } from 'zod';

// Contact form validation schema
export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email address').max(255, 'Email too long'),
  company: z.string().max(100, 'Company name too long').optional(),
  subject: z.string().min(10, 'Subject must be at least 10 characters').max(200, 'Subject too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message too long'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

// Environment variables interface
export interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Email template data
export interface EmailTemplateData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  timestamp: string;
}