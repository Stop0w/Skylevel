
# How to Use Skylevel Documentation

**Version**: 1.0  
**Date**: January 2025  
**Purpose**: Guide for navigating and using the complete Skylevel documentation set  
**Audience**: Developers, Designers, Product Managers, Investors

---

## Documentation Philosophy

Skylevel's documentation is organized around a **dual-reality approach**:

1. **Current State**: React + Vite prototype (LEGACY - in `src/` folder)
2. **Target State**: Next.js 14 greenfield rebuild (described in `docs/`)

**⚠️ CRITICAL RULE**: All documentation in `docs/` describes the **TARGET Next.js 14 architecture**, NOT the current prototype.

---

## Quick Start by Role

### 👨‍💻 For Developers

**Start Here**:
1. **[README.md](./README.md)** - Overview of all docs and their purpose
2. **[GREENFIELD_REBUILD_STRATEGY.md](./GREENFIELD_REBUILD_STRATEGY.md)** - Why we're rebuilding and what to delete
3. **[TECH_STACK.md](./TECH_STACK.md)** - Next.js 14 stack decisions

**Then Build**:
4. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture, folder structure, routing
5. **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Prisma schema and data models
6. **[API_SPECIFICATION.md](./API_SPECIFICATION.md)** - Next.js API Routes and Server Actions
7. **[IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md)** - Week-by-week build plan

**For UI/UX**:
8. **[WIREFRAMES_SPECIFICATION.md](./WIREFRAMES_SPECIFICATION.md)** - Screen-by-screen wireframes with Rally Navigator integration
9. **[DESIGN_WIREFRAME_MAPPING.md](./DESIGN_WIREFRAME_MAPPING.md)** - Cross-reference between design briefs and implementation
10. **[UI_DESIGN_SYSTEM.md](./UI_DESIGN_SYSTEM.md)** - Tailwind CSS + shadcn/ui components
11. **[DESIGN_APPROACH.md](./DESIGN_APPROACH.md)** - Mobile-first PWA strategy

**For Deployment**:
12. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Replit deployment instructions

---

### 🎨 For Designers

**Start Here**:
1. **[BLUE_SKY_DESIGN_VISION.md](./BLUE_SKY_DESIGN_VISION.md)** - Design philosophy and visual identity
2. **[DESIGN_CONCEPT_SCREEN_BRIEFS.md](./DESIGN_CONCEPT_SCREEN_BRIEFS.md)** - Three design concept variations
3. **[WIREFRAMES_SPECIFICATION.md](./WIREFRAMES_SPECIFICATION.md)** - Detailed screen specs with Rally Navigator metaphor

**Then Map**:
4. **[DESIGN_WIREFRAME_MAPPING.md](./DESIGN_WIREFRAME_MAPPING.md)** - How mini-briefs map to wireframes
5. **[UI_DESIGN_SYSTEM.md](./UI_DESIGN_SYSTEM.md)** - Color palette, typography, components

**For Journey Design**:
6. **[USER_JOURNEYS.md](./USER_JOURNEYS.md)** - Candidate, Recruiter, Referrer user flows
7. **[DESIGN_APPROACH.md](./DESIGN_APPROACH.md)** - Mobile-first design strategy

**Assets**:
- Mini-briefs in `attached_assets/Pasted-Skylevel-UI-UX-Wireframe-Mini-Briefs-*.txt`
- Screenshots in `attached_assets/Screenshot_*.png`
- Animations in `public/Dynamic Resume Animation_*.mp4`

---

### 📊 For Product Managers

**Start Here**:
1. **[STRATEGIC_ASSESSMENT.md](./STRATEGIC_ASSESSMENT.md)** - Product vision, market positioning, competitive analysis
2. **[PRODUCT_REQUIREMENTS.md](./PRODUCT_REQUIREMENTS.md)** - Feature specifications and acceptance criteria
3. **[USER_JOURNEYS.md](./USER_JOURNEYS.md)** - User flows for all three personas

