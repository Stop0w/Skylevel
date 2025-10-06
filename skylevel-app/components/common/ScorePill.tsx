'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface ScoreBreakdown {
  tms: number;  // Technical Match Score (0-100)
  srs: number;  // Soft Skills Rating (0-100)
  rns: number;  // Referral Network Score (0-100)
}

interface ScorePillProps {
  score: number;                    // Overall Fit Score (0-100)
  size?: 'sm' | 'md' | 'lg';       // Display size
  showBreakdown?: boolean;         // Show detailed breakdown tooltip
  breakdown?: ScoreBreakdown;       // Score component breakdown
  confidence?: 'high' | 'medium' | 'low'; // Confidence level
  className?: string;               // Additional CSS classes
}

/**
 * ScorePill - The most critical UI component in Skylevel
 *
 * Displays Fit Scores consistently across the entire application with:
 * - Color-coded score ranges (85+ gold, 70+ green, 50+ orange, <50 red)
 * - Confidence level indicators
 * - Detailed breakdown tooltips (TMS, SRS, RNS)
 * - Performance optimized with React.memo
 *
 * Used in 15+ components throughout the app.
 */
const ScorePill = React.memo<ScorePillProps>(({
  score,
  size = 'md',
  showBreakdown = false,
  breakdown,
  confidence = 'medium',
  className
}) => {
  // Validate score range
  if (score < 0 || score > 100) {
    console.warn(`ScorePill: Invalid score ${score}. Must be between 0-100.`);
    score = Math.max(0, Math.min(100, score));
  }

  // Determine score color based on ranges
  const getScoreColor = (score: number): string => {
    if (score >= 85) return 'bg-gold-500 text-white';        // Gold for excellent scores
    if (score >= 70) return 'bg-success-500 text-white';     // Green for good scores
    if (score >= 50) return 'bg-coral-500 text-white';      // Orange for average scores
    return 'bg-neutral-600 text-white';                     // Gray for poor scores
  };

  // Get size-specific styling
  const getSizeStyles = (): string => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs font-medium';
      case 'lg':
        return 'px-4 py-3 text-lg font-semibold';
      default: // 'md'
        return 'px-3 py-2 text-sm font-medium';
    }
  };

  // Get confidence indicator
  const getConfidenceIndicator = (): string => {
    switch (confidence) {
      case 'high':
        return '●'; // Solid circle
      case 'low':
        return '○'; // Empty circle
      default: // 'medium'
        return '◐'; // Half circle
    }
  };

  // Format score with confidence indicator
  const formatScore = (): string => {
    const indicator = showBreakdown ? getConfidenceIndicator() : '';
    return `${score}${indicator}`;
  };

  // Generate tooltip content for score breakdown
  const getTooltipContent = (): React.ReactNode => {
    if (!showBreakdown || !breakdown) return null;

    return (
      <div className="space-y-2 text-sm">
        <div className="font-semibold text-neutral-900 mb-2">
          Fit Score Breakdown
        </div>

        <div className="flex justify-between items-center">
          <span className="text-neutral-700">Technical Match (TMS)</span>
          <span className="font-medium text-neutral-900">{breakdown.tms}%</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-neutral-700">Soft Skills (SRS)</span>
          <span className="font-medium text-neutral-900">{breakdown.srs}%</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-neutral-700">Referral Network (RNS)</span>
          <span className="font-medium text-neutral-900">{breakdown.rns}%</span>
        </div>

        <div className="pt-2 mt-2 border-t border-neutral-200">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-neutral-900">Overall Score</span>
            <span className="font-bold text-lg text-neutral-900">{score}%</span>
          </div>
        </div>

        <div className="pt-1 text-xs text-neutral-500">
          Confidence: {confidence.charAt(0).toUpperCase() + confidence.slice(1)}
        </div>
      </div>
    );
  };

  const baseStyles = `
    inline-flex items-center justify-center
    rounded-full font-mono font-semibold
    transition-all duration-200
    hover:scale-105 active:scale-95
    shadow-sm hover:shadow-md
  `;

  const scorePill = (
    <div
      className={cn(
        baseStyles,
        getScoreColor(score),
        getSizeStyles(),
        className
      )}
      role="img"
      aria-label={`Fit Score: ${score}%${confidence ? `, Confidence: ${confidence}` : ''}`}
    >
      {formatScore()}
    </div>
  );

  // Wrap in tooltip if breakdown is enabled
  if (showBreakdown && breakdown) {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            {scorePill}
          </TooltipTrigger>
          <TooltipContent className="bg-white border border-neutral-200 shadow-lg">
            {getTooltipContent()}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return scorePill;
});

// Set display name for debugging
ScorePill.displayName = 'ScorePill';

export default ScorePill;