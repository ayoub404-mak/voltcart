#!/bin/sh
set -e

echo "⏳ Syncing Prisma database schema..."
# Just run db push without any flags
npx prisma db push

echo "🚀 Starting Next.js application..."
exec node server.js