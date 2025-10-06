
# Skylevel User Journey Maps

**Version**: 1.0  
**Date**: January 2025  
**Status**: Approved  
**Purpose**: Define complete user experiences for all personas  
**Tech Stack**: Next.js 14 Greenfield Rebuild

---

## ⚠️ Note: These journeys will be implemented in Next.js 14

The user journeys are tech-agnostic but will be built using the Next.js 14 + TypeScript + Prisma stack. The current React + Vite prototype validated these flows; now they'll be rebuilt properly.

---

## Journey 1: Recruiter - First Time Setup

### Persona: Sarah (Agency Recruiter)
**Goal**: Get set up and post first job in <10 minutes

### Journey Map

| Stage | Action | Touchpoint | Emotion | Pain Points | Success Criteria |
|-------|--------|------------|---------|-------------|------------------|
| **Discover** | Hears about Skylevel | Email/LinkedIn ad | Curious | "Another tool?" | Clear value prop |
| **Sign Up** | Creates account | Landing page | Hopeful | Form friction | <2 min signup |
| **Onboarding** | Completes profile | Onboarding wizard | Engaged | Too many questions | <5 min complete |
| **First Job** | Posts first role | Job creation form | Focused | Unclear fields | <3 min to post |
| **Integration** | Connects ATS | Settings page | Anxious | Technical setup | One-click connect |
| **First Review** | Reviews candidates | Fit Queue | Excited | Learning curve | Understand scores |

### Critical Moments

**Moment 1: First Login (0-30 seconds)**
- Must see: "Welcome! Let's get you set up in 3 steps"
- Must feel: This will be easy
- Must do: Complete profile basics

**Moment 2: First Job Post (2-5 minutes)**
- Must see: Simple job form with smart defaults
- Must feel: This is faster than my ATS
- Must do: Successfully post job

**Moment 3: First Candidate Review (5-10 minutes)**
- Must see: Fit Scores that make sense
- Must feel: This is actually useful
- Must do: Shortlist first candidate

### User Story Flow

```
1. Land on homepage
   → Click "Get Started Free"
   
2. Sign up form
   → Email, password, company name
   → Auto-detect role (recruiter)
   
3. Onboarding wizard
   → Step 1: Tell us about you (name, company)
   → Step 2: What roles do you recruit for? (tags)
   → Step 3: Connect your ATS (optional, skip)
   
4. Dashboard landing
   → See: "Post your first job" CTA
   → Click: "Post Job"
   
5. Job creation form
   → Title, skills required, calibration (optional)
   → Submit → Job is live
   
6. Fit Queue
   → See: "No candidates yet"
   → Prompt: "Share this job link or import from ATS"
   
7. First candidate applies
   → Notification: "New candidate! Score: 87"
   → Click → View profile
   
8. Candidate profile
   → See: Score breakdown, skills match, referrals
   → Click: "Add to Shortlist"
   → Success!
```

---

## Journey 2: Recruiter - Daily Workflow

### Persona: Sarah (Experienced User)
**Goal**: Review 50 candidates, shortlist 5, schedule 2 interviews in <30 minutes

### Journey Map

| Stage | Action | Touchpoint | Emotion | Pain Points | Success Criteria |
|-------|--------|------------|---------|-------------|------------------|
| **Login** | Checks dashboard | Dashboard | Focused | Too much info | Key metrics visible |
| **Hot Alerts** | Reviews hot candidates | Notification center | Excited | Alert fatigue | 90+ scores only |
| **Queue Review** | Filters candidates | Fit Queue | Efficient | Slow filtering | <100ms response |
| **Profile Deep Dive** | Reviews top 5 | Candidate profiles | Analytical | Missing info | Complete data |
| **Shortlist** | Adds to shortlist | Shortlist drawer | Confident | Manual process | One-click add |
| **Schedule** | Books interviews | Interview modal | Relieved | Calendar sync issues | Quick booking |

### Critical Path (Speed-to-Decision)

