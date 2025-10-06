# Skylevel App Idea

## Project Overview

**Skylevel** is an AI-powered candidate intelligence layer that accelerates recruitment decisions through validated Fit Scores. The platform transforms 200+ resumes into 5 high-confidence candidates using peer validation and AI scoring.

## Core Problem Being Solved

Recruiters are overwhelmed by volume - reviewing hundreds of resumes for each position. Current ATS solutions focus on keyword matching rather than true fit assessment. Skylevel solves this by:

1. **Volume Reduction**: 200+ resumes → 5 high-confidence candidates
2. **Validation Layer**: Peer referrals boost confidence in candidate assessments
3. **Intelligence Scoring**: Multi-dimensional Fit Scores (Technical, Soft Skills, Referral Network)

## Target Users

### Primary: Recruiters
- Review high volume of candidates daily
- Need to make quick, confident decisions
- Value peer validation and network effects
- Work in fast-paced hiring environments

### Secondary: Candidates
- Want to stand out in competitive job market
- Seek ways to demonstrate true fit beyond resume
- Willing to leverage their network for validation

### Tertiary: Referrers (Peer Network)
- Industry professionals who can validate skills
- Trust-based relationships with candidates
- Motivated by helping qualified people get opportunities

## Key Differentiators

1. **Fit Score Intelligence**: Combines technical matching, soft skills assessment, and peer validation
2. **Network Effects**: Referral system creates compound confidence
3. **Speed Focus**: Designed for rapid decision-making under pressure
4. **Trust Layer**: Peer validation adds credibility to AI assessments

## Success Metrics

- **Time-to-Hire**: Reduce average hiring time by 40%
- **Quality-of-Hire**: Improve 90-day retention by 25%
- **Recruiter Efficiency**: Handle 3x more candidates per hour
- **Candidate Experience**: Higher satisfaction with personalized fit insights

## Technical Context

- **Platform**: Next.js 14 with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Architecture**: Server Components with minimal client state

## Design Goals

1. **Speed**: Every interaction should accelerate decision-making
2. **Clarity**: Information hierarchy must be immediately obvious
3. **Trust**: Visual design should reinforce data confidence
4. **Professional**: Appeal to recruiting professionals and candidates

## Primary User Flow: The Fit Queue

The core experience is the recruiter's Fit Queue - where they review 200+ candidates narrowed down to 5 high-confidence prospects through Fit Score intelligence.

**Key Elements**:
- Candidate cards with clear Fit Score visualization
- Quick filtering and sorting capabilities
- One-click actions (shortlist, reject, request more info)
- Real-time confidence indicators

## Success State

A recruiter can log in, review their Fit Queue, and confidently select 5 candidates for interviews within 15 minutes - a process that typically takes hours.