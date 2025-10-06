
# Skylevel Sitemap, Information Architecture & Navigation

**Version**: 1.0  
**Date**: January 2025  
**Status**: Greenfield Rebuild Blueprint  
**Framework**: Next.js 14 App Router  
**Purpose**: Complete site structure for developers to implement routing, navigation, and data flows

---

## Executive Summary

This document defines the complete sitemap, information architecture, and navigation patterns for the Skylevel Next.js 14 rebuild. It maps:

1. **Route Structure** - Next.js App Router file paths
2. **User Journeys** - Recruiter, Employer, Candidate, Referrer flows
3. **Navigation Patterns** - How users move through the application
4. **Data Requirements** - What data each route needs
5. **Authentication** - Which routes require auth and what role(s)

---

## Sitemap Overview

```
app/
├── (marketing)/              # Public marketing pages
│   ├── page.tsx             # Homepage
│   ├── how-it-works/
│   │   ├── page.tsx         # Multi-journey tabs
│   │   ├── hiring/          # Hiring journey
│   │   ├── sourcing/        # Sourcing journey
│   │   └── applying/        # Candidate journey
│   ├── pricing/
│   ├── integrations/
│   ├── resources/
│   └── contact/
│
├── (auth)/                   # Authentication routes
│   ├── sign-in/
│   ├── sign-up/
│   └── layout.tsx           # Auth layout (Clerk)
│
├── (candidate)/              # Candidate journey (authenticated)
│   ├── dashboard/           # Candidate control center
│   ├── jobs/                # Job search & matches
│   │   ├── [id]/           # Job detail view
│   │   └── saved/          # Saved jobs
│   ├── applications/        # Application tracker
│   ├── profile/
│   │   ├── builder/        # Onboarding wizard
│   │   └── edit/           # Profile edit
│   ├── referrals/          # Referral management
│   └── settings/
│
├── (recruiter)/              # Recruiter journey (authenticated)
│   ├── dashboard/           # Recruiter control center
│   ├── candidates/          # Fit Queue
│   │   ├── [id]/           # Candidate detail
│   │   └── compare/        # Side-by-side comparison
│   ├── jobs/                # Role management
│   │   ├── new/            # Post new job
│   │   ├── [id]/           # Job detail
│   │   │   ├── edit/
│   │   │   └── calibrate/  # JobPrint™ wizard
│   │   └── active/         # My jobs
│   ├── shortlists/          # Shortlist management
│   │   └── [id]/
│   ├── analytics/           # Performance dashboard
│   ├── bias-audit/          # Fairness audit
│   ├── messages/            # Team communication
│   └── settings/
│
├── (referrer)/               # Referrer flow (public/token-based)
│   └── [token]/
│       ├── page.tsx         # Landing page
│       ├── auth/            # LinkedIn auth
│       └── form/            # Validation form
│
└── api/                      # API Routes
    ├── candidates/
    ├── jobs/
    ├── fit-scores/
    ├── referrals/
    ├── shortlists/
    └── webhooks/
```

---

## Route-by-Route Breakdown

### Marketing Routes (Public)

#### 1. Homepage `/`
**File**: `app/(marketing)/page.tsx`  
**Auth**: None required  
**Purpose**: Convert visitors to candidates or recruiters

**Frontend Components**:
- Hero with animated Fit Score transformation
- Journey selector (Hiring, Sourcing, Applying)
- Pain points with stats
- ROI calculator widget
- Trust signals (logos, testimonials)

**Data Sources**:
- Static content (no DB)
- Client-side ROI calculation

**Backend**: None (static Server Component)

**Navigation**:
- CTA → `/auth/sign-up?role=recruiter|candidate`
- Journey pills → `/how-it-works/hiring|sourcing|applying`
- Jobs link → `/jobs`

---

#### 2. How It Works `/how-it-works`
**File**: `app/(marketing)/how-it-works/page.tsx`  
**Auth**: None required  
**Purpose**: Explain Fit Score model through journey-specific narratives

**Frontend Components**:
- Journey tabs (Hiring, Sourcing, Applying)
- Rally Navigator module
- Step-by-step flow visualization
- Interactive Fit Score demo
- Integration preview

**Data Sources**:
- Static journey data
- Mock candidate data for demo

**Backend**: None (static Server Component)

**Navigation**:
- Tabs toggle between sub-routes
- CTA → `/auth/sign-up?journey=[selected]`

**Sub-Routes**:
- `/how-it-works/hiring` - Recruiter perspective
- `/how-it-works/sourcing` - Agency perspective
- `/how-it-works/applying` - Candidate perspective

---

#### 3. Pricing `/pricing`
**File**: `app/(marketing)/pricing/page.tsx`  
**Auth**: None required