```
Dashboard → Hot Candidates (2 min)
  ↓
Filter Fit Queue >85 (30 sec)
  ↓
Review top 5 profiles (10 min)
  ↓
Add 3 to shortlist (1 min)
  ↓
Schedule 2 interviews (5 min)
  ↓
Done! (Total: 18.5 min)
```

### User Story Flow

```
1. Login → Dashboard loads
   → See: 3 hot candidates (90+ score)
   → Click: View all hot candidates
   
2. Hot Candidate modal
   → Quick review: Name, score, top skill
   → Click: "Add to shortlist" on 1 candidate
   
3. Navigate to Fit Queue
   → Filter: Score >85
   → Sort: By referrals (desc)
   → Result: 12 candidates
   
4. Review candidate cards
   → Scan: Scores, skills, location
   → Click: Top 5 profiles
   
5. Candidate profile (repeat 5x)
   → Check: Score breakdown
   → Verify: Skills match
   → Review: Referrals
   → Decision: Shortlist or skip
   
6. Shortlist drawer
   → See: 3 candidates added
   → Click: "Schedule interview" on 2
   
7. Interview scheduling
   → Select: Calendar slot
   → Send: Email invite
   → Confirm: Interview booked
   
8. Done!
   → See: Success toast "2 interviews scheduled"
   → Next: Review next job
```

---

## Journey 3: Candidate - Application

### Persona: Maria (Software Engineer)
**Goal**: Apply to job and get validated in <5 minutes

### Journey Map

| Stage | Action | Touchpoint | Emotion | Pain Points | Success Criteria |
|-------|--------|------------|---------|-------------|------------------|
| **Discover** | Finds job link | LinkedIn/Email | Interested | Generic JDs | Relevant role |
| **View Job** | Reviews details | Job detail page | Evaluating | Missing info | Clear requirements |
| **Decision** | Decides to apply | Apply button | Motivated | Long forms | Simple form |
| **Application** | Fills form | Apply modal | Focused | Repetitive info | Smart autofill |
| **Submit** | Completes application | Confirmation | Hopeful | Black hole | Instant feedback |
| **Referral** | Gets peer validation | Referral request | Anxious | Asking favors | Easy share |

### Critical Moments

**Moment 1: Job Discovery (0-30 sec)**
- Must see: Clear job title, key skills, company
- Must feel: This is worth my time
- Must do: Click "Apply"

**Moment 2: Application (1-3 min)**
- Must see: Short form, no duplicates
- Must feel: This is respectful of my time
- Must do: Complete and submit

**Moment 3: Confirmation (3-5 min)**
- Must see: "Application received! Fit Score: 87"
- Must feel: I have a real chance
- Must do: Share referral link

### User Story Flow

```
1. Click job link from LinkedIn
   → Land on: Job detail page
   
2. Job detail page
   → See: Title, skills, company, salary
   → See: "Your predicted Fit Score: 87"
   → Click: "Apply Now"
   
3. Apply modal opens
   → Autofill: Name, email from LinkedIn
   → Add: Phone, location
   → Select: Skills (from predefined list)
   → Upload: Resume (optional)
   → Click: "Submit Application"
   
4. Confirmation screen
   → See: "Application received!"
   → See: "Fit Score: 87 (High confidence)"
   → See: "Boost your score with peer validation"
   → Click: "Get Referrals"
   
5. Referral request
   → See: Unique link generated
   → Options: Email, LinkedIn, Copy link
   → Click: Share via LinkedIn
   
6. Follow-up (24 hours later)
   → Email: "Your referral validated! Score: 92"
   → Email: "Recruiter viewed your profile"
   
7. Interview request (48 hours later)
   → Email: "Interview invitation from [Company]"
   → Click: Confirm time
   → Done!
```

---

## Journey 4: Referrer - Validation

### Persona: John (Senior Developer)
**Goal**: Validate colleague in <2 minutes

### Journey Map

| Stage | Action | Touchpoint | Emotion | Pain Points | Success Criteria |
|-------|--------|------------|---------|-------------|------------------|
| **Receive Link** | Gets referral request | Email/LinkedIn | Curious | Spam concerns | Legitimate request |
| **Landing** | Opens link | Referral page | Helpful | Unclear purpose | Immediate context |
| **Form** | Fills validation | Referral form | Focused | Too many questions | <5 fields |
| **Submit** | Completes referral | Confirmation | Satisfied | No feedback | Instant confirmation |

