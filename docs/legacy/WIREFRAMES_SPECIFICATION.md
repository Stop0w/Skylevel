# Skylevel Wireframes Specification

**Version**: 2.0  
**Date**: January 2025  
**Status**: Greenfield Blueprint + Rally Navigator Integration  
**Target Stack**: Next.js 14 + TypeScript + Tailwind + shadcn/ui

---

## Document Purpose

This document provides detailed wireframe specifications for all screens in the Skylevel application, now enhanced with the **Rally Navigator** metaphor and journey-specific theming. These wireframes serve as the blueprint for the Next.js 14 greenfield rebuild.

**Note**: All wireframes describe the TARGET Next.js implementation, not the current React + Vite prototype.

**New in v2.0**: Rally Navigator integration across all three journeys (Hiring, Sourcing, Applying)

---

## Rally Navigator Metaphor

### Core Concept

Skylevel uses a **rally racing dashboard** metaphor to make recruitment feel like high-performance decision-making:

- **Dashboard** = Real-time performance metrics
- **GPS/Route** = Job search and application journey
- **Radar** = Candidate discovery (Fit Queue)
- **Telemetry** = Analytics and performance tracking
- **Pit Crew** = Team collaboration (shortlists, notes)
- **Safety Systems** = Bias audit and fairness checks
- **Co-pilot** = Peer referrals and network validation

### Journey-Specific Theming

| Journey | Color Palette | Rally Metaphor Focus |
|---------|---------------|---------------------|
| **Hiring** (Recruiter) | Gold (`#B8860B`) + Charcoal (`#1F2937`) | Control Tower + Radar |
| **Sourcing** (Recruiter) | Red (`#DC2626`) + Slate (`#475569`) | Performance Tuning + Telemetry |
| **Applying** (Candidate) | Blue (`#3B82F6`) + Indigo (`#4F46E5`) | Navigation + Route Optimization |

---

## Table of Contents

