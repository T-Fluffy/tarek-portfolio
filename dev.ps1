# Containerized portfolio workflow (no Node/npm required on the host).
#
# Usage:
#   .\dev.ps1 dev       # dev server with hot reload (docker-compose.dev.yml)
#   .\dev.ps1 up        # production-style stack (docker-compose.yml, detached)
#   .\dev.ps1 build     # build the production image
#   .\dev.ps1 down      # stop and remove containers
#   .\dev.ps1 logs      # follow frontend logs
#   .\dev.ps1 sh        # open a shell inside the dev container
#   .\dev.ps1 ps        # list running services
#
# Prerequisites: Docker with compose. Copy .env.example to .env and set BACKEND_URL.

param(
    [ValidateSet("dev", "up", "build", "down", "logs", "sh", "ps")]
    [string]$Command = "dev"
)

if (-not (Test-Path ".env")) {
    Write-Host "Missing .env - copy .env.example to .env and set BACKEND_URL." -ForegroundColor Yellow
    return
}

switch ($Command) {
    "dev"   { docker compose -f docker-compose.dev.yml up --build }
    "up"    { docker compose up --build -d }
    "build" { docker compose build }
    "down"  { docker compose -f docker-compose.dev.yml down }
    "logs"  { docker compose logs -f }
    "sh"    { docker compose -f docker-compose.dev.yml exec frontend-dev sh }
    "ps"    { docker compose ps }
}