**Frontend Components**:
- Pricing tiers
- Feature comparison table
- ROI calculator
- FAQ accordion

**Backend**: None (static)

---

#### 4. Integrations `/integrations`
**File**: `app/(marketing)/integrations/page.tsx`  
**Auth**: None required

**Frontend Components**:
- ATS compatibility grid
- Integration screenshots
- API documentation link

**Backend**: None (static)

---

#### 5. Resources `/resources`
**File**: `app/(marketing)/resources/page.tsx`  
**Auth**: None required

**Frontend Components**:
- Case studies
- Blog posts
- Cheat sheets
- Downloadable PDFs

**Data Sources**:
- CMS or static markdown files

---

#### 6. Contact `/contact`
**File**: `app/(marketing)/contact/page.tsx`  
**Auth**: None required

**Frontend Components**:
- Contact form
- Sales contact info

**Backend**:
- **API Route**: `POST /api/contact`
- **Action**: Send email via SendGrid
- **Data**: Form submission (name, email, message)

---

### Authentication Routes

#### 7. Sign In `/auth/sign-in`
**File**: `app/(auth)/sign-in/page.tsx`  
**Auth**: Clerk managed

**Frontend**: Clerk `<SignIn />` component

**Backend**: Clerk handles OAuth, JWT

**Navigation**:
- Success → Redirect based on user role:
  - Recruiter → `/recruiter/dashboard`
  - Candidate → `/candidate/dashboard`

---

#### 8. Sign Up `/auth/sign-up`
**File**: `app/(auth)/sign-up/page.tsx`  
**Auth**: Clerk managed

**Frontend**: Clerk `<SignUp />` component with role selection

**Backend**:
- **Clerk Webhook**: `POST /api/webhooks/clerk`
- **Action**: Create user in database
- **Data Model**: User (see DATABASE_SCHEMA.md)

**Navigation**:
- Success → Onboarding flow:
  - Recruiter → `/recruiter/dashboard` (optional onboarding)
  - Candidate → `/candidate/profile/builder`

---

### Candidate Journey Routes (Authenticated)

#### 9. Candidate Dashboard `/candidate/dashboard`
**File**: `app/(candidate)/dashboard/page.tsx`  
**Auth**: Required (Candidate role)

**Frontend Components**:
- Rally Dashboard (Fit Score stats)
- Stat tiles (Saved Jobs, Active Apps, Avg Fit, Profile %)
- Recent Applications cards
- Suggested Jobs grid
- Action nudges

**Data Sources**:
- **Server Component fetches**:
  - User profile
  - Applications (with Fit Scores)
  - Suggested jobs (algorithm TBD)
  - Saved jobs

**Backend**:
- **API**: `GET /api/candidates/[userId]/dashboard`
- **Returns**: Aggregated dashboard data
- **Database Models**: Candidate, Application, FitScore, Job

**Navigation**:
- Bottom nav (mobile): Dashboard, Jobs, Applications, Profile
- Cards link to:
  - Application → `/candidate/applications/[id]`
  - Job → `/jobs/[id]`
  - Profile → `/candidate/profile/edit`

---

#### 10. Job Search `/jobs`
**File**: `app/(candidate)/jobs/page.tsx`  
**Auth**: Optional (better experience if logged in)

**Frontend Components**:
- Search bar
- Filters (location, remote, skills, salary)
- Job cards with Fit Score (if logged in)
- Sort dropdown

**Data Sources**:
- **Server Component fetches**:
  - Jobs (filtered/sorted)
  - User Fit Scores for each job (if logged in)

**Backend**:
- **API**: `GET /api/jobs?search=...&skills=...&location=...`
- **Returns**: Job[] with optional fitScore per job
- **Database Models**: Job, FitScore (joined if authenticated)

**Navigation**:
- Job card → `/jobs/[id]`
- Apply button → `/jobs/[id]/apply` or apply modal

---

#### 11. Job Detail `/jobs/[id]`
**File**: `app/(candidate)/jobs/[id]/page.tsx`  
**Auth**: Optional

**Frontend Components**:
- Job header (title, company, location)
- Fit Score badge (if logged in)
- Score breakdown (TMS/SRS/RNS)
- Boost suggestions (if score < 95)
- Job description (accordion sections)
- Apply button (sticky)

**Data Sources**:
- **Server Component fetches**:
  - Job details
  - Candidate Fit Score (if logged in)
  - User profile (for autofill)

**Backend**:
- **API**: `GET /api/jobs/[id]`
- **API**: `GET /api/fit-scores/[candidateId]/[jobId]` (if logged in)
- **Database Models**: Job, FitScore, Candidate

