import type { EmailTemplateData } from './types';

export class EmailService {
  constructor(private apiKey: string) {}

  async sendContactNotification(data: EmailTemplateData, recipientEmail: string): Promise<boolean> {
    const emailHtml = this.generateEmailTemplate(data);
    const emailText = this.generateEmailText(data);

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Contact Form <noreply@steveleve.com>',
          to: [recipientEmail],
          subject: `New Contact Form Submission: ${data.subject}`,
          html: emailHtml,
          text: emailText,
          reply_to: data.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Resend API error:', response.status, errorData);
        return false;
      }

      const result = await response.json();
      console.log('Email sent successfully:', result.id);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  private generateEmailTemplate(data: EmailTemplateData): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: #6750A4;
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .field {
            margin-bottom: 20px;
        }
        .field-label {
            font-weight: 600;
            color: #6750A4;
            margin-bottom: 5px;
            display: block;
        }
        .field-value {
            background: white;
            padding: 12px;
            border-radius: 4px;
            border-left: 4px solid #6750A4;
        }
        .message-field {
            white-space: pre-wrap;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>New Contact Form Submission</h1>
        <p>Received: ${data.timestamp}</p>
    </div>
    
    <div class="content">
        <div class="field">
            <span class="field-label">Name:</span>
            <div class="field-value">${this.escapeHtml(data.name)}</div>
        </div>
        
        <div class="field">
            <span class="field-label">Email:</span>
            <div class="field-value">
                <a href="mailto:${this.escapeHtml(data.email)}">${this.escapeHtml(data.email)}</a>
            </div>
        </div>
        
        ${data.company ? `
        <div class="field">
            <span class="field-label">Company:</span>
            <div class="field-value">${this.escapeHtml(data.company)}</div>
        </div>
        ` : ''}
        
        <div class="field">
            <span class="field-label">Subject:</span>
            <div class="field-value">${this.escapeHtml(data.subject)}</div>
        </div>
        
        <div class="field">
            <span class="field-label">Message:</span>
            <div class="field-value message-field">${this.escapeHtml(data.message)}</div>
        </div>
    </div>
    
    <div class="footer">
        <p>This message was sent via the contact form on steveleve.com</p>
        <p>You can reply directly to this email to respond to ${this.escapeHtml(data.name)}.</p>
    </div>
</body>
</html>`;
  }

  private generateEmailText(data: EmailTemplateData): string {
    return `
New Contact Form Submission
Received: ${data.timestamp}

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ''}
Subject: ${data.subject}

Message:
${data.message}

---
This message was sent via the contact form on steveleve.com
You can reply directly to this email to respond to ${data.name}.
`;
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}