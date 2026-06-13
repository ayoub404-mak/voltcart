#!/bin/sh
set -e

echo "Running Prisma database migrations..."
# This applies any pending migrations safely without prompting
npx prisma migrate deploy

echo "Starting Next.js application..."
# 'exec' replaces the shell process with the Node process, 
# ensuring proper signal handling (like graceful shutdowns)
exec node server.js