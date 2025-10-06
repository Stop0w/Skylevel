# Skylevel 0.1% Operator Execution Plan

**Document Type**: Strategic Project Execution Blueprint
**Author**: 0.1% Operator
**Date**: January 2025
**Status**: ACTIVE EXECUTION PLAN
**Timeline**: 3 Weeks to Production MVP

---

## Executive Mandate

**Mission**: Build Skylevel from scratch as a **decision acceleration interface** that transforms 200+ resumes into 5 high-confidence candidates through validated Fit Scores.

**Operating Philosophy**: "The best code is no code. The second-best code is code that makes money. Everything else is technical debt disguised as progress."

**Success Metrics**:
- Recruiter shortlists candidates in <30 seconds
- 200+ candidates render in <100ms
- Zero cognitive overhead in primary flows
- <1,500 lines of production code

---

## Current State Analysis

### ✅ What's Validated (Build On This)
1. **Fit Score Model** - TMS/SRS/RNS breakdown proven valuable
2. **Visual Design** - Dark theme + color system works
3. **Core User Flow** - FitQueue → CandidateProfile → Shortlist validated
4. **Technology Stack** - Next.js 14 + TypeScript + Prisma confirmed optimal

### ❌ What's Eliminated (Zero Bloat Mandate)
1. **Analytics Features** - No users yet to analyze
2. **Bias Audit System** - No data to audit yet
3. **Admin Panels** - Single-user workflow first
4. **Team Collaboration** - Multi-user complexity deferred
5. **Integrations** - ATS connections come later

---

## Project Orchestration Strategy

### Phase 1: Foundation (Day 1 - 4 hours)
**Agent**: backend-architect
**Objective**: Next.js 14 skeleton with TypeScript + Tailwind

**Success Criteria**:
- [ ] Next.js 14 project running on port 5000
- [ ] TypeScript strict mode, zero errors
- [ ] Tailwind configured with Skylevel design tokens
- [ ] Project structure per ARCHITECTURE.md

**Deliverable**: Working Next.js foundation

### Phase 2: Database Layer (Day 1 - 4 hours)
**Agent**: backend-architect
**Objective**: PostgreSQL + Prisma with seed data

**Success Criteria**:
- [ ] Prisma connected to Replit PostgreSQL
- [ ] Complete schema from DATABASE_SCHEMA.md
- [ ] Initial migration run successfully
- [ ] 50 mock candidates seeded

**Deliverable**: Working database with test data

### Phase 3: Authentication (Day 2 - 4 hours)
**Agent**: fullstack-developer
**Objective**: Clerk authentication with role-based access

**Success Criteria**:
- [ ] Clerk installed and configured
- [ ] Authentication routes working
- [ ] Middleware protecting routes
- [ ] Role-based access control functional

**Deliverable**: Working auth system

### Phase 4: Core Components (Day 2 - 4 hours)
**Agent**: frontend-developer
**Objective**: Critical UI components built

**Success Criteria**:
- [ ] ScorePill component (memoized, performant)
- [ ] CandidateCard component
- [ ] JobCard component
- [ ] Component library established

**Deliverable**: Core UI components ready

---

## Anti-Bloat Protocol

### The Four Questions (Answer Before Building ANYTHING)

1. **Does it accelerate decision-making?**
   - ✅ Yes → Consider adding
   - ❌ No → DELETE or defer

2. **Is it needed for MVP validation?**
   - ✅ Yes → Build minimal version
   - ❌ No → Backlog indefinitely

3. **Can existing code handle it?**
   - ✅ Yes → Don't build new code
   - ❌ No → Build absolute minimum

4. **Does it add cognitive load?**
   - ✅ Yes → Simplify or eliminate
   - ❌ No → Proceed cautiously

### Feature Kill List (DO NOT BUILD)

**Premature Features**:
- ❌ Analytics dashboard (no users yet)
- ❌ Bias audit tools (no data yet)
- ❌ Team collaboration (single user first)
- ❌ ATS integrations (product-market fit first)
- ❌ Advanced reporting (basic metrics only)
- ❌ Admin panels (not needed for MVP)

**Complexity Traps**:
- ❌ Multiple dashboards (one screen to rule them all)
- ❌ Comparison tools (decision-making is the goal)
- ❌ Workflow automation (manual first, automate later)
- ❌ Advanced filtering (basic score/skills filter only)

---

## Ruthless Minimalism Standards

### Code Budget
- **Total Files**: 20-25 maximum
- **Total Lines**: 1,500 maximum
- **Component Size**: 250 lines maximum
- **Dependencies**: <15 production packages

### Page Budget (8 pages maximum)
1. **HomePage** - Marketing entry
2. **RecruiterDashboard** - Main recruiter screen
3. **FitQueue** - Candidate review (PRIMARY SCREEN)
4. **CandidateProfile** - Detailed candidate view
5. **JobDetail** - Job information + apply
6. **Shortlist** - Recruiter shortlist management
7. **Settings** - Basic user preferences
8. **NotFound** - 404 handling