**Then Plan**:
4. **[IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md)** - Development timeline and milestones
5. **[GREENFIELD_REBUILD_STRATEGY.md](./GREENFIELD_REBUILD_STRATEGY.md)** - What we're building and why

**For Stakeholders**:
6. **[INVESTOR_PRESENTATION.md](./INVESTOR_PRESENTATION.md)** - Pitch deck and fundraising materials

---

### 💼 For Investors

**Read These**:
1. **[INVESTOR_PRESENTATION.md](./INVESTOR_PRESENTATION.md)** - Full pitch deck (18 slides)
2. **[STRATEGIC_ASSESSMENT.md](./STRATEGIC_ASSESSMENT.md)** - Market opportunity and competitive moat
3. **[PRODUCT_REQUIREMENTS.md](./PRODUCT_REQUIREMENTS.md)** - Product capabilities and roadmap

**For Technical DD**:
4. **[TECH_STACK.md](./TECH_STACK.md)** - Technology choices and rationale
5. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System scalability and design
6. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Infrastructure and DevOps

---

## Document Organization Map

### 📁 Strategic Layer (Why & What)

| Document | Purpose | Key Sections |
|----------|---------|--------------|
| **STRATEGIC_ASSESSMENT.md** | Product vision, market analysis | Vision, competitive landscape, GTM strategy |
| **PRODUCT_REQUIREMENTS.md** | Feature specs, user stories | Core features, acceptance criteria, priorities |
| **USER_JOURNEYS.md** | User flows for 3 personas | Candidate, Recruiter, Referrer journeys |
| **INVESTOR_PRESENTATION.md** | Fundraising pitch deck | Problem, solution, traction, ask |

### 🏗️ Technical Layer (How)

| Document | Purpose | Key Sections |
|----------|---------|--------------|
| **TECH_STACK.md** | Stack decisions | Next.js 14, Prisma, Clerk, Tailwind |
| **ARCHITECTURE.md** | System design | App Router, folder structure, routing |
| **DATABASE_SCHEMA.md** | Data models | Prisma schema, relationships, migrations |
| **API_SPECIFICATION.md** | API design | Server Actions, API Routes, authentication |
| **DEPLOYMENT_GUIDE.md** | Infrastructure | Replit deployment, environment config |

### 🎨 Design Layer (Look & Feel)

| Document | Purpose | Key Sections |
|----------|---------|--------------|
| **DESIGN_APPROACH.md** | Mobile-first PWA strategy | Responsive breakpoints, touch targets |
| **BLUE_SKY_DESIGN_VISION.md** | Design philosophy | Brand identity, visual language |
| **DESIGN_CONCEPT_SCREEN_BRIEFS.md** | 3 design concepts | Analog Film, Studio Craft, Human First |
| **WIREFRAMES_SPECIFICATION.md** | Screen-by-screen specs | Rally Navigator, journey theming |
| **DESIGN_WIREFRAME_MAPPING.md** | Design-to-code mapping | Mini-brief to wireframe cross-reference |
| **UI_DESIGN_SYSTEM.md** | Component library | Tailwind config, shadcn/ui components |

### 🛠️ Execution Layer (When)

| Document | Purpose | Key Sections |
|----------|---------|--------------|
| **GREENFIELD_REBUILD_STRATEGY.md** | Why rebuild from scratch | Delete vs keep decisions |
| **IMPLEMENTATION_ROADMAP.md** | Week-by-week plan | 8-week build schedule, milestones |

---

## Common Workflows

### 🚀 Workflow 1: Starting the Greenfield Rebuild

```bash
# Step 1: Read the strategic context
1. docs/README.md
2. docs/GREENFIELD_REBUILD_STRATEGY.md
3. docs/TECH_STACK.md

# Step 2: Understand the architecture
4. docs/ARCHITECTURE.md (folder structure, routing)
5. docs/DATABASE_SCHEMA.md (data models)
6. docs/API_SPECIFICATION.md (API design)

# Step 3: Follow the roadmap
7. docs/IMPLEMENTATION_ROADMAP.md (Week 1-8 plan)

# Step 4: Reference design specs as you build
8. docs/WIREFRAMES_SPECIFICATION.md (per screen)
9. docs/DESIGN_WIREFRAME_MAPPING.md (design-to-code)
```

