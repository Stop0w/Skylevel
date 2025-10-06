
# Skylevel Design-to-Implementation Mapping

**Version**: 1.0  
**Date**: January 2025  
**Purpose**: Cross-reference index linking UI/UX Mini-Briefs to Wireframe Implementation Specs  
**Maintainers**: Design & Engineering Teams

---

## Overview

This document maps each UI/UX wireframe mini-brief to its corresponding technical implementation specification in the Skylevel wireframes document. Use this to ensure design vision translates accurately to code.

**Key Documents**:
- **Source**: `attached_assets/Pasted-Skylevel-UI-UX-Wireframe-Mini-Briefs-*.txt`
- **Target**: `docs/WIREFRAMES_SPECIFICATION.md`
- **Design Vision**: `docs/BLUE_SKY_DESIGN_VISION.md`

---

## Mapping Index

### Marketing Pages

| Mini Brief | Wireframe Section | Implementation Status | Notes |
|------------|-------------------|----------------------|-------|
| MINI-BRIEF 01: Homepage | § Public Pages → 1. Homepage (`/`) | ✅ Implemented | Hero animation uses `Dynamic Resume Animation_simple_01.mp4` |
| MINI-BRIEF 02: How It Works | § Public Pages → 2. How It Works (`/how-it-works`) | ✅ Implemented | Multi-journey tabs with Rally Navigator analogy |
| Pricing Page | § Not in mini-briefs | ✅ Implemented | ROI calculator added to homepage |
| Integrations | § Not in mini-briefs | ✅ Implemented | ATS/job board compatibility showcase |
| Contact | § Not in mini-briefs | ⚠️ Basic form | Needs enhancement |
| Resources | § Not in mini-briefs | ✅ Implemented | Case studies, blogs, cheat sheets |

---

### Candidate Journey

| Mini Brief | Wireframe Section | Implementation Status | Rally Navigator Element |
|------------|-------------------|----------------------|-------------------------|
| Profile Builder (Onboarding) | § Candidate Journey → 10. Profile Builder (`/profile-builder`) | ✅ Implemented | Dashboard = Fit Score progress |
| Candidate Dashboard | § Candidate Journey → 5. Candidate Dashboard (`/candidate`) | ✅ Implemented | Control center metaphor |
| Job Search & Matches | § Public Pages → 3. Jobs Listing (`/jobs`) | ✅ Implemented | Search filters = GPS inputs |
| Job Detail View | § Public Pages → 4. Job Detail (`/jobs/[id]`) | ✅ Implemented | Fit Score breakdown = Route analysis |
| Apply to Job | § Candidate Journey → 7. Apply Flow (`/apply/[id]`) | ✅ Implemented | Boost suggestions = Route optimization |
| Applications Tracker | § Candidate Journey → 6. Applications Page (`/candidate/applications`) | ✅ Implemented | Status timeline = Trip progress |
| Referral Flow | § Referrer Journey → 12-14 | ✅ Implemented | Network signal = Rally co-pilot |
| Settings | § Not in mini-briefs | ✅ Implemented | Profile customization |

**Rally Navigator Mapping (Candidate)**:
- **Dashboard** = Car dashboard (speed = Fit Score, fuel = profile completion)
- **GPS** = Job search filters (destination = ideal role)
- **Route** = Application journey (waypoints = interview stages)
- **Co-pilot** = Peer referrals (validation signals)

---

### Recruiter Journey

