import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    // Flag set once the Cloudflare script has been requested, so multiple
    // widget instances share a single <script> tag.
    __turnstileScriptRequested?: boolean;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
    window.__turnstileScriptRequested = true;
    try {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } catch {
      // Environments without script loading (e.g. happy-dom tests):
      // treat as a load failure so the caller falls back gracefully.
      return Promise.reject(new Error("Turnstile script failed to load"));
    }
  }
  return new Promise((resolve, reject) => {
    const script = document.querySelector(`script[src="${SCRIPT_SRC}"]`) as HTMLScriptElement;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("Turnstile script failed to load")), { once: true });
    // If the script was already loaded (cached / present), resolve on next tick.
    if (window.turnstile) resolve();
  });
}

interface TurnstileProps {
  siteKey: string;
  onTokenChange: (token: string | null) => void;
  /** Bump to force the widget back to its initial state (tokens are single-use). */
  resetKey?: number;
}

/**
 * Cloudflare Turnstile widget (explicit render, dark theme to match the site).
 * Renders nothing when no site key is configured.
 */
export default function Turnstile({ siteKey, onTokenChange, resetKey = 0 }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const callbackRef = useRef(onTokenChange);
  callbackRef.current = onTokenChange;

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        if (widgetIdRef.current) window.turnstile.remove(widgetIdRef.current);
        containerRef.current.innerHTML = "";
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "dark",
          callback: (token: string) => callbackRef.current(token),
          "expired-callback": () => callbackRef.current(null),
          "error-callback": () => callbackRef.current(null),
        });
      })
      .catch(() => callbackRef.current(null));

    return () => {
      cancelled = true;
    };
  }, [siteKey]);

  // Reset the widget when the parent asks (after every submit attempt).
  // Note: resetKey is intentionally the only dependency.
  useEffect(() => {
    if (resetKey > 0 && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      callbackRef.current(null);
    }
  }, [resetKey]);

  // Remove the widget on unmount.
  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  if (!siteKey) return null;

  return (
    <div
      ref={containerRef}
      data-testid="turnstile-widget"
      style={{ display: "flex", justifyContent: "center", margin: "8px 0 16px" }}
    />
  );
}
