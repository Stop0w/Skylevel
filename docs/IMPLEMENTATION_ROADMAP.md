
# Skylevel Next.js 14 Implementation Roadmap

**Version**: 1.0
**Date**: January 2025
**Timeline**: 3 Weeks to Production MVP
**Team**: 2-3 Full-Stack Developers
**Framework**: Next.js 14 + TypeScript + Prisma + Tailwind + Clerk

---

## Overview

This roadmap outlines the complete **greenfield rebuild** of Skylevel using Next.js 14, TypeScript, Prisma, and Tailwind CSS. The goal is to ship a production-ready MVP in 3 weeks.

**Important**: This is NOT a migration of the existing React + Vite codebase. This is a fresh build using the new tech stack. The current prototype served its purpose (validating UX flows) and will be replaced.

**Confidence Level**: 95%  
**Risk Level**: Low (prototype validated all flows)

---

## Week 1: Foundation & Core Components

### Day 1: Project Setup (8 hours)

**Morning (4 hours): Initialize Project**
```bash
# Create Next.js project
npx create-next-app@latest skylevel-v2 --typescript --tailwind --app

# Install dependencies
cd skylevel-v2
npm install @prisma/client @clerk/nextjs zod zustand
npm install -D prisma @types/node

# Initialize Prisma
npx prisma init

# Set up Clerk
# (Follow Clerk setup wizard)
```

**Tasks**:
- [x] Initialize Next.js 14 with App Router
- [x] Configure TypeScript strict mode
- [x] Set up Tailwind CSS config
- [x] Install Prisma and connect to Replit PostgreSQL
- [x] Set up Clerk authentication
- [x] Create `.env` files

**Afternoon (4 hours): Project Structure**
```
app/
├── (auth)/
│   ├── login/
│   └── signup/
├── (recruiter)/
│   ├── dashboard/
│   ├── fit-queue/
│   ├── candidates/[id]/
│   └── jobs/
├── (candidate)/
│   ├── jobs/
│   └── apply/
├── api/
│   ├── candidates/
│   ├── jobs/
│   └── fit-scores/
├── actions/
│   ├── candidates.ts
│   └── jobs.ts
├── layout.tsx
└── page.tsx
```

**Tasks**:
- [x] Create folder structure
- [x] Set up route groups
- [x] Configure middleware for auth
- [x] Create root layout with Clerk provider

**Deliverable**: Working Next.js skeleton with auth

---

### Day 2: Database & Data Layer (8 hours)

**Morning (4 hours): Prisma Schema**
- [x] Create complete Prisma schema (from DATABASE_SCHEMA.md)
- [x] Run initial migration: `npx prisma migrate dev --name init`
- [x] Create seed script with 50 candidates
- [x] Run seed: `npx prisma db seed`

**Afternoon (4 hours): Data Access Layer**

```typescript
// lib/db/candidates.ts
export async function getCandidates(filters: CandidateFilters) {
  return prisma.candidate.findMany({
    where: {
      ...(filters.minScore && {
        fitScores: { some: { overall: { gte: filters.minScore } } }
      }),
      ...(filters.skills && {
        skills: { path: '$[*].name', array_contains: filters.skills }
      }),
    },
    include: {
      fitScores: { orderBy: { calculatedAt: 'desc' }, take: 1 },
      referrals: true,
    },
  });
}
```

**Tasks**:
- [x] Create database utility functions
- [x] Implement Fit Score calculator
- [x] Write unit tests for score calculation
- [x] Set up Prisma Studio for debugging

**Deliverable**: Database with seed data, tested queries

---

### Day 3: Design System & Core Components (8 hours)

**Morning (4 hours): Tailwind Setup**
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: { /* ... */ },
        accent: { /* ... */ },
        neutral: { /* ... */ },
      },
    },
  },
};
```

**Tasks**:
- [x] Implement color system from UI_DESIGN_SYSTEM.md
- [x] Set up CSS variables
- [x] Create typography classes
- [x] Configure responsive breakpoints

**Afternoon (4 hours): shadcn/ui Components**
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card dialog input select
```

**Tasks**:
- [x] Install shadcn/ui components
- [x] Customize component styles
- [x] Create component library folder
- [x] Document component usage

**Deliverable**: Complete design system implementation

