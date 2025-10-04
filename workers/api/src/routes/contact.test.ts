import { Hono } from 'hono';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import contact from './contact';

const buildApp = () => {
  const app = new Hono();
  app.route('/contact', contact);
  return app;
};

const validPayload = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  company: 'Analytical Engines',
  subject: 'Consulting Opportunity for Modern Compute',
  message: 'We would like to discuss a collaboration on innovative compute architectures.'
};

describe('POST /contact/submit', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns a stubbed success response when stub mode is enabled', async () => {
    const app = buildApp();

    const response = await app.request('http://localhost/contact/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validPayload),
    }, {
      CONTACT_FORM_MODE: 'stub',
    } as any);

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.message).toMatch(/stub/i);
  });

  it('forwards submissions to Resend when live mode is active', async () => {
    const app = buildApp();

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ id: 'mock-email-id' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const response = await app.request('http://localhost/contact/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validPayload),
    }, {
      CONTACT_FORM_MODE: 'live',
      RESEND_API_KEY: 'test-key',
      CONTACT_EMAIL: 'owner@example.com',
    } as any);

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.resend.com/emails',
      expect.objectContaining({
        method: 'POST',
      }),
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
  });
});
