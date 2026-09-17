import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Turnstile from '../components/Turnstile';

describe('Turnstile Component', () => {
  it('renders nothing when no site key is configured', () => {
    const { container } = render(<Turnstile siteKey="" onTokenChange={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the widget container when a site key is configured', () => {
    render(<Turnstile siteKey="test-site-key" onTokenChange={() => {}} />);
    expect(screen.getByTestId('turnstile-widget')).toBeDefined();
  });

  it('requests the Cloudflare script exactly once for multiple instances', () => {
    // Drop script tags left behind by earlier tests so the count is exact.
    document
      .querySelectorAll(
        'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"]',
      )
      .forEach((el) => el.remove());
    render(
      <>
        <Turnstile siteKey="test-site-key" onTokenChange={() => {}} />
        <Turnstile siteKey="test-site-key" onTokenChange={() => {}} />
      </>,
    );
    const scripts = document.querySelectorAll(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"]',
    );
    expect(scripts.length).toBe(1);
  });

  it('forwards a solved token to the parent', async () => {
    const onTokenChange = vi.fn();
    let capturedCallback: ((token: string) => void) | undefined;
    window.turnstile = {
      render: (_el, options) => {
        capturedCallback = options.callback;
        return 'widget-1';
      },
      reset: () => {},
      remove: () => {},
    };
    try {
      render(<Turnstile siteKey="test-site-key" onTokenChange={onTokenChange} />);
      // Let the script-load promise chain run.
      await Promise.resolve();
      await new Promise((r) => setTimeout(r, 0));
      capturedCallback?.('token-abc');
      expect(onTokenChange).toHaveBeenCalledWith('token-abc');
    } finally {
      delete window.turnstile;
    }
  });
});
