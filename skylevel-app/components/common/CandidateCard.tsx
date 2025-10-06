'use client';

import React, { useState } from 'react';
import { User, MapPin, Briefcase, ExternalLink, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ScorePill from './ScorePill';
import { cn } from '@/lib/utils';

interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  experience?: string;
  linkedinUrl?: string;
  avatar?: string;
}

interface ScoreBreakdown {
  tms: number;
  srs: number;
  rns: number;
}

interface CandidateCardProps {
  candidate: Candidate;
  score: number;
  breakdown?: ScoreBreakdown;
  confidence?: 'high' | 'medium' | 'low';
  size?: 'sm' | 'md' | 'lg';
  onViewProfile?: (candidateId: string) => void;
  onAddToShortlist?: (candidateId: string) => void;
  showActions?: boolean;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
}

/**
 * CandidateCard - Core component for displaying candidate information
 *
 * Features:
 * - Candidate name, title, and location
 * - Embedded ScorePill component
 * - Skills array display with proper truncation
 * - Quick action buttons (View Profile, Add to Shortlist)
 * - Hover states and micro-interactions
 * - Responsive design
 */
const CandidateCard = React.memo<CandidateCardProps>(({
  candidate,
  score,
  breakdown,
  confidence = 'medium',
  size = 'md',
  onViewProfile,
  onAddToShortlist,
  showActions = true,
  className,
  variant = 'default'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Handle view profile action
  const handleViewProfile = () => {
    onViewProfile?.(candidate.id);
  };

  // Handle add to shortlist action
  const handleAddToShortlist = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onAddToShortlist?.(candidate.id);
  };

  // Truncate skills for display
  const getDisplaySkills = (skills: string[], maxCount: number = 5) => {
    if (skills.length <= maxCount) return skills;
    return [...skills.slice(0, maxCount), `+${skills.length - maxCount}`];
  };

  // Get size-specific styling
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          card: 'p-4',
          title: 'text-sm font-semibold',
          description: 'text-xs',
          skills: 'text-xs',
          scoreSize: 'sm'
        };
      case 'lg':
        return {
          card: 'p-6',
          title: 'text-lg font-semibold',
          description: 'text-base',
          skills: 'text-sm',
          scoreSize: 'lg'
        };
      default: // 'md'
        return {
          card: 'p-5',
          title: 'text-base font-semibold',
          description: 'text-sm',
          skills: 'text-sm',
          scoreSize: 'md'
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const displaySkills = getDisplaySkills(candidate.skills);

  // Compact variant (for tight spaces)
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'flex items-center justify-between p-3 rounded-lg border border-neutral-200 bg-white hover:border-skylevel-300 hover:shadow-sm transition-all duration-200 cursor-pointer',
          isHovered && 'border-skylevel-400 shadow-md',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleViewProfile}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-skylevel-100 flex items-center justify-center">
            <User className="w-4 h-4 text-skylevel-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className={cn('truncate text-neutral-900', sizeStyles.title)}>
                {candidate.name}
              </h3>
              <ScorePill score={score} size="sm" />
            </div>
            <p className={cn('text-neutral-600 truncate', sizeStyles.description)}>
              {candidate.title}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleAddToShortlist}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  // Default and detailed variants
  return (
    <Card
      className={cn(
        'relative cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        isHovered && 'border-skylevel-300',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewProfile}
    >
      <CardHeader className={cn('pb-3', sizeStyles.card)}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {candidate.avatar ? (
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-neutral-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-skylevel-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-skylevel-600" />
                </div>
              )}
            </div>

            {/* Candidate Info */}
            <div className="flex-1 min-w-0">
              <CardTitle className={cn('text-neutral-900 truncate', sizeStyles.title)}>
                {candidate.name}
              </CardTitle>
              <CardDescription className={cn('text-neutral-600', sizeStyles.description)}>
                {candidate.title}
              </CardDescription>

              {/* Location */}
              <div className="flex items-center text-neutral-500 mt-1">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="text-xs truncate">{candidate.location}</span>
              </div>
            </div>
          </div>

          {/* Score Pill */}
          <div className="flex-shrink-0 ml-3">
            <ScorePill
              score={score}
              size={sizeStyles.scoreSize as 'sm' | 'md' | 'lg'}
              showBreakdown={!!breakdown}
              breakdown={breakdown}
              confidence={confidence}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className={cn('pt-0', sizeStyles.card)}>
        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {displaySkills.map((skill, index) => (
              <span
                key={index}
                className={cn(
                  'px-2 py-1 rounded-md text-xs font-medium',
                  skill.startsWith('+')
                    ? 'bg-neutral-100 text-neutral-600'
                    : 'bg-skylevel-50 text-skylevel-700 border border-skylevel-200'
                )}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience (detailed variant only) */}
        {variant === 'detailed' && candidate.experience && (
          <div className="mb-4">
            <div className="flex items-center text-neutral-600 text-sm">
              <Briefcase className="w-4 h-4 mr-2" />
              <span>{candidate.experience}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              className="flex-1 bg-skylevel-600 hover:bg-skylevel-700"
              onClick={(e) => {
                e.stopPropagation();
                handleViewProfile();
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Profile
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-skylevel-200 text-skylevel-700 hover:bg-skylevel-50"
              onClick={handleAddToShortlist}
            >
              <Plus className="w-4 h-4 mr-1" />
              Shortlist
            </Button>
          </div>
        )}

        {/* Hover Overlay Indicator */}
        {isHovered && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-skylevel-500 rounded-full animate-pulse" />
          </div>
        )}
      </CardContent>
    </Card>
  );
});

CandidateCard.displayName = 'CandidateCard';

export default CandidateCard;