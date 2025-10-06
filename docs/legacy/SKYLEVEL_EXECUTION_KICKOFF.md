# SKYLEVEL GREENFIELD REBUILD - PROJECT KICKOFF

## CONTEXT
You are orchestrating the complete greenfield rebuild of Skylevel from React+Vite prototype to production-ready Next.js 14 application. All requirements, architecture, and roadmap documentation exists in /docs/*.md.

## CRITICAL CONSTRAINTS
1. **DO NOT** modify or reference the existing React+Vite codebase in /src
2. **DO** create a new Next.js 14 project from scratch following docs/IMPLEMENTATION_ROADMAP.md
3. **TARGET**: Production-ready MVP in 3 weeks (Week 1: Foundation, Week 2: Core Features, Week 3: Polish & Deploy)
4. **DEPLOYMENT**: Replit Autoscale (configured for Next.js SSR)
5. **TECH STACK**: Next.js 14 App Router + TypeScript + Prisma + Clerk + Tailwind + shadcn/ui

## PRIMARY OBJECTIVE
Execute Week 1 Day 1-2 of docs/IMPLEMENTATION_ROADMAP.md:
- Initialize Next.js 14 project with App Router
- Set up TypeScript strict mode
- Configure Tailwind CSS + shadcn/ui
- Install and configure Prisma for PostgreSQL
- Set up Clerk authentication
- Create project structure per docs/SITEMAP_IA_NAVIGATION.md

## EXECUTION PLAN (Orchestrate these agents sequentially)

### PHASE 1: Foundation Setup (Day 1 Morning - 4 hours)
**Agent**: backend-architect.md
**Task**: 
1. Read docs/TECH_STACK.md and docs/ARCHITECTURE.md
2. Create new Next.js 14 project structure in /skylevel-app (NOT in current directory)
3. Initialize package.json with exact dependencies from docs/TECH_STACK.md
4. Configure tsconfig.json for strict mode
5. Set up Tailwind CSS with design tokens from docs/UI_DESIGN_SYSTEM.md

**Deliverable**: Working Next.js skeleton with TypeScript + Tailwind

### PHASE 2: Database Layer (Day 1 Afternoon - 4 hours)
**Agent**: backend-architect.md
**Task**:
1. Read docs/DATABASE_SCHEMA.md completely
2. Initialize Prisma in /skylevel-app
3. Create complete schema.prisma from DATABASE_SCHEMA.md
4. Configure Replit PostgreSQL connection
5. Run initial migration: `npx prisma migrate dev --name init`
6. Create seed script with 50 mock candidates from docs/GREENFIELD_REBUILD_STRATEGY.md

**Deliverable**: Working database with seed data, Prisma Client configured

### PHASE 3: Authentication Setup (Day 2 Morning - 4 hours)
**Agent**: fullstack-developer.md
**Task**:
1. Read docs/API_SPECIFICATION.md authentication section
2. Install and configure Clerk (@clerk/nextjs)
3. Create middleware.ts for route protection
4. Set up authentication routes per docs/SITEMAP_IA_NAVIGATION.md
5. Configure environment variables in Replit Secrets
6. Test auth flow (sign-up → sign-in → protected route)

**Deliverable**: Working authentication with role-based access control

### PHASE 4: Core Components (Day 2 Afternoon - 4 hours)
**Agent**: frontend-developer.md
**Task**:
1. Read docs/UI_DESIGN_SYSTEM.md and docs/WIREFRAMES_SPECIFICATION.md
2. Install shadcn/ui: button, card, dialog, input, select
3. Create ScorePill component (most critical, used everywhere)
4. Create CandidateCard component
5. Create JobCard component
6. Test all components with Storybook or in demo page

**Deliverable**: Core UI component library ready for use

## SUCCESS CRITERIA FOR KICKOFF
- [ ] New Next.js 14 project running on port 5000
- [ ] TypeScript strict mode enabled, zero errors
- [ ] Tailwind CSS configured with Skylevel design tokens
- [ ] Prisma connected to Replit PostgreSQL
- [ ] Database seeded with 50 candidates
- [ ] Clerk authentication working (sign-up/sign-in flows)
- [ ] 3 core components built (ScorePill, CandidateCard, JobCard)
- [ ] Zero modifications to existing /src codebase

## REFERENCE DOCUMENTS (Read these before execution)
**MUST READ**:
1. docs/IMPLEMENTATION_ROADMAP.md (Week 1 Day 1-2 section)
2. docs/TECH_STACK.md (exact dependencies and versions)
3. docs/ARCHITECTURE.md (folder structure and routing)
4. docs/DATABASE_SCHEMA.md (Prisma schema)
5. docs/UI_DESIGN_SYSTEM.md (Tailwind config and components)

**SUPPORTING DOCS**:
- docs/SITEMAP_IA_NAVIGATION.md (routing structure)
- docs/API_SPECIFICATION.md (API design patterns)
- docs/GREENFIELD_REBUILD_STRATEGY.md (what NOT to do)

## ORCHESTRATION RULES
1. **Sequential execution** - Phase 1 must complete before Phase 2
2. **Validation checkpoints** - Each phase deliverable must be verified before proceeding
3. **No bloat** - Only implement what's explicitly in the roadmap
4. **Documentation first** - Always read relevant docs before invoking specialized agents
5. **Deployment ready** - Configure for Replit Autoscale from day 1

## FIRST ACTION
Begin with Phase 1: Invoke backend-architect.md to initialize Next.js 14 project structure.

After Phase 1 completion, report back with:
- File tree of new /skylevel-app directory
- Screenshot of Next.js dev server running
- Confirmation of TypeScript + Tailwind configuration

Then proceed to Phase 2 (Database Layer).

## BLOCKER PROTOCOL
If you encounter any blockers:
1. Check docs/TROUBLESHOOTING.md (if exists)
2. Consult docs/GREENFIELD_REBUILD_STRATEGY.md for guidance
3. Report blocker with specific error and proposed solution
4. DO NOT proceed to next phase until blocker is resolved

---

**EXECUTE NOW**: Start Phase 1 - Foundation Setup