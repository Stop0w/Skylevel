
# Skylevel API Specification

**Version**: 1.0  
**Date**: January 2025  
**Status**: Greenfield Rebuild Spec  
**Framework**: Next.js API Routes + Server Actions

---

## ⚠️ Important: This API spec is for the Next.js 14 rebuild

**Current State**: React + Vite prototype with mock data (no real API)  
**Target State**: Next.js 14 with full API implementation

This specification describes the **target API architecture** for the greenfield rebuild. The current prototype does not implement these endpoints.

---

## API Architecture

### Technology Stack
- **Framework**: Next.js 14 App Router
- **API Layer**: API Routes (`/app/api/*`) + Server Actions
- **Validation**: Zod schemas
- **ORM**: Prisma
- **Auth**: Clerk (JWT-based)
- **Rate Limiting**: Built-in Next.js middleware

---

## Authentication

### Auth Flow

```typescript
// middleware.ts (Next.js)
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/jobs/:id", "/referral/:token"],
  ignoredRoutes: ["/api/webhooks(.*)"],
});
```

### Protected Routes

All `/api/*` routes require authentication except:
- `GET /api/jobs` (public job listings)
- `POST /api/referrals/:token` (public referral submission)
- `POST /api/webhooks/*` (webhook handlers)

### Headers

```
Authorization: Bearer <clerk_jwt_token>
Content-Type: application/json
```

---

## Core Endpoints

### 1. Candidates

#### `GET /api/candidates`
**Description**: List candidates for authenticated recruiter

**Query Parameters**:
```typescript
{
  jobId?: string;
  minScore?: number;      // 0-100
  skills?: string[];      // Array of skill names
  status?: 'new' | 'reviewing' | 'shortlisted' | 'interviewed' | 'hired' | 'rejected';
  limit?: number;         // Default: 50, Max: 200
  offset?: number;        // Pagination
  sortBy?: 'score' | 'referrals' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
```

**Response**:
```typescript
{
  candidates: [
    {
      id: string;
      name: string;
      email: string;
      role: string;
      location: string;
      fitScore: {
        overall: number;
        tms: number;
        srs: number;
        rns: number;
        confidence: 'high' | 'medium' | 'low';
      };
      skills: string[];
      referralCount: number;
      status: string;
      createdAt: string;
    }
  ];
  total: number;
  hasMore: boolean;
}
```

**Status Codes**:
- `200`: Success
- `401`: Unauthorized
- `403`: Forbidden (not your candidates)
- `500`: Server error

---

#### `GET /api/candidates/:id`
**Description**: Get candidate details

**Response**:
```typescript
{
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  role: string;
  skills: [
    {
      name: string;
      proficiency: number; // 1-10
    }
  ];
  fitScore: {
    overall: number;
    tms: number;
    srs: number;
    rns: number;
    confidence: 'high' | 'medium' | 'low';
    calculatedAt: string;
  };
  referrals: [
    {
      id: string;
      referrerName: string;
      relationship: string;
      trustScore: number;
      feedback: string;
      createdAt: string;
    }
  ];
  resumeUrl?: string;
  linkedinUrl?: string;
  workSamples: [
    {
      title: string;
      url: string;
      description: string;
    }
  ];
  status: string;
  createdAt: string;
  updatedAt: string;
}
```

---

#### `POST /api/candidates`
**Description**: Create candidate (apply to job)

**Request Body**:
```typescript
{
  jobId: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  skills: [
    {
      name: string;
      proficiency: number;
    }
  ];
  resumeUrl?: string;
  linkedinUrl?: string;
  workSamples?: [
    {
      title: string;
      url: string;
      description?: string;
    }
  ];
}
```

**Response**:
```typescript
{
  id: string;
  fitScore: {
    overall: number;
    breakdown: {
      tms: number;
      srs: number;
      rns: number;
    };
    confidence: 'low'; // No referrals yet
  };
  referralLink: string; // Unique link to share
  message: "Application received! Share your referral link to boost your score.";
}
```

---

#### `PATCH /api/candidates/:id`
**Description**: Update candidate status

**Request Body**:
```typescript
{
  status: 'reviewing' | 'shortlisted' | 'interviewed' | 'hired' | 'rejected';
}
```

**Response**:
```typescript
{
  id: string;
  status: string;
  updatedAt: string;
}
```

---

### 2. Jobs

#### `GET /api/jobs`
**Description**: List jobs (public or authenticated)

**Query Parameters**:
```typescript
{
  status?: 'open' | 'closed';
  skills?: string[];
  limit?: number;
  offset?: number;
}
```

