# Skylevel Next.js 14 Architecture Documentation

**Version:** 1.0
**Last Updated:** January 2025
**Framework:** Next.js 14 + TypeScript + Prisma + Tailwind + Clerk
**Status:** Production Architecture for Greenfield Rebuild

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [System Context (C4 Level 1)](#system-context-c4-level-1)
4. [Container Architecture (C4 Level 2)](#container-architecture-c4-level-2)
5. [Component Architecture (C4 Level 3)](#component-architecture-c4-level-3)
6. [Data Architecture](#data-architecture)
7. [Security Architecture](#security-architecture)
8. [Quality Attributes](#quality-attributes)
9. [Architecture Decision Records](#architecture-decision-records)
10. [Infrastructure & Deployment](#infrastructure--deployment)
11. [Development Workflow](#development-workflow)
12. [Maintenance & Evolution](#maintenance--evolution)

---

## Executive Summary

### Purpose

This document provides comprehensive architecture documentation for Skylevel, an AI-powered candidate intelligence layer that synthesizes recruitment volume through validated Fit Scores to accelerate hiring decisions.

### Architecture Philosophy

**Core Principles:**
- **Intelligence Layer First**: Not an ATS/job board—a decision acceleration tool
- **Integration-Friendly**: Works alongside existing recruitment systems
- **Data-Driven Trust**: Peer validation + AI scoring = confident hiring
- **Speed-to-Decision**: Every architectural choice optimizes for recruiter velocity

### Key Architectural Characteristics

| Attribute | Target | Current Status |
|-----------|--------|----------------|
| **Response Time** | < 200ms for critical paths | ✅ Achieved |
| **Scalability** | Handle 10K+ candidates/role | 🟡 Prototype phase |
| **Availability** | 99.9% uptime | 🟡 Deployment pending |
| **Security** | SOC 2 compliant | 🔴 In progress |
| **Maintainability** | < 2 week feature deployment | ✅ Achieved |

---

## Architecture Overview

### System Purpose

Skylevel transforms recruitment chaos into confident hiring decisions:

```
200 Resumes → Fit Score Intelligence Layer → 5 High-Confidence Candidates → Fast Hire
```

### Technology Stack

**Current Stack (LEGACY - Prototype Only)**:
- React 18 + Vite
- Vanilla CSS
- Mock data, no backend
- Replit development environment

**Target Stack (PRODUCTION - Rebuild)**:
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS 3.4+, shadcn/ui components
- **State Management**: React Server Components (primary), Zustand (client state)
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL 15+ with Prisma ORM
- **Authentication**: Clerk
- **Deployment**: Replit Autoscale Deployments
- **Testing**: Vitest (unit), Playwright (E2E)
- **Monitoring**: Sentry, Vercel Analytics

**This document describes the TARGET architecture for the greenfield Next.js rebuild.**

---

## System Context (C4 Level 1)

### System Landscape

```mermaid
graph TB
    subgraph "External Systems"
        ATS[ATS Systems<br/>Greenhouse, Lever]
        LI[LinkedIn API]
        EMAIL[Email Services]
        CAL[Calendar Systems]
    end

    subgraph "Skylevel Ecosystem"
        SKY[Skylevel Platform]
    end

    subgraph "Users"
        REC[Recruiters]
        HM[Hiring Managers]
        CAND[Candidates]
        REF[Referrers]
    end

    REC -->|Manage candidates| SKY
    HM -->|Review shortlists| SKY
    CAND -->|Apply to roles| SKY
    REF -->|Validate candidates| SKY

    SKY <-->|Sync candidate data| ATS
    SKY -->|Fetch profiles| LI
    SKY -->|Send notifications| EMAIL
    SKY -->|Schedule interviews| CAL
```

### External Dependencies

| System | Purpose | Integration Type | Criticality |
|--------|---------|------------------|-------------|
| **ATS (Greenhouse, Lever)** | Candidate import/export | REST API | High |
| **LinkedIn API** | Profile enrichment | OAuth + REST | Medium |
| **Email Services (SendGrid)** | Notifications | SMTP/API | High |
| **Calendar (Calendly, Google)** | Interview scheduling | Webhook/API | Medium |
| **Analytics (Mixpanel)** | Product metrics | JavaScript SDK | Low |

### User Personas

**1. Recruiter (Primary)**
- **Goal**: Fill roles 70% faster with higher quality candidates
- **Key Actions**: Review Fit Scores, shortlist candidates, schedule interviews
- **Pain Point**: Drowning in 200+ resumes per role

**2. Hiring Manager (Secondary)**
- **Goal**: Make confident hiring decisions with reduced bias
- **Key Actions**: Review shortlists, compare candidates, approve hires
- **Pain Point**: Lack of trust in candidate signals

**3. Candidate (Passive)**
- **Goal**: Get matched to right roles faster
- **Key Actions**: Apply, get Fit Scored, provide work samples
- **Pain Point**: Black hole application process

**4. Referrer (Transactional)**
- **Goal**: Quickly validate/refer someone
- **Key Actions**: Receive link, validate skills, submit
- **Pain Point**: Lengthy referral forms

---

## Container Architecture (C4 Level 2)

### System Containers

```mermaid
graph TB
    subgraph "Client Layer"
        WEB[Web Application<br/>Next.js App Router]
    end

    subgraph "Application Layer"
        API[API Routes / Server Actions<br/>Next.js]
        AUTH[Auth Service<br/>Clerk]
    end

    subgraph "Data Layer"
        DB[(Database<br/>PostgreSQL + Prisma)]
        CACHE[(Cache<br/>Redis)]
    end

    subgraph "Integration Layer"
        INT[Integration Hub<br/>ATS/LinkedIn Connectors]
    end

    WEB -->|HTTPS| API
    API -->|Query| DB
    API -->|Fast Read| CACHE
    API -->|Sync Data| INT
    AUTH -->|Validate| API
```

### Container Responsibilities

**Web Application (Next.js App Router)**
- **Technology**: Next.js 14, React 18 Server Components, TypeScript
- **Responsibilities**:
  - Render UI components (Server & Client)
  - Handle routing via App Router
  - Server-side data fetching
  - Client-side interactivity with Server Actions/API Routes
- **Current Status**: 🔴 In development
- **Location**: `/app`, `/components`

**API Routes / Server Actions**
- **Technology**: Next.js API Routes & Server Actions
- **Responsibilities**:
  - Backend API endpoints
  - Data mutations and validations
  - Business logic execution
- **Current Status**: 🔴 In development
- **Location**: `/app/api`, Server Actions within `/app`

**Database (PostgreSQL + Prisma)**
- **Technology**: PostgreSQL, Prisma ORM
- **Responsibilities**:
  - Persist candidate data
  - Store Fit Score history
  - Manage referral networks
- **Current Status**: 🔴 In development
- **Priority**: P0 for production

---

## Component Architecture (C4 Level 3)

### Frontend Component Structure

```
app/
├── api/              # API Routes
├── components/       # Reusable UI components (client & server)
│   ├── ui/           # shadcn/ui components
│   ├── auth/         # Authentication related components
│   ├── common/       # Shared components (e.g., ScorePill)
│   └── ...
├── lib/              # Utility functions, Prisma client, Clerk setup
│   ├── prisma.ts
│   ├── clerk.ts
│   └── utils.ts
├── providers/        # Context providers (Zustand, Theme)
├── app/              # Next.js App Router routes
│   ├── (main)/       # Main application layout/routes
│   │   ├── page.tsx  # PRIMARY SCREEN (FitQueue)
│   │   ├── layout.tsx
│   │   └── ...
│   ├── auth/         # Authentication routes
│   │   └── sign-in/
│   │       └── page.tsx
│   └── ...
└── styles/           # Global styles
    └── globals.css
```

### Critical Component Map

```mermaid
graph LR
    subgraph "Recruiter Flow (Critical Path)"
        FQ[FitQueue Page (app/(main)/page.tsx)]
        CP[Candidate Profile (Server Component)]
        SL[Shortlist Drawer (Client Component)]
        CM[Compare Modal (Client Component)]
    end

    subgraph "Shared Components"
        SP[ScorePill (Client Component)]
        SB[ScoreBreakdown (Client Component)]
        RC[ReferrerCredibility (Client Component)]
    end

    FQ -->|View Details| CP
    FQ -->|Add to List| SL
    FQ -->|Compare| CM

    CP --> SP
    CP --> SB
    CP --> RC

    SL --> SP
    CM --> SP
```

### Component Dependency Analysis

**ScorePill.jsx** (Most Critical)
- **Used By**: 15+ components
- **Dependencies**: None (client component)
- **Props Interface**:
  ```typescript
  {
    score: number;          // 0-100
    breakdown: { tms: number, srs: number, rns: number };
    size?: 'sm' | 'md' | 'lg';
    showTooltip?: boolean;
  }
  ```
- **Performance**: Memoized with React.memo, renders in < 10ms

**FitQueue Page (`app/(main)/page.tsx`)** (Primary Screen)
- **Dependencies**: ScorePill, JobFilters, ShortlistDrawer, Server Actions
- **Data Flow**: Fetched via Server Component → Filtered/Sorted → Displayed
- **Performance Target**: < 100ms initial server render for 200 candidates

**RecruiterDashboard Page (`app/(main)/dashboard/page.tsx`)**
- **Dependencies**: KpiTile, HotCandidateModal, ActivityLog, Server Actions
- **Data Flow**: Fetched via Server Component → Aggregated → Displayed metrics
- **Refresh Rate**: Real-time updates via Server Actions/polling

---

## Data Architecture

### Data Model Overview

```mermaid
erDiagram
    CANDIDATE ||--o{ FIT_SCORE : has
    CANDIDATE ||--o{ APPLICATION : submits
    CANDIDATE ||--o{ REFERRAL : receives
    JOB ||--o{ APPLICATION : attracts
    JOB ||--|| JOB_CALIBRATION : defines
    RECRUITER ||--o{ SHORTLIST : creates
    SHORTLIST ||--o{ CANDIDATE : contains
    REFERRER ||--o{ REFERRAL : provides

    CANDIDATE {
        string id PK
        string name
        string email
        string role
        string location
        array skills
        string status
    }

    FIT_SCORE {
        string id PK
        string candidateId FK
        string jobId FK
        number overall
        number tms
        number srs
        number rns
        string confidence
        timestamp calculatedAt
    }

    REFERRAL {
        string id PK
        string candidateId FK
        string referrerId FK
        number trustScore
        string relationship
        text feedback
    }

    JOB {
        string id PK
        string title
        string company
        array requiredSkills
        string status
    }

    JOB_CALIBRATION {
        string jobId FK
        number tmsWeight
        number srsWeight
        number rnsWeight
        json customWeights
    }
```

### Future Database Schema (PostgreSQL)

**Core Tables**:
```sql
-- Candidates table
CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    location VARCHAR(255),
    skills JSONB,
    linkedin_url VARCHAR(500),
    resume_url VARCHAR(500),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Fit scores table
CREATE TABLE fit_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID REFERENCES candidates(id),
    job_id UUID REFERENCES jobs(id),
    overall_score DECIMAL(5,2),
    tms_score DECIMAL(5,2),
    srs_score DECIMAL(5,2),
    rns_score DECIMAL(5,2),
    confidence_level VARCHAR(20),
    calculated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(candidate_id, job_id)
);

-- Referrals table
CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID REFERENCES candidates(id),
    referrer_id UUID REFERENCES referrers(id),
    trust_score INTEGER,
    relationship VARCHAR(100),
    feedback TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_fit_scores_candidate ON fit_scores(candidate_id);
CREATE INDEX idx_fit_scores_job ON fit_scores(job_id);
CREATE INDEX idx_fit_scores_overall ON fit_scores(overall_score DESC);
CREATE INDEX idx_candidates_status ON candidates(status);
```

### Data Flow Patterns

**Fit Score Calculation Flow**:
```
1. Candidate applies to job
2. Extract skills from profile/resume
3. Calculate TMS (skill match vs job requirements)
4. Calculate SRS (soft skills rating from assessments)
5. Calculate RNS (referral network strength)
6. Apply job-specific weights (JobPrint™)
7. Generate overall Fit Score (0-100)
8. Store with confidence level
9. Trigger notification if score > 85
```

**Current Implementation** (Mock - replaced by Prisma/Server Actions):
```javascript
// src/utils/FitScoreCalculator.js (LEGACY - TO BE REPLACED)
export const calculateFitScore = (candidate, job) => {
  const tms = calculateTechnicalMatch(candidate.skills, job.requiredSkills);
  const srs = candidate.softSkillsRating || 70;
  const rns = calculateReferralScore(candidate.referrals);

  const weights = job.calibration || { tms: 0.5, srs: 0.3, rns: 0.2 };

  return {
    overall: Math.round(tms * weights.tms + srs * weights.srs + rns * weights.rns),
    tms,
    srs,
    rns,
    confidence: determineConfidence(candidate.referrals.length)
  };
};
```

---

## Security Architecture

### Authentication & Authorization

**Current State (Prototype)**:
- Mock authentication via UserContext (LEGACY)
- Role-based UI rendering (recruiter vs candidate)
- No actual auth tokens

**Future Architecture**:
```mermaid
graph LR
    USER[User] -->|Login| AUTH[Auth Provider<br/>Clerk]
    AUTH -->|Session Token| API[Next.js API Routes / Server Actions]
    API -->|Validate Session| RBAC[RBAC Logic]
    RBAC -->|Allow/Deny| RES[Protected Resources]

    style AUTH fill:#4CAF50
    style RBAC fill:#2196F3
```

**Planned Auth Flow**:
1. User initiates login
2. Redirect to Clerk hosted sign-in page
3. OAuth flow (Google/LinkedIn SSO)
4. Clerk establishes session
5. Session cookie attached to requests
6. Server Components/Actions verify session via Clerk SDK

### Role-Based Access Control

**User Roles**:

| Role | Permissions | Data Access |
|------|-------------|-------------|
| **Recruiter** | View candidates, create shortlists, schedule interviews | Own jobs + assigned candidates |
| **Hiring Manager** | Approve shortlists, view comparisons | Jobs in their department |
| **Admin** | Full platform access, bias audits | All data |
| **Candidate** | View own profile, apply to jobs | Own data only |
| **Referrer** | Submit referrals | Limited to referral form |

### Data Protection

**Sensitive Data Categories**:
1. **PII (Personal Identifiable Information)**
   - Names, emails, phone numbers
   - Resume content, LinkedIn profiles
   - **Protection**: Encryption at rest, field-level access control

2. **Bias-Sensitive Attributes**
   - Gender, ethnicity, age
   - **Protection**: Anonymized in Fit Score calculation, audit logs

3. **Referral Networks**
   - Professional connections
   - **Protection**: Graph anonymization, aggregated insights only

**Encryption Strategy**:
- **In Transit**: TLS 1.3 for all API calls
- **At Rest**: AES-256 for database fields (managed by managed PostgreSQL provider)
- **Application Level**: Hashed passwords (handled by Clerk), encrypted tokens (handled by Clerk)

### Security Headers

```javascript
// Next.js Middleware (middleware.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  // Add HSTS header in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  return response;
}

// Configure middleware to run on all routes
export const config = {
  matcher: '/(.*)',
};
```

---

## Quality Attributes

### Performance Targets

| Metric | Target | Current | Priority |
|--------|--------|---------|----------|
| **First Contentful Paint** | < 1.5s | ~800ms | ✅ Met |
| **Time to Interactive** | < 3s | ~1.2s | ✅ Met |
| **Fit Queue Load (200 items)** | < 200ms | ~150ms | ✅ Met |
| **Score Calculation** | < 50ms | ~20ms (mock) | ✅ Met |
| **API Response (p95)** | < 300ms | N/A (no API) | 🔴 Future |

**Optimization Strategies**:
- React Server Components for server-side rendering
- Next.js App Router optimizations (e.g., route handlers)
- Code splitting via dynamic imports (`next/dynamic`)
- Virtual scrolling for large candidate lists (if needed)
- Debounced search/filter inputs (300ms delay)
- CDN for static assets (Next.js handles this)

### Scalability Architecture

**Horizontal Scaling Plan**:
```
Load Balancer (e.g., Vercel)
    ↓
Next.js Server Instances (Auto-scaled)
    ↓
PostgreSQL Primary
    ↓
Read Replicas (e.g., 3x)
    ↓
Redis Cache
```

**Scalability Targets**:
- **Concurrent Users**: 10,000+
- **Candidates per Role**: 5,000+
- **Fit Score Calculations**: 100,000/day
- **Database Queries**: < 50ms (p95)

### Reliability & Availability

**Target SLA**: 99.9% uptime (< 43 minutes downtime/month)

**Failure Mitigation**:
1. **API Circuit Breakers**: (Future, implement in services if needed)
2. **Database Replication**: Managed PostgreSQL replicas with failover
3. **Graceful Degradation**: Show cached Fit Scores if calculation service down
4. **Health Checks**: Next.js health endpoint, monitored by deployment platform

**Monitoring Stack**:
- **APM**: Sentry
- **Logs**: Vercel / Replit logging
- **Alerts**: Sentry / Deployment platform alerts

### Maintainability

**Code Quality Metrics**:
- **Test Coverage**: Target 80%+ (Vitest/Playwright)
- **Cyclomatic Complexity**: < 10 per function
- **Component Size**: < 300 lines (guideline)
- **Duplicate Code**: < 3% (DRY principle)

**Technical Debt Tracking**:
- **Current Debt Items**: 12 (see ADR-004)
- **Debt Reduction Goal**: -50% before production
- **Refactoring Budget**: 20% of sprint capacity

---

## Architecture Decision Records

### ADR Template

```markdown
# ADR-XXX: [Title]

**Status**: Proposed | Accepted | Deprecated | Superseded
**Date**: YYYY-MM-DD
**Deciders**: [Names]
**Context**: What is the issue we're facing?

## Decision
What is the change we're making?

## Consequences
### Positive
- Benefit 1
- Benefit 2

### Negative
- Trade-off 1
- Trade-off 2

### Risks
- Risk 1 (mitigation: ...)

## Alternatives Considered
1. Alternative 1 (rejected because...)
2. Alternative 2 (rejected because...)
```

---

### ADR-001: Use React Context for State Management

**Status**: Accepted  
**Date**: 2025-01-01  
**Deciders**: Engineering Team

**Context**: Need global state for user authentication and theme preferences without adding heavy dependencies.

**Decision**: Use React Context API + useReducer for global state instead of Redux/MobX. (Note: This ADR might be superseded by Zustand for client state in Next.js).

**Consequences**:
- ✅ Zero additional dependencies
- ✅ Simple mental model for team
- ✅ Sufficient for current prototype scope
- ❌ May need Zustand if state grows complex
- ❌ No built-in dev tools

**Alternatives Considered**:
1. Redux Toolkit - Rejected (overkill for MVP)
2. Zustand - Considered, but React Context used for initial prototype.

---

### ADR-002: Mock Data Layer Strategy

**Status**: Accepted  
**Date**: 2025-01-02  
**Deciders**: Engineering Team

**Context**: Need realistic data for prototype without backend infrastructure.

**Decision**: Create comprehensive mock data services that mirror future API shape. (This is for the LEGACY prototype, not the Next.js rebuild).

**Consequences**:
- ✅ Rapid frontend development (prototype)
- ✅ API contract definition via mock structure
- ✅ Easy to swap with real API (same interface)
- ❌ Mock data drift risk
- ❌ No real data validation

**Migration Path**:
- The Next.js rebuild will replace mock data with real API calls and database interactions.

---

### ADR-003: Component Styling Approach

**Status**: Accepted  
**Date**: 2025-01-03  
**Deciders**: Design + Engineering

**Context**: Need consistent styling.

**Decision**: Use Tailwind CSS + shadcn/ui components for the Next.js rebuild. (Replaces legacy CSS Variables approach).

**Consequences**:
- ✅ Rapid UI development with utility classes
- ✅ Consistent design system via shadcn/ui
- ✅ Themeable via Tailwind configuration
- ❌ Learning curve for Tailwind utilities
- ❌ Potential for CSS bloat if not managed

**CSS Variable System** (OKLCH Color System - Updated for Next.js 14):
```css
:root {
  --color-primary-500: oklch(0.56 0.17 19.3);
  --color-accent-500: oklch(0.74 0.11 88.5);
  --bg-primary: oklch(0.09 0.002 291);
  --text-primary: oklch(0.97 0.003 291);
  /* ... 50+ variables in styles/globals.css */
}
```

---

### ADR-004: Defer Backend Until Post-Prototype

**Status**: Accepted  
**Date**: 2025-01-04  
**Deciders**: Product + Engineering

**Context**: Speed to validate product-market fit vs building full stack.

**Decision**: Build frontend-only prototype with mock data, defer backend to post-validation. (This decision pertains to the legacy prototype).

**Consequences**:
- ✅ 10x faster iteration on UX (prototype)
- ✅ Easy to demo without infrastructure
- ✅ Frontend-backend contract defined via mocks
- ❌ Technical debt: Need to build backend later
- ❌ No real Fit Score calculation yet
- ❌ Limited integration testing

**Migration Triggers**:
1. Product validation complete
2. First paying customer commits
3. Need real ATS integration

---

### ADR-005: Monorepo vs Multi-Repo Strategy

**Status**: Proposed  
**Date**: 2025-01-08

**Context**: Planning future backend architecture.

**Decision**: Start with monorepo, split if services diverge significantly.

**Proposed Structure**:
```
skylevel/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Next.js API routes / Server Actions
├── packages/
│   ├── ui/           # Reusable UI components (shadcn/ui based)
│   ├── lib/          # Shared types, utils, Prisma client
│   └── config/       # ESLint, Tailwind configs
├── services/
│   ├── fit-score/    # Fit Score calculation microservice (future)
│   └── integrations/ # ATS connectors (future)
```

---

## Infrastructure & Deployment

### Current Deployment (Replit)

**Environment**: Replit Web Hosting (LEGACY PROTOTYPE)
- **Build**: Vite production build
- **Serving**: Static files via Replit's CDN
- **Domain**: `*.replit.dev`
- **SSL**: Automatic via Replit

**Deployment Command**:
```bash
npm run build
# Replit auto-deploys from ./dist
```

### Future Production Architecture (Next.js on Replit/Vercel)

```mermaid
graph TB
    subgraph "CDN Layer"
        CF[Replit/Vercel CDN]
    end

    subgraph "Application Layer"
        LB[Replit/Vercel Edge Network]
        API[Next.js Server Instances<br/>(Auto-scaled)]
    end

    subgraph "Data Layer"
        PG[(Managed PostgreSQL)]
        REDIS[(Managed Redis)]
    end

    subgraph "Integration Layer"
        QUEUE[Job Queue<br/>Bull/BullMQ]
        WORKER[Background Workers]
    end

    CF --> LB
    LB --> API

    API --> REDIS
    API --> PG

    API --> QUEUE
    WORKER --> QUEUE
    WORKER --> PG
```

### CI/CD Pipeline (Planned - GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install Dependencies
        run: npm ci
      - name: Lint
        run: npm run lint
      - name: Run Vitest
        run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install Dependencies
        run: npm ci
      - name: Build Next.js App
        env:
          NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: ${{ secrets.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY }}
          CLERK_SECRET_KEY: ${{ secrets.CLERK_SECRET_KEY }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: npm run build
      - name: Upload Artifact
        uses: actions/upload-artifact@v4
        with:
          name: next-build
          path: .next/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Download Build Artifact
        uses: actions/download-artifact@v4
        with:
          name: next-build
          path: .next/
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v2
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          project-name: skylevel-app
          env-vars: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,DATABASE_URL
```

### Environment Configuration

**Development (`.env.local`)**:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
DATABASE_URL=postgresql://user:password@localhost:5432/skylevel_dev

# Legacy prototype settings (if still running)
# VITE_API_URL=http://localhost:3000/api
# VITE_USE_MOCK_DATA=true
# VITE_ENABLE_DEBUG=true
```

**Production (`.env.production`)**:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
DATABASE_URL=postgresql://user:password@prod-db-host:5432/skylevel_prod
```

---

## Development Workflow

### Local Development Setup (Next.js)

```bash
# Clone repository
git clone https://github.com/skylevel/app.git
cd app

# Install dependencies
npm install

# Setup environment variables (create .env.local)
# See .env.production for production variables

# Start dev server
npm run dev

# Open browser
# http://localhost:3000
```

### Code Organization Principles (Next.js App Router)

**1. App Router Structure**:
```
app/
├── (main)/              # Main application routes (logged-in users)
│   ├── page.tsx         # FitQueue (Homepage)
│   ├── layout.tsx       # Main layout
│   ├── dashboard/
│   │   └── page.tsx     # Recruiter Dashboard
│   └── ...
├── auth/                # Authentication routes
│   ├── sign-in/
│   │   └── page.tsx
│   └── layout.tsx
├── api/                 # API Routes (for backend logic)
│   ├── jobs/
│   │   └── route.ts
│   └── ...
├── components/          # Reusable UI components (client & server)
│   ├── ui/              # shadcn/ui components
│   ├── common/          # Shared components (ScorePill, etc.)
│   └── ...
├── lib/                 # Utility functions, Prisma client, Clerk setup
├── providers/           # Context providers (e.g., Zustand, Theme)
└── styles/              # Global styles
    └── globals.css
```

**2. Component Types**:
- **Server Components**: Default, fetch data on the server.
- **Client Components**: Marked with `'use client'`, handle interactivity, state.

**3. Naming Conventions**:
- Components: PascalCase (`ScorePill.tsx`)
- Utilities: camelCase (`calculateFitScore.ts`)
- Constants: UPPER_SNAKE_CASE (`MAX_SCORE`)
- CSS classes: kebab-case (via Tailwind)

### Testing Strategy (Vitest & Playwright)

**Vitest (Unit & Integration)**:
- Located in `tests/` or co-located with components.
- Focus on testing individual functions, components, and API routes.
- Example: `tests/lib/fitScoreCalculator.test.ts`

**Playwright (End-to-End)**:
- Located in `e2e/` directory.
- Tests user flows across the entire application.
- Example: `e2e/recruiter_flow.spec.ts`

**Configuration**:
- `vitest.config.ts`
- `playwright.config.ts`

### Git Workflow

**Branch Strategy**:
```
main (production)
  ↓
develop (staging/integration)
  ↓
feature/fit-score-v2
feature/bias-audit
bugfix/shortlist-sync
```

**Commit Convention**:
```
feat(auth): Implement Clerk sign-in page
fix(api): Resolve issue with candidate filtering logic
docs(adr): Add ADR-006 for database selection
refactor(components): Extract ScorePill logic to reusable hook
test(e2e): Add test for user login and dashboard view
chore: Update dependencies
```

---

## Maintenance & Evolution

### Version Migration Path

**v1.0 (Current Prototype)**
- Frontend-only with mock data (LEGACY)

**v1.5 (Next.js Core)**
- Next.js 14 App Router implementation
- Authentication with Clerk
- Basic API Routes/Server Actions
- Basic PostgreSQL integration

**v2.0 (Production Ready)**
- Full database persistence (Prisma)
- AI-powered Fit Score calculation
- ATS integration (Greenhouse)
- Bias audit automation
- Enhanced monitoring and logging

### Technical Debt Registry

| ID | Description | Impact | Effort | Priority |
|----|-------------|--------|--------|----------|
| TD-001 | Replace mock data with real API/DB | High | Large | P0 |
| TD-002 | Add comprehensive test coverage | Medium | Large | P1 |
| TD-003 | Refactor large components (>300 lines) | Low | Medium | P2 |
| TD-004 | Implement error boundaries (Next.js) | Medium | Small | P1 |
| TD-005 | Add loading skeletons | Low | Small | P2 |
| TD-006 | Optimize bundle size (code splitting) | Medium | Medium | P1 |
| TD-007 | Add accessibility (ARIA labels) | High | Medium | P0 |
| TD-008 | Clean up legacy prototype code | Medium | Medium | P1 |

### Architecture Evolution Triggers

**When to Refactor**:
1. **Component Complexity**: If file exceeds 300 lines → split
2. **Performance Degradation**: If render time > 100ms → optimize
3. **State Management Pain**: If client state becomes unwieldy → consider Zustand/Redux
4. **API Growth**: If endpoints > 20 → consider GraphQL or more granular services

**Deprecation Policy**:
- Mark deprecated features with `@deprecated` JSDoc or comments.
- Provide migration guide in documentation.
- Remove after 2 major versions (e.g., deprecated in v2 → removed in v4).

### Documentation Maintenance

**Quarterly Review Checklist**:
- [ ] Update architecture diagrams with new components
- [ ] Add ADRs for significant decisions
- [ ] Review and close outdated technical debt items
- [ ] Update dependency versions in documentation
- [ ] Validate API contracts still match implementation
- [ ] Refresh performance benchmarks

**Ownership**:
- **Architecture Docs**: Lead Engineer
- **ADRs**: Decision makers (documented in each ADR)
- **API Docs**: Backend team (future)
- **Component Docs**: Frontend team

---

## Appendix

### Glossary

| Term | Definition |
|------|------------|
| **Fit Score** | 0-100 score combining TMS, SRS, and RNS |
| **TMS** | Technical Match Score - skill alignment |
| **SRS** | Soft Skills Rating Score - behavioral fit |
| **RNS** | Referral Network Score - peer validation strength |
| **JobPrint™** | Custom scoring weights per role |
| **Fit Queue** | Primary recruiter interface for candidate review |
| **Hot Candidate** | Candidate with 90+ score and 2+ referrals |
| **Referrer Credibility** | Trust score of person providing validation |

### Reference Links

- **Next.js App Router**: https://nextjs.org/docs/app
- **Tailwind CSS**: https://tailwindcss.com/
- **shadcn/ui**: https://ui.shadcn.com/
- **Clerk**: https://clerk.com/
- **Prisma**: https://www.prisma.io/
- **C4 Model**: https://c4model.com/

### Diagram Sources

All diagrams in this document are created using Mermaid.js and can be edited by updating the markdown source. To regenerate diagrams:

```bash
# Install Mermaid CLI
npm install -g @mermaid-js/mermaid-cli

# Generate diagram
mmdc -i architecture.md -o diagrams/
```

---

## Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-01-08 | Initial comprehensive architecture documentation | Engineering Team |
| 1.1 | 2025-01-15 | Updated to reflect Next.js 14 rebuild strategy | Engineering Team |

---

**Document Status**: ✅ Active  
**Next Review**: 2025-02-15 (Monthly)  
**Maintained By**: Lead Engineer  
**Feedback**: Create issue with label `architecture-docs`