| Mini Brief | Wireframe Section | Implementation Status | Rally Navigator Element |
|------------|-------------------|----------------------|-------------------------|
| Recruiter Dashboard | § Recruiter Journey → 15. Recruiter Dashboard (`/recruiter`) | ✅ Implemented | Control tower metaphor |
| Fit Queue (Candidate Discovery) | § Recruiter Journey → 16. Fit Queue (`/recruiter/candidates`) | ✅ Implemented | Radar screen = Candidate feed |
| Candidate Detail View | § Recruiter Journey → 18. Candidate Profile (`/recruiter/candidates/[id]`) | ✅ Implemented | Deep scan = Profile analysis |
| Shortlist Management | § Recruiter Journey → 20. Shortlist Builder | ✅ Implemented | Pit crew = Team collaboration |
| Role Management (JobPrint™) | § Recruiter Journey → 21. Job Calibration Wizard | ✅ Implemented | Tuning = Score weight adjustment |
| Analytics Dashboard | § Recruiter Journey → 22. Analytics (`/recruiter/analytics`) | ✅ Implemented | Telemetry = Performance metrics |
| Bias Audit | § Recruiter Journey → 23. Bias Audit (`/recruiter/bias-audit`) | ✅ Implemented | Safety check = Fairness validation |
| Messages | § Recruiter Journey → 24. Messages (`/recruiter/messages`) | ✅ Implemented | Radio = Team communication |

**Rally Navigator Mapping (Recruiter)**:
- **Control Tower** = Dashboard overview (all candidates in view)
- **Radar** = Fit Queue (detecting high-quality candidates)
- **Telemetry** = Analytics (performance tracking)
- **Pit Crew** = Team collaboration (shortlists, notes)
- **Safety Systems** = Bias audit (ensuring fairness)

---

### Referrer Journey

| Mini Brief | Wireframe Section | Implementation Status | Rally Navigator Element |
|------------|-------------------|----------------------|-------------------------|
| Referrer Landing | § Referrer Journey → 12. Referral Landing (`/referrer/[token]`) | ✅ Implemented | Pit stop invitation |
| Referrer Auth (LinkedIn) | § Referrer Journey → 13. Referrer Auth (`/referrer/auth`) | ✅ Implemented | Crew credential check |
| Referrer Form & Confirmation | § Referrer Journey → 14. Referrer Form (`/referrer/form/[token]`) | ✅ Implemented | Skill rating = Equipment check |

**Rally Navigator Mapping (Referrer)**:
- **Pit Stop** = Quick referral form (fast turnaround)
- **Crew Badge** = LinkedIn authentication (credibility)
- **Equipment Check** = Skill validation (quality assurance)

---

## Journey-Specific Color Theming

### From Mini-Briefs

| Journey | Primary Color | Secondary Color | Accent Color | Usage in Wireframes |
|---------|---------------|-----------------|--------------|---------------------|
| **Hiring** (Recruiter) | Gold/Mustard (`#B8860B`) | Charcoal (`#1F2937`) | Teal (`#14B8A6`) | § Recruiter Dashboard, Fit Queue headers |
| **Sourcing** (Recruiter) | Red (`#DC2626`) | Slate (`#475569`) | Orange (`#F97316`) | § Analytics, Bias Audit warnings |
| **Applying** (Candidate) | Blue (`#3B82F6`) | Indigo (`#4F46E5`) | Sky (`#0EA5E9`) | § Candidate Dashboard, Profile Builder |

### Implementation Notes

**Wireframes Spec uses**:
- `var(--color-accent-400)` for primary actions
- `var(--color-primary-400)` for secondary actions
- `var(--color-neutral-600)` for muted states

**To add journey theming**:
```css
/* Add to main.css */
.journey-hiring {
  --color-journey: #B8860B;
  --color-journey-bg: rgba(184, 134, 11, 0.1);
}

.journey-sourcing {
  --color-journey: #DC2626;
  --color-journey-bg: rgba(220, 38, 38, 0.1);
}

.journey-applying {
  --color-journey: #3B82F6;
  --color-journey-bg: rgba(59, 130, 246, 0.1);
}
```

---

## ROI Calculator Specification

### From Mini-Briefs (Homepage Section)

**Location**: Homepage → "The Cost of Guesswork" section  
**Wireframe Reference**: § Public Pages → 1. Homepage (`/`) → Pain Panel  
**Current Implementation**: `src/pages/HomePage.jsx` (lines 46-67)

