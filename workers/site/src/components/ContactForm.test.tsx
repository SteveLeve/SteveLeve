import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import ContactForm from './ContactForm';

const fillForm = async (user: ReturnType<typeof userEvent['setup']>) => {
  await user.type(screen.getByLabelText(/Name/i), 'Ada Lovelace');
  await user.type(screen.getByLabelText(/Email/i), 'ada@example.com');
  await user.type(screen.getByLabelText(/Subject/i), 'Consulting Opportunity');
  await user.type(
    screen.getByLabelText(/Message/i),
    'We would love to hire you for a distributed systems engagement.'
  );
};

describe('ContactForm component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('surfaces API error details to the user on failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          success: false,
          error: 'Email service configuration error',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    );

    render(<ContactForm />);
    const user = userEvent.setup();
    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email service configuration error/i)).toBeInTheDocument();
    });
  });

  it('renders stub mode success messaging when email delivery is disabled', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          message: 'Message received in stub mode. Email delivery is disabled in this environment.',
          data: {
            delivery: { mode: 'stub', delivered: false },
          },
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    );

    render(<ContactForm />);
    const user = userEvent.setup();
    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/stub mode/i)).toBeInTheDocument();
    });
  });
});