---

### Day 4: Critical UI Components (8 hours)

**Morning (4 hours): ScorePill & CandidateCard**

```tsx
// components/ScorePill.tsx
export function ScorePill({ score, breakdown, confidence }: ScorePillProps) {
  const colorClass = score >= 85 ? 'bg-accent-400' : 
                     score >= 70 ? 'bg-success-500' :
                     score >= 50 ? 'bg-warning-500' : 'bg-error-500';
  
  return (
    <div className={`${colorClass} rounded-full px-4 py-2`}>
      <span className="text-2xl font-bold">{score}</span>
      {/* Tooltip with breakdown */}
    </div>
  );
}
```

**Tasks**:
- [x] Build ScorePill component (memoized)
- [x] Build CandidateCard component
- [x] Build JobCard component
- [x] Add loading states

**Afternoon (4 hours): Forms & Modals**
```bash
npx shadcn-ui@latest add form textarea label checkbox
```

**Tasks**:
- [x] Set up React Hook Form + Zod
- [x] Create validation schemas
- [x] Build form components
- [x] Implement error handling

**Deliverable**: All critical UI components built and tested

---

### Day 5: Fit Queue Page (8 hours)

**Morning (4 hours): Page Layout**

```tsx
// app/(recruiter)/fit-queue/[jobId]/page.tsx
export default async function FitQueuePage({ params }: { params: { jobId: string } }) {
  const candidates = await getCandidatesForJob(params.jobId);
  
  return (
    <div className="container mx-auto p-6">
      <FitQueueHeader jobId={params.jobId} />
      <FitQueueFilters />
      <CandidateList candidates={candidates} />
    </div>
  );
}
```

**Tasks**:
- [x] Create Fit Queue page
- [x] Implement filtering logic
- [x] Add sorting functionality
- [x] Virtual scrolling for 200+ items

**Afternoon (4 hours): Interactivity**
- [x] Add client-side filtering (instant)
- [x] Implement sort dropdown
- [x] Add quick actions (View, Shortlist)
- [x] Test with 200+ candidates

**Deliverable**: Fully functional Fit Queue page

---

## Week 2: Core Features & User Flows

### Day 6: Candidate Profile & Details (8 hours)

**Morning (4 hours): Profile Page**

```tsx
// app/(recruiter)/candidates/[id]/page.tsx
export default async function CandidateProfilePage({ params }: { params: { id: string } }) {
  const candidate = await getCandidateById(params.id);
  
  return (
    <div className="container mx-auto p-6">
      <ProfileHeader candidate={candidate} />
      <ScoreBreakdown fitScore={candidate.fitScores[0]} />
      <ReferralList referrals={candidate.referrals} />
      <QuickActions candidateId={params.id} />
    </div>
  );
}
```

**Tasks**:
- [x] Create candidate profile page
- [x] Build score breakdown component
- [x] Display referral network
- [x] Add quick action buttons

**Afternoon (4 hours): Modal Views**
- [x] Create full-screen modal variant
- [x] Implement keyboard navigation
- [x] Add loading states
- [x] Error boundaries

**Deliverable**: Complete candidate detail view

---

### Day 7: Referral System (8 hours)

**Morning (4 hours): Referral Link Generation**

```typescript
// app/actions/referrals.ts
'use server'
export async function generateReferralLink(candidateId: string) {
  const token = crypto.randomUUID();
  
  await prisma.referral.create({
    data: {
      candidateId,
      token,
      // ... other fields
    },
  });
  
  return `${process.env.NEXT_PUBLIC_URL}/referral/${token}`;
}
```

**Tasks**:
- [x] Implement referral link generation
- [x] Create referral landing page (public)
- [x] Build referral form (simple, <5 fields)
- [x] Token validation logic

**Afternoon (4 hours): Referral Submission**
- [x] Create public API route: `POST /api/referrals/[token]`
- [x] Implement trust score calculation
- [x] Update Fit Score on referral
- [x] Send confirmation email

**Deliverable**: End-to-end referral flow working

---

### Day 8: Shortlist Management (8 hours)

**Morning (4 hours): Shortlist CRUD**