**Navigation**:
- Apply button → `/jobs/[id]/apply` or modal
- Save job → Updates saved_jobs table
- Get referral → `/candidate/referrals/request?job=[id]`

---

#### 12. Apply to Job `/jobs/[id]/apply`
**File**: `app/(candidate)/jobs/[id]/apply/page.tsx`  
**Auth**: Required (Candidate)

**Frontend Components**:
- Job summary card (sticky)
- Fit Score visualizer (current + potential)
- Application form (autofilled from profile)
- Optional enhancements (referral, work sample)
- Submit button (large, prominent)

**Data Sources**:
- **Server Component fetches**:
  - Job details
  - Current Fit Score
  - User profile (for autofill)

**Backend**:
- **Server Action**: `submitApplication(formData)`
- **Creates**: Application record
- **Triggers**: Fit Score calculation
- **Returns**: Confirmation + updated Fit Score
- **Database Models**: Application, FitScore

**Navigation**:
- Submit → `/candidate/applications/[id]/confirmation`

---

#### 13. Application Confirmation `/candidate/applications/[id]/confirmation`
**File**: `app/(candidate)/applications/[id]/confirmation/page.tsx`  
**Auth**: Required

**Frontend Components**:
- Checkmark animation
- Submitted Fit Score badge
- Next steps timeline
- Boost opportunities (if score < 95)
- Fit Score education cards

**Data Sources**:
- **Server Component fetches**:
  - Application details
  - Fit Score
  - Boost suggestions

**Navigation**:
- Browse more jobs → `/jobs`
- Get referral → `/candidate/referrals/request?app=[id]`

---

#### 14. Applications Tracker `/candidate/applications`
**File**: `app/(candidate)/applications/page.tsx`  
**Auth**: Required

**Frontend Components**:
- Application cards (status timeline)
- Filters (status, date)
- Sort (recent, score)

**Data Sources**:
- **Server Component fetches**:
  - User applications with jobs and Fit Scores

**Backend**:
- **API**: `GET /api/candidates/[userId]/applications`
- **Database Models**: Application, Job, FitScore

**Navigation**:
- Application card → `/candidate/applications/[id]`
- Job title → `/jobs/[id]`

---

#### 15. Saved Jobs `/jobs/saved`
**File**: `app/(candidate)/jobs/saved/page.tsx`  
**Auth**: Required

**Frontend Components**:
- Job cards (same as job search)
- Remove from saved action

**Data Sources**:
- **Server Component fetches**:
  - Saved jobs for user

**Backend**:
- **API**: `GET /api/candidates/[userId]/saved-jobs`
- **Database Models**: SavedJob (junction table)

---

#### 16. Profile Builder `/candidate/profile/builder`
**File**: `app/(candidate)/profile/builder/page.tsx`  
**Auth**: Required (first-time users)

**Frontend Components**:
- Multi-step wizard (5 steps)
  - Welcome
  - Skills
  - Experience
  - Preferences
  - Review
- Progress indicator
- Fit Score reveal animation

**Data Sources**:
- **Client-side state** (Zustand for wizard state)
- **Server Action** on final submit

**Backend**:
- **Server Action**: `completeProfile(profileData)`
- **Updates**: Candidate record
- **Triggers**: Initial Fit Score calculation
- **Database Models**: Candidate

**Navigation**:
- Complete → `/candidate/dashboard`
- Skip → `/candidate/dashboard` (with incomplete profile nudge)

---

#### 17. Profile Edit `/candidate/profile/edit`
**File**: `app/(candidate)/profile/edit/page.tsx`  
**Auth**: Required

**Frontend Components**:
- Tabbed interface (Skills, Experience, Preferences)
- Inline editing
- Profile completion percentage

**Data Sources**:
- **Server Component fetches**:
  - Current user profile

**Backend**:
- **Server Action**: `updateProfile(updates)`
- **Database Models**: Candidate

**Navigation**:
- Save → Stay on page with toast
- Back → `/candidate/dashboard`

---

#### 18. Candidate Settings `/candidate/settings`
**File**: `app/(candidate)/settings/page.tsx`  
**Auth**: Required

**Frontend Components**:
- Notification preferences
- Privacy settings
- Account management

**Backend**:
- **Server Action**: `updateSettings(settings)`
- **Database Models**: User, Candidate

---

### Recruiter Journey Routes (Authenticated)

#### 19. Recruiter Dashboard `/recruiter/dashboard`
**File**: `app/(recruiter)/dashboard/page.tsx`  
**Auth**: Required (Recruiter role)

**Frontend Components**:
- Hot Candidate alert modal (if 90+ score)
- Rally Telemetry KPI tiles
- Active jobs grid (with pipelines)
- Recent activity feed
- Performance charts

