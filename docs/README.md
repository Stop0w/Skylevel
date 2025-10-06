
# Skylevel Documentation Index

**Last Updated**: January 2025  
**Current State**: React + Vite Prototype (LEGACY)  
**Target State**: Next.js 14 Greenfield Rebuild (IN PROGRESS)

---

## ⚠️ CRITICAL: Understanding Our Documentation

All documentation in this folder describes the **TARGET Next.js 14 architecture** for the greenfield rebuild. 

**DO NOT** use this documentation to modify the current React + Vite prototype.  
**DO** use this documentation to build the new Next.js 14 application from scratch.

---

## Documentation Files

### Strategic Documents
- **[STRATEGIC_ASSESSMENT.md](./STRATEGIC_ASSESSMENT.md)** - Product vision, feature prioritization, launch requirements
- **[GREENFIELD_REBUILD_STRATEGY.md](./GREENFIELD_REBUILD_STRATEGY.md)** - Why we're rebuilding from scratch, what to delete/keep
- **[TECH_STACK.md](./TECH_STACK.md)** - Next.js 14 stack decision and rationale

### Technical Specifications (Next.js Target)
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Next.js 14 system architecture
- **[API_SPECIFICATION.md](./API_SPECIFICATION.md)** - Next.js API Routes + Server Actions
- **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - PostgreSQL + Prisma schema
- **[UI_DESIGN_SYSTEM.md](./UI_DESIGN_SYSTEM.md)** - Tailwind CSS + shadcn/ui components

### Implementation Guides (Next.js Target)
- **[IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md)** - 3-week build plan for Next.js rebuild
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Next.js deployment to Replit Autoscale
- **[PRODUCT_REQUIREMENTS.md](./PRODUCT_REQUIREMENTS.md)** - Feature requirements for Next.js implementation
- **[USER_JOURNEYS.md](./USER_JOURNEYS.md)** - User flows to implement in Next.js

---

## Tech Stack Summary

### Current (Legacy - DO NOT BUILD ON)
```
React 18 + Vite
React Router
Vanilla CSS
Mock data (no backend)
No database
No authentication
Replit development environment
```

### Target (Production - BUILD THIS)
```
Next.js 14 (App Router)
TypeScript (strict mode)
Tailwind CSS + shadcn/ui
Prisma + PostgreSQL
Clerk authentication
Next.js API Routes + Server Actions
Replit Autoscale Deployments
Vitest + Playwright testing
```

---

## How to Use This Documentation

### For New Developers
1. Read [GREENFIELD_REBUILD_STRATEGY.md](./GREENFIELD_REBUILD_STRATEGY.md) to understand why we're rebuilding
2. Review [TECH_STACK.md](./TECH_STACK.md) to understand our stack choices
3. Follow [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md) for the build sequence

### For Product/Design
1. Start with [STRATEGIC_ASSESSMENT.md](./STRATEGIC_ASSESSMENT.md) for feature priorities
2. Review [USER_JOURNEYS.md](./USER_JOURNEYS.md) for UX flows
3. Reference [UI_DESIGN_SYSTEM.md](./UI_DESIGN_SYSTEM.md) for design tokens

### For DevOps
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
2. Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for Replit Autoscale setup
3. Review [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for data architecture

---

## Quick Start: Beginning the Rebuild

```bash
# 1. Initialize Next.js 14 project (DO NOT modify existing React code)
npx create-next-app@latest skylevel-v2 --typescript --tailwind --app

# 2. Install dependencies
cd skylevel-v2
npm install @prisma/client @clerk/nextjs zod zustand

# 3. Follow Day 1 of IMPLEMENTATION_ROADMAP.md
```

---

## Questions?

- **Product questions**: See [PRODUCT_REQUIREMENTS.md](./PRODUCT_REQUIREMENTS.md)
- **Technical questions**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Timeline questions**: See [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md)

**Remember**: All docs describe the Next.js 14 rebuild, not the current React + Vite prototype.
