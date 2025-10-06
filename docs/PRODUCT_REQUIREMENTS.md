
# Skylevel Product Requirements Document (PRD)

**Version**: 1.0  
**Date**: January 2025  
**Status**: Approved for Development  
**Owner**: Product Team  
**Tech Stack**: Next.js 14 + TypeScript + Prisma (Greenfield Rebuild)

---

## Executive Summary

Skylevel is an AI-powered candidate intelligence layer that transforms recruitment chaos into confident hiring decisions. This document defines the complete product requirements for the **greenfield Next.js 14 rebuild**.

**Note**: The current React + Vite prototype validated the UX flows. All features described here will be built fresh in Next.js 14.

**Core Value Proposition**: Take 200 resumes → surface 5 candidates with validated Fit Scores → enable fast, confident hiring.

---

## Product Vision

### Problem Statement

**For Recruiters:**
- Drowning in 200+ resumes per role
- Spend 80% of time on manual screening
- Low confidence in candidate quality
- Bias risks in manual review

**For Employers:**
- Bad hires cost $240K+ per mis-hire
- Lack of trust in recruitment signals
- Compliance and bias concerns
- Slow time-to-hire kills productivity

### Solution

Skylevel provides an intelligence layer that:
1. **Scores candidates** using TMS (Technical Match) + SRS (Soft Skills) + RNS (Referral Network)
2. **Validates through peer referrals** to build trust
3. **Surfaces top talent** automatically to accelerate decisions
4. **Audits for bias** to ensure fair hiring

---

## User Personas

### Primary: Recruiter (Sarah)
- **Role**: Agency/In-house Recruiter
- **Goals**: Fill 10+ roles/month, 70% faster
- **Pain**: Manual resume screening, low candidate quality
- **Success Metric**: 5 quality candidates surfaced in <30 minutes

### Secondary: Hiring Manager (David)
- **Role**: Engineering Manager
- **Goals**: Hire confidently, reduce bias
- **Pain**: Lack of trust in candidate signals
- **Success Metric**: Make hiring decision in <2 days

### Tertiary: Candidate (Maria)
- **Role**: Software Engineer
- **Goals**: Get matched to right roles faster
- **Pain**: Black hole application process
- **Success Metric**: Receive response within 24 hours

### Support: Referrer (John)
- **Role**: Professional providing validation
- **Goals**: Quickly vouch for someone
- **Pain**: Lengthy referral forms
- **Success Metric**: Complete referral in <2 minutes

---

## Feature Requirements

### 1. Fit Score Engine (P0 - Critical)

**User Story**: As a recruiter, I need to see a candidate's Fit Score instantly so I can prioritize my time on high-potential matches.

**Requirements**:
- Display overall Fit Score (0-100)
- Show breakdown: TMS, SRS, RNS
- Confidence level indicator (High/Medium/Low)
- Real-time calculation on candidate submission
- Visual score pill component

**Acceptance Criteria**:
- Score calculation completes in <50ms
- Score updates in real-time when new referrals arrive
- Breakdown explains score composition
- Confidence level based on validation count

**Technical Notes**:
- Algorithm: `(TMS × 0.5) + (SRS × 0.3) + (RNS × 0.2)`
- JobPrint™ allows custom weights per role
- Store score history for audit trail

---

### 2. Fit Queue Interface (P0 - Critical)

**User Story**: As a recruiter, I need to review 200 candidates in <5 minutes so I can focus on top talent.

**Requirements**:
- List view with candidate cards
- Sort by: Fit Score, Referrals, Recency
- Filter by: Score threshold, Skills, Location, Status
- Virtual scrolling for 200+ items
- Quick actions: View, Shortlist, Schedule

**Acceptance Criteria**:
- Initial render <200ms for 200 candidates
- Filters apply in <100ms
- Sort updates in <100ms
- Keyboard navigation supported

