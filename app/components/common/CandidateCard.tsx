import React from 'react'
import { ScorePill } from './ScorePill'
import { cn } from '../../lib/utils'

interface CandidateCardProps {
  candidate: {
    id: string
    name: string
    headline?: string
    location?: string
    skills: string[]
    fitScore?: number
    confidence?: 'high' | 'medium' | 'low' | number
    breakdown?: {
      tms: number
      srs: number
      rns: number
    }
  }
  onSelect?: (candidateId: string) => void
  size?: 'sm' | 'md' | 'lg'
  showScoreDetails?: boolean
}

export const CandidateCard = React.memo(function CandidateCard({
  candidate,
  onSelect,
  size = 'md',
  showScoreDetails = true
}: CandidateCardProps) {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }

  const titleSizeClasses = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-semibold',
    lg: 'text-lg font-semibold'
  }

  return (
    <div
      className={cn(
        'bg-white border border-neutral-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer',
        sizeClasses[size]
      )}
      onClick={() => onSelect?.(candidate.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={cn('text-neutral-900', titleSizeClasses[size])}>
            {candidate.name}
          </h3>
          {candidate.headline && (
            <p className="text-sm text-neutral-600 mt-1">{candidate.headline}</p>
          )}
          {candidate.location && (
            <p className="text-xs text-neutral-500 mt-1">{candidate.location}</p>
          )}
        </div>

        {showScoreDetails && candidate.fitScore !== undefined && (
          <ScorePill
            score={candidate.fitScore}
            confidence={candidate.confidence}
            showBreakdown={showScoreDetails}
            size="sm"
            breakdown={candidate.breakdown}
          />
        )}
      </div>

      {candidate.skills.length > 0 && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, size === 'sm' ? 3 : size === 'md' ? 5 : 8).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {candidate.skills.length > (size === 'sm' ? 3 : size === 'md' ? 5 : 8) && (
              <span className="px-2 py-1 bg-neutral-100 text-neutral-500 text-xs rounded-full">
                +{candidate.skills.length - (size === 'sm' ? 3 : size === 'md' ? 5 : 8)} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
})