### Critical Path (Frictionless)

```
Email → Click link (10 sec)
  ↓
Land on page (20 sec)
  ↓
Fill form (60 sec)
  ↓
Submit (10 sec)
  ↓
Done! (Total: 100 sec)
```

### User Story Flow

```
1. Receive email
   → Subject: "Maria asked for your professional reference"
   → See: "It takes 2 minutes"
   → Click: Referral link
   
2. Referral landing page
   → See: "Maria applied for Senior Frontend at Acme"
   → See: "Your validation helps her Fit Score"
   → See: Progress: "2 minutes to complete"
   → Click: "Start Validation"
   
3. Referral form (single page)
   → Field 1: Your name (autofill if logged in)
   → Field 2: Your relationship (dropdown: Colleague, Manager, etc.)
   → Field 3: How long have you worked together? (dropdown)
   → Field 4: Rate Maria's skills (checkboxes: React, Node, etc.)
   → Field 5: Quick feedback (optional text, 100 chars)
   → Click: "Submit Referral"
   
4. Confirmation screen
   → See: "Thanks! Your validation boosted Maria's score to 92"
   → See: "Maria will be notified"
   → Option: "Validate another person"
   → Done!
```

---

## Journey 5: Hiring Manager - Review

### Persona: David (Engineering Manager)
**Goal**: Review shortlist and approve hire in <1 hour

### Journey Map

| Stage | Action | Touchpoint | Emotion | Pain Points | Success Criteria |
|-------|--------|------------|---------|-------------|------------------|
| **Notification** | Receives shortlist | Email link | Busy | Another meeting | Quick preview |
| **Review** | Views candidates | Shortlist page | Analytical | Too much data | Key info only |
| **Compare** | Compares top 2 | Comparison modal | Decisive | Hard to differentiate | Clear differences |
| **Decision** | Approves hire | Approval button | Confident | Second-guessing | Trust in data |

### User Story Flow

```
1. Email notification
   → Subject: "Sarah shared a shortlist: Senior Backend (5 candidates)"
   → Preview: "Top score: 94 | Avg: 88"
   → Click: View shortlist
   
2. Shortlist page (no login required)
   → See: 5 candidate cards
   → Each card: Name, Score, Top skills, Referrals
   → Click: Top 2 candidates
   
3. Candidate comparison
   → Side-by-side: Scores, Skills, Experience
   → Highlight: Key differences
   → See: Recommendation: "Candidate A has stronger referrals"
   → Click: "Select Candidate A"
   
4. Approval flow
   → Confirm: "Approve for interview?"
   → Click: "Approve"
   → See: "Sarah notified to schedule interview"
   → Done!
```

---

## Journey Pain Points & Solutions

### Pain Point 1: Information Overload
**Problem**: Too much data, can't focus  
**Solution**: Progressive disclosure - show essentials first, details on demand

### Pain Point 2: Slow Decision-Making
**Problem**: Analysis paralysis  
**Solution**: Clear recommendations, confidence scores, auto-prioritization

### Pain Point 3: Lack of Trust
**Problem**: Don't believe the scores  
**Solution**: Show score breakdown, referral validation, historical accuracy

### Pain Point 4: Friction in Workflows
**Problem**: Too many steps  
**Solution**: One-click actions, smart defaults, auto-save

---

## Journey Success Metrics

| Journey | Time Target | Success Rate | Satisfaction |
|---------|-------------|--------------|--------------|
| Recruiter Setup | <10 min | 90% completion | 4.5/5 NPS |
| Daily Workflow | <30 min | 85% efficiency | 4.7/5 NPS |
| Candidate Apply | <5 min | 95% completion | 4.3/5 NPS |
| Referrer Validate | <2 min | 90% completion | 4.6/5 NPS |
| Manager Review | <1 hour | 80% approval | 4.5/5 NPS |

---

**Status**: Approved  
**Next Step**: UI/UX design based on journeys  
**Owner**: Product & Design Teams