**UI Components**:
- CandidateCard: Name, Role, Score, Referrals, Location
- FilterBar: Score slider, Skill tags, Location dropdown
- SortDropdown: Score, Referrals, Date
- QuickActions: Icon buttons

---

### 3. Candidate Profile (P0 - Critical)

**User Story**: As a recruiter, I need to see complete candidate details to make an informed decision.

**Requirements**:
- Fit Score breakdown with explanation
- Skills match visualization
- Referral network display
- Work samples and portfolio links
- Resume/LinkedIn integration
- Quick actions: Shortlist, Schedule, Message

**Acceptance Criteria**:
- All data loads in <300ms
- Score breakdown is interactive (hover for details)
- Referral credibility scores visible
- Skills match shows % alignment

**Data Requirements**:
- Candidate: name, email, phone, location, role
- Skills: array with proficiency levels
- Referrals: referrer info, trust score, relationship
- Work samples: URLs, descriptions
- Resume: parsed text or PDF link

---

### 4. Referral System (P1 - High Priority)

**User Story**: As a recruiter, I need peer validation to trust candidate quality.

**Requirements**:
- Generate unique referral links
- Referrer completes form in <2 minutes
- Referrer credibility scoring
- Multiple referral support per candidate
- Real-time score updates

**Acceptance Criteria**:
- Referral link generated instantly
- Form has <5 fields (name, relationship, skills, feedback)
- Referrer credibility calculated based on network
- RNS updates immediately on referral submission

**Referrer Flow**:
1. Receive link via email/SMS
2. Land on referral page (no login required)
3. Fill simple form (2-3 minutes)
4. Submit → Confirmation screen
5. Candidate's RNS updates in real-time

---

### 5. Shortlist Builder (P1 - High Priority)

**User Story**: As a recruiter, I need to organize top candidates for hiring manager review.

**Requirements**:
- Create multiple shortlists per job
- Drag-drop candidates to shortlists
- Export shortlist (PDF, CSV)
- Share shortlist link with team
- Compare candidates side-by-side

**Acceptance Criteria**:
- Add to shortlist in <1 click
- Drag-drop works smoothly
- Export generates in <2 seconds
- Share link works without login

**UI Components**:
- ShortlistDrawer: Sidebar with current shortlist
- CompareModal: Side-by-side candidate comparison
- ExportButton: PDF/CSV download

---

### 6. Bias Audit Dashboard (P1 - High Priority)

**User Story**: As an employer, I need to ensure fair hiring to avoid compliance risks.

**Requirements**:
- Track pass-through rates by demographic
- Flag roles with disparity (>10% variance)
- Generate audit reports
- Anonymize bias-sensitive attributes in scoring
- Automated compliance alerts

**Acceptance Criteria**:
- Dashboard shows gender/ethnicity pass-through rates
- Flagged roles highlighted in red
- Report generation <5 seconds
- Alerts sent when disparity detected

**Compliance Requirements**:
- EEOC compliance (US)
- GDPR compliance (EU)
- Anonymized scoring (no bias attributes in algorithm)
- Audit trail for all decisions

---

### 7. Hot Candidate Alerts (P2 - Medium Priority)

**User Story**: As a recruiter, I need real-time notifications when high-quality candidates apply.

**Requirements**:
- Alert when candidate scores 90+
- Alert when candidate has 2+ referrals
- Email and in-app notifications
- Customizable alert thresholds

**Acceptance Criteria**:
- Alert sent within 30 seconds of candidate submission
- Email includes candidate summary
- In-app notification appears instantly

---

### 8. Dashboard Analytics (P2 - Medium Priority)

**User Story**: As a recruiter, I need to track performance to optimize my process.

**Requirements**:
- Time-to-hire per role
- Candidate quality metrics
- Pipeline health indicators
- ROI proof for employers

**Acceptance Criteria**:
- Dashboard loads in <500ms
- Shows 30-day snapshot
- KPIs: Avg time-to-hire, Quality score, Pipeline conversion
- Exportable reports