**Data Sources**:
- **Server Component fetches**:
  - Recruiter's jobs
  - Candidate pipeline stats
  - Hot candidates (90+ scores)
  - Activity feed

**Backend**:
- **API**: `GET /api/recruiters/[userId]/dashboard`
- **Returns**: Aggregated dashboard data
- **Database Models**: Job, Application, FitScore, Candidate, Activity

**Navigation**:
- Sidebar nav (desktop): Dashboard, Candidates, Jobs, Analytics, Bias Audit, Messages, Settings
- Hot candidate → `/recruiter/candidates/[id]`
- Job card → `/recruiter/jobs/[id]`

---

#### 20. Fit Queue `/recruiter/candidates`
**File**: `app/(recruiter)/candidates/page.tsx`  
**Auth**: Required (Recruiter)

**Frontend Components**:
- Filter bar (role, status, skills, Fit Score, referrals)
- Sort dropdown
- Candidate cards grid
- Bulk actions bar (when select mode active)
- Shortlist drawer (slide-in)

**Data Sources**:
- **Server Component fetches**:
  - Candidates for recruiter's jobs
  - Fit Scores
  - Referral counts

**Backend**:
- **API**: `GET /api/recruiters/[userId]/candidates?job=[id]&minScore=...`
- **Database Models**: Candidate, FitScore, Job, Referral

**Navigation**:
- Candidate card → `/recruiter/candidates/[id]` (modal or page)
- Add to shortlist → Updates shortlist
- Compare → `/recruiter/candidates/compare?ids=[...]`

---

#### 21. Candidate Detail `/recruiter/candidates/[id]`
**File**: `app/(recruiter)/candidates/[id]/page.tsx`  
**Auth**: Required (Recruiter)

**Frontend Components**:
- Header (avatar, name, Fit Score, status)
- Tab navigation (Overview, Peer Feedback, Experience, Notes)
- Score breakdown cards
- Referrer credibility table
- Sidebar (quick actions, team notes)

**Data Sources**:
- **Server Component fetches**:
  - Candidate profile
  - Fit Score breakdown
  - Referrals
  - Team notes

**Backend**:
- **API**: `GET /api/candidates/[id]`
- **API**: `GET /api/candidates/[id]/referrals`
- **API**: `GET /api/candidates/[id]/notes`
- **Database Models**: Candidate, FitScore, Referral, Note

**Navigation**:
- Schedule → Interview scheduling modal
- Add to shortlist → Shortlist drawer
- Export → PDF download
- Back → `/recruiter/candidates`

---

#### 22. Compare Candidates `/recruiter/candidates/compare`
**File**: `app/(recruiter)/candidates/compare/page.tsx`  
**Auth**: Required (Recruiter)

**Frontend Components**:
- Side-by-side columns (2-3 candidates)
- Fit Score comparison
- Skills comparison
- Experience summary
- Referrals comparison

**Data Sources**:
- **Server Component fetches**:
  - Multiple candidates by IDs
  - Fit Scores
  - Referrals

**Backend**:
- **API**: `GET /api/candidates/compare?ids=[id1,id2,id3]`
- **Database Models**: Candidate, FitScore, Referral

**Query Params**: `?ids=uuid1,uuid2,uuid3`

---

#### 23. Post New Job `/recruiter/jobs/new`
**File**: `app/(recruiter)/jobs/new/page.tsx`  
**Auth**: Required (Recruiter)

**Frontend Components**:
- 3-step wizard (Basic Info, Skills & Calibration, JobPrint™)
- Form validation
- Preview calculation

**Backend**:
- **Server Action**: `createJob(jobData)`
- **Creates**: Job record
- **Database Models**: Job

**Navigation**:
- Save & Activate → `/recruiter/jobs/[id]`
- Cancel → `/recruiter/jobs/active`

---

#### 24. Job Detail `/recruiter/jobs/[id]`
**File**: `app/(recruiter)/jobs/[id]/page.tsx`  
**Auth**: Required (Recruiter)

**Frontend Components**:
- Job summary
- Candidate pipeline (stages)
- Top candidates
- Edit/Calibrate actions

**Data Sources**:
- **Server Component fetches**:
  - Job details
  - Applications (with stages)
  - Top Fit Scores

**Backend**:
- **API**: `GET /api/jobs/[id]`
- **API**: `GET /api/jobs/[id]/candidates`
- **Database Models**: Job, Application, FitScore, Candidate

**Navigation**:
- Edit → `/recruiter/jobs/[id]/edit`
- Calibrate → `/recruiter/jobs/[id]/calibrate`
- Candidate → `/recruiter/candidates/[id]`