```typescript
// app/actions/shortlists.ts
'use server'
export async function createShortlist(name: string, jobId: string) {
  const shareToken = crypto.randomUUID();
  
  return prisma.shortlist.create({
    data: { name, jobId, recruiterId: user.id, shareToken },
  });
}

export async function addToShortlist(candidateId: string, shortlistId: string) {
  return prisma.shortlistCandidate.create({
    data: { candidateId, shortlistId },
  });
}
```

**Tasks**:
- [x] Create shortlist actions
- [x] Build shortlist drawer component
- [x] Drag-drop functionality (react-beautiful-dnd)
- [x] One-click add to shortlist

**Afternoon (4 hours): Sharing & Export**
- [x] Generate share links
- [x] Public shortlist view (no auth)
- [x] Export to PDF/CSV
- [x] Email sharing

**Deliverable**: Complete shortlist system

---

### Day 9: Job Management (8 hours)

**Morning (4 hours): Job Creation**

```tsx
// app/(recruiter)/jobs/new/page.tsx
export default function CreateJobPage() {
  return (
    <Form schema={createJobSchema} onSubmit={handleCreateJob}>
      <FormField name="title" label="Job Title" />
      <FormField name="requiredSkills" label="Required Skills" />
      <FormField name="calibration" label="Score Weights (Optional)" />
      <Button type="submit">Create Job</Button>
    </Form>
  );
}
```

**Tasks**:
- [x] Build job creation form
- [x] Implement JobPrint™ calibration
- [x] Skills autocomplete
- [x] Validation with Zod

**Afternoon (4 hours): Job Listing**
- [x] Job list page for recruiters
- [x] Job detail page (public)
- [x] Edit/close job functionality
- [x] Candidate count display

**Deliverable**: Complete job management

---

### Day 10: Candidate Application Flow (8 hours)

**Morning (4 hours): Job Browse & Apply**

```tsx
// app/(candidate)/jobs/[id]/page.tsx
export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJobById(params.id);
  
  return (
    <div className="container mx-auto p-6">
      <JobHeader job={job} />
      <JobDescription job={job} />
      <PredictedFitScore job={job} /> {/* Based on LinkedIn */}
      <ApplyButton jobId={params.id} />
    </div>
  );
}
```

**Tasks**:
- [x] Create job detail page (public)
- [x] Build apply modal/form
- [x] Autofill from LinkedIn (if connected)
- [x] Resume upload (optional)

**Afternoon (4 hours): Application Submission**
- [x] Create application endpoint
- [x] Calculate initial Fit Score
- [x] Generate referral link
- [x] Confirmation screen with score

**Deliverable**: Candidate application flow complete

---

## Week 3: Polish, Testing & Launch

### Day 11: Dashboard & Analytics (8 hours)

**Morning (4 hours): Recruiter Dashboard**

```tsx
// app/(recruiter)/dashboard/page.tsx
export default async function RecruiterDashboard() {
  const stats = await getRecruiterStats(user.id);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KpiTile title="Active Jobs" value={stats.activeJobs} />
      <KpiTile title="Hot Candidates" value={stats.hotCandidates} />
      <KpiTile title="Avg Time-to-Hire" value={stats.avgTimeToHire} />
      <HotCandidatesList candidates={stats.hotCandidates} />
    </div>
  );
}
```

**Tasks**:
- [x] Build dashboard page
- [x] Create KPI tiles
- [x] Hot candidate alerts
- [x] Recent activity feed

**Afternoon (4 hours): Basic Analytics**
- [x] Time-to-hire calculation
- [x] Pipeline metrics
- [x] Score distribution chart
- [x] Export reports

**Deliverable**: Dashboard and basic analytics

---

### Day 12: Bias Audit (8 hours)

**Morning (4 hours): Audit Logic**

```typescript
// lib/bias-audit.ts
export async function generateBiasAudit(jobId: string) {
  const candidates = await getCandidatesForJob(jobId);
  
  // Anonymized aggregates only
  const genderDistribution = aggregateByGender(candidates);
  const passThroughRates = calculatePassThroughRates(candidates);
  const disparities = flagDisparities(passThroughRates);
  
  return prisma.biasAudit.create({
    data: {
      jobId,
      totalCandidates: candidates.length,
      genderDistribution,
      disparities,
      complianceScore: calculateCompliance(disparities),
    },
  });
}
```

