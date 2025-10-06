/**
 * Common Components - Core Skylevel UI Components
 *
 * This barrel export file provides clean imports for all shared components
 * used across the Skylevel application.
 *
 * Usage:
 * ```tsx
 * import { ScorePill, CandidateCard, JobCard } from '@/components/common';
 * ```
 */

export { default as ScorePill } from './ScorePill';
export { default as CandidateCard } from './CandidateCard';
export { default as JobCard } from './JobCard';

// Export types for TypeScript users
export type { default as ScorePillProps } from './ScorePill';
export type { default as CandidateCardProps } from './CandidateCard';
export type { default as JobCardProps } from './JobCard';