---

#### 25. Job Calibration `/recruiter/jobs/[id]/calibrate`
**File**: `app/(recruiter)/jobs/[id]/calibrate/page.tsx`  
**Auth**: Required (Recruiter)

**Frontend Components**:
- JobPrint™ wizard
- Score weight sliders (TMS, SRS, RNS)
- Preview calculation
- Save & Recalculate button

**Backend**:
- **Server Action**: `updateJobCalibration(jobId, weights)`
- **Triggers**: Recalculate all Fit Scores for this job
- **Database Models**: Job, FitScore

**Navigation**:
- Save → `/recruiter/jobs/[id]`

---

#### 26. My Jobs `/recruiter/jobs/active`
**File**: `app/(recruiter)/jobs/active/page.tsx`  
**Auth**: Required (Recruiter)

**Frontend Components**:
- Job cards (status, candidate count, avg score)
- Filters (status, date)

**Data Sources**:
- **Server Component fetches**:
  - Recruiter's jobs

**Backend**:
- **API**: `GET /api/recruiters/[userId]/jobs`
- **Database Models**: Job

**Navigation**:
- Job card → `/recruiter/jobs/[id]`

---

#### 27. Shortlists `/recruiter/shortlists`
**File**: `app/(recruiter)/shortlists/page.tsx`  
**Auth**: Required (Recruiter)

**Frontend Components**:
- Shortlist cards
- Create new shortlist button

**Data Sources**:
- **Server Component fetches**:
  - Recruiter's shortlists

**Backend**:
- **API**: `GET /api/recruiters/[userId]/shortlists`
- **Database Models**: Shortlist

**Navigation**:
- Shortlist card → `/recruiter/shortlists/[id]`

---

#### 28. Shortlist Detail `/recruiter/shortlists/[id]`
**File**: `app/(recruiter)/shortlists/[id]/page.tsx`  
**Auth**: Required (Recruiter)

**Frontend Components**:
- Shortlist header (name, metadata)
- Candidate cards (reorderable)
- Share/Export actions

**Data Sources**:
- **Server Component fetches**:
  - Shortlist with candidates
  - Fit Scores

**Backend**:
- **API**: `GET /api/shortlists/[id]`
- **Database Models**: Shortlist, ShortlistCandidate, Candidate, FitScore

**Navigation**:
- Candidate → `/recruiter/candidates/[id]`
- Share link → Generate shareable URL (token-based)

---

#### 29. Analytics `/recruiter/analytics`
**File**: `app/(recruiter)/analytics/page.tsx`  
**Auth**: Required (Recruiter)

**Frontend Components**:
- Filter controls (period, role, department)
- KPI tiles
- Charts (hiring funnel, score trend, time-to-hire)
- Insights panel

**Data Sources**:
- **Server Component fetches**:
  - Aggregated analytics data

**Backend**:
- **API**: `GET /api/recruiters/[userId]/analytics?period=...`
- **Database Models**: Job, Application, FitScore, Candidate

---

#### 30. Bias Audit `/recruiter/bias-audit`
**File**: `app/(recruiter)/bias-audit/page.tsx`  
**Auth**: Required (Recruiter)

**Frontend Components**:
- Summary dashboard (fairness score)
- Role audit cards
- Drill-down modal
- Recommendations panel

**Data Sources**:
- **Server Component fetches**:
  - Bias audit data (aggregated, anonymized)

**Backend**:
- **API**: `GET /api/recruiters/[userId]/bias-audit`
- **Database Models**: BiasAudit, Job, Application

---

#### 31. Messages `/recruiter/messages`
**File**: `app/(recruiter)/messages/page.tsx`  
**Auth**: Required (Recruiter)

**Frontend Components**:
- Conversation list
- Message thread
- Compose new message

**Data Sources**:
- **Server Component fetches**:
  - User messages

**Backend**:
- **API**: `GET /api/messages`
- **Server Action**: `sendMessage(recipientId, content)`
- **Database Models**: Message

---

#### 32. Recruiter Settings `/recruiter/settings`
**File**: `app/(recruiter)/settings/page.tsx`  
**Auth**: Required (Recruiter)

**Frontend Components**:
- Notification preferences
- Team management
- Integrations (ATS)
- Billing

**Backend**:
- **Server Action**: `updateSettings(settings)`
- **Database Models**: User, Recruiter

---

### Referrer Journey Routes (Public/Token-Based)

#### 33. Referrer Landing `/referrer/[token]`
**File**: `app/(referrer)/[token]/page.tsx`  
**Auth**: None (token-based access)

**Frontend Components**:
- Hero (candidate context)
- Value proposition
- LinkedIn auth CTA
- Manual option