**Response**:
```typescript
{
  jobs: [
    {
      id: string;
      title: string;
      company: string;
      location: string;
      requiredSkills: string[];
      description: string;
      status: 'open' | 'closed';
      calibration: {
        tmsWeight: number; // 0-1
        srsWeight: number;
        rnsWeight: number;
      };
      candidateCount: number;
      createdAt: string;
    }
  ];
  total: number;
}
```

---

#### `GET /api/jobs/:id`
**Description**: Get job details

**Response**:
```typescript
{
  id: string;
  title: string;
  company: string;
  location: string;
  requiredSkills: [
    {
      name: string;
      importance: 'required' | 'preferred';
    }
  ];
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  calibration: {
    tmsWeight: number;
    srsWeight: number;
    rnsWeight: number;
  };
  status: string;
  createdAt: string;
}
```

---

#### `POST /api/jobs`
**Description**: Create job (recruiter only)

**Request Body**:
```typescript
{
  title: string;
  company: string;
  location: string;
  requiredSkills: [
    {
      name: string;
      importance: 'required' | 'preferred';
    }
  ];
  description: string;
  responsibilities?: string[];
  qualifications?: string[];
  benefits?: string[];
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  calibration?: {
    tmsWeight: number; // Default: 0.5
    srsWeight: number; // Default: 0.3
    rnsWeight: number; // Default: 0.2
  };
}
```

**Response**:
```typescript
{
  id: string;
  title: string;
  jobUrl: string; // Public job link
  createdAt: string;
}
```

---

### 3. Fit Scores

#### `GET /api/fit-scores/:candidateId/:jobId`
**Description**: Get Fit Score for candidate-job pair

**Response**:
```typescript
{
  candidateId: string;
  jobId: string;
  overall: number;
  breakdown: {
    tms: number;
    srs: number;
    rns: number;
  };
  confidence: 'high' | 'medium' | 'low';
  explanation: {
    tms: "8/10 required skills matched";
    srs: "Self-rated soft skills: 75/100";
    rns: "2 peer validations, average trust: 85";
  };
  calculatedAt: string;
}
```

---

#### `POST /api/fit-scores/recalculate/:candidateId`
**Description**: Recalculate Fit Score (triggered on new referral)

**Response**:
```typescript
{
  candidateId: string;
  previousScore: number;
  newScore: number;
  scoreChange: number;
  updatedAt: string;
}
```

---

### 4. Referrals

#### `POST /api/referrals/:token`
**Description**: Submit referral validation (public endpoint)

**Request Body**:
```typescript
{
  referrerName: string;
  referrerEmail?: string;
  relationship: 'colleague' | 'manager' | 'client' | 'other';
  yearsWorkedTogether: number;
  skills: [
    {
      name: string;
      rating: number; // 1-10
    }
  ];
  feedback?: string; // Max 500 chars
}
```

**Response**:
```typescript
{
  id: string;
  candidateId: string;
  trustScore: number; // 0-100
  newFitScore: {
    overall: number;
    rns: number; // Updated
  };
  message: "Thanks! Your validation boosted the candidate's score to 92.";
}
```

---

#### `GET /api/referrals/:candidateId`
**Description**: Get referrals for candidate

**Response**:
```typescript
{
  candidateId: string;
  referrals: [
    {
      id: string;
      referrerName: string;
      relationship: string;
      trustScore: number;
      feedback: string;
      skillsValidated: string[];
      createdAt: string;
    }
  ];
  totalReferrals: number;
  averageTrustScore: number;
}
```

---

### 5. Shortlists

#### `GET /api/shortlists`
**Description**: Get recruiter's shortlists

**Response**:
```typescript
{
  shortlists: [
    {
      id: string;
      name: string;
      jobId: string;
      candidateCount: number;
      averageScore: number;
      createdAt: string;
    }
  ];
}
```

---

#### `POST /api/shortlists`
**Description**: Create shortlist

**Request Body**:
```typescript
{
  name: string;
  jobId: string;
  candidateIds: string[];
}
```

**Response**:
```typescript
{
  id: string;
  name: string;
  shareLink: string; // For hiring managers
  createdAt: string;
}
```

---

#### `PATCH /api/shortlists/:id/candidates`
**Description**: Add/remove candidates

**Request Body**:
```typescript
{
  action: 'add' | 'remove';
  candidateIds: string[];
}
```

---

### 6. Bias Audit

#### `GET /api/bias-audit/:jobId`
**Description**: Get bias audit for job

