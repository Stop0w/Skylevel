import React from 'react'
import { ScorePill } from './ScorePill'
import { cn } from '@/lib/utils'

interface CandidateCardProps {
  candidate: {
    id: string
    name: string
    title: string
    experience: string
    skills: string[]
    score: number
    breakdown?: {
      tms: number
      srs: number
      rns: number
    }
    status: 'new' | 'reviewing' | 'shortlisted' | 'rejected'
    avatar?: string
  }
  variant?: 'default' | 'compact' | 'detailed'
  onClick?: () => void
  className?: string
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  variant = 'default',
  onClick,
  className
}) => {
  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      reviewing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      shortlisted: 'bg-green-500/20 text-green-400 border-green-500/30',
      rejected: 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return colors[status as keyof typeof colors] || colors.new
  }

  const baseContent = (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4 flex-1">
        <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-300 font-semibold">
          {candidate.name.split(' ').map(n => n[0]).join('')}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-neutral-50 truncate">
              {candidate.name}
            </h3>
            <span className={cn(
              'px-2 py-0.5 text-xs rounded-full border',
              getStatusColor(candidate.status)
            )}>
              {candidate.status}
            </span>
          </div>

          <p className="text-neutral-400 text-sm mb-2">{candidate.title}</p>
          <p className="text-neutral-500 text-xs mb-3">{candidate.experience}</p>

          {variant !== 'compact' && (
            <div className="flex flex-wrap gap-1 mb-3">
              {candidate.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded"
                >
                  {skill}
                </span>
              ))}
              {candidate.skills.length > 4 && (
                <span className="px-2 py-1 bg-neutral-800 text-neutral-500 text-xs rounded">
                  +{candidate.skills.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <ScorePill
          score={candidate.score}
          breakdown={candidate.breakdown}
          showBreakdown={variant === 'detailed'}
          size={variant === 'compact' ? 'sm' : 'md'}
        />
      </div>
    </div>
  )

  if (variant === 'compact') {
    return (
      <div
        onClick={onClick}
        className={cn(
          'p-3 bg-neutral-900/50 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-all cursor-pointer',
          className
        )}
      >
        {baseContent}
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-all cursor-pointer',
        variant === 'detailed' && 'p-6',
        className
      )}
    >
      {baseContent}
    </div>
  )
}