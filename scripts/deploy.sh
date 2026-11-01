#!/usr/bin/env bash
# Build the store and deploy the standalone output to /var/www/sanjuan.
# Production data in <deploy>/uploads is never touched.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOY_DIR="${DEPLOY_DIR:-/var/www/sanjuan}"
SERVICE="${SERVICE:-sanjuan.service}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:3003/}"

cd "$ROOT"

echo "==> Installing dependencies"
npm ci --prefer-offline

echo "==> Applying database migrations"
npx prisma migrate deploy

echo "==> Building"
npm run build

echo "==> Syncing build to $DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR/.next" "$DEPLOY_DIR/node_modules"
rsync -a --delete "$ROOT/.next/standalone/.next/" "$DEPLOY_DIR/.next/"
rsync -a --delete "$ROOT/.next/standalone/node_modules/" "$DEPLOY_DIR/node_modules/"
rsync -a "$ROOT/.next/standalone/server.js" "$ROOT/.next/standalone/package.json" "$DEPLOY_DIR/"
rsync -a --delete "$ROOT/.next/static/" "$DEPLOY_DIR/.next/static/"
rsync -a --delete "$ROOT/public/" "$DEPLOY_DIR/public/"

echo "==> Restarting $SERVICE"
systemctl restart "$SERVICE"

echo "==> Health check"
for _ in $(seq 1 30); do
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 "$HEALTH_URL" || true)"
  if [ "$code" = "200" ]; then
    echo "OK: $HEALTH_URL returned 200"
    exit 0
  fi
  sleep 1
done

echo "FAILED: $HEALTH_URL did not return 200" >&2
journalctl -u "$SERVICE" -n 40 --no-pager >&2 || true
exit 1