### 🎨 Workflow 2: Implementing a Screen

```bash
# Example: Building Candidate Dashboard
1. docs/WIREFRAMES_SPECIFICATION.md → § Candidate Journey → 5. Candidate Dashboard
2. docs/DESIGN_WIREFRAME_MAPPING.md → Candidate Journey table
3. docs/UI_DESIGN_SYSTEM.md → Component library (ScorePill, StatTile)
4. attached_assets/Pasted-Skylevel-UI-UX-Wireframe-Mini-Briefs-*.txt → MINI-BRIEF 03
5. docs/USER_JOURNEYS.md → Candidate journey flow
```

### 📊 Workflow 3: Adding a New Feature

```bash
# Example: Adding "Compare Candidates" feature
1. docs/PRODUCT_REQUIREMENTS.md → Check if feature is scoped
2. docs/USER_JOURNEYS.md → Identify user flow touchpoints
3. docs/WIREFRAMES_SPECIFICATION.md → Design screen wireframe
4. docs/DATABASE_SCHEMA.md → Add data models if needed
5. docs/API_SPECIFICATION.md → Design API endpoints
6. docs/IMPLEMENTATION_ROADMAP.md → Schedule into sprint
```

### 🚢 Workflow 4: Deploying to Production

```bash
1. docs/DEPLOYMENT_GUIDE.md → Pre-deployment checklist
2. docs/ARCHITECTURE.md → Environment configuration
3. docs/DEPLOYMENT_GUIDE.md → Step-by-step deployment
4. docs/DEPLOYMENT_GUIDE.md → Post-deployment verification
```

---

## Key Cross-References

### Rally Navigator Metaphor

The **Rally Navigator** is Skylevel's core UX metaphor (racing dashboard):

- **Introduced**: `docs/WIREFRAMES_SPECIFICATION.md` (lines 18-34)
- **Design rationale**: `docs/DESIGN_WIREFRAME_MAPPING.md` (Rally Navigator sections)
- **Implementation**: `docs/WIREFRAMES_SPECIFICATION.md` (per screen)
- **Mini-briefs**: `attached_assets/Pasted-Skylevel-UI-UX-Wireframe-Mini-Briefs-*.txt` (Section 2)

### Fit Score (TMS + SRS + RNS)

The **Fit Score** is Skylevel's core algorithm:

- **Formula**: `docs/PRODUCT_REQUIREMENTS.md` (Fit Score section)
- **UI specs**: `docs/WIREFRAMES_SPECIFICATION.md` (ScorePill component)
- **Database**: `docs/DATABASE_SCHEMA.md` (FitScore model)
- **API**: `docs/API_SPECIFICATION.md` (calculateFitScore endpoint)
- **Implementation**: `src/utils/FitScoreCalculator.js` (LEGACY prototype)

### Journey-Specific Theming

**Color theming** by user journey:

- **Hiring** (Gold): Recruiter dashboard
- **Sourcing** (Red): Analytics, bias audit
- **Applying** (Blue): Candidate flow

Documented in:
- `docs/DESIGN_WIREFRAME_MAPPING.md` → Journey-Specific Color Theming table
- `docs/WIREFRAMES_SPECIFICATION.md` → Rally Navigator Metaphor section
- `docs/UI_DESIGN_SYSTEM.md` → Color palette

---

## Understanding Documentation Versions

### v1.0 Documents (Initial)
- All docs created January 2025
- Describe Next.js 14 target state
- Do NOT describe current React prototype

### v2.0 Updates (Rally Navigator Integration)
- `WIREFRAMES_SPECIFICATION.md` v2.0 - Added Rally Navigator
- `DESIGN_WIREFRAME_MAPPING.md` v1.0 - Cross-reference mapping
- `DESIGN_APPROACH.md` v2.0 - Mobile-first PWA