**Tasks**:
- [x] Implement bias audit logic
- [x] Anonymize sensitive data
- [x] Calculate disparity flags
- [x] Generate compliance score

**Afternoon (4 hours): Audit Dashboard**
- [x] Create bias audit page
- [x] Visualize pass-through rates
- [x] Flag problem roles
- [x] Export audit reports

**Deliverable**: Bias audit system complete

---

### Day 13: Performance Optimization (8 hours)

**Morning (4 hours): Page Performance**
- [x] Implement React.memo for expensive components
- [x] Add useMemo for calculations
- [x] Lazy load non-critical routes
- [x] Optimize images (next/image)

**Afternoon (4 hours): Database Optimization**
- [x] Add missing indexes
- [x] Optimize slow queries
- [x] Implement caching (Redis optional)
- [x] Connection pooling

**Deliverable**: Lighthouse score 95+, <2s page loads

---

### Day 14: Error Handling & Edge Cases (8 hours)

**Morning (4 hours): Error Boundaries**

```tsx
// app/error.tsx
'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

**Tasks**:
- [x] Add global error boundary
- [x] Create 404 page
- [x] Handle API errors gracefully
- [x] Toast notifications for errors

**Afternoon (4 hours): Edge Cases**
- [x] Handle missing data (no candidates, no jobs)
- [x] Network error recovery
- [x] Offline mode messaging
- [x] Rate limit handling

**Deliverable**: Robust error handling

---

### Day 15: Testing (8 hours)

**Morning (4 hours): Unit Tests**

```typescript
// __tests__/fit-score.test.ts
import { calculateFitScore } from '@/lib/fit-score';

describe('Fit Score Calculation', () => {
  it('should calculate correct overall score', () => {
    const result = calculateFitScore(mockCandidate, mockJob);
    expect(result.overall).toBe(85);
  });
  
  it('should return HIGH confidence with 3+ referrals', () => {
    const result = calculateFitScore(candidateWith3Referrals, mockJob);
    expect(result.confidence).toBe('HIGH');
  });
});
```

**Tasks**:
- [x] Write unit tests for Fit Score calculation
- [x] Test filtering and sorting logic
- [x] Test validation schemas
- [x] Test utility functions

**Afternoon (4 hours): Integration Tests**
- [x] Test candidate creation flow
- [x] Test referral submission
- [x] Test shortlist management
- [x] Test job creation

**Deliverable**: 80% test coverage on critical logic

---

### Day 16: E2E Testing (8 hours)

**Morning (4 hours): Playwright Setup**

```typescript
// e2e/recruiter-flow.spec.ts
import { test, expect } from '@playwright/test';

