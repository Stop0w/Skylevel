Skylevel UI/UX Wireframe Mini-Briefs
1. SITEMAP OVERVIEW
Skylevel.ai
├── Marketing Pages
│   ├── Homepage
│   ├── How It Works (Multi-journey)
│   ├── Pricing
│   ├── Integrations
│   ├── Contact
│   └── Resources
├── Candidate Journey
│   ├── Profile Builder (Onboarding)
│   ├── Candidate Dashboard
│   ├── Job Search & Matches
│   ├── Job Detail View
│   ├── Apply to Job
│   ├── Applications Tracker
│   ├── Referral Flow
│   ├── Saved Jobs
│   ├── Profile Edit
│   └── Settings
├── Recruiter Journey
│   ├── Recruiter Dashboard
│   ├── Fit Queue (Candidate Discovery)
│   ├── Candidate Detail View
│   ├── Shortlist Management
│   ├── Role Management (JobPrint™)
│   ├── Analytics Dashboard
│   ├── Bias Audit
│   ├── Messages
│   ├── Compare Candidates
│   └── Settings
└── Referrer Journey
	├── Referrer Landing
	├── Referrer Auth (LinkedIn)
	└── Referrer Form & Confirmation

2. INFORMATION ARCHITECTURE & NAVIGATION
Primary Navigation Structure
Marketing Site: Top nav with journey-specific CTAs
Candidate Flow: Bottom nav + hamburger menu (Rally Dashboard theme)
Recruiter Flow: Left sidebar + top utility bar (Control Tower theme)
Referrer Flow: Linear, single-path (Pit Crew theme)

Rally Navigator Integration
All journeys use rally racing metaphors:
- Candidate: Personal dashboard (speed = Fit Score, fuel = profile completion)
- Recruiter: Control tower (radar = Fit Queue, telemetry = analytics)
- Referrer: Pit crew (quick validation actions)

Navigation Components
Marketing Nav: Logo + Links (How It Works, Pricing, Integrations, Contact) + "Get Started" CTA
Candidate Nav: Dashboard (🏁), Jobs (🎯), Applications (📋), Profile (⚙️), Settings (🔧)
Recruiter Nav: Dashboard (📊), Fit Queue (🎯), Roles (📁), Analytics (📈), Messages (💬), Bias Audit (🛡️), Settings (⚙️)