### Component Budget (12 components maximum)
1. **ScorePill** - Hero component (used everywhere)
2. **CandidateCard** - List item display
3. **JobCard** - Job display
4. **Header** - Global navigation
5. **Modal** - Generic modal wrapper
6. **Form** - Generic form wrapper
7. **Button** - Consistent button styling
8. **Input** - Consistent input styling
9. **LoadingSpinner** - Loading states
10. **EmptyState** - No data states
11. **ErrorBoundary** - Error handling
12. **Layout** - Page layout wrapper

---

## Performance Mandates

### Speed Requirements
- **First Contentful Paint**: <1s
- **Time to Interactive**: <2s
- **FitQueue Render**: <100ms for 200 items
- **Score Calculation**: <20ms
- **Route Transitions**: <100ms

### Technical Implementation
- Server Components for all data fetching
- Virtual scrolling for 200+ item lists
- Memoize expensive components (React.memo)
- Debounce search inputs (300ms)
- Lazy load non-critical routes

---

## Quality Gates

### Daily Validation
- [ ] Lighthouse score 95+
- [ ] Zero console errors/warnings
- [ ] TypeScript strict mode passing
- [ ] Core user flow functional
- [ ] Performance budgets met

### Weekly Validation
- [ ] User testing with real recruiters
- [ ] Task completion rates >90%
- [ ] Time-to-shortlist <30 seconds
- [ ] Zero confusion about Fit Scores
- [ ] Mobile responsive validated

---

## Risk Mitigation

### Technical Risks
- **Prisma Migration Issues** → Test migrations locally first
- **Performance Regression** → Lighthouse CI in deployment
- **Clerk Integration Complexity** → Follow docs exactly, test early

### Product Risks
- **Feature Creep** → Hard scope freeze after Day 5
- **User Confusion** → Weekly user testing, ruthless simplification
- **Timeline Slippage** → Cut features aggressively, never delay core

---

## Success Criteria

### Week 1 MVP
- [ ] Working FitQueue with 200 candidates
- [ ] Functional candidate profiles
- [ ] Basic shortlist management
- [ ] Authentication system working
- [ ] Deployment to Replit Autoscale

### Week 1 Success Metrics
- [ ] <2s page load times
- [ ] 95+ Lighthouse score
- [ ] 1,500 lines of code or less
- [ ] Zero user confusion in testing
- [ ] 100% core flow completion rate

---

## Execution Protocol

### Agent Orchestration
1. **Sequential Execution** - Each phase must complete before next begins
2. **Validation Checkpoints** - Each phase deliverable verified before proceeding
3. **Zero Bloat Enforcement** - Every feature must pass Four Questions test
4. **Documentation First** - Read relevant docs before invoking agents

### Communication Protocol
- **Progress Updates** - Report completion after each phase
- **Blocker Protocol** - Immediate escalation with specific error + solution
- **Success Reporting** - Deliverable screenshots + performance metrics

### Decision Framework
When in doubt, choose:
- **Simple over complex**
- **Manual over automated**
- **Basic over advanced**
- **Fast over perfect**
- **Working over broken**

---

## First Action: Kickoff Phase 1

**Command**: Invoke backend-architect to begin Foundation Setup

**Instructions**:
- Read TECH_STACK.md and ARCHITECTURE.md completely
- Initialize Next.js 14 project in /skylevel-app directory
- Configure TypeScript strict mode + Tailwind CSS
- Create project structure per ARCHITECTURE.md
- Validate with screenshot + performance metrics

**Expected Timeline**: 4 hours

**Success Report**: File tree + screenshot + configuration confirmation

---

**Status**: READY FOR EXECUTION
**Next Step**: ORCHESTRATE PHASE 1 - Foundation Setup
**Owner**: 0.1% Operator + Specialized Agent Team

---

## Appendix: Agent Coordination Matrix

| Phase | Agent | Focus | Success Criteria | Timeline |
|-------|--------|--------|------------------|----------|
| 1 | backend-architect | Foundation | Next.js running + TS + Tailwind | 4 hours |
| 2 | backend-architect | Database | Prisma + PostgreSQL + seed data | 4 hours |
| 3 | fullstack-developer | Authentication | Clerk + auth flows | 4 hours |
| 4 | frontend-developer | Components | ScorePill + CandidateCard + JobCard | 4 hours |

**Total Phase 1 Timeline**: 16 hours (2 days)

**Parallel Execution**: None - sequential execution required for dependency management

**Critical Path**: Foundation → Database → Authentication → Components

**Buffer Time**: 25% additional time allocated for troubleshooting

---

**Document Status**: ACTIVE
**Execution Priority**: IMMEDIATE
**Risk Level**: LOW (validated prototype)
**Success Probability**: 95%