
# Skylevel Deployment Guide - Next.js 14

**Version**: 2.0  
**Last Updated**: January 2025  
**Target Platform**: Replit Autoscale Deployments  
**Stack**: Next.js 14 + TypeScript + Prisma  
**Status**: Greenfield Rebuild Ready

---

## Table of Contents

1. [Overview](#overview)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [Environment Configuration](#environment-configuration)
4. [Deployment Types](#deployment-types)
5. [Step-by-Step Deployment](#step-by-step-deployment)
6. [Post-Deployment Verification](#post-deployment-verification)
7. [Custom Domain Setup](#custom-domain-setup)
8. [Monitoring & Maintenance](#monitoring--maintenance)
9. [Rollback Procedures](#rollback-procedures)
10. [Troubleshooting](#troubleshooting)

---

## Overview

Skylevel uses **Next.js 14 (App Router)** deployed on **Replit Autoscale Deployments**. This provides:

- ✅ Server-side rendering and static generation
- ✅ Automatic scaling based on traffic
- ✅ Zero-downtime deployments
- ✅ Built-in SSL/HTTPS
- ✅ Custom domain support
- ✅ Pay-per-use pricing (scale to zero when idle)
- ✅ 99.95% uptime SLA

### Deployment Architecture

```
User Request
    ↓
Replit CDN (Global)
    ↓
Load Balancer
    ↓
Autoscale Instances (1-N)
    ↓
Next.js App (SSR + API Routes)
    ↓
PostgreSQL Database (Prisma)
```

---

## Pre-Deployment Checklist

### Code Readiness

- [ ] Next.js builds successfully (`npm run build`)
- [ ] All TypeScript errors resolved (`npm run type-check`)
- [ ] No console errors in production build
- [ ] All environment variables documented
- [ ] Database migrations applied (`npx prisma migrate deploy`)
- [ ] API routes tested and documented

### Production Optimization

- [ ] Remove debug logging (`console.log` statements)
- [ ] Enable production mode (`NODE_ENV=production`)
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics (Mixpanel/PostHog)
- [ ] Review security headers in `next.config.js`
- [ ] Image optimization configured (next/image)

### Performance Targets

| Metric | Target | How to Verify |
|--------|--------|---------------|
| First Contentful Paint | < 1.5s | Lighthouse CI |
| Time to Interactive | < 3s | Lighthouse CI |
| Lighthouse Score | 95+ | Run `npm run lighthouse` |
| Bundle Size (First Load JS) | < 300KB | Check build output |

---

## Environment Configuration

### Environment Variables

Create `.env.local` for development and configure production secrets in Replit Secrets:

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=Skylevel
NEXT_PUBLIC_APP_URL=https://skylevel.com

# Database (Prisma)
DATABASE_URL=postgresql://user:password@host:5432/skylevel_prod
DIRECT_URL=postgresql://user:password@host:5432/skylevel_prod

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# External Services
SENDGRID_API_KEY=SG.xxxxx
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_REFERRALS=true

# Security
SESSION_SECRET=<generate-secure-random-string>
CORS_ORIGIN=https://skylevel.com
```

### Replit Secrets Setup

1. Open your Repl
2. Click **Tools** → **Secrets**
3. Add each environment variable:
   - Key: `DATABASE_URL`
   - Value: Your PostgreSQL connection string
4. Repeat for all production variables

**Never hardcode secrets in code or commit `.env` files!**

---

## Deployment Types

### 1. Autoscale Deployment (Recommended)

**Best For**: Next.js web applications with variable traffic

**Specs**:
- **vCPU**: 0.5-2 vCPU (scales automatically)
- **Memory**: 1-4 GiB (scales automatically)
- **Pricing**: $0.00035/min when active, $0 when idle
- **Uptime**: 99.95% SLA

**When to Use**:
- Web applications with Next.js SSR
- APIs with HTTP/WebSocket traffic
- Variable traffic patterns
- Want to minimize costs when idle

### 2. Reserved VM (Alternative)

**Best For**: Dedicated resources or background workers

**Specs**:
- **vCPU**: 1-8 vCPU (fixed)
- **Memory**: 2-16 GiB (fixed)
- **Pricing**: Fixed monthly cost
- **Uptime**: 99.9% SLA

**When to Use**:
- Background workers (cron jobs)
- Long-running connections
- Cost certainty required

---

## Step-by-Step Deployment

### Phase 1: Prepare Build

#### Step 1: Initialize Next.js Project

```bash
# Create Next.js 14 app with TypeScript and Tailwind
npx create-next-app@latest skylevel --typescript --tailwind --app --no-src-dir

cd skylevel

# Install dependencies
npm install @prisma/client @clerk/nextjs zod zustand react-hook-form
npm install -D prisma @types/node
```

#### Step 2: Configure Next.js for Replit

Create/update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output standalone for optimized deployments
  output: 'standalone',
  
  // Configure host and port for Replit
  serverRuntimeConfig: {
    host: '0.0.0.0',
    port: 5000,
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },
  
  // Image optimization
  images: {
    domains: ['img.clerk.com'], // Add Clerk avatar domain
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
```

#### Step 3: Set Up Prisma

```bash
# Initialize Prisma
npx prisma init

# Create schema (see DATABASE_SCHEMA.md)
# Then run migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

Update `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// Add your models from DATABASE_SCHEMA.md
```

#### Step 4: Configure Package Scripts

Update `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -H 0.0.0.0 -p 5000",
    "build": "prisma generate && next build",
    "start": "next start -H 0.0.0.0 -p 5000",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "prisma:migrate": "prisma migrate deploy",
    "prisma:studio": "prisma studio",
    "deploy:check": "npm run type-check && npm run lint && npm run build"
  }
}
```

### Phase 2: Deploy to Replit

#### Step 1: Access Deployment Tool

1. Open your Repl in the Replit workspace
2. Click the **Deploy** button (top-right, ship icon)
3. Or open **Tools** → **Deployments**

#### Step 2: Choose Deployment Type

Select **Autoscale Deployment**:

- Click **New Deployment**
- Select **Autoscale**
- Click **Configure**

#### Step 3: Configure Deployment Settings

**Build Command**:
```bash
npm run build
```

**Run Command**:
```bash
npm run start
```

**Deployment Name**: `skylevel-production`

**Auto-deploy**: Toggle ON (deploys on every push to main)

#### Step 4: Set Environment Variables

In the Deployment configuration:

1. Click **Environment Variables**
2. Import from Secrets (recommended)
3. Or manually add production variables
4. Verify these critical variables are set:
   - `NODE_ENV=production`
   - `DATABASE_URL=<your-postgres-url>`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-key>`
   - `CLERK_SECRET_KEY=<your-clerk-secret>`

#### Step 5: Deploy

1. Click **Deploy**
2. Wait for build to complete (3-7 minutes for Next.js)
3. Monitor build logs for errors
4. Verify deployment status shows **Active**

### Phase 3: Verify Deployment

#### Step 1: Test Deployment URL

Your app will be live at:
```
https://skylevel-<username>.replit.app
```

Test critical paths:
- [ ] Homepage loads (SSR working)
- [ ] Authentication flow works (Clerk)
- [ ] API routes respond (`/api/health`)
- [ ] Database queries work (Prisma)
- [ ] No console errors
- [ ] Mobile responsive

#### Step 2: Run Smoke Tests

```bash
# Health check
curl -I https://skylevel-<username>.replit.app/api/health

# Expected: HTTP/2 200
```

Test user flows:
1. Sign up / Log in (Clerk)
2. Browse jobs (SSR + client filtering)
3. View candidate profile (dynamic route)
4. Create shortlist (API route)
5. View Fit Queue (Server Component)

---

## Post-Deployment Verification

### Performance Check

Run Lighthouse audit:

```bash
npx lighthouse https://skylevel-<username>.replit.app \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=html \
  --output-path=./lighthouse-report.html
```

**Target Scores**:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

### Security Check

Verify security headers:

```bash
curl -I https://skylevel-<username>.replit.app
```

**Required Headers** (configured in `next.config.js`):
- `Strict-Transport-Security` (HSTS)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: origin-when-cross-origin`

### Database Check

Verify Prisma migrations:

```bash
# Check migration status
npx prisma migrate status

# Run any pending migrations
npx prisma migrate deploy
```

### Error Monitoring

1. Trigger a test error in development
2. Verify Sentry captures it
3. Check error dashboard
4. Confirm alerting works

---

## Custom Domain Setup

### Step 1: Add Domain to Replit

1. Go to Deployment settings
2. Click **Custom Domains**
3. Click **Add Domain**
4. Enter `skylevel.com`

### Step 2: Configure DNS

Add these records to your DNS provider (e.g., Cloudflare):

**For Root Domain** (`skylevel.com`):
```
Type: A
Name: @
Value: <IP provided by Replit>
TTL: Auto
```

**For WWW Subdomain** (`www.skylevel.com`):
```
Type: CNAME
Name: www
Value: skylevel-<username>.replit.app
TTL: Auto
```

### Step 3: Update Next.js Config

Add domain to `next.config.js`:

```javascript
const nextConfig = {
  // ... other config
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.skylevel.com' }],
        destination: 'https://skylevel.com/:path*',
        permanent: true,
      },
    ];
  },
}
```

### Step 4: Verify Domain

1. Wait for DNS propagation (5-60 minutes)
2. Replit will automatically provision SSL certificate
3. Verify at: `https://skylevel.com`

---

## Monitoring & Maintenance

### Health Check Endpoint

Create `app/api/health/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version,
      database: 'connected',
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Database connection failed',
      },
      { status: 500 }
    );
  }
}
```

Test: `curl https://skylevel.com/api/health`

### Uptime Monitoring

Set up external monitoring:

**UptimeRobot** (free):
1. Add monitor for `https://skylevel.com/api/health`
2. Check interval: 5 minutes
3. Alert via email/Slack on downtime

### Log Management

**Access Logs**:
- View in Replit Deployment console
- Real-time streaming during deployment

**Application Logs**:
```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, meta?: any) => {
    console.log(JSON.stringify({ level: 'info', message, ...meta }));
  },
  error: (message: string, error?: Error, meta?: any) => {
    console.error(JSON.stringify({ 
      level: 'error', 
      message, 
      error: error?.message,
      stack: error?.stack,
      ...meta 
    }));
  },
};
```

### Performance Monitoring

**Next.js Built-in** (Analytics):
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Replit Built-in Metrics**:
- CPU usage
- Memory usage
- Request count
- Response time

---

## Rollback Procedures

### Scenario 1: Bad Deployment

**If deployment fails during build**:

1. Replit will keep previous version running
2. Fix issue in code
3. Redeploy

**If deployment succeeds but has bugs**:

1. Go to **Deployments** console
2. Click **History**
3. Select previous version
4. Click **Rollback to this version**
5. Confirm rollback

### Scenario 2: Emergency Rollback

**If critical production issue**:

```bash
# Option 1: Git revert
git revert HEAD
git push

# Option 2: Revert to specific commit
git reset --hard <previous-commit-hash>
git push --force

# Replit will auto-deploy previous version
```

### Scenario 3: Database Migration Issue

**If migration breaks production**:

1. Rollback application first
2. Rollback database migration:
   ```bash
   npx prisma migrate resolve --rolled-back <migration-name>
   ```
3. Verify data integrity
4. Fix migration script
5. Test in staging environment
6. Redeploy

---

## Troubleshooting

### Issue: Build Fails with TypeScript Errors

**Error**: `Type errors found during build`

**Solutions**:
1. Run `npm run type-check` locally
2. Fix all TypeScript errors
3. Ensure `tsconfig.json` is configured correctly
4. Verify all dependencies have types installed

### Issue: Database Connection Fails

**Error**: `Can't reach database server at...`

**Solutions**:
1. Verify `DATABASE_URL` in Replit Secrets
2. Check database is running and accessible
3. Verify connection string format:
   ```
   postgresql://user:password@host:5432/database?sslmode=require
   ```
4. Test connection with Prisma Studio: `npx prisma studio`

### Issue: Clerk Authentication Not Working

**Error**: `Clerk: Missing publishable key`

**Solutions**:
1. Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set
2. Verify `CLERK_SECRET_KEY` is set (without `NEXT_PUBLIC_` prefix)
3. Check Clerk middleware is configured in `middleware.ts`:
   ```typescript
   import { authMiddleware } from "@clerk/nextjs";
   
   export default authMiddleware({
     publicRoutes: ["/", "/api/health"]
   });
   
   export const config = {
     matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
   };
   ```

### Issue: Port Binding Error

**Error**: `EADDRINUSE: address already in use`

**Solution**: Ensure you're using port 5000 in all configs:
```json
// package.json
{
  "scripts": {
    "dev": "next dev -H 0.0.0.0 -p 5000",
    "start": "next start -H 0.0.0.0 -p 5000"
  }
}
```

### Issue: Slow Performance

**Symptoms**: Page loads > 3 seconds

**Solutions**:
1. Enable Next.js production mode (`NODE_ENV=production`)
2. Optimize images with `next/image`
3. Use Server Components for data fetching
4. Implement route-based code splitting
5. Enable caching:
   ```typescript
   // app/api/candidates/route.ts
   export const revalidate = 60; // Revalidate every 60 seconds
   ```
6. Scale up Autoscale instance size if needed

### Issue: Server Components Not Working

**Error**: `You're importing a component that needs useState...`

**Solution**: Mark client components with `'use client'`:
```typescript
'use client'

import { useState } from 'react';

export default function InteractiveComponent() {
  const [state, setState] = useState(0);
  // ...
}
```

---

## Deployment Checklist

### Pre-Launch (1 Week Before)

- [ ] All Next.js features tested and working
- [ ] TypeScript errors resolved
- [ ] Performance targets met (Lighthouse 95+)
- [ ] Security audit completed
- [ ] Database migrations tested
- [ ] Backup strategy defined
- [ ] Monitoring tools configured (Sentry)
- [ ] Custom domain purchased
- [ ] DNS records prepared
- [ ] Stakeholders notified

### Launch Day

- [ ] Final build passes all checks (`npm run deploy:check`)
- [ ] Run database migrations (`npx prisma migrate deploy`)
- [ ] Deploy to production (off-peak hours)
- [ ] Verify deployment URL works
- [ ] Run smoke tests (auth, API, database)
- [ ] Configure custom domain
- [ ] Monitor error rates (first 2 hours)
- [ ] Check performance metrics
- [ ] Announce launch 🚀

### Post-Launch (First Week)

- [ ] Daily error log review
- [ ] Performance monitoring (Core Web Vitals)
- [ ] User feedback collection
- [ ] Hot-fix any critical bugs
- [ ] Optimize based on real traffic patterns
- [ ] Scale up if needed
- [ ] Celebrate success! 🎉

---

## Cost Estimation

### Replit Autoscale Pricing

**Formula**: `Cost = Active Minutes × $0.00035`

**Example Scenarios** (Next.js SSR):

| Traffic Level | Active Time/Day | Monthly Cost |
|---------------|-----------------|--------------|
| **Low** (100 visitors/day) | 3 hours | ~$32 |
| **Medium** (1,000 visitors/day) | 12 hours | ~$126 |
| **High** (10,000 visitors/day) | 24 hours | ~$252 |

**Cost Optimization for Next.js**:
- Use Server Components (reduces client JS)
- Implement ISR (Incremental Static Regeneration)
- Cache API responses (`revalidate`)
- Use static generation where possible
- Monitor cold start performance

---

## Next.js-Specific Best Practices

### 1. Server vs Client Components

**Default to Server Components**:
```typescript
// app/candidates/page.tsx (Server Component by default)
import { prisma } from '@/lib/prisma';

export default async function CandidatesPage() {
  const candidates = await prisma.candidate.findMany();
  
  return <CandidateList candidates={candidates} />;
}
```

**Use Client Components sparingly**:
```typescript
// components/InteractiveFilter.tsx
'use client'

export function InteractiveFilter() {
  const [filter, setFilter] = useState('');
  // Interactive logic here
}
```

### 2. Data Fetching Patterns

**Server Actions for mutations**:
```typescript
// app/actions/candidates.ts
'use server'

export async function createCandidate(data: FormData) {
  const candidate = await prisma.candidate.create({
    data: {
      name: data.get('name') as string,
      // ...
    },
  });
  
  revalidatePath('/candidates');
  return candidate;
}
```

**Route Handlers for APIs**:
```typescript
// app/api/fit-scores/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const scores = await prisma.fitScore.findMany();
  return NextResponse.json(scores);
}
```

### 3. Performance Optimization

**Static Generation**:
```typescript
// app/jobs/[id]/page.tsx
export async function generateStaticParams() {
  const jobs = await prisma.job.findMany();
  
  return jobs.map((job) => ({
    id: job.id,
  }));
}
```

**Incremental Static Regeneration**:
```typescript
// app/dashboard/page.tsx
export const revalidate = 3600; // Revalidate every hour
```

---

## Support & Resources

### Next.js Documentation
- **Official Docs**: https://nextjs.org/docs
- **App Router**: https://nextjs.org/docs/app
- **Deployment**: https://nextjs.org/docs/deployment

### Replit Support
- **Documentation**: https://docs.replit.com/deployments
- **Community**: https://ask.replit.com
- **Status Page**: https://status.replit.com
- **Support Email**: support@replit.com

### Skylevel Team
- **Tech Lead**: [Your Name]
- **DevOps**: [Team Member]
- **On-Call Rotation**: [Schedule]

---

## Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 2.0 | 2025-01-08 | Updated for Next.js 14 rebuild | Engineering Team |
| 1.0 | 2025-01-08 | Initial Vite deployment guide | Engineering Team |

---

**Document Status**: ✅ Active (Next.js 14)  
**Next Review**: 2025-02-08  
**Owner**: Lead Engineer  
**Feedback**: Create issue with label `deployment-docs`