---

## Mini-Briefs in `attached_assets/`

The `attached_assets/` folder contains **UI/UX wireframe mini-briefs** that complement the technical docs:

| File | Purpose |
|------|---------|
| `Pasted-Skylevel-UI-UX-Wireframe-Mini-Briefs-*.txt` | Screen-by-screen design briefs (18 screens) |
| `Screenshot_*.png` | Visual mockups and wireframes |
| `Dynamic Resume Animation_*.mp4` | Hero animations for marketing pages |

**How to use**:
1. Mini-briefs describe **design intent** (layout, content, interactions)
2. Wireframes describe **implementation** (Next.js components, routes)
3. Mapping doc cross-references them

---

## Best Practices

### ✅ DO

1. **Start with README.md** - Always read this first
2. **Check GREENFIELD_REBUILD_STRATEGY.md** - Understand why we're rebuilding
3. **Use DESIGN_WIREFRAME_MAPPING.md** - Cross-reference design to code
4. **Follow IMPLEMENTATION_ROADMAP.md** - Build in order
5. **Reference WIREFRAMES_SPECIFICATION.md** - Per-screen source of truth

### ❌ DON'T

1. **Don't use docs to modify prototype** - They describe Next.js, not React
2. **Don't skip TECH_STACK.md** - Understand architecture decisions first
3. **Don't ignore DEPLOYMENT_GUIDE.md** - Critical for production readiness
4. **Don't mix mini-briefs with wireframes** - Use mapping doc to reconcile

---

## Document Dependencies

```
STRATEGIC_ASSESSMENT.md
    ↓
PRODUCT_REQUIREMENTS.md
    ↓
USER_JOURNEYS.md
    ↓
WIREFRAMES_SPECIFICATION.md ← DESIGN_WIREFRAME_MAPPING.md → Mini-Briefs
    ↓                              ↓
ARCHITECTURE.md              UI_DESIGN_SYSTEM.md
    ↓                              ↓
DATABASE_SCHEMA.md          DESIGN_APPROACH.md
    ↓
API_SPECIFICATION.md
    ↓
IMPLEMENTATION_ROADMAP.md
    ↓
DEPLOYMENT_GUIDE.md
```

---

## Getting Help

### Documentation Issues

If you find gaps or conflicts:
1. Check `DESIGN_WIREFRAME_MAPPING.md` for cross-references
2. File GitHub issue with `docs` label
3. Tag document owner (listed at bottom of each doc)

### Implementation Questions

If unclear how to implement:
1. Check `WIREFRAMES_SPECIFICATION.md` for screen specs
2. Check `ARCHITECTURE.md` for folder structure
3. Check `IMPLEMENTATION_ROADMAP.md` for build order

### Design Clarifications

If design intent is unclear:
1. Check mini-briefs in `attached_assets/`
2. Check `DESIGN_WIREFRAME_MAPPING.md` for mapping
3. Check `BLUE_SKY_DESIGN_VISION.md` for philosophy

---

## Quick Reference Card

| Need to... | Read... |
|------------|---------|
| Understand product vision | STRATEGIC_ASSESSMENT.md |
| Get feature requirements | PRODUCT_REQUIREMENTS.md |
| Build a screen | WIREFRAMES_SPECIFICATION.md |
| Set up database | DATABASE_SCHEMA.md |
| Create an API endpoint | API_SPECIFICATION.md |
| Deploy to production | DEPLOYMENT_GUIDE.md |
| Understand design system | UI_DESIGN_SYSTEM.md |
| Map design to code | DESIGN_WIREFRAME_MAPPING.md |
| Plan sprint work | IMPLEMENTATION_ROADMAP.md |
| Pitch to investors | INVESTOR_PRESENTATION.md |

---

**Document Owner**: Technical Writing Lead  
**Last Updated**: January 2025  
**Status**: Active Guide  
**Feedback**: Submit via GitHub issues with `documentation` label
