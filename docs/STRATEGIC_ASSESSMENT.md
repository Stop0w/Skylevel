
# Skylevel Strategic Assessment: Core Value Proposition

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Status:** Active - Transition to Greenfield Rebuild  
**Author:** 0.1% Recruiter Operator Analysis

---

## ⚠️ Current State Context

**Legacy Codebase**: React 18 + Vite prototype (validated UX, ready to be replaced)  
**Target Codebase**: Next.js 14 + TypeScript + Prisma (greenfield rebuild in progress)

This strategic assessment informed the decision to **rebuild from scratch** rather than iterate on the prototype.

---

## Executive Summary

This document outlines the strategic assessment of Skylevel's product vision, feature prioritization, and launch requirements. Skylevel is **not** a job board or ATS—it is an **intelligence layer** that synthesizes candidate volume through validated Fit Scores to accelerate the recruitment process.

**Core Value Proposition:** Take the chaos of 200 resumes → surface the 5 candidates with proven Fit Scores + peer validation → enable fast, confident hiring decisions.

---

## Table of Contents

1. [Product Vision](#product-vision)
2. [Feature Prioritization Framework](#feature-prioritization-framework)
3. [Critical Features (Must Have)](#critical-features-must-have)
4. [Consider Features (Should Have)](#consider-features-should-have)
5. [Features to Delete](#features-to-delete)
6. [Features to Add](#features-to-add)
7. [Launch Specification](#launch-specification)
8. [Implementation Priorities](#implementation-priorities)
9. [Success Metrics](#success-metrics)

---

## Product Vision

### What Skylevel IS

- **Intelligence Layer**: AI-powered candidate scoring and validation system
- **Decision Acceleration Tool**: Converts volume into quality insights
- **Trust Signal Generator**: Peer validation and referral network intelligence
- **Integration Hub**: Works alongside existing ATS/TMS systems

### What Skylevel IS NOT

- ❌ Job Board
- ❌ Applicant Tracking System (ATS)
- ❌ Talent Management System (TMS)
- ❌ LinkedIn Clone
- ❌ Resume Builder
- ❌ Interview Scheduler

### Target Audiences

1. **Recruiters**: Need to fill roles faster with higher quality candidates
2. **Employers/Hiring Managers**: Need confident hiring decisions with reduced bias

---

## Feature Prioritization Framework

All features are evaluated against these criteria:

| Criterion | Weight | Description |
|-----------|--------|-------------|
| **Core Value Alignment** | 40% | Does it accelerate hiring decisions through validated Fit Scores? |
| **Launch Critical** | 30% | Is it necessary for MVP functionality? |
| **Competitive Differentiation** | 20% | Does it distinguish us from ATS/job boards? |
| **User Friction** | 10% | Does it reduce or increase time-to-decision? |

---

## Critical Features (Must Have)

### For Recruiters & Employers

#### 1. Candidate Intelligence (The Core Product)

**Priority:** P0 (Blocker)

**Components:**
- **Fit Score Display** (TMS + SRS + RNS breakdown)
  - Technical Match Score (TMS)
  - Soft Skills Rating Score (SRS)
  - Referral Network Score (RNS)
- **Candidate Basic Info**: Name, role, location, status
- **Skills Match Visualization**: Visual representation of why the score is what it is
- **Referral/Peer Validation Count**: Trust signal indicator
- **Application Status Tracking**: Where candidates are in the pipeline

**Implementation Location:** `src/components/ScorePill.jsx`, `src/components/ScoreBreakdownTable.jsx`

**User Story:**
> As a recruiter, I need to see a candidate's Fit Score breakdown immediately so I can prioritize my time on high-potential matches.

---

#### 2. Decision Acceleration Tools

**Priority:** P0 (Blocker)

**Components:**
- **Fit Queue with Sorting/Filtering**: Volume → quality fast
  - Sort by: Fit Score, Referrals, Recency, Status
  - Filter by: Score threshold, Skills, Location, Status
- **Hot Candidate Alerts**: 90+ scores, 2+ referrals
- **Shortlist Builder**: Organize top talent quickly
- **Candidate Comparison**: Side-by-side Fit Score analysis
- **Quick Actions**: Schedule Interview, Message, Shortlist (one-click)

**Implementation Location:** `src/pages/FitQueue.jsx`, `src/components/ShortlistDrawer.jsx`

**User Story:**
> As a hiring manager, I need to compare top candidates side-by-side to make a final hiring decision within minutes, not hours.

---

#### 3. Bias Audit Dashboard

**Priority:** P1 (Critical)

**Components:**
- Gender/ethnicity pass-through rates
- Flagged roles requiring review
- One-click audit report generation
- Disparity bar charts

**Implementation Location:** `src/pages/BiasAudit.jsx`, `src/components/DisparityBarChart.jsx`

**User Story:**
> As an employer, I need to ensure our hiring process is fair and compliant, with automated bias detection to mitigate risk.

---

#### 4. Referral Network Intelligence

**Priority:** P1 (Critical)

**Components:**
- **Referrer Credibility Scores**: Is this validation legitimate?
- **Network Influence Heatmap**: Who vouched matters
- **Referral Completion Rate**: Pipeline health indicator

**Implementation Location:** `src/components/ReferrerCredibilityTable.jsx`, `src/components/ReferrerInfluenceHeatmap.jsx`

**User Story:**
> As a recruiter, I need to trust the peer validations, so I need to see who's vouching and their credibility score.

---

#### 5. Time-to-Hire Metrics

**Priority:** P1 (Critical)

**Components:**
- Dashboard with key metrics
- 30-day snapshot (not historical trends)
- ROI proof for employers

**Implementation Location:** `src/pages/RecruiterAnalytics.jsx`, `src/components/KpiTile.jsx`

---

## Consider Features (Should Have)

These features add value but are **not required for launch**. Prioritize post-MVP.

### Nice-to-Have Analytics
- ⏸️ Detailed historical performance trends (keep it simple: 30-day snapshot only)
- ⏸️ Advanced funnel visualization (basic conversion % is enough)
- ⏸️ Recruiter leaderboards (too gamified for serious buyers)
- ⏸️ Candidate engagement metrics (candidate-side feature, not recruiter)

### Workflow Enhancements
- ⏸️ Bulk candidate actions (launch with 1-by-1, scale later)
- ⏸️ Custom notification rules (start with defaults)
- ⏸️ Advanced search filters beyond skills/score (don't overcomplicate)
- ⏸️ Interview scheduling integration (propose calendar link, don't build scheduler)

### Team Collaboration
- ⏸️ Team notes panel (keep it in candidate detail, not everywhere)
- ⏸️ @mentions in comments (v2 feature)
- ⏸️ Activity logs (useful but not critical for decision-making)

**Rationale:** These features improve workflow but don't directly impact the core value proposition of accelerating hiring through validated Fit Scores.

---

## Features to Delete

### ❌ Job Board Features

**Why Remove:** Skylevel is NOT an ATS/Job Board

- `src/pages/BrowseRoles.jsx` - Delete
- `src/pages/JobSearch.jsx` - Simplify or remove
- Job posting workflow in `src/components/JobCalibrationWizard.jsx` - Reduce complexity
- Job description editors
- "Browse Roles" for candidates
- Saved jobs functionality

**Impact:** Removes ~15% of current codebase, sharpens focus

---

### ❌ Redundant Dashboards

**Why Remove:** Candidates don't need a dashboard in Skylevel—they get scored, that's it

- Candidate Dashboard (extensive version)
- Candidate Profile Builder (collect data passively via integrations)
- "My Applications" tracking (this is ATS territory)
- Profile Edit pages (not our job)

**Files to Simplify:**
- `src/pages/CandidateDashboard.jsx` - Reduce to essentials
- `src/pages/ProfileEdit.jsx` - Minimal version only
- `src/pages/Applications.jsx` - Remove or simplify drastically

---

### ❌ Over-Engineered Analytics

**Why Remove:** Too granular for launch, creates analysis paralysis

- `src/components/ScoreTrendChart.jsx` with 12-week history (overkill, show 30 days max)
- Time-to-hire by role breakdowns (too granular for launch)
- Detailed KPI tiles with trend arrows (simplify to raw numbers + one comparison)

---

### ❌ Candidate-Facing Features

**Why Remove:** Skylevel serves recruiters/employers, NOT candidates directly

- Candidate journey pages ("How It Works for Candidates") - Minimal version only
- Job matching feed for candidates
- Candidate messaging center
- Portfolio/work sample uploads (integrate with LinkedIn/GitHub, don't host)

**Files to Review:**
- `src/pages/ForCandidates.jsx` - Keep minimal
- `src/pages/HowItWorksCandidates.jsx` - Simplify

---

### ❌ Marketing Fluff in App

**Why Remove:** Belongs on marketing site, not in-app

- Multiple "How It Works" journey variants (one page max)
- Long-form case studies in-app (put on marketing site)
- Pricing calculator widget in app (sales team handles this)
- Social proof sections everywhere (one testimonial block, that's it)

---

## Features to Add

### Critical Missing Features

#### 1. ATS Integration Status Dashboard

**Priority:** P0 (Blocker)

**Rationale:** Recruiters need to trust the data flow

**Components:**
- Show which ATS is connected (Greenhouse, Lever, etc.)
- Last sync timestamp
- Candidate import success rate
- Connection health status

**Implementation:**
```jsx
// New component: src/components/IntegrationStatusDashboard.jsx
<IntegrationStatusDashboard 
  connectedSystem="Greenhouse"
  lastSync="2 minutes ago"
  syncSuccessRate={98.5}
  status="healthy"
/>
```

---

#### 2. Fit Score Confidence Level

**Priority:** P0 (Blocker)

**Rationale:** Not all 85% scores are equal

**Components:**
- "High Confidence (3+ peer validations)"
- "Medium Confidence (1 referral, self-rated)"
- "Low Confidence (self-rated only)"
- Confidence badge on every score display

**Implementation:**
```jsx
// Update: src/components/ScorePill.jsx
<ScorePill 
  score={85} 
  confidence="high"
  validations={3}
/>
```

---

#### 3. Red Flag Indicators

**Priority:** P1 (Critical)

**Rationale:** Surfacing risk saves bad hires

**Components:**
- Skill inflation detection (self-rated 10/10 but no peer validation)
- Resume/LinkedIn discrepancies
- Referrer credibility warnings
- Automated flagging system

**Implementation:**
```jsx
// New component: src/components/RedFlagIndicator.jsx
<RedFlagIndicator 
  type="skill_inflation"
  severity="medium"
  message="Self-rated 10/10 in React, but no peer validations"
/>
```

---

#### 4. Speed-to-Decision Timer

**Priority:** P1 (Critical)

**Rationale:** Urgency drives usage, usage drives value

**Components:**
- "Candidate submitted 2 hours ago—respond within 4 hours or lose to competitors"
- Time-sensitive alerts
- Competitive intelligence

**Implementation:**
```jsx
// New component: src/components/UrgencyTimer.jsx
<UrgencyTimer 
  submittedAt="2025-01-08T10:00:00Z"
  recommendedResponseTime={4}
  competitorCount={3}
/>
```

---

#### 5. Benchmark Context

**Priority:** P1 (Critical)

**Rationale:** Context makes scores actionable

**Components:**
- "This 87 Fit Score is top 12% for Backend roles this month"
- Percentile rankings
- Role-specific benchmarks

**Implementation:**
```jsx
// Update: src/components/ScoreBreakdownTable.jsx
<BenchmarkContext 
  score={87}
  percentile={12}
  role="Backend Developer"
  timeframe="30 days"
/>
```

---

#### 6. One-Click Interview Request

**Priority:** P1 (Critical)

**Rationale:** Reduce recruiter friction from "interested" to "booked"

**Components:**
- Generate pre-filled email with Calendly link
- SMS option
- Calendar integration (propose, don't build scheduler)

**Implementation:**
```jsx
// New component: src/components/QuickInterviewRequest.jsx
<QuickInterviewRequest 
  candidateId="cand_123"
  recruiterCalendarLink="calendly.com/recruiter"
  emailTemplate="default"
/>
```

---

#### 7. Employer-Specific Calibration Memory

**Priority:** P2 (Important)

**Rationale:** Personalization = accuracy = trust

**Components:**
- "You historically hire 85+ scores for this role—here are your matches"
- Company-specific scoring weights
- Historical hiring pattern analysis

**Implementation:**
```jsx
// New utility: src/utils/employerCalibration.js
function getEmployerPreferences(employerId, roleType) {
  // Return historical hiring patterns
}
```

---

## Launch Specification

### Primary Screen: Fit Queue

**File:** `src/pages/FitQueue.jsx`

**Components:**
- Candidate cards: Name, Role, Fit Score, Referral Count, Location, Status
- Sort: Fit Score, Referrals, Recency
- Filter: Score threshold, Skills, Status
- Quick Actions: View Profile, Schedule Interview, Shortlist

**User Flow:**
1. Recruiter logs in → lands on Fit Queue
2. Sees top candidates sorted by Fit Score
3. Filters by role requirements
4. Clicks "View Profile" for details
5. Clicks "Schedule Interview" for quick action

---

### Candidate Detail Panel

**File:** `src/pages/RecruiterCandidateDetail.jsx`

**Components:**
- Fit Score breakdown (TMS/SRS/RNS)
- Skills match vs job requirements
- Referrer credibility table
- Red flags (if any)
- Quick contact options

---

### Shortlist Management

**File:** `src/components/ShortlistDrawer.jsx`

**Components:**
- Drag-drop candidates
- Export to CSV/PDF for hiring manager
- Share link with team

---

### Bias Audit

**File:** `src/pages/BiasAudit.jsx`

**Components:**
- Gender/ethnicity pass-through rates
- Flagged roles requiring review
- One-click audit report

---

### Settings (Minimal)

**File:** `src/pages/Settings.jsx`

**Components:**
- ATS integration status
- Notification preferences
- Score weight calibration (if custom)

---

## Implementation Priorities

### Phase 1: Fix Critical Blockers (P0)

**Timeline:** Immediate (1-2 days)

1. ✅ Fix ApplyToJob job lookup logic completely
2. ✅ Implement journey-based CTA colors on HowItWorks page
3. ✅ Resolve data ID consistency across all components
4. ✅ Clean up console warnings and errors
5. ✅ Test complete candidate flow end-to-end

**Files to Fix:**
- `src/pages/ApplyToJob.jsx`
- `src/pages/HowItWorks.jsx`
- `src/data/mockData.js`

---

### Phase 2: Add Critical Missing Features (P0)

**Timeline:** 3-5 days

1. Add ATS Integration Status Dashboard
2. Add Fit Score Confidence Level
3. Add Red Flag Indicators
4. Add Speed-to-Decision Timer
5. Add Benchmark Context
6. Add One-Click Interview Request
7. Add Employer-Specific Calibration Memory

---

### Phase 3: Delete Bloat (P1)

**Timeline:** 2-3 days

1. Remove job board features
2. Simplify candidate-facing pages
3. Remove over-engineered analytics
4. Clean up marketing fluff in app

**Estimated Reduction:** ~40% of current codebase

---

### Phase 4: Polish & Testing (P1-P2)

**Timeline:** 3-5 days

1. UI/UX polish
2. Cross-browser testing
3. Mobile responsiveness
4. Performance optimization

---

## Success Metrics

### Launch KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Time to First Shortlist** | < 5 minutes | Time from login to first candidate shortlisted |
| **Fit Score Trust** | > 80% | % of recruiters who say they trust the score |
| **Speed to Interview Request** | < 3 clicks | Clicks from viewing candidate to booking interview |
| **Bias Audit Usage** | > 60% | % of employers who run bias audit within 30 days |
| **Integration Success Rate** | > 95% | % of ATS connections that sync successfully |

### Post-Launch Success Indicators

- **70% faster screening** (average time saved per role)
- **60% fewer bad hires** (mis-hire reduction rate)
- **85% hiring confidence** (manager satisfaction score)

---

## Documentation Standards

This document follows the **Diátaxis** framework:

- **Tutorials**: Step-by-step guidance for new users
- **How-To Guides**: Task-oriented instructions
- **Reference**: Technical descriptions of features
- **Explanation**: Conceptual understanding of the system

### Related Documentation

- [API Documentation](./API.md) - Coming soon
- [Integration Guide](./INTEGRATIONS.md) - Coming soon
- [User Onboarding](./ONBOARDING.md) - Coming soon

---

## Glossary

| Term | Definition |
|------|------------|
| **Fit Score** | AI-generated score combining Technical Match (TMS), Soft Skills (SRS), and Referral Network (RNS) |
| **TMS** | Technical Match Score - measures technical skill alignment |
| **SRS** | Soft Skills Rating Score - measures behavioral/cultural fit |
| **RNS** | Referral Network Score - measures peer validation strength |
| **ATS** | Applicant Tracking System - traditional hiring software |
| **TMS** (context: system) | Talent Management System - broader HR platform |
| **Fit Queue** | Primary recruiter interface showing ranked candidates |
| **Hot Candidate** | Candidate with 90+ Fit Score and 2+ referrals |
| **Referrer Credibility** | Score indicating trustworthiness of peer validation |

---

## Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-01-08 | Initial strategic assessment documentation | 0.1% Recruiter Operator |

---

## Next Steps

1. ✅ Review this document with stakeholders
2. ⏸️ Create implementation tickets for Phase 1
3. ⏸️ Set up automated testing for critical flows
4. ⏸️ Schedule user testing sessions with beta recruiters
5. ⏸️ Plan launch marketing campaign

---

**Document Maintained By:** Product & Engineering Team  
**Review Frequency:** Weekly during development, monthly post-launch  
**Feedback:** Create issues in project repository with label `documentation`
