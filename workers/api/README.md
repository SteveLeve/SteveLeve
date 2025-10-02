# Consulting Website API Worker

This Cloudflare Worker handles the contact form submissions for the consulting website using the Hono framework.

## Features

- **Contact Form Processing**: Validates and processes contact form submissions
- **Email Notifications**: Sends formatted email notifications using Resend
- **Rate Limiting**: Prevents spam with configurable rate limits
- **Input Validation**: Uses Zod for robust input validation
- **CORS Support**: Handles cross-origin requests properly
- **Error Handling**: Comprehensive error handling and logging

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Set up your environment variables using Wrangler:

```bash
# Set your Resend API key
wrangler secret put RESEND_API_KEY

# Set your contact email address
wrangler secret put CONTACT_EMAIL
```

### 3. Development

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:8787`

### 4. Testing

Test the contact form endpoint:

```bash
curl -X POST http://localhost:8787/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test message from API",
    "message": "This is a test message to verify the API is working correctly."
  }'
```

### 5. Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

## API Endpoints

### GET /
- **Description**: API information and health check
- **Response**: JSON with API details and available endpoints

### GET /contact/health
- **Description**: Contact API health check
- **Response**: JSON with health status

### POST /contact/submit
- **Description**: Submit contact form
- **Rate Limit**: 5 requests per 10 minutes per IP
- **Request Body**:
  ```json
  {
    "name": "string (2-100 chars)",
    "email": "string (valid email, max 255 chars)",
    "company": "string (optional, max 100 chars)",
    "subject": "string (10-200 chars)",
    "message": "string (10-2000 chars)"
  }
  ```
- **Response**: JSON with success/error status

## Environment Variables

- `RESEND_API_KEY`: Your Resend API key for sending emails
- `CONTACT_EMAIL`: Email address to receive contact form submissions

## Email Service

The Worker uses [Resend](https://resend.com) for email delivery. The service:

- Sends HTML and plain text versions of emails
- Sets the reply-to address to the form submitter's email
- Includes all form data in a formatted template
- Handles errors gracefully with fallback messaging

## Rate Limiting

Contact form submissions are rate-limited to prevent spam:
- **Limit**: 5 submissions per 10 minutes per IP address
- **Method**: In-memory storage (resets on Worker restart)
- **Response**: 429 status code when limit exceeded

## Security Features

- Input validation with Zod schemas
- HTML escaping in email templates
- CORS headers for cross-origin requests
- Request logging for monitoring
- Error handling without exposing sensitive information

## Production Configuration

For production deployment:

1. Set up custom domain routing in `wrangler.toml`
2. Configure environment-specific variables
3. Update CORS origins to specific domains
4. Set up monitoring and alerting
5. Configure DNS records for custom domain

## Monitoring

The Worker logs:
- All requests with IP addresses and user agents
- Successful form submissions (with masked email addresses)
- Errors and failures
- Rate limiting events

Check logs with:
```bash
wrangler tail
```