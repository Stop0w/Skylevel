'use client'

import React from 'react'
import { cn } from '../../lib/utils'

interface ScorePillProps {
  score: number
  confidence?: 'high' | 'medium' | 'low' | number
  showBreakdown?: boolean
  size?: 'sm' | 'md' | 'lg'
  breakdown?: {
    tms: number
    srs: number
    rns: number
  }
}

export const ScorePill = React.memo(function ScorePill({
  score,
  confidence,
  showBreakdown = false,
  size = 'md',
  breakdown
}: ScorePillProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-accent-400 text-accent-900'
    if (score >= 70) return 'bg-green-500 text-white'
    if (score >= 50) return 'bg-orange-500 text-white'
    return 'bg-red-500 text-white'
  }

  const getConfidenceLevel = (confidence?: 'high' | 'medium' | 'low' | number): 'high' | 'medium' | 'low' | null => {
    if (!confidence) return null
    if (typeof confidence === 'string') return confidence
    if (confidence >= 80) return 'high'
    if (confidence >= 60) return 'medium'
    return 'low'
  }

  const getConfidenceIndicator = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return (
          <div className="flex items-center gap-0.5">
            <div className="w-1 h-1 rounded-full bg-white" />
            <div className="w-1 h-1 rounded-full bg-white" />
            <div className="w-1 h-1 rounded-full bg-white" />
          </div>
        )
      case 'medium':
        return (
          <div className="flex items-center gap-0.5">
            <div className="w-1 h-1 rounded-full bg-white" />
            <div className="w-1 h-1 rounded-full bg-white" />
            <div className="w-1 h-1 rounded-full bg-white/40" />
          </div>
        )
      case 'low':
        return (
          <div className="flex items-center gap-0.5">
            <div className="w-1 h-1 rounded-full bg-white" />
            <div className="w-1 h-1 rounded-full bg-white/40" />
            <div className="w-1 h-1 rounded-full bg-white/40" />
          </div>
        )
    }
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs font-semibold',
    md: 'px-3 py-1.5 text-sm font-semibold',
    lg: 'px-4 py-2 text-base font-semibold'
  }

  const confidenceLevel = getConfidenceLevel(confidence)

  return (
    <div className="relative inline-block group">
      <div
        className={cn(
          'rounded-full flex items-center gap-2 transition-colors',
          getScoreColor(score),
          sizeClasses[size]
        )}
      >
        <span>{score.toFixed(0)}</span>
        {confidenceLevel && getConfidenceIndicator(confidenceLevel)}
      </div>

      {showBreakdown && breakdown && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-neutral-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="font-semibold mb-2">Fit Score Breakdown</div>
          <div className="space-y-1">
            <div className="flex justify-between gap-4">
              <span>Technical Match:</span>
              <span>{breakdown.tms.toFixed(0)}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Soft Skills:</span>
              <span>{breakdown.srs.toFixed(0)}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Referral Network:</span>
              <span>{breakdown.rns.toFixed(0)}%</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t border-neutral-700">
              <span>Overall:</span>
              <span className="font-bold">{score.toFixed(0)}%</span>
            </div>
            {confidenceLevel && (
              <div className="flex justify-between gap-4 pt-1 border-t border-neutral-700">
                <span>Confidence:</span>
                <span className="capitalize">{confidenceLevel}</span>
              </div>
            )}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900"></div>
        </div>
      )}
    </div>
  )
})