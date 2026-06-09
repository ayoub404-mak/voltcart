# ---- Stage 1: Dependencies ----
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma 

RUN npm ci

# ---- Stage 2: Builder ----
FROM node:20-alpine AS builder
WORKDIR /app


ARG DATABASE_URL
ARG IMAGEKIT_PUBLIC_KEY
ARG IMAGEKIT_PRIVATE_KEY
ARG IMAGEKIT_URL_ENDPOINT
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ARG STRIPE_SECRET_KEY
ARG STRIPE_WEBHOOK_SECRET
ARG INNGEST_EVENT_KEY
ARG INNGEST_SIGNING_KEY
ARG NEXT_PUBLIC_CURRENCY_SYMBOL
ARG ADMIN_EMAIL


ENV DATABASE_URL=$DATABASE_URL
ENV IMAGEKIT_PUBLIC_KEY=$IMAGEKIT_PUBLIC_KEY
ENV IMAGEKIT_PRIVATE_KEY=$IMAGEKIT_PRIVATE_KEY
ENV IMAGEKIT_URL_ENDPOINT=$IMAGEKIT_URL_ENDPOINT
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET
ENV INNGEST_EVENT_KEY=$INNGEST_EVENT_KEY
ENV INNGEST_SIGNING_KEY=$INNGEST_SIGNING_KEY
ENV NEXT_PUBLIC_CURRENCY_SYMBOL=$NEXT_PUBLIC_CURRENCY_SYMBOL
ENV ADMIN_EMAIL=$ADMIN_EMAIL

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the Next.js app
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Stage 3: Runner ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma schema and related files
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts ./prisma.config.ts

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]