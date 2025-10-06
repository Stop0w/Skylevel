import React from 'react'
import { cn } from '@/lib/utils'

interface ScorePillProps {
  score: number
  confidence?: number | 'high' | 'medium' | 'low'
  showBreakdown?: boolean
  breakdown?: {
    tms: number
    srs: number
    rns: number
  }
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const ScorePill: React.FC<ScorePillProps> = ({
  score,
  confidence = 'medium',
  showBreakdown = false,
  breakdown,
  size = 'md',
  className
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-accent-500 text-neutral-950'
    if (score >= 70) return 'bg-green-600 text-neutral-50'
    if (score >= 50) return 'bg-orange-500 text-neutral-50'
    return 'bg-red-600 text-neutral-50'
  }

  const getConfidenceIndicator = () => {
    let confidenceLevel: 'high' | 'medium' | 'low'

    if (typeof confidence === 'number') {
      if (confidence >= 85) confidenceLevel = 'high'
      else if (confidence >= 70) confidenceLevel = 'medium'
      else confidenceLevel = 'low'
    } else {
      confidenceLevel = confidence
    }

    const colors = {
      high: 'bg-green-400',
      medium: 'bg-yellow-400',
      low: 'bg-red-400'
    }
    return colors[confidenceLevel]
  }

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  return (
    <div className={cn('relative inline-flex items-center gap-2', className)}>
      <div className={cn(
        'rounded-full font-semibold flex items-center gap-2 transition-all duration-200',
        getScoreColor(score),
        sizeStyles[size]
      )}>
        <span>{score}</span>
        {confidence && (
          <div className={cn(
            'w-1.5 h-1.5 rounded-full',
            getConfidenceIndicator()
          )} />
        )}
      </div>

      {showBreakdown && breakdown && (
        <div className="absolute top-full mt-2 bg-neutral-900 border border-neutral-700 rounded-lg p-3 z-10 whitespace-nowrap shadow-xl">
          <div className="text-xs space-y-1">
            <div className="flex justify-between gap-4">
              <span className="text-neutral-400">TMS:</span>
              <span className="text-neutral-50 font-medium">{breakdown.tms}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-neutral-400">SRS:</span>
              <span className="text-neutral-50 font-medium">{breakdown.srs}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-neutral-400">RNS:</span>
              <span className="text-neutral-50 font-medium">{breakdown.rns}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}