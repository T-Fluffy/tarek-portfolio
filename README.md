# 💼 Tarek.dev — Developer Portfolio

A cyberpunk-inspired developer portfolio built with **React 19 + TypeScript + Vite**.
The contact form is served by a **.NET 8** backend (hosted on Render) that relays
messages via **Resend**. The site is published on **GitHub Pages** and can also be
run anywhere with **Docker**.

## 🏗️ Architecture

```
┌─────────────────────────┐        ┌───────────────────────────────┐
│ GitHub Pages (public)   │        │ Render (backend)              │
│ Static SPA (dist)       │  CORS  │ Portfolio.Backend (.NET 8)    │
│                         │───────▶│ → Resend API → your inbox     │
└─────────────────────────┘        └───────────────────────────────┘
┌─────────────────────────┐        ┌───────────────────────────────┐
│ Docker (self-host)      │        │ same Render backend, proxied  │
│ nginx SPA + /api proxy  │───────▶│ server-side (no CORS needed)  │
└─────────────────────────┘        └───────────────────────────────┘
```

> The backend lives in its own repository: **[T-Fluffy/tarek-portfolio-backend](https://github.com/T-Fluffy/tarek-portfolio-backend)**.

## 🐳 Docker (self-host or dev)

Requires Docker with compose. Copy `.env.example` to `.env` and set `BACKEND_URL`
to your Render backend URL.

| Command | What it does |
| :--- | :--- |
| `.\dev.ps1 dev` | Dev server with hot reload (no Node/npm on your host) |
| `.\dev.ps1 up` | Production-style nginx container on `http://localhost:8080` |
| `.\dev.ps1 build` | Build the production image |
| `.\dev.ps1 down` | Stop and remove containers |
| `.\dev.ps1 logs` | Follow logs |

The production image is multi-stage: dependencies are installed with
`npm ci --ignore-scripts` inside a throwaway `node:22-alpine` builder, and the
runtime is a **non-root nginx** serving only static files. `/api` requests are
proxied to the Render backend, so the browser stays same-origin.

## 🚀 GitHub Pages deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which:

1. Installs pinned dependencies (`npm ci --ignore-scripts`) and audits them.
2. Builds with `VITE_API_URL` from the **`VITE_API_URL` repository secret**.
3. Publishes `dist/` to the `gh-pages` branch (same mechanism as before).

> **One-time setup:** add a repository secret named `VITE_API_URL` with your Render
> backend URL (e.g. `https://your-api.onrender.com`). The Pages source stays
> "Deploy from a branch: `gh-pages`".

## 🛡️ Security measures

- **Supply chain**: committed `package-lock.json` pins exact versions; all installs
  use `npm ci --ignore-scripts` (lifecycle scripts blocked); `npm audit` gates the build.
- **CI scanning**: `osv-scanner` on the lockfile and **Trivy** CVE scan on the Docker image.
- **Dependabot**: automated security-update PRs for npm + GitHub Actions.
- **CSP**: a Content-Security-Policy (meta tag + nginx header) allows only the required
  GitHub / socialify image hosts and blocks inline scripts.
- **nginx**: `server_tokens off`, dotfile access denied, immutable hashing for assets,
  HSTS/clickjacking/sniffing headers, non-root user.
- **Backend** (in `tarek-portfolio-backend`): input validation, honeypot anti-spam,
  email subject/body sanitization, IP-aware rate limiting, non-root container.

## 🧪 Testing

```bash
npm run test:run   # Vitest + happy-dom
```

## 📦 Environment

See `.env.example`. Notable variables:

| Variable | Purpose |
| :--- | :--- |
| `VITE_APP_TITLE` | `<title>` content |
| `VITE_API_URL` | Full backend URL (GH Pages builds) or empty (Docker / dev proxy) |
| `VITE_BASE_PATH` | `/tarek-portfolio/` for GH Pages, `/` for Docker |
| `BACKEND_URL` | Backend URL used by the Docker nginx proxy / dev proxy |
