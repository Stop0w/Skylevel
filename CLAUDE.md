# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Skylevel** is an AI-powered candidate intelligence layer that accelerates recruitment decisions through validated Fit Scores. The platform transforms 200+ resumes into 5 high-confidence candidates using peer validation and AI scoring.

### Current State

This is an **active Next.js 14 implementation** currently in development.

- **Current Implementation**: Next.js 14 with TypeScript, Tailwind CSS, Prisma, and Clerk
- **Status**: Foundation complete, building core features
- **Architecture**: Server Components with minimal client state

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Server Components + Zustand (minimal client state)
- **Forms**: React Hook Form + Zod validation

### Backend
- **API**: Next.js API Routes + Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk (JWT-based)
- **Validation**: Zod schemas

### Development & Deployment
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Package Manager**: npm

## Development Commands

```bash
# Development server
npm run dev           # Start Next.js development server

# Building
npm run build         # Build for production
npm start            # Start production server

# Database operations
npx prisma migrate dev --name <migration-name>  # Create and run migration
npx prisma generate    # Generate Prisma client
npx prisma studio      # Open database browser
npx prisma db push     # Push schema changes to database

# Testing
npm test              # Run Vitest unit tests
npm run test:e2e      # Run Playwright E2E tests

# Code quality
npm run lint          # Run ESLint
```

## Architecture Overview

### System Purpose
Skylevel synthesizes recruitment volume through validated Fit Scores:
```
200 Resumes → Fit Score Intelligence Layer → 5 High-Confidence Candidates → Fast Hire
```

### Core Concepts

**Fit Score Components**:
- **TMS** (Technical Match Score): Skill alignment vs job requirements
- **SRS** (Soft Skills Rating): Behavioral fit assessment
- **RNS** (Referral Network Score): Peer validation strength
- **Overall Score**: Weighted combination (default: 50% TMS, 30% SRS, 20% RNS)

**JobPrint™**: Custom scoring weights per role (recruiter calibration)

### Key User Flows

1. **Recruiter Flow**: Review Fit Queue → Filter candidates → View profiles → Create shortlists
2. **Candidate Flow**: Apply to jobs → Receive Fit Score → Share referral link
3. **Referrer Flow**: Receive link → Validate skills → Boost candidate's score

## Project Structure

```
app/
├── (auth)/              # Authentication routes (login, signup)
├── (recruiter)/         # Recruiter-specific routes
│   ├── fit-queue/       # PRIMARY SCREEN - main candidate review interface
│   ├── dashboard/
│   └── shortlists/
├── (candidate)/         # Candidate-facing routes
├── api/                 # API Routes (candidates, jobs, fit-scores, referrals)
├── actions/             # Server Actions (candidate status, shortlists, referrals)
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── common/          # ScorePill, CandidateCard, etc.
│   └── auth/
├── lib/                 # Utilities, Prisma client, Clerk setup
├── providers/           # Context providers
├── globals.css          # Global styles
└── layout.tsx           # Root layout with providers
```

## Critical Components

### ScorePill Component
Most critical UI component - displays Fit Scores consistently across the app.
- Shows 0-100 score with color coding (85+ gold, 70+ green, 50+ orange, <50 red)
- Includes confidence level indicator
- Tooltip with score breakdown (TMS, SRS, RNS)
- Used in 15+ components, must be memoized

### FitQueue Page (Primary Screen)
Main recruiter interface for candidate review.
- Server-rendered list of candidates with filtering/sorting
- Real-time updates via Server Actions
- Target: <100ms render for 200 candidates
- Virtual scrolling for performance

## Database Schema

### Core Tables (Implemented in Prisma)
- **users**: Clerk integration, role-based access (RECRUITER, HIRING_MANAGER, ADMIN, CANDIDATE)
- **candidates**: Profile data, skills array, JSON experience/education, status tracking
- **jobs**: Job listings with requirements array, JobPrint™ calibration weights (tmsWeight, srsWeight, rnsWeight)
- **fit_scores**: TMS/SRS/RNS components (0-100), overallScore, confidence, breakdown JSON
- **referrals**: Peer validations with trustScore, public token, validation JSON
- **applications**: Candidate-job relationships with status tracking
- **shortlists**: Recruiter candidate lists with many-to-many relationship