**Data Sources**:
- **Server Component fetches**:
  - Referral request details (from token)

**Backend**:
- **API**: `GET /api/referrals/[token]`
- **Returns**: Candidate name, job details
- **Database Models**: Referral, Candidate, Job

**Navigation**:
- LinkedIn auth → `/referrer/[token]/auth`
- Manual → `/referrer/[token]/form`

---

#### 34. Referrer Auth `/referrer/[token]/auth`
**File**: `app/(referrer)/[token]/auth/page.tsx`  
**Auth**: LinkedIn OAuth

**Frontend Components**:
- LinkedIn OAuth flow
- Loading state

**Backend**:
- **OAuth**: LinkedIn API
- **Server Action**: `verifyLinkedInConnection(token, linkedInData)`
- **Creates**: Referrer record
- **Database Models**: Referrer, Referral

**Navigation**:
- Success → `/referrer/[token]/form` (autofilled)

---

#### 35. Referrer Form `/referrer/[token]/form`
**File**: `app/(referrer)/[token]/form/page.tsx`  
**Auth**: None (token-based)

**Frontend Components**:
- Progress header
- Skill rating grid (stars)
- Optional feedback textarea
- Submit button (shows impact)

**Data Sources**:
- **Client-side state**: Form data
- **Server Component fetches**: Referral details

**Backend**:
- **Server Action**: `submitReferral(token, formData)`
- **Updates**: Referral record
- **Triggers**: Recalculate candidate Fit Score
- **Database Models**: Referral, FitScore

**Navigation**:
- Submit → `/referrer/[token]/complete`

---

#### 36. Referrer Complete `/referrer/[token]/complete`
**File**: `app/(referrer)/[token]/complete/page.tsx`  
**Auth**: None

**Frontend Components**:
- Success animation
- Impact visualization
- Skylevel pitch
- Share option

**Data Sources**:
- **Server Component fetches**:
  - Updated Fit Score
  - Referral details

**Navigation**:
- Try Skylevel → `/auth/sign-up?role=candidate`

---

## Navigation Patterns

### 1. Marketing Site Navigation (Public)

**Desktop Header**:
```
Logo | How It Works | Pricing | Integrations | Resources | Contact | [Sign In] [Get Started]
```

**Mobile Header**:
```
☰ Logo [Get Started]
```

**Implementation**:
- `app/components/MarketingHeader.tsx`
- Sticky header on scroll
- Hamburger menu for mobile

---

### 2. Candidate Bottom Navigation (Mobile)

**Bottom Nav Bar**:
```
[🏁 Dashboard] [🎯 Jobs] [📋 Applications] [👤 Profile]
```

**Implementation**:
- `app/components/CandidateBottomNav.tsx`
- Fixed position: bottom
- Active state based on current route
- Hidden on desktop (use sidebar or top nav)

**Desktop Sidebar** (Alternative):
```
Dashboard
Jobs
Applications
Profile
Settings
```

---

### 3. Recruiter Sidebar Navigation (Desktop)

**Sidebar**:
```
📊 Dashboard
🎯 Candidates (Fit Queue)
📁 Jobs
📈 Analytics
🛡️ Bias Audit
💬 Messages
⚙️ Settings
```

**Implementation**:
- `app/components/RecruiterSidebar.tsx`
- Collapsible on smaller screens
- Active route highlighting
- Role indicator (Recruiter)

**Mobile**: Hamburger menu reveals same items

---

### 4. Referrer Linear Flow (No Navigation)

Referrer flow is **single-path** with no navigation menu:

```
Landing → Auth/Form → Complete
```

Only "Back" button or browser back allowed.

---

## Data Flow Architecture

### Server Components (Default in Next.js 14)

**Use for**:
- Initial page data fetching
- SEO-critical content
- Public pages
- Dashboard aggregations

**Example**:
```tsx
// app/(candidate)/dashboard/page.tsx
export default async function CandidateDashboard() {
  const user = await getCurrentUser(); // Clerk
  const dashboardData = await getDashboardData(user.id); // Prisma query
  
  return <DashboardView data={dashboardData} />;
}
```

---

### Client Components (Interactive)

**Use for**:
- Forms
- Modals
- Filters/Search
- Real-time updates

**Example**:
```tsx
'use client'
import { useState } from 'react';

export function JobFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({...});
  
  return <FilterBar filters={filters} onChange={...} />;
}
```

---

### Server Actions (Mutations)

**Use for**:
- Form submissions
- Data updates
- Create/Update/Delete operations

