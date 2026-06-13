#!/bin/sh
set -e

echo "Syncing Prisma database schema..."
# db push syncs the schema without requiring migration files
# --skip-generate prevents it from trying to rebuild the client (which we already did in Docker)
npx prisma db push --skip-generate

echo "Starting Next.js application..."
exec node server.js