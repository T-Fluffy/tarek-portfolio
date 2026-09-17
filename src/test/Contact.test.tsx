import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Contact from '../pages/Contact';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function fillContactForm(container: HTMLElement) {
  const setValue = (name: string, value: string) => {
    const input = container.querySelector(`input[name="${name}"], textarea[name="${name}"]`) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;
    if (!input) throw new Error(`field ${name} not found`);
    fireEvent.change(input, { target: { value } });
  };
  setValue('name', 'Tarek');
  setValue('email', 'test@example.com');
  setValue('subject', 'Hello');
  setValue('message', 'Test message');
}

describe('Contact page', () => {
  it('renders the form fields and submit button', () => {
    vi.stubEnv('VITE_TURNSTILE_SITE_KEY', '');
    render(<Contact />);
    expect(screen.getByText('INITIALIZE UPLINK')).toBeDefined();
  });

  it('hides the captcha widget when no site key is configured', () => {
    vi.stubEnv('VITE_TURNSTILE_SITE_KEY', '');
    render(<Contact />);
    expect(screen.queryByTestId('turnstile-widget')).toBeNull();
  });

  it('shows the offline panel when the backend reports captcha-unavailable', async () => {
    vi.stubEnv('VITE_TURNSTILE_SITE_KEY', '');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ status: 'ERROR', reason: 'captcha-unavailable' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );
    const { container } = render(<Contact />);
    fillContactForm(container);
    fireEvent.click(screen.getByText('INITIALIZE UPLINK'));

    expect(await screen.findByText('VERIFICATION_OFFLINE')).toBeDefined();
  });

  it('shows the success overlay on accepted sends', async () => {
    vi.stubEnv('VITE_TURNSTILE_SITE_KEY', '');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ status: 'SUCCESS' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );
    const { container } = render(<Contact />);
    fillContactForm(container);
    fireEvent.click(screen.getByText('INITIALIZE UPLINK'));

    expect(await screen.findByText('TRANSMISSION_COMPLETE')).toBeDefined();
  });
});