**Response**:
```typescript
{
  jobId: string;
  totalCandidates: number;
  passThroughRates: {
    overall: number;
    byGender: {
      male: number;
      female: number;
      other: number;
    };
    byEthnicity: {
      [key: string]: number;
    };
  };
  disparityFlags: [
    {
      category: 'gender' | 'ethnicity';
      variance: number; // Percentage difference
      flagged: boolean; // >10% variance
    }
  ];
  recommendation: string;
  generatedAt: string;
}
```

---

## Server Actions (Next.js)

### Candidate Actions

```typescript
// app/actions/candidates.ts
'use server'

export async function updateCandidateStatus(
  candidateId: string,
  status: string
) {
  // Server-side logic
  return { success: true, candidateId, status };
}

export async function addToShortlist(
  candidateId: string,
  shortlistId: string
) {
  // Server-side logic
  return { success: true };
}
```

### Usage in Components

```tsx
// app/components/CandidateCard.tsx
import { updateCandidateStatus } from '@/app/actions/candidates';

export function CandidateCard({ candidate }) {
  async function handleStatusChange(status: string) {
    await updateCandidateStatus(candidate.id, status);
  }
  
  return (
    <Button onClick={() => handleStatusChange('shortlisted')}>
      Add to Shortlist
    </Button>
  );
}
```

---

## Validation Schemas (Zod)

```typescript
// lib/validations/candidate.ts
import { z } from 'zod';

export const createCandidateSchema = z.object({
  jobId: z.string().uuid(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().min(2),
  skills: z.array(
    z.object({
      name: z.string(),
      proficiency: z.number().min(1).max(10),
    })
  ).min(1),
  resumeUrl: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
});

export const createReferralSchema = z.object({
  referrerName: z.string().min(2).max(100),
  referrerEmail: z.string().email().optional(),
  relationship: z.enum(['colleague', 'manager', 'client', 'other']),
  yearsWorkedTogether: z.number().min(0).max(50),
  skills: z.array(
    z.object({
      name: z.string(),
      rating: z.number().min(1).max(10),
    })
  ).min(1),
  feedback: z.string().max(500).optional(),
});
```

---

## Error Handling

### Error Response Format

```typescript
{
  error: {
    code: string;           // 'VALIDATION_ERROR', 'NOT_FOUND', etc.
    message: string;
    details?: any;          // Validation errors, etc.
  };
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `UNAUTHORIZED` | 401 | Missing or invalid auth token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Duplicate resource |
| `RATE_LIMIT` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Internal server error |

---

## Rate Limiting

```typescript
// middleware.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "1 m"), // 100 requests per minute
});

export async function middleware(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response("Too Many Requests", { status: 429 });
  }
}
```

---

## Webhooks

### Clerk Auth Webhook

```typescript
// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix';

export async function POST(request: Request) {
  const payload = await request.json();
  const headers = request.headers;
  
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  const evt = wh.verify(JSON.stringify(payload), headers);
  
  switch (evt.type) {
    case 'user.created':
      // Create user in database
      break;
    case 'user.updated':
      // Update user in database
      break;
  }
  
  return new Response('', { status: 200 });
}
```

---

## Database Schema (Prisma)

```prisma
// prisma/schema.prisma

model Candidate {
  id          String   @id @default(uuid())
  name        String
  email       String   @unique
  phone       String?
  location    String
  role        String
  skills      Json
  resumeUrl   String?
  linkedinUrl String?
  status      String   @default("new")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  fitScores   FitScore[]
  referrals   Referral[]
  applications Application[]
}

model Job {
  id              String   @id @default(uuid())
  title           String
  company         String
  location        String
  requiredSkills  Json
  description     String   @db.Text
  calibration     Json
  status          String   @default("open")
  recruiterId     String
  createdAt       DateTime @default(now())
  
  fitScores       FitScore[]
  applications    Application[]
}

model FitScore {
  id           String   @id @default(uuid())
  candidateId  String
  jobId        String
  overall      Float
  tms          Float
  srs          Float
  rns          Float
  confidence   String
  calculatedAt DateTime @default(now())
  
  candidate    Candidate @relation(fields: [candidateId], references: [id])
  job          Job       @relation(fields: [jobId], references: [id])
  
  @@unique([candidateId, jobId])
}

model Referral {
  id           String   @id @default(uuid())
  candidateId  String
  referrerName String
  relationship String
  trustScore   Int
  feedback     String?  @db.Text
  skills       Json
  token        String   @unique
  createdAt    DateTime @default(now())
  
  candidate    Candidate @relation(fields: [candidateId], references: [id])
}
```

---

**Status**: Approved  
**Next Step**: Implement API routes in Next.js  
**Owner**: Backend Team