**Example**:
```tsx
// app/actions/candidates.ts
'use server'

export async function submitApplication(formData: FormData) {
  const user = await getCurrentUser();
  const application = await prisma.application.create({
    data: {
      candidateId: user.id,
      jobId: formData.get('jobId'),
      // ...
    }
  });
  
  // Trigger Fit Score calculation
  await calculateFitScore(application.candidateId, application.jobId);
  
  revalidatePath('/candidate/applications');
  return { success: true, applicationId: application.id };
}
```

---

### API Routes (External Integrations)

**Use for**:
- Webhooks
- Third-party API calls
- Public API endpoints

**Example**:
```tsx
// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix';

export async function POST(req: Request) {
  const payload = await req.json();
  // Handle Clerk user.created event
  await prisma.user.create({ data: {...} });
  return new Response('OK', { status: 200 });
}
```

---

## Authentication & Authorization

### Role-Based Access Control (RBAC)

**Clerk Middleware** (`middleware.ts`):
```ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/how-it-works(.*)",
    "/pricing",
    "/integrations",
    "/resources",
    "/contact",
    "/jobs(.*)",
    "/referrer/:token(.*)"
  ],
  ignoredRoutes: ["/api/webhooks(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

**Route Protection**:
```tsx
// app/(recruiter)/dashboard/page.tsx
import { auth } from '@clerk/nextjs';

export default async function RecruiterDashboard() {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/auth/sign-in');
  }
  
  const user = await prisma.user.findUnique({
    where: { clerkId: userId }
  });
  
  if (user.role !== 'RECRUITER') {
    redirect('/unauthorized');
  }
  
  // Render dashboard
}
```

---

## Database Context per Route

### Key Data Models

**Candidate Routes Need**:
- `Candidate` (profile data)
- `Application` (application status)
- `FitScore` (TMS/SRS/RNS)
- `Job` (job details)
- `SavedJob` (bookmarked jobs)

**Recruiter Routes Need**:
- `User` (recruiter profile)
- `Job` (posted jobs)
- `Application` (candidate applications)
- `FitScore` (scoring data)
- `Candidate` (applicant profiles)
- `Shortlist` (saved candidate lists)
- `BiasAudit` (fairness metrics)

**Referrer Routes Need**:
- `Referral` (referral request)
- `Candidate` (who's being referred)
- `Job` (what job)
- `Referrer` (referrer profile)

---

## State Management Strategy

### Server Components (Preferred)

**Use for**: Data fetching, initial state

```tsx
// Server Component (default)
export default async function CandidateDashboard() {
  const data = await fetchDashboardData();
  return <DashboardClient data={data} />;
}
```

---

### Zustand (Client State)

**Use for**: 
- Modal state
- Filter state
- Temporary UI state

```tsx
// stores/useFilters.ts
import create from 'zustand';

export const useFilters = create((set) => ({
  minScore: 0,
  skills: [],
  setMinScore: (score) => set({ minScore: score }),
  addSkill: (skill) => set((state) => ({ 
    skills: [...state.skills, skill] 
  }))
}));
```

---

### URL State (Shareable Filters)

**Use for**: Filters, search, pagination

```tsx
// useSearchParams hook
const searchParams = useSearchParams();
const minScore = searchParams.get('minScore') || '0';

// Update URL without refresh
router.push(`/recruiter/candidates?minScore=${newScore}`);
```

---

## Performance Optimizations

### Route-Level Code Splitting

Next.js automatically code-splits by route. Heavy components can be lazy-loaded:

```tsx
import dynamic from 'next/dynamic';