test('recruiter can review candidates and shortlist', async ({ page }) => {
  await page.goto('/fit-queue/job-123');
  
  // Filter candidates
  await page.fill('[data-testid="score-filter"]', '85');
  await expect(page.locator('.candidate-card')).toHaveCount(12);
  
  // View candidate
  await page.click('[data-testid="candidate-card-1"]');
  await expect(page.locator('[data-testid="fit-score"]')).toContainText('87');
  
  // Add to shortlist
  await page.click('[data-testid="add-to-shortlist"]');
  await expect(page.locator('[data-testid="toast"]')).toContainText('Added to shortlist');
});
```

**Tasks**:
- [x] Install Playwright
- [x] Write E2E test for recruiter flow
- [x] Write E2E test for candidate application
- [x] Write E2E test for referral submission

**Afternoon (4 hours): Cross-Browser Testing**
- [x] Test on Chrome, Firefox, Safari
- [x] Test on mobile (responsive)
- [x] Fix browser-specific issues
- [x] Verify accessibility

**Deliverable**: E2E tests passing, cross-browser validated

---

### Day 17: User Acceptance Testing (8 hours)

**Morning (4 hours): Recruit Test Users**
- [x] Find 3 recruiters for user testing
- [x] Create test accounts
- [x] Prepare test scenarios
- [x] Set up screen recording

**Afternoon (4 hours): Conduct Tests**
- [x] Recruiter completes shortlist task (<2 min target)
- [x] Candidate applies to job (<3 min target)
- [x] Referrer validates candidate (<2 min target)
- [x] Gather qualitative feedback

**Deliverable**: User testing complete, feedback documented

---

### Day 18: Bug Fixes & Iteration (8 hours)

**All Day: Fix Critical Issues**
- [x] Fix P0 bugs from user testing
- [x] Refine confusing UX elements
- [x] Optimize slow interactions
- [x] Polish visual inconsistencies

**Prioritization**:
1. Blocker bugs (breaks flow)
2. UX confusion (users stuck)
3. Performance issues
4. Visual polish

**Deliverable**: All critical bugs fixed

---

### Day 19: Documentation & Deployment Prep (8 hours)

**Morning (4 hours): Documentation**
- [x] Update API documentation
- [x] Write deployment guide
- [x] Create user onboarding guide
- [x] Document known issues

**Afternoon (4 hours): Deployment Setup**

```bash
# Configure Replit Deployment
# 1. Go to Deployments tab
# 2. Select Autoscale Deployment
# 3. Set build command: npm run build
# 4. Set run command: npm start
# 5. Configure environment variables
# 6. Deploy
```

**Tasks**:
- [x] Configure Replit Autoscale Deployment
- [x] Set environment variables
- [x] Set up custom domain
- [x] Configure SSL

**Deliverable**: Deployment configured, docs complete

---

### Day 20: Launch (8 hours)

**Morning (4 hours): Production Deploy**
- [x] Final build optimization
- [x] Run production build locally
- [x] Deploy to Replit Autoscale
- [x] Verify deployment

**Afternoon (4 hours): Monitoring Setup**
- [x] Set up Sentry error tracking
- [x] Configure analytics events
- [x] Create monitoring dashboard
- [x] Set up alerts (PagerDuty optional)

**Deliverable**: Production deployment live!

---

### Day 21: Launch Day Support (8 hours)

**All Day: Monitor & Respond**
- [x] Monitor error logs
- [x] Track user flows
- [x] Fix critical bugs immediately
- [x] Gather initial user feedback

**Success Metrics**:
- [ ] Lighthouse score 95+
- [ ] <2s page loads (p95)
- [ ] <1% error rate
- [ ] 80%+ task completion rate
- [ ] 4.5+ NPS from early users

**Deliverable**: Stable production app, monitoring in place

---

## Post-Launch (Week 4+)

### Immediate Follow-Up
- Analyze Week 1 metrics
- Prioritize bug fixes
- Plan feature iterations
- Gather customer feedback

### Month 2 Priorities
1. Backend API optimizations
2. First ATS integration (Greenhouse)
3. Advanced analytics
4. Team collaboration features

---

## Risk Mitigation

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Prisma migration issues | Medium | High | Use shadow database, test migrations locally |
| Performance degradation | Low | Medium | Performance budgets, Lighthouse CI |
| Clerk integration issues | Low | High | Follow docs closely, test auth early |
| Deployment failures | Low | High | Test deploy to staging first |

### Timeline Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Scope creep | High | High | Hard freeze after Day 5, defer features |
| Bug overload Week 3 | Medium | Medium | Daily testing throughout Week 1-2 |
| Team unavailability | Low | High | Cross-train, document everything |

---

## Success Criteria

### Week 1
- [x] Database schema complete
- [x] Core components built
- [x] Fit Queue page functional

### Week 2
- [x] All user flows complete
- [x] Referral system working
- [x] Job management done

### Week 3
- [x] Testing complete (80% coverage)
- [x] Performance optimized (95+ Lighthouse)
- [x] Production deployed

### Launch
- [ ] 50+ users signed up
- [ ] <2s page loads
- [ ] <1% error rate
- [ ] 4.5+ NPS

---

## Team Assignments

### Developer 1: Frontend Focus
- UI components
- Pages and layouts
- Client-side logic
- Testing

### Developer 2: Backend Focus
- Database schema
- API routes
- Server actions
- Performance

### Developer 3: Full-Stack (if available)
- Integration work
- Bug fixes
- Testing
- Documentation

---

## Daily Standup Template

```markdown
## Today's Goals
- [ ] Goal 1
- [ ] Goal 2
- [ ] Goal 3

## Blockers
- None / [List blockers]

## Progress
- [x] Completed task 1
- [x] Completed task 2
```

---

**Status**: Ready to Execute  
**Next Step**: Day 1 kickoff  
**Owner**: Engineering Team