1. [Public Pages](#public-pages)
2. [Candidate Journey](#candidate-journey)
3. [Recruiter Journey](#recruiter-journey)
4. [Referrer Journey](#referrer-journey)
5. [Shared Components](#shared-components)

---

## Public Pages

### 1. Homepage (`/`)

**Layout**: Hero + Value Props + Rally Navigator Module + CTA

**Rally Navigator Element**: "Start Every Hire with Proof" = Race control dashboard

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo]                    [Jobs] [How It Works] [Sign In]   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│           🎯 Start Every Hire with Proof                     │
│              Not Guesswork                                   │
│                                                               │
│    [Get Started Free] [See How It Works →]                  │
│                                                               │
│    ┌────────────────────────────────────────┐              │
│    │  [Video: Resume → Fit Score Animation] │              │
│    │  Rally Navigator: Candidate becomes    │              │
│    │  high-visibility radar blip            │              │
│    └────────────────────────────────────────┘              │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│   Rally Navigator: Your Hiring Dashboard                     │
│                                                               │
│   ┌───────────┐  ┌───────────┐  ┌───────────┐             │
│   │ 🎯 TMS    │  │ 🤝 SRS    │  │ 🔗 RNS    │             │
│   │ Technical │  │ Soft      │  │ Referral  │             │
│   │ Match     │  │ Skills    │  │ Network   │             │
│   │ Radar     │  │ Co-pilot  │  │ Telemetry │             │
│   └───────────┘  └───────────┘  └───────────┘             │
│                                                               │
│   [Interactive Demo: Adjust Score Weights]                   │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│   3 Journeys: [🟡 Hiring] [🔴 Sourcing] [🔵 Applying]      │
│                                                               │
│   ┌────────────────────────────────────────────────────┐   │
│   │  Journey Selector (click to expand)                │   │
│   │  Each journey shows its Rally Navigator view       │   │
│   └────────────────────────────────────────────────────┘   │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│   ROI Calculator Widget (NEW)                                │
│   ┌────────────────────────────────────────────────────┐   │
│   │  Calculate Your Hiring ROI                          │   │
│   │  [Input: # hires/year] [Input: Avg salary]         │   │
│   │  💰 Potential savings: $XXX,XXX/year                │   │
│   └────────────────────────────────────────────────────┘   │
│                                                               │
│   Trusted By: [Logo] [Logo] [Logo] [Logo]                  │
│   [Start Free Trial]                                         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Key Elements**:
- Rally Navigator dashboard preview (animated)
- ROI calculator widget (interactive)
- Journey-specific color coding
- TMS/SRS/RNS with rally metaphor labels

**Journey Theming**:
```css
.journey-hiring {
  --rally-color: #B8860B; /* Gold */
  --rally-icon: '🏁'; /* Control tower */
}

.journey-sourcing {
  --rally-color: #DC2626; /* Red */
  --rally-icon: '⚡'; /* Performance */
}

.journey-applying {
  --rally-color: #3B82F6; /* Blue */
  --rally-icon: '🧭'; /* Navigation */
}
```

---

### 2. How It Works (`/how-it-works`)

**Layout**: Journey Tabs + Rally Navigator Analogy + Interactive Flow

**Rally Navigator Module**: Each journey shows dashboard view

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│   How Skylevel Works                                         │
│                                                               │
│   [🟡 I'm Hiring] [🔴 I'm Sourcing] [🔵 I'm Applying]      │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│   Rally Navigator Analogy: Hiring Dashboard                  │
│                                                               │
│   ┌─────────────────────────────────────────┐              │
│   │  [Rally Car Dashboard Visual]            │              │
│   │  ┌──────┐  ┌──────┐  ┌──────┐           │              │
│   │  │ TMS  │  │ SRS  │  │ RNS  │           │              │
│   │  │ 🎯   │  │ 🤝   │  │ 🔗   │           │              │
│   │  │ 85%  │  │ 92%  │  │ 78%  │           │              │
│   │  └──────┘  └──────┘  └──────┘           │              │
│   │                                          │              │
│   │  Fit Score: ████████░░ 85/100           │              │
│   │  Status: 🟢 Ready for Interview         │              │
│   └─────────────────────────────────────────┘              │
│                                                               │
│   Step 1: Calibrate (JobPrint™)                             │
│   Rally Metaphor: Tune your car for the track               │
│   ┌─────────────────────────────────────────┐              │
│   │  Set role-specific weights               │              │
│   │  [Slider: TMS 50%] [Slider: SRS 30%]    │              │
│   │  [Slider: RNS 20%]                       │              │
│   └─────────────────────────────────────────┘              │
│                                                               │
│   Step 2: Match (AI + Peer Validation)                      │
│   Rally Metaphor: Radar detects high-quality candidates     │
│   ┌─────────────────────────────────────────┐              │
│   │  [Radar Animation: Candidates appear]   │              │
│   │  AI analyzes skills + experience         │              │
│   │  Peers validate soft skills              │              │
│   └─────────────────────────────────────────┘              │
│                                                               │
│   Step 3: Decide (Confident Hiring)                         │
│   Rally Metaphor: Green flag = Hire with confidence         │
│   ┌─────────────────────────────────────────┐              │
│   │  Top 5 candidates surfaced               │              │
│   │  All scored 85%+ Fit Score               │              │
│   │  Bias audit: ✅ Passed                   │              │
│   └─────────────────────────────────────────┘              │
│                                                               │
│   [Get Started →]                                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Rally Navigator Integration**:
- Each step uses car dashboard metaphor
- Visual progression (speedometer → radar → finish line)
- Color-coded by journey type

---

## Candidate Journey

### 5. Candidate Dashboard (`/candidate`)

**Layout**: Rally Dashboard + Stats + Quick Actions

**Rally Navigator Element**: Personal performance dashboard

```
┌─────────────────────────────────────────────────────────────┐
│ Welcome Back, Alex! 👋                                       │
│ Your Rally Dashboard                                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ Rally Navigator: Your Performance Metrics                    │
│ ┌──────────────────────────────────────────────────────┐   │
│ │  🎯 Fit Score Dashboard                               │   │
│ │  ┌─────────┐  ┌─────────┐  ┌─────────┐             │   │
│ │  │  Speed  │  │  Fuel   │  │  Route  │             │   │
│ │  │   78%   │  │   85%   │  │    5    │             │   │
│ │  │ Avg Fit │  │ Profile │  │  Active │             │   │
│ │  └─────────┘  └─────────┘  └─────────┘             │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                               │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│ │ 💼 12    │ │ 📋 5     │ │ ⭐ 78%   │ │ 👤 85%   │       │
│ │ Saved    │ │ Active   │ │ Avg Fit  │ │ Profile  │       │
│ │ Jobs     │ │ Apps     │ │ Score    │ │ Complete │       │
│ │ [GPS]    │ │ [Route]  │ │ [Speed]  │ │ [Fuel]   │       │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ Recent Applications (Your Race Progress)                     │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ 🏁 Senior Developer @ TechCorp      [Lap 2: Interview] ││
│ │ Applied: 2025-01-10  •  Fit Score: 89%                  ││
│ │ [⚡ Boost Fit]  [👁️ Track Progress]                    ││
│ └─────────────────────────────────────────────────────────┘│
│                                                               │
│ Suggested Jobs (Next Waypoints)                              │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ 🎯 Full Stack Developer @ InnovateCorp  [91% Match]    ││
│ │ Rally Status: 🟢 Excellent route alignment              ││
│ │ [View Route]  [Start Application]                       ││
│ └─────────────────────────────────────────────────────────┘│
│                                                               │
│ What's Next? (Pit Crew Actions)                             │
│ [🔍 Browse Jobs] [⚙️ Tune Profile] [🤝 Add Co-pilot]       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Rally Navigator Labels**:
- **Speed** = Avg Fit Score (how fast you're moving)
- **Fuel** = Profile Completion (energy for the journey)
- **Route** = Active Applications (waypoints)
- **GPS** = Saved Jobs (destinations)
- **Lap** = Interview Stage (race progress)
- **Pit Crew** = Quick actions (tune profile, add referrals)

**Journey Theme**: Blue (`#3B82F6`) throughout

---

### 7. Apply Flow (`/apply/[id]`)

**Layout**: Application Form + Rally Route Optimizer

**Rally Navigator Element**: Route optimization with boost suggestions

```
┌─────────────────────────────────────────────────────────────┐
│ Rally Route: Apply to Senior Developer @ TechCorp           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ Your Current Route Analysis                                  │
│ ┌───────────────────────────────────────────────────────┐  │
│ │  Fit Score: 89% ████████░░                            │  │
│ │  Route Quality: 🟢 Excellent alignment                │  │
│ │                                                         │  │
│ │  TMS: 92 (🎯 Technical radar: Strong)                 │  │
│ │  SRS: 85 (🤝 Co-pilot rating: Good)                   │  │
│ │  RNS: 90 (🔗 Network signal: Excellent)               │  │
│ │                                                         │  │
│ │  🚀 Route Optimization Available                       │  │
│ │  [Add work sample → +5% boost]                        │  │
│ │  [Invite peer rating → +3% boost]                     │  │
│ └───────────────────────────────────────────────────────┘  │
│                                                               │
│ Rally Checkpoint: Application Form                           │
│ ┌───────────────────────────────────────────────────────┐  │
│ │  Fuel Check: Resume [✓ Uploaded]                      │  │
│ │  Co-pilot Note: Cover Letter [Optional]               │  │
│ │  Pit Crew: Portfolio Links [Add]                      │  │
│ └───────────────────────────────────────────────────────┘  │
│                                                               │
│ [Submit Application] → Start Your Race                       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Rally Navigator Integration**:
- Route analysis = Fit Score breakdown
- Boost suggestions = Optimization tips
- Checkpoints = Form sections
- Race start = Submit button

---

## Recruiter Journey

### 15. Recruiter Dashboard (`/recruiter`)

**Layout**: Control Tower + Performance Metrics + Rally Telemetry

**Rally Navigator Element**: Race control dashboard

```
┌─────────────────────────────────────────────────────────────┐
│ Recruiter Control Tower                                      │
│ Track performance: 14 active races, 45 candidates in queue  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ Rally Telemetry: Your Performance Dashboard                  │
│ ┌──────────────────────────────────────────────────────┐   │
│ │  🏁 Finish Line Performance                           │   │
│ │  ┌─────────┐  ┌─────────┐  ┌─────────┐             │   │
│ │  │  Speed  │  │  Lap    │  │  Fuel   │             │   │
│ │  │  15 days│  │  $52K   │  │   87%   │             │   │
│ │  │ Avg TTH │  │ Pipeline│  │ Quality │             │   │
│ │  └─────────┘  └─────────┘  └─────────┘             │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                               │
│ Race Control: Active Roles                                   │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ 🎯 Senior Developer @ TechCorp                           ││
│ │ Radar: 12 candidates • Top Fit: 92%                      ││
│ │ Race Status: 🟢 On track (3 in interview)               ││
│ │ [View Radar] [Adjust Weights]                            ││
│ └─────────────────────────────────────────────────────────┘│
│                                                               │
│ Pit Crew Actions (Hot Candidates)                           │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ 🚨 Sarah Chen - 95% Fit Score                            ││
│ │ Rally Status: 🟢 Green flag - Ready for interview       ││
│ │ Co-pilot: 3 referrals (2 from FAANG)                     ││
│ │ [Schedule Interview] [View Full Profile]                 ││
│ └─────────────────────────────────────────────────────────┘│
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Rally Navigator Labels**:
- **Control Tower** = Dashboard overview
- **Telemetry** = Performance metrics (TTH, pipeline value)
- **Radar** = Fit Queue (candidate detection)
- **Lap Time** = Time-to-hire
- **Fuel Efficiency** = Quality score
- **Green Flag** = High Fit Score candidate ready
- **Pit Crew** = Team actions (shortlist, schedule)

**Journey Theme**: Gold (`#B8860B`) for primary, Charcoal (`#1F2937`) for backgrounds

---

### 16. Fit Queue (`/recruiter/candidates`)

**Layout**: Radar Screen + Candidate Cards + Rally Filters

**Rally Navigator Element**: Radar detection system

```
┌─────────────────────────────────────────────────────────────┐
│ Radar Screen: Candidate Detection                           │
│ Scanning 45 candidates for Senior Developer role            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ Rally Radar Filters                                          │
│ ┌────────────────────┐  Filters:                            │
│ │ [x] Green Flag     │  Fit Score: [85%+ ▾]                │
│ │     (90%+ Fit)     │  Co-pilot: [2+ refs ▾]              │
│ │ [ ] Yellow Flag    │  Track: [All stages ▾]              │
│ │     (75-89% Fit)   │                                       │
│ │ [ ] Pit Stop       │  Rally Status:                       │
│ │     (Needs review) │  [x] Race ready                      │
│ │                    │  [ ] Needs fuel (incomplete profile) │
│ └────────────────────┘                                       │
│                                                               │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ 🟢 Sarah Chen                                [95% Fit]   ││
│ │ Senior Developer • San Francisco                         ││
│ │                                                          ││
│ │ Rally Status: Green flag - Race ready                   ││
│ │ ┌──────────┐  ┌──────────┐  ┌──────────┐              ││
│ │ │ TMS: 94  │  │ SRS: 92  │  │ RNS: 98  │              ││
│ │ │ 🎯 Radar │  │ 🤝 Crew  │  │ 🔗 Radio │              ││
│ │ └──────────┘  └──────────┘  └──────────┘              ││
│ │                                                          ││
│ │ Co-pilot: 3 referrals (2 from Google, 1 from Meta)      ││
│ │ Track: 🟢 Interview stage                               ││
│ │                                                          ││
│ │ [⭐ Add to Pit Crew] [📅 Schedule] [👁️ Full Scan]     ││
│ └─────────────────────────────────────────────────────────┘│
│                                                               │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ 🟡 Michael Rodriguez                         [87% Fit]   ││
│ │ Product Manager • Remote                                 ││
│ │                                                          ││
│ │ Rally Status: Yellow flag - Good candidate              ││
│ │ ┌──────────┐  ┌──────────┐  ┌──────────┐              ││
│ │ │ TMS: 88  │  │ SRS: 85  │  │ RNS: 89  │              ││
│ │ │ 🎯       │  │ 🤝       │  │ 🔗       │              ││
│ │ └──────────┘  └──────────┘  └──────────┘              ││
│ │                                                          ││
│ │ Co-pilot: 2 referrals                                    ││
│ │ Fuel tip: +5% if profile is completed                   ││
│ │                                                          ││
│ │ [⭐ Add to Pit Crew] [📧 Message] [👁️ Full Scan]      ││
│ └─────────────────────────────────────────────────────────┘│
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Rally Navigator Integration**:
- **Radar** = Candidate detection system
- **Green/Yellow/Red Flags** = Fit Score tiers
- **Pit Crew** = Shortlist
- **Co-pilot** = Referrals
- **Track** = Interview stage
- **Fuel** = Profile completion

---

### 23. Bias Audit (`/recruiter/bias-audit`)

**Layout**: Safety Systems + Fairness Validation

**Rally Navigator Element**: Race safety inspection

```
┌─────────────────────────────────────────────────────────────┐
│ Rally Safety Systems: Bias Audit                            │
│ Ensuring fair racing conditions for all candidates          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ Safety Inspection Dashboard                                  │
│ ┌──────────────────────────────────────────────────────┐   │
│ │  🛡️ Safety Systems: All Green                        │   │
│ │  ┌─────────┐  ┌─────────┐  ┌─────────┐             │   │
│ │  │  Track  │  │ Referee │  │  Flags  │             │   │
│ │  │ Safety  │  │  Check  │  │  Clear  │             │   │
│ │  │   ✅    │  │   ✅    │  │   ✅    │             │   │
│ │  └─────────┘  └─────────┘  └─────────┘             │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                               │
│ Race Fairness Analysis                                       │
│ ┌───────────────────────────────────────────────────────┐│
│ │ 🟢 Pass Rate Equity: 87% (Safe zone)                  ││
│ │ Track: All groups have fair lap times                ││
│ │                                                          ││
│ │ Group Performance:                                        ││
│ │ • Women: 85% pass rate (82 of 96 candidates)            ││
│ │ • Men: 89% pass rate (134 of 150 candidates)            ││
│ │ • Non-binary: 88% pass rate (15 of 17 candidates)       ││
│ │                                                          ││
│ │ Safety Flag: 🟢 Within acceptable variance              ││
│ └───────────────────────────────────────────────────────┘│
│                                                               │
│ ⚠️ Yellow Flag Alert                                         │
│ ┌───────────────────────────────────────────────────────┐│
│ │ Role: Senior Designer                                     ││
│ │ Track Condition: Uneven pass rates detected              ││
│ │ • Women: 62% pass rate (caution flag)                    ││
│ │ • Men: 84% pass rate                                     ││
│ │                                                          ││
│ │ Pit Crew Action: Review role calibration weights         ││
│ │ [Inspect Track Conditions] [Adjust Scoring]              ││
│ └───────────────────────────────────────────────────────┘│
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Rally Navigator Integration**:
- **Safety Systems** = Bias detection
- **Track Safety** = Fair evaluation conditions
- **Referee Check** = Audit validation
- **Flags** = Alert system (green/yellow/red)
- **Lap Times** = Pass rates across groups
- **Pit Crew Action** = Remediation steps

---

## Shared Components

### ScorePill Component (Rally-Enhanced)

**Rally Navigator Integration**: Speed gauge visualization

```tsx
<div className="rally-score-pill">
  <div className="score-gauge">
    <div className="gauge-arc" style={{ 
      background: `conic-gradient(
        var(--rally-color) ${score * 3.6}deg, 
        #e5e7eb ${score * 3.6}deg
      )` 
    }}>
      <div className="gauge-center">
        <span className="score-value">{score}</span>
        <span className="rally-label">FIT</span>
      </div>
    </div>
  </div>

  <div className="rally-status">
    {score >= 90 && <span className="rally-flag green">🟢 Race Ready</span>}
    {score >= 80 && score < 90 && <span className="rally-flag yellow">🟡 Good Track</span>}
    {score < 80 && <span className="rally-flag red">🔴 Needs Tuning</span>}
  </div>
</div>
```

**Journey Theming**:
```css
.journey-hiring .rally-score-pill {
  --rally-color: #B8860B; /* Gold */
}

.journey-sourcing .rally-score-pill {
  --rally-color: #DC2626; /* Red */
}

.journey-applying .rally-score-pill {
  --rally-color: #3B82F6; /* Blue */
}
```

---

## Implementation Checklist

### Rally Navigator Integration
- [ ] Add journey theme classes to layout components
- [ ] Implement rally metaphor labels across all dashboards
- [ ] Create rally-themed iconography (flags, gauges, radar)
- [ ] Add animated rally transitions (speedometer, radar blips)
- [ ] Integrate ROI calculator widget on homepage

### Journey-Specific Theming
- [ ] Apply gold theme to recruiter dashboard
- [ ] Apply blue theme to candidate dashboard
- [ ] Apply red theme to analytics/bias audit
- [ ] Create CSS variables for journey themes
- [ ] Test color accessibility (WCAG AA compliance)

### Component Updates
- [ ] Enhance ScorePill with rally gauge design
- [ ] Add rally status badges to all candidate cards
- [ ] Update dashboard KPI tiles with rally labels
- [ ] Create rally-themed loading states
- [ ] Add rally sound effects (optional, toggleable)

---

**Document Owner**: Product Design Lead  
**Last Updated**: January 2025  
**Status**: Active Blueprint with Rally Navigator Integration  
**Feedback**: Submit via GitHub issues with `wireframes` label