const CandidateDetailModal = dynamic(
  () => import('@/components/CandidateDetailModal'),
  { 
    loading: () => <Skeleton />,
    ssr: false 
  }
);
```

---

### Streaming SSR

Use React Suspense for progressive rendering:

```tsx
export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <Suspense fallback={<Skeleton />}>
        <HotCandidates />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <RecentActivity />
      </Suspense>
    </>
  );
}
```

---

### Parallel Data Fetching

```tsx
export default async function CandidateProfile({ params }) {
  // Fetch in parallel
  const [candidate, fitScore, referrals] = await Promise.all([
    getCandidate(params.id),
    getFitScore(params.id),
    getReferrals(params.id)
  ]);
  
  return <ProfileView {...} />;
}
```

---

## Developer Implementation Checklist

### Phase 1: Marketing Site (Week 1)
- [ ] Create `app/(marketing)` route group
- [ ] Build Homepage with static content
- [ ] Implement How It Works with journey tabs
- [ ] Add Pricing, Integrations, Resources, Contact
- [ ] Set up MarketingHeader component
- [ ] Deploy marketing site

### Phase 2: Authentication (Week 1)
- [ ] Install Clerk (`npm install @clerk/nextjs`)
- [ ] Create `app/(auth)` route group
- [ ] Configure Clerk middleware
- [ ] Implement sign-in/sign-up pages
- [ ] Set up Clerk webhook for user creation
- [ ] Test role-based redirects

### Phase 3: Candidate Journey (Week 2)
- [ ] Create `app/(candidate)` route group
- [ ] Build Dashboard page (Server Component)
- [ ] Implement Job Search with filters
- [ ] Create Job Detail page
- [ ] Build Apply flow (form + Server Action)
- [ ] Add Profile Builder wizard
- [ ] Implement Applications tracker
- [ ] Add bottom navigation (mobile)

### Phase 4: Recruiter Journey (Week 3)
- [ ] Create `app/(recruiter)` route group
- [ ] Build Recruiter Dashboard
- [ ] Implement Fit Queue with filters
- [ ] Create Candidate Detail view
- [ ] Build Shortlist management
- [ ] Add Job posting flow
- [ ] Implement JobPrint™ calibration
- [ ] Add Analytics dashboard
- [ ] Build Bias Audit
- [ ] Add sidebar navigation

### Phase 5: Referrer Journey (Week 3)
- [ ] Create `app/(referrer)/[token]` route
- [ ] Build Landing page
- [ ] Implement LinkedIn OAuth
- [ ] Create Referral form
- [ ] Add Completion page
- [ ] Test token-based access

### Phase 6: API & Data Layer (Week 2-3)
- [ ] Set up Prisma schema
- [ ] Create API routes (`app/api`)
- [ ] Implement Server Actions
- [ ] Add Fit Score calculation logic
- [ ] Set up database queries (Prisma)
- [ ] Test data flows

---

## Developer Quick Reference

### Adding a New Route

1. **Create file** in appropriate route group:
   ```
   app/(recruiter)/new-feature/page.tsx
   ```

2. **Determine auth requirements**:
   - Public? → No auth check
   - Authenticated? → Add `auth()` check
   - Role-specific? → Add role check

3. **Fetch data** (if Server Component):
   ```tsx
   export default async function NewFeature() {
     const data = await prisma.model.findMany();
     return <View data={data} />;
   }
   ```

4. **Add to navigation** (if needed):
   - Update sidebar/bottom nav component
   - Add route to navigation config

5. **Test**:
   - Visit route in browser
   - Verify auth redirects
   - Check data loading

---

### Adding a New API Route

1. **Create route handler**:
   ```
   app/api/new-endpoint/route.ts
   ```

2. **Export HTTP methods**:
   ```ts
   export async function GET(request: Request) {
     const { userId } = auth();
     const data = await prisma.model.findMany({...});
     return Response.json(data);
   }
   
   export async function POST(request: Request) {
     const body = await request.json();
     const result = await prisma.model.create({...});
     return Response.json(result);
   }
   ```

3. **Add validation** (Zod):
   ```ts
   import { z } from 'zod';
   const schema = z.object({...});
   const validated = schema.parse(body);
   ```

4. **Test with cURL or Postman**

---

### Adding a Server Action

1. **Create action file**:
   ```
   app/actions/candidates.ts
   ```

2. **Export async function**:
   ```ts
   'use server'
   
   export async function submitApplication(formData: FormData) {
     const user = await getCurrentUser();
     // ... mutation logic
     revalidatePath('/candidate/applications');
     return { success: true };
   }
   ```

3. **Use in Client Component**:
   ```tsx
   'use client'
   import { submitApplication } from '@/app/actions/candidates';
   
   export function ApplyForm() {
     return (
       <form action={submitApplication}>
         {/* form fields */}
         <button type="submit">Submit</button>
       </form>
     );
   }
   ```

---

## Deployment on Replit

### Environment Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set environment variables** in Replit Secrets:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
   CLERK_SECRET_KEY=sk_live_...
   DATABASE_URL=postgresql://...
   ```

3. **Run dev server**:
   ```bash
   npm run dev
   ```

4. **Deploy to Replit Autoscale**:
   - Click "Deploy" in Replit
   - Select "Autoscale Deployment"
   - Configure custom domain (optional)

---

## Summary

This sitemap and IA document provides:

✅ **Complete route structure** for Next.js 14 App Router  
✅ **User journey mapping** for all personas  
✅ **Data requirements** per route  
✅ **Authentication strategy** with Clerk  
✅ **Navigation patterns** for mobile/desktop  
✅ **State management** guidelines  
✅ **Developer implementation** checklists  

**Next Steps**:
1. Review this document with the team
2. Begin Phase 1 (Marketing Site)
3. Iterate based on user testing

**Status**: Ready for Development  
**Owner**: Engineering Team  
**Last Updated**: January 2025

---
