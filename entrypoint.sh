#!/bin/sh
set -e

echo "⏳ Syncing Prisma database schema..."
npx prisma db push

echo "🚀 Starting Next.js application..."
exec node server.js