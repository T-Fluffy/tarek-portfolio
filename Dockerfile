# syntax=docker/dockerfile:1

########################
# Build stage
########################
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies from the committed lockfile.
# Lifecycle scripts of dependencies are blocked (supply-chain hardening).
COPY package.json package-lock.json .npmrc ./
RUN npm ci --ignore-scripts --no-fund && npm audit --audit-level=high

# Build-time configuration
ARG VITE_API_URL
ARG VITE_BASE_PATH=/
ARG VITE_APP_TITLE
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_BASE_PATH=$VITE_BASE_PATH
ENV VITE_APP_TITLE=$VITE_APP_TITLE

COPY . .
RUN npm run build

########################
# Runtime stage (non-root nginx)
########################
FROM nginx:1.30.4-alpine3.24 AS runtime
WORKDIR /app

# Patch all base-image packages to the latest available (fixes known CVEs)
# in openssl, musl, zlib, libxml2, etc. at build time.
RUN apk upgrade --no-cache

# Static build output
COPY --from=build /app/dist /usr/share/nginx/html
# Nginx config (template: BACKEND_URL is substituted at container start)
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY security-headers.conf /etc/nginx/security-headers.conf

# Run nginx as the unprivileged 'nginx' user
USER nginx

# Default backend so the container works out of the box; override with -e at runtime.
ENV BACKEND_URL=https://tarek-portfolio-backend.onrender.com

EXPOSE 8080

# Substitute the Render backend URL, then start nginx with the generated config.
ENTRYPOINT ["/bin/sh", "-c", "envsubst '${BACKEND_URL}' < /etc/nginx/nginx.conf.template > /tmp/nginx.conf && exec nginx -c /tmp/nginx.conf -g 'daemon off;'"]