MINI-BRIEF 01: HOMEPAGE
Purpose
Convert visitors into candidates or recruiters within 20 seconds using social proof, value proposition, and journey-specific CTAs.
Page Structure
Hero Section (Above fold)
Pain Points (Social proof with stats)
Method/How It Works (Interactive demo)
Value Proof (Before/After comparison)
Journey Selection (3 CTA blocks)
Trust Signals (Logos + testimonials)
Key Components
Hero Title: "Start every hire with proof, not guesswork"
Hero Video: Animated resume → Fit Score transformation
Journey Pills: 3 buttons (👔 I'm Hiring, 🎯 I'm Sourcing, 🚀 I'm Applying)
Pain Tiles: 3 stat cards showing cost of guesswork
Interactive Fit Score Calculator: Sliders showing TMS + SRS + RNS = Total Score
ROI Calculator Widget: Input fields with real-time savings calculation
Content Elements
Primary CTA: "🔶 Get My Fit Queue Demo"
Secondary CTAs: Journey-specific buttons with tooltips
Stats: "34% better hires", "41% faster screening", "60% less bias"
Micro-metric annotations on each stat tile
Design Notes
Use gradient text for hero title (Accent → Primary)
Animate score transformation on scroll
Show micro-wins throughout ("+12% boost possible")

MINI-BRIEF 02: HOW IT WORKS (MULTI-JOURNEY)
Purpose
Explain the Fit Score model through journey-specific narratives with metaphor-driven progression.
Page Structure
Hero with Journey Selection (Sticky pills)
Journey-Specific Flow (5-step vertical scroll)
Rally Navigator Module (Metaphor explanation)
Integration Preview (ATS compatibility)
Final CTA (Journey-specific action)
Key Components Per Journey
Hiring Journey (Red/Accent)
Steps: Goal → Pain → Power-Up → How It Works → Success
Rally Metaphor: "You're the navigator with real-time scoring"
Fit Score Steps: Calibrate Job (JobPrint™) → Match Profile → Smart Decision
Proof Stats: 70% faster screening, 60% fewer bad hires, 85% confidence
Sourcing Journey (Yellow/Primary)
Steps: Place faster → Pain (no proof) → Fit Score → Auto-triage → Results
Rally Metaphor: "You're sending the right car with verified stats"
Unique Value: Commission protection through quality placements
Proof Stats: 70% faster placements, 45% higher commissions, 90% client retention
Applying Journey (Blue)
Steps: Land roles → Pain (black holes) → Real-time Fit → Match-Validate-Get Seen → Stand Out
Rally Metaphor: "You know your odds before you start"
Unique Value: Peer validation visible to employers
Proof Stats: 3x more interviews, 65% faster job search, 92% role satisfaction
Design Notes
Each journey gets themed color overlay
Progress bar tied to scroll depth
Fit Score animates from 0 → final score as user scrolls
Rally metaphor uses car dashboard/speedometer visual

MINI-BRIEF 03: CANDIDATE DASHBOARD
Purpose
Control center showing job matches, application status, Fit Score progress, and actionable nudges.
Page Structure
Welcome Header (Avatar + Fit Score badge)
Stats Overview (4 tiles)
Main Grid (2 columns: Recent Applications | Suggested Jobs)
Analytics Section (Charts + trends)
Action Nudges (Contextual improvements)
Key Components
Fit Score Badge: Large, prominent score with color coding (90+ green, 80-89 yellow, <80 red)
Stat Tiles:
Saved Jobs (💼)
Active Applications (📋)
Avg Fit Score (⭐)
Profile Completion (👤)
Application Cards:
Job title + company
Status badge (Submitted, Under Review, Shortlisted, Interviewing)
Fit Score at application
Timeline visualization
"⚡ Improve Fit" CTA button
Suggested Jobs:
Job title + company
Fit Score percentage
Match quality indicator (🎯 Perfect Match, ⭐ Great Match, ✨ Good Match)
Quick actions: View | Apply
Analytics Cards:
Fit Score Trend (line chart)
Application Stats (funnel)
Referral Stats (network visualization)
Design Notes
Use micro-wins: "Your score increased +5 this week!"
Show clear next actions on each card
Tooltips explain Fit Score breakdowns
Mobile-first: Stack into single column

MINI-BRIEF 04: JOB DETAIL VIEW (CANDIDATE)
Purpose
Show comprehensive job information with transparent Fit Score breakdown and clear path to apply or improve match.
Page Structure
Header Summary Panel (Job + Fit Score)
Fit Score Breakdown (TMS + SRS + RNS cards)
Job Description (Collapsible sections)
Boost Recommendations (If score < 95)
Action Bar (Sticky bottom)
Key Components
Header:
Job title (large, bold)
Company + location + tags
Overall Fit Score badge (prominent)
Action buttons: Apply | Get Referred | Save
Score Breakdown Cards:
Skills Match (TMS): Shows matched skills count, percentage
Peer Ratings (SRS): Shows endorsement count, trust score
Referral Boost (RNS): Shows mutual connections, referral status
Boost Suggestions (if applicable):
"Get a referral (+15%)"
"Complete your profile (+8%)"
"Get peer ratings (+12%)"
Each with icon, boost value, and quick action button
Job Details:
Accordion sections: Responsibilities | Requirements | Benefits | About Company
Required vs Nice-to-Have skills clearly separated
Salary range, experience level, work mode
Design Notes
Fit Score uses gradient background (green for 90+, yellow for 80-89)
"Why You're a Match" section with specific examples
Show what you're missing for higher scores
Mobile: Stack vertically, sticky Apply button

MINI-BRIEF 05: APPLY TO JOB PAGE
Purpose
Streamline application submission while showing Fit Score impact and referral opportunities.
Page Structure
Job Summary Card (Sticky on scroll)
Fit Score Display (Current + Potential)
Application Form (Auto-filled from profile)
Optional Enhancements (Referral, Work Sample, Note)
Submit CTA (Large, prominent)
Key Components
Job Summary:
Company logo + job title
Location + salary
Current Fit Score
Fit Score Visualizer:
Progress bar showing current score
Potential boost indicators
Breakdown: Base Score + Referral Boost + Profile Completeness
Form Fields:
Name, email, phone (auto-filled, editable)
Resume (uploaded from profile or new upload)
Cover letter (optional, template available)
Work samples (optional upload)
Personal note (text area)
Boost Panel (if score < 90):
"⚡ Boost Your Application" header
Suggested actions with point values
Quick action buttons
Submit Button:
Large, centered: "🚀 Submit Application"
Shows submitting with Fit Score of X%
Design Notes
Show real-time Fit Score changes as optional fields are filled
Behavioral nudges: "Add a referral to increase visibility by 3x"
Confirmation modal after submission with next steps
Mobile: Single column, sticky submit button

MINI-BRIEF 06: APPLICATION CONFIRMATION PAGE
Purpose
Confirm submission, educate on Fit Score value, and provide next action opportunities.
Page Structure
Confirmation Hero (Checkmark animation)
Next Steps Timeline (3-step visual)
Boost Panel (If score < 95)
Fit Score Education (3 value props)
Related Actions (Browse more jobs | Invite peers)
Key Components
Confirmation Panel:
Large checkmark animation (✅)
"Application Sent — You're Ahead of the Pack"
Submitted Fit Score badge
Comparison: "More likely to be seen than 80% of applicants"
Timeline:
Step 1: Employer Notified (📬)
Step 2: Track Updates (📊)
Step 3: Boost Fit (💡)
Each with icon and description
Boost Opportunities (if applicable):
Grid of 3 suggestion cards
Each shows: Icon, title, boost value, action button
Examples: "Invite 2 peers (+10%)", "Add referral", "Add missing skill (+5%)"
Education Cards:
"Real skills. Not keywords" (📊)
"Peer signal means trust" (🧠)
"Higher scores = faster callbacks" (🚀)
Each with icon and 1-2 sentence explanation
Design Notes
Celebrate the action (micro-animation)
Show clear value of what just happened
Provide immediate next action options
Mobile: Stack cards vertically

MINI-BRIEF 07: PROFILE BUILDER (ONBOARDING)
Purpose
Collect candidate information to calculate initial Fit Score through multi-step wizard.
Page Structure (5 Steps)
Welcome (Introduction + motivation)
Skills (Core competencies)
Experience (Work history)
Preferences (Job search criteria)
Review (Summary + Fit Score reveal)
Key Components Per Step
Step 1: Welcome
Hero title: "Build Your Complete Profile"
Value proposition paragraph
Large "Start Building Profile" CTA
Progress indicator: Step 1/5
Step 2: Skills
Title: "Your Skills & Expertise"
Suggested skills chips (clickable to add)
Custom skill input field
Skill list with proficiency sliders (1-5 stars)
Pro tip: "Peer validation can boost your score"
Progress: 2/5
Step 3: Experience
Title: "Experience & Samples"
Add work experience button
Experience cards (company, title, description, current checkbox)
Work sample upload section
Referral checkbox
Progress: 3/5
Step 4: Preferences
Title: "What You're Looking For"
Location input
Remote preference (On-site | Hybrid | Remote)
Job type checkboxes (Full-time, Contract, Freelance)
Salary expectation range
Work environment sliders
Progress: 4/5
Step 5: Review
Title: "Review Your Profile"
Fit Score reveal animation (0 → calculated score)
Profile summary sections
Edit buttons for each section
"Complete Profile" CTA (large, prominent)
Progress: 5/5
Design Notes
Always show progress indicator
Allow forward/back navigation
Auto-save on each step
Celebrate completion with animation
Mobile: Full-screen steps

MINI-BRIEF 08: RECRUITER DASHBOARD
Purpose
High-level overview of hiring pipeline, candidate quality, and actionable opportunities.
Page Structure
Header (Welcome + Quick Actions)
Hot Candidate Alert (If applicable)
KPI Tiles (4 key metrics)
Active Jobs Grid (Job-by-job pipelines)
Recent Activity Feed
Performance Charts
Key Components
Hot Candidate Modal (Priority alert):
Candidate avatar + name
Fit Score (90+ with green badge)
Key strengths (3 chips)
Referrals count
Quick actions: Schedule Interview | View Profile | Dismiss
KPI Tiles (2x2 grid):
Avg Fit Score (Shortlisted): 85 ↑ 3%
Avg Fit Score (Hires): 92 ↑ 5%
Time to Fill: 18 days ↓ 12%
Offer Rate: 74% ↑ 8%
Each shows current value, delta, and mini trend line
Active Jobs Section:
Job card per active role
Stage pipeline: Applied → Reviewed → Interviewing → Offer → Hired
Each stage shows count
Hover shows candidate names
Click to drill down
Activity Feed:
Time-ordered list
Icons for action type
Candidate name + action + timestamp
Examples: "Sarah Chen applied to UX Designer", "Mike Rodriguez completed referral"
Charts:
Hiring funnel (conversion rates)
Score distribution (histogram)
Time-to-hire trend (line chart)
Design Notes
Dashboard must feel like control center
Priority items float to top
Use color coding (green = good, yellow = attention, red = risk)
Mobile: Stack into single column, collapsible sections

MINI-BRIEF 09: FIT QUEUE (CANDIDATE DISCOVERY)
Purpose
Recruiter's main workspace for discovering, filtering, and shortlisting top candidates with transparent Fit Scores.
Page Structure
Filter Bar (Sticky top)
Select Mode Controls (When active)
Candidate Cards Grid
Shortlist Drawer (Slide-in panel)
Key Components
Filter Bar:
Role dropdown
Status dropdown (New, Reviewing, Shortlisted)
Skills multi-select
Fit Score slider (minimum threshold)
Referrals slider (minimum count)
Sort dropdown (Fit Score, Referrals, Name)
Bulk Actions Bar (appears when Select Mode active):
Select count indicator
"Create Shortlist" button
"Export" button
"Cancel" button
Candidate Card:
Avatar emoji
Name + role
Location
Fit Score badge (large, color-coded)
Status chip
Skills tags (first 3-4 shown)
Referrals count with icon
Actions: Flag | Add to Shortlist | View Profile
Checkbox (when Select Mode active)
Candidate Detail Modal (on card click):
Full profile information
Score breakdown (TMS, SRS, RNS)
Skills with match indicators
Work experience
Referrer information
Quick actions: Schedule Interview | Add to Shortlist | Message
Shortlist Drawer (slide from right):
Selected candidates count
Mini candidate cards
"Create Shortlist" form
Shortlist name input
Role assignment
Visibility toggle (Internal | Shareable)
Save button
Design Notes
Card hover reveals more actions
Fit Score uses gradient (90+ green, 80-89 yellow, <80 grey)
Flagged candidates show flag icon
Mobile: Single column, filters in drawer
Empty state shows friendly guidance

MINI-BRIEF 10: CANDIDATE DETAIL VIEW (RECRUITER)
Purpose
Comprehensive candidate profile with score transparency, peer feedback, and collaboration tools.
Page Structure
Header Panel (Candidate + Fit Score)
Tab Navigation (Overview | Peer Feedback | Experience | Notes)
Tab Content Area
Sidebar (Quick Actions + Team Notes)
Key Components
Header:
Large avatar
Name + role
Location + contact info
Overall Fit Score (large badge)
Status dropdown
Quick actions: Schedule | Message | Add to Shortlist | Export
Score Breakdown Cards (Overview tab):
TMS Card: Skills fit percentage, matched skills list
SRS Card: Peer ratings percentage, endorsement count
RNS Card: Network score, referrer count, FAANG badge
Each card shows calculation transparency
Peer Feedback Tab:
Most Mentioned Strengths (top 3 with mention count)
Ratings Heatmap (skills x referrers)
Referrer Credibility Table (name, title, org tier, influence score)
Feedback Snippets (quoted comments with referrer attribution)
Experience Tab:
Timeline view of work history
Education
Certifications
Work samples (if provided)
Notes Tab:
Team collaboration area
Add note input (with @mention support)
Notes feed (author, timestamp, content)
Filter: My Notes | All Notes
Sidebar Actions:
Rating widget (recruiter's own rating, 1-5 stars)
Add to shortlist button
Flag for follow-up
Share profile link
Export PDF
Design Notes
Tabs keep header sticky
Score cards use visual hierarchy (larger = more important)
Peer feedback shows authenticity (anonymous but verified)
Mobile: Tabs become accordion, sidebar becomes bottom sheet

MINI-BRIEF 11: SHORTLIST VIEW
Purpose
Manage curated candidate lists with comparison tools and sharing capabilities.
Page Structure
Shortlist Header (Name + metadata)
Candidate Grid (Cards with key info)
Comparison Mode (Side-by-side view)
Share Panel (Export + permissions)
Key Components
Header:
Shortlist name (editable)
Role tag
Created date
Candidate count
Actions: Edit | Share | Export | Delete
Candidate Cards:
Same structure as Fit Queue cards
Reorderable (drag handles)
Quick actions: Remove | View Profile | Compare
Selection checkbox (for comparison)
Comparison View (when 2-3 selected):
Side-by-side columns
Fit Scores aligned
Skills comparison (matched/unmatched)
Experience summary
Peer ratings comparison
Referrals comparison
Notes from team
Share Modal:
Visibility toggle: Internal | Shareable link
Email share (hiring manager input)
Link generation + copy button
Permission controls
Export options: PDF | CSV
Design Notes
Visual comparison makes differences obvious
Color coding for better/worse on each metric
Export maintains branding
Mobile: Cards stack, comparison is sequential

MINI-BRIEF 12: ROLE MANAGEMENT (JobPrint™)
Purpose
Create and calibrate job roles with custom scoring weightings and requirements.
Page Structure (3-Step Wizard)
Basic Info (Title, description, requirements)
Skills & Calibration (Required vs nice-to-have)
JobPrint™ Weighting (Custom score formula)
Key Components
Step 1: Basic Info
Job title input
Location + remote preference
Employment type dropdown
Salary range input
Job description textarea
Requirements textarea
Benefits textarea
Bias check button (AI analysis)
Step 2: Skills
Required skills section (chips, removable)
Nice-to-have skills section (chips, removable)
Skill search/add input
Suggested skills (from similar roles)
Ideal behaviors multi-select
Motivations tags
Step 3: JobPrint™ Calibration
Score weight sliders:
Technical Skills (TMS): 0-100%
Soft Skills (SRS): 0-100%
Referral Network (RNS): 0-100%
Total must = 100%
Preview calculation with example candidate
Explanation of each component
Save & Activate button
Design Notes
Progress indicator (1/3, 2/3, 3/3)
Real-time total validation on sliders
Visual preview of score impact
Mobile: Full-screen steps, larger touch targets

MINI-BRIEF 13: ANALYTICS DASHBOARD (RECRUITER)
Purpose
Measure hiring effectiveness, score quality, and process efficiency with actionable insights.
Page Structure
Filter Controls (Period, Role, Department)
KPI Overview (4 metric tiles)
Charts Grid (2x2 layout)
Insights Panel (AI-generated recommendations)
Key Components
Filters:
Time period: Last 7 days | 30 days | 90 days
Role filter: All Roles | Specific role
Department filter: All | Engineering | Product | Design
KPI Tiles:
Avg Fit Score of Shortlisted: 85 ↑ 3%
Avg Fit Score of Hires: 92 ↑ 5%
Time to Fill: 18 days ↓ 28%
Offer Rate: 74% ↑ 8%
Charts:
Hiring Funnel: Bar chart showing conversions (Applied → Screened → Interviewed → Offered → Hired)
Fit Score Trend: Line chart over time
Time-to-Hire by Role: Horizontal bar chart
Score Distribution: Histogram showing candidate score ranges
Insights Panel:
3-5 automatically generated insights
Each with icon, title, explanation
Examples:
"Improved Time-to-Hire Trend" (↓28% over 6 weeks)
"Strongest Stage: Screening" (77% conversion rate)
"UX Designer Efficiency" (12 days, 23% below average)
Design Notes
Charts use consistent color scheme
Filters immediately update all visuals
Export functionality for all charts
Mobile: Stack vertically, interactive charts remain functional

MINI-BRIEF 14: BIAS AUDIT PAGE
Purpose
Surface hiring disparities across gender, ethnicity, and other demographics with actionable recommendations.
Page Structure
Summary Dashboard (Overall fairness score)
Role Audit Cards (Per-role analysis)
Drill-Down Modal (Detailed breakdowns)
Recommendations Panel
Key Components
Summary Tiles (3 tiles):
Overall Fairness Score: 78/100 (color-coded)
Roles Flagged: 3 (yellow/red indicator)
Total Roles Audited: 12
Role Audit Card:
Role title
Total applications count
Bias detected flag (⚠️ if disparity > 20%)
Gender pass-through comparison:
Male: 58%
Female: 42%
Gap: 16%
Ethnicity range:
Highest: 65%
Lowest: 38%
Gap: 27%
Click to view detailed report
Drill-Down Modal:
Full demographic breakdown table
Bar charts showing disparities
Flag reason explanation
Max gap highlight
Actions: Download Report | Schedule Review
Recommendations:
Numbered list of suggested actions
Each with icon (💡) and explanation
Examples:
"Review 'Senior Developer' job description for gendered language"
"Expand sourcing channels for underrepresented groups"
"Implement blind resume review for initial screening"
Design Notes
Use yellow/red for flagged items (not stigmatizing colors)
Disparities shown as neutral data, not judgment
Actionable recommendations, not just problems
Mobile: Cards stack, modal full-screen

MINI-BRIEF 15: REFERRAL FLOW (CANDIDATE INITIATES)
Purpose
Enable candidates to request peer endorsements through frictionless link sharing.
Page Structure
Context Screen (Current application)
Share Modal (Link generation)
Success Confirmation
Key Components
Application Context:
Job card: Title + company + logo
Current Fit Score
Potential boost: "+15 with referral"
Large "🔗 Get Referral" button
Share Modal:
Title: "Share your referral link"
Subtitle: "Ask a teammate to vouch for your skills. Takes them <1 min"
Job preview card (company logo, title, location)
Share options:
Primary: "Copy Link" button (large)
Secondary: Email button | Native Share button
Generated link display
Footer note: "Your referrer will rate your top skills. LinkedIn login preferred for verification"
Success Screen:
Celebration icon (🎉)
"Referral link shared!"
Explanation: "You'll get notified when someone completes your referral"
Prototype note: "You'll now see the referrer's experience"
Continue button
Design Notes
Modal overlay (dark backdrop)
Mobile-first design
Copy button uses accent color
One-tap sharing on mobile devices
Clear value proposition throughout

MINI-BRIEF 16: REFERRER LANDING PAGE
Purpose
Convert referrer click into completed endorsement with minimal friction and clear value.
Page Structure
Hero (Candidate context)
Value Proposition (Why this matters)
LinkedIn Auth CTA (Primary path)
Manual Option (Secondary path)
Key Components
Hero:
Candidate name (large, friendly)
Job they're applying for
Your connection context: "needs your help"
Estimated time: "<1 min"
Value Props (3 tiles):
"Your endorsement carries weight" (⭐)
"100% anonymous to employer" (🔒)
"Help [Name] stand out" (🚀)
Primary CTA:
Large button: "Continue with LinkedIn"
Subtext: "We'll verify your connection and pre-fill details"
Trust badge: "Secure OAuth"
Secondary Option:
Text link: "Continue without LinkedIn"
Note: "Manual verification required"
Skylevel Pitch (bottom):
"Thinking of your next dream gig?"
Brief Skylevel value prop
"Try Skylevel Free" CTA
Design Notes
Friendly, conversational tone
Candidate photo/avatar prominent
LinkedIn button uses brand blue
Trust signals throughout
Mobile-optimized touch targets

MINI-BRIEF 17: REFERRER FORM
Purpose
Collect skill ratings and optional feedback efficiently, showing real-time impact on candidate's score.
Page Structure
Progress Header (Candidate + completion %)
Rating Grid (Skills to rate)
Optional Feedback (Text area)
Submit Button (Shows impact)
Key Components
Header:
Candidate avatar + name
Job title being applied for
Progress: "3/5 skills rated"
Fit Score preview (updates in real-time)
Skill Rating Row (repeated per skill):
Skill name (e.g., "JavaScript", "Communication")
Star rating (1-5, tap/click)
Help text: "Rate honestly based on direct experience"
Visual feedback on selection
Feedback Section (optional, collapsible):
Textarea: "Anything else the hiring team should know?"
Character count: 0/500
Examples: "Specific project wins, soft skills observations"
Submit Button:
Large, sticky at bottom
Text: "Submit Endorsement"
Shows: "This will boost [Name]'s score by +12%"
Loading state on submit
Design Notes
Auto-save ratings as they're entered
Visual feedback (stars animate on selection)
Show impact throughout ("Your rating adds +2%")
Mobile: Full-screen, large touch targets for stars
Completion celebration animation

MINI-BRIEF 18: REFERRER COMPLETION
Purpose
Thank referrer, show impact, and convert them into Skylevel candidates.
Page Structure
Success Hero (Confirmation)
Impact Visualization (Score boost shown)
Skylevel CTA (Try it yourself)
Share Option (Refer more people)
Key Components
Success Panel:
Large checkmark animation (✅)
"Thanks for helping [Name]!"
Impact statement: "Your endorsement adds weight to their application"
Candidate's new Fit Score display
What Happens Next (3 tiles):
"Anonymous to Employer" (🔒): "Your identity stays private"
"Real Signal, Not Noise" (📊): "Your professional endorsement carries weight"
"[Name] Gets Notified" (🔔): "They'll see you've endorsed them"
Skylevel Pitch:
Headline: "🚀 Thinking of your next dream gig?"
Value prop: "Skylevel helps professionals like you get noticed by top employers"
Features list (bullets)
CTA: "Try Skylevel Free"
Share Again:
"Know someone else looking for a role?"
Share Skylevel button
Design Notes
Celebration visual (confetti animation)
Testimonial quote from referred candidate
Trust badges (verification, privacy)
Mobile: Stack vertically, large CTA buttons

3. DATA STRUCTURE & SCHEMAS
Core Entities
Candidate Profile
{
  id: string,
  name: string,
  email: string,
  avatar: string (emoji),
  role: string,
  location: string,
  skills: [{ name: string, level: 1-5 }],
  experience: [{
	company: string,
	title: string,
	description: string,
	current: boolean
  }],
  fitScore: number (0-100),
  tms: number (0-100), // Technical Match Score
  srs: number (0-100), // Soft Skills/Referral Score
  rns: number (0-100), // Referral Network Score
  referrals: number,
  peerValidations: [{
	skill: string,
	endorser: string,
	rating: number (1-5)
  }],
  hasReferral: boolean,
  profileCompletion: number (0-100),
  status: string (New | Reviewing | Shortlisted | Interviewing)
}
Job Listing
{
  id: string,
  title: string,
  company: string,
  location: string,
  remote: boolean,
  salary: string,
  description: string,
  skills: [string],
  requirements: [string],
  jobPrint: {
	tmsWeight: number (0-100),
	srsWeight: number (0-100),
	rnsWeight: number (0-100)
  },
  applicantCount: number,
  avgFitScore: number
}
Application
{
  id: string,
  jobId: string,
  candidateId: string,
  status: string (Submitted | Under Review | Shortlisted | Interviewing | Offer | Hired),
  appliedAt: timestamp,
  fitScoreAtApply: number,
  referralComplete: boolean,
  referralBoost: number,
  lastUpdated: timestamp
}
Referral/Endorsement
{
  id: string,
  referrerId: string,
  candidateId: string,
  jobId: string,
  skills: [{
	name: string,
	rating: number (1-5)
  }],
  feedback: string (optional),
  verificationMethod: string (LinkedIn | Manual),
  completedAt: timestamp,
  anonymous: boolean
}
Shortlist
{
  id: string,
  name: string,
  recruiterId: string,
  role: string,
  candidates: [candidateId],
  createdAt: timestamp,
  updatedAt: timestamp,
  visibility: string (Internal | Shareable),
  shareLink: string (optional)
}

4. COMPONENT LIBRARY REFERENCE
Reusable Components to Build
ScorePill: Colored badge showing Fit Score with tooltip breakdown
SkillChip: Tag showing skill with optional proficiency indicator
StatusBadge: Color-coded label for application/candidate status
ProgressBar: Visual indicator with percentage
StatTile: Card showing metric + delta + trend
CandidateCard: Compact profile summary with actions
JobCard: Job listing summary with Fit Score
TimelineItem: Activity feed entry with icon + timestamp
RatingStars: Interactive 1-5 star selector
FilterDropdown: Multi-select filter with search
ToastNotification: Temporary success/error message
Modal: Overlay dialog with backdrop
AccordionSection: Collapsible content block
TabNavigation: Horizontal tabs for content switching
ChartContainer: Wrapper for data visualizations