**Missing from Wireframes**: Interactive ROI calculator widget

**Specification to Add**:
```jsx
// ROI Calculator Component (to add to wireframes)
<div className="roi-calculator">
  <h3>Calculate Your Hiring ROI</h3>
  <input type="number" placeholder="# of hires per year" />
  <input type="number" placeholder="Average salary" />
  <div className="roi-result">
    Potential savings: <strong>${calculatedSavings}/year</strong>
  </div>
</div>
```

**Formula** (from mini-briefs):
- Time savings: `hires * $1,850/hire`
- Quality improvement: `hires * 0.34 * (avgSalary * 0.15)`
- Total ROI: `time_savings + quality_improvement`

---

## Missing Screens to Add

### 1. Messages (Recruiter)

**Mini-Brief**: Listed under "Recruiter Journey → Messages"  
**Wireframe Status**: ✅ Implemented (`src/pages/RecruiterMessages.jsx`)  
**Mapping**: § Recruiter Journey → 24. Messages

**Rally Navigator**: Radio communication (team coordination)

---

### 2. Settings (Both Journeys)

**Mini-Brief**: Listed under both Candidate and Recruiter journeys  
**Wireframe Status**: ✅ Implemented (`src/pages/Settings.jsx`)  
**Mapping**: § Settings → Profile, Scoring, Calibration, Notifications, Privacy

**Rally Navigator**: Garage (maintenance and tuning)

---

### 3. Resources Page

**Mini-Brief**: Listed under "Marketing Pages → Resources"  
**Wireframe Status**: ✅ Implemented (`src/pages/Resources.jsx`)  
**Mapping**: § Public Pages → Resources (case studies, blogs, cheat sheets)

**Content Types**:
- Case studies (PDF downloads)
- Blogs (thought leadership)
- Cheat sheets (quick reference guides)
- API documentation

---

## Component Reusability Matrix

| Component | Used In | Mini-Brief Reference |
|-----------|---------|---------------------|
| `ScorePill` | Fit Queue, Job Detail, Candidate Profile | All journeys (Fit Score visualization) |
| `ScoreBreakdown` | Candidate Profile, Apply Flow | TMS + SRS + RNS breakdown |
| `ReferrerCredibility` | Candidate Profile, Referrer Landing | Network validation signals |
| `JobCalibrationWizard` | Role Management | JobPrint™ weight tuning |
| `BiasAlertTile` | Bias Audit | Fairness validation alerts |
| `ShortlistDrawer` | Fit Queue, Candidate Detail | Team collaboration tool |

---

## Design Concept Variations

### From DESIGN_CONCEPT_SCREEN_BRIEFS.md

**Three Concepts to Test**:
1. **Analog Film** - Warm, nostalgic (Sienna + Teal + Mustard)
2. **Studio Craft** - Minimal, precise (Charcoal + Electric + Lime)
3. **Human First** - Photography-driven (Coral + Ocean + Sunflower)

**Wireframe Implementation**: Currently uses **Analog Film** palette
- `--color-accent-400`: Mustard yellow
- `--color-primary-400`: Sienna/burgundy
- Warm gradients throughout

**To test other concepts**: Replace CSS variables in `src/styles/main.css`

---

## Next Steps

### For Design Team
1. Review Rally Navigator integration across all journeys
2. Validate journey-specific color theming
3. Test ROI calculator prototype on homepage

### For Engineering Team
1. Add journey theme classes to route layouts
2. Implement ROI calculator widget
3. Ensure all components support theming variables

### For QA Team
1. Verify all mini-brief features are implemented
2. Test Rally Navigator metaphor clarity
3. Validate journey-specific color application

---

**Document Owner**: Design Systems Lead  
**Last Updated**: January 2025  
**Status**: Active Cross-Reference  
**Feedback**: Submit via GitHub issues with `design-mapping` label
