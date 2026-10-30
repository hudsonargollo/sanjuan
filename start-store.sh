#!/bin/bash
# SanJuan Mini Market store — Next.js standalone server startup script
set -u

APP_DIR="/root/ClubeMkt/sanjuan"
PORT="${PORT:-3000}"
HOST="${HOST:-0.0.0.0}"
LOG="/var/log/sanjuan-next.log"
PIDFILE="/run/sanjuan-next.pid"

cd "$APP_DIR" || exit 1

# Use production env (secure defaults). DATABASE_URL / NEXT_PUBLIC_SITE_URL
# are injected by the platform's environment, never committed.
export NODE_ENV=production

# Start the Next.js standalone server
exec node .next/standalone/server.js
