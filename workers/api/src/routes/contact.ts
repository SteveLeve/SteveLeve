import { Hono } from 'hono';
import { ContactFormSchema, type Env, type ApiResponse, type EmailTemplateData } from '../types';
import { EmailService } from '../email';
import { rateLimitMiddleware } from '../middleware';

const contact = new Hono<{ Bindings: Env }>();

// Apply rate limiting to contact form submissions (5 requests per 10 minutes)
contact.use('/submit', rateLimitMiddleware(5, 10 * 60 * 1000));

// Health check endpoint
contact.get('/health', (c) => {
  const response: ApiResponse = {
    success: true,
    message: 'Contact API is healthy',
    data: {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  };
  return c.json(response);
});

// Contact form submission endpoint
contact.post('/submit', async (c) => {
  try {
    // Parse and validate request body
    const body = await c.req.json();
    const validationResult = ContactFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      const response: ApiResponse = {
        success: false,
        error: 'Validation failed',
        data: {
          issues: validationResult.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
      };
      return c.json(response, 400);
    }
    
    const formData = validationResult.data;
    
    // Check for required environment variables
    const resendApiKey = c.env.RESEND_API_KEY;
    const contactEmail = c.env.CONTACT_EMAIL;
    
    if (!resendApiKey || !contactEmail) {
      console.error('Missing required environment variables:', {
        hasResendKey: !!resendApiKey,
        hasContactEmail: !!contactEmail,
      });
      
      const response: ApiResponse = {
        success: false,
        error: 'Email service configuration error',
      };
      return c.json(response, 500);
    }
    
    // Prepare email data
    const emailData: EmailTemplateData = {
      ...formData,
      timestamp: new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      }),
    };
    
    // Send email notification
    const emailService = new EmailService(resendApiKey);
    const emailSent = await emailService.sendContactNotification(emailData, contactEmail);
    
    if (!emailSent) {
      const response: ApiResponse = {
        success: false,
        error: 'Failed to send email notification',
      };
      return c.json(response, 500);
    }
    
    // Log successful submission (without sensitive data)
    console.log('Contact form submission successful:', {
      name: formData.name,
      email: formData.email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Partially mask email
      company: formData.company,
      subject: formData.subject,
      messageLength: formData.message.length,
      timestamp: emailData.timestamp,
    });
    
    // Return success response
    const response: ApiResponse = {
      success: true,
      message: 'Message sent successfully',
      data: {
        timestamp: emailData.timestamp,
      },
    };
    
    return c.json(response, 200);
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    const response: ApiResponse = {
      success: false,
      error: 'Failed to process contact form submission',
    };
    
    return c.json(response, 500);
  }
});

export default contact;