---

## Non-Functional Requirements

### Performance
- Page load: <2s (First Contentful Paint)
- API response: <300ms (p95)
- Fit Score calculation: <50ms
- Virtual scroll: Smooth 60fps

### Security
- HTTPS everywhere (TLS 1.3)
- Data encryption at rest (AES-256)
- JWT authentication with httpOnly cookies
- Rate limiting: 100 req/min per user
- RBAC for all endpoints

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatible
- Color contrast ratio ≥4.5:1

### Scalability
- Handle 10K candidates per role
- Support 1K concurrent recruiters
- Database: 1M+ candidates
- API: 100K requests/day

---

## User Flows

### Flow 1: Recruiter Reviews Candidates (Primary)

```
1. Login → Recruiter Dashboard
2. Click job → Fit Queue loads
3. Filter candidates (score >80)
4. Click candidate → Profile modal
5. Review score breakdown
6. Add to shortlist
7. Schedule interview
```

**Success Metric**: Complete in <2 minutes

---

### Flow 2: Candidate Applies (Secondary)

```
1. Receive job link
2. View job details
3. Click "Apply"
4. Fill form (basic info + skills)
5. Upload resume (optional)
6. Submit
7. Confirmation + Fit Score preview
```

**Success Metric**: Complete in <3 minutes

---

### Flow 3: Referral Validation (Support)

```
1. Receive referral link
2. Land on referral page
3. Fill form (name, relationship, skills)
4. Submit
5. Confirmation screen
```

**Success Metric**: Complete in <2 minutes

---

## Data Models

### Candidate
```typescript
{
  id: string
  name: string
  email: string
  phone?: string
  location: string
  role: string
  skills: Skill[]
  fitScore: FitScore
  referrals: Referral[]
  resumeUrl?: string
  linkedinUrl?: string
  status: 'new' | 'reviewing' | 'shortlisted' | 'interviewed' | 'hired' | 'rejected'
  createdAt: Date
}
```

### FitScore
```typescript
{
  overall: number // 0-100
  tms: number // Technical Match Score
  srs: number // Soft Skills Rating
  rns: number // Referral Network Score
  confidence: 'high' | 'medium' | 'low'
  calculatedAt: Date
}
```

### Referral
```typescript
{
  id: string
  candidateId: string
  referrerId: string
  referrerName: string
  relationship: string
  trustScore: number // 0-100
  feedback: string
  skills: string[]
  createdAt: Date
}
```

---

## Success Metrics (OKRs)

### Objective 1: Accelerate Hiring
- **KR1**: 70% reduction in screening time
- **KR2**: 5 quality candidates surfaced in <30 min
- **KR3**: Time-to-hire reduced by 50%

### Objective 2: Improve Quality
- **KR1**: 60% reduction in bad hires
- **KR2**: 85% hiring confidence score
- **KR3**: 90+ Fit Scores have 80% success rate

### Objective 3: Ensure Fairness
- **KR1**: Zero bias disparities flagged
- **KR2**: 100% anonymized scoring
- **KR3**: EEOC/GDPR compliance achieved

---

## Out of Scope (v1)

- ❌ ATS replacement functionality
- ❌ Interview scheduling (propose link only)
- ❌ Background checks
- ❌ Offer management
- ❌ Onboarding workflows
- ❌ Candidate messaging (basic only)
- ❌ Video interviews
- ❌ Skills assessments (integrate, don't build)

---

## Launch Checklist

- [ ] Fit Score engine validated (95% accuracy)
- [ ] Fit Queue handles 200+ candidates smoothly
- [ ] Referral system end-to-end tested
- [ ] Bias audit meets compliance standards
- [ ] Performance targets met (all pages <2s)
- [ ] Security audit passed
- [ ] User testing with 10+ recruiters
- [ ] Documentation complete

---

**Status**: Ready for Development  
**Next Review**: Weekly during build  
**Owner**: Product Manager