### Key Relationships
- Candidate ↔ Job (via applications) → FitScore (1:1 per candidate-job pair)
- Candidate → Referrals (many) → affects RNS score based on trustScore
- User (recruiter) → Jobs → Shortlists (many-to-many with candidates)

## API Architecture

### Authentication
- Clerk handles authentication, middleware protects routes
- JWT tokens for API access
- Role-based access control (RECRUITER, HIRING_MANAGER, ADMIN, CANDIDATE)

### Key Endpoints
- `GET /api/candidates` - List/filter candidates
- `POST /api/candidates` - Submit application
- `GET /api/jobs` - List jobs (public/authenticated)
- `POST /api/referrals/:token` - Submit referral (public)
- `GET /api/fit-scores/:candidateId/:jobId` - Get score breakdown

### Server Actions
- `updateCandidateStatus(candidateId, status)`
- `addToShortlist(candidateId, shortlistId)`
- `generateReferralLink(candidateId)`

## Design System

### Colors (Tailwind)
- **Primary**: Skylevel Blue (`skylevel-500: #2563EB`)
- **Accent**: Coral (`coral-500: #EF4444`) for highlights and alerts
- **Excellence**: Gold (`gold-500: #F59E0B`) for high scores (85+)
- **Success**: Green (`success-500: #22C55E`) for good scores (70-84)
- **Themes**: Light (`white` backgrounds) and Dark (`neutral-900: #0F172A`)
- **Text**: Adaptive - Light theme (`neutral-900: #0F172A`), Dark theme (`white`)

### Typography
- System font stack
- Mobile-first responsive scaling
- Semantic hierarchy (H1-H4 mapping to text sizes)

### Components
- shadcn/ui as base component library
- Custom variants for Skylevel branding
- Accessibility-first design (WCAG 2.1 AA)

## Implementation Priority

### Week 1: Foundation
1. Next.js setup with TypeScript
2. Prisma schema implementation
3. Tailwind + shadcn/ui setup
4. ScorePill component
5. FitQueue page (server-rendered)

### Week 2: Core Features
1. Candidate profile pages
2. Referral system (public links + validation)
3. Shortlist management
4. Job creation/calibration

### Week 3: Polish & Launch
1. Dashboard & analytics
2. Bias audit functionality
3. Error handling & loading states
4. Testing & deployment

## Important Notes

1. **Active Implementation**: This is a working Next.js codebase, not documentation-only
2. **Documentation-Driven**: All technical decisions are documented in the `/docs` folder
3. **Performance Focus**: Server Components handle data fetching, minimal client-side state
4. **Accessibility**: All components must meet WCAG 2.1 AA standards
5. **Type Safety**: Strict TypeScript throughout, Prisma provides end-to-end type safety
6. **ESLint Configuration**: Uses Next.js TypeScript config with `@typescript-eslint/no-unused-vars` disabled

## Documentation References

Key documentation files for implementation:
- `docs/IMPLEMENTATION_ROADMAP.md` - Detailed 3-week build plan
- `docs/ARCHITECTURE.md` - System architecture and design decisions
- `docs/DATABASE_SCHEMA.md` - Complete Prisma schema
- `docs/API_SPECIFICATION.md` - API endpoint specifications
- `docs/UI_DESIGN_SYSTEM.md` - Tailwind configuration and component guidelines

## Development Guidelines

### Code Style
- Use Prettier for formatting
- Strict TypeScript configuration
- Component-based architecture with clear separation of concerns
- Server Components for data fetching, Client Components for interactivity

### Testing Strategy
- 80% unit test coverage (Vitest)
- Critical path E2E tests (Playwright)
- Component testing with React Testing Library
- API endpoint testing

### Git Workflow
- Feature branches from `main`
- Conventional commits (`feat:`, `fix:`, `docs:`, etc.)
- PR reviews required for all changes
- Automated CI/CD pipeline

---

**Status**: Active development in progress
**Current Focus**: Core features implementation
**Next Step**: Continue with IMPLEMENTATION_ROADMAP.md week 2 features