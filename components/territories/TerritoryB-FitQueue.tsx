'use client'

import React, { useState } from 'react'
import { mockCandidates } from '@/data/mockData'
import { ScorePill } from '@/components/common/ScorePill'
import { CandidateCard } from '@/components/common/CandidateCard'

export const TerritoryBFitQueue: React.FC = () => {
  const [candidates, setCandidates] = useState(mockCandidates)
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')

  const filteredCandidates = candidates.filter(candidate => {
    if (filter === 'all') return true
    if (filter === 'high') return candidate.score >= 85
    if (filter === 'medium') return candidate.score >= 70 && candidate.score < 85
    if (filter === 'low') return candidate.score < 70
    return true
  })

  const handleStatusChange = (candidateId: string, newStatus: string) => {
    setCandidates(prev => prev.map(c =>
      c.id === candidateId ? { ...c, status: newStatus as any } : c
    ))
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Minimal Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-2xl font-light text-neutral-50 tracking-wide">
                Candidate Review Queue
              </h1>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl">
                {filteredCandidates.length} candidates are awaiting your thoughtful review.
                Take your time to consider each profile carefully.
              </p>
            </div>
            <button className="px-6 py-3 bg-neutral-800 text-neutral-300 font-medium rounded-lg
                           hover:bg-neutral-700 transition-colors duration-300 border border-neutral-700">
              Export List
            </button>
          </div>
        </div>
      </header>

      {/* Thoughtful Filters */}
      <div className="bg-neutral-900/20 border-b border-neutral-800/50">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center gap-6">
            <span className="text-neutral-500 text-sm">Filter by confidence level:</span>
            {(['all', 'high', 'medium', 'low'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-5 py-2 text-sm font-light rounded-lg transition-colors duration-300 ${
                  filter === filterType
                    ? 'bg-neutral-800 text-neutral-300 border border-neutral-600'
                    : 'bg-neutral-900/50 text-neutral-500 border border-neutral-800 hover:text-neutral-400'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                {filterType !== 'all' && (
                  <span className="ml-2 px-2 py-0.5 bg-neutral-800/50 rounded text-xs">
                    {candidates.filter(c => {
                      if (filterType === 'high') return c.score >= 85
                      if (filterType === 'medium') return c.score >= 70 && c.score < 85
                      if (filterType === 'low') return c.score < 70
                      return true
                    }).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Calm Candidate Cards */}
        <div className="space-y-8">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-neutral-900/20 border border-neutral-800/50 rounded-xl
                       hover:border-neutral-700/50 transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8 flex-1">
                    <div className="w-16 h-16 bg-neutral-800/50 rounded-full flex items-center justify-center
                                   text-neutral-300 text-lg font-light">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-4">
                        <h3 className="text-xl font-light text-neutral-50">
                          {candidate.name}
                        </h3>
                        <span className={`px-3 py-1 text-xs font-light rounded border ${
                          candidate.status === 'new' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                          candidate.status === 'reviewing' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                          candidate.status === 'shortlisted' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                          'bg-red-500/10 text-red-400 border-red-500/30'
                        }`}>
                          {candidate.status}
                        </span>
                      </div>

                      <p className="text-neutral-400 text-sm">
                        {candidate.title}
                      </p>
                      <p className="text-neutral-500 text-sm">
                        {candidate.experience}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-neutral-800/30 text-neutral-400 text-xs
                                       font-light rounded border border-neutral-700/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-6">
                    <div className="space-y-2">
                      <ScorePill
                        score={candidate.score}
                        breakdown={candidate.breakdown}
                        showBreakdown={false}
                        size="md"
                      />
                      <p className="text-neutral-500 text-xs text-center">
                        Click to view breakdown
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button className="px-5 py-2 bg-neutral-800 text-neutral-300 font-light
                                     rounded-lg hover:bg-neutral-700 transition-colors duration-300 text-sm">
                        View Full Profile
                      </button>
                      <button
                        onClick={() => handleStatusChange(candidate.id, 'shortlisted')}
                        className="px-5 py-2 bg-neutral-800/50 text-neutral-300 font-light
                                     rounded-lg hover:bg-neutral-700/50 transition-colors duration-300 text-sm"
                      >
                        Consider for Shortlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle Action Bar */}
              <div className="bg-neutral-900/10 border-t border-neutral-800/30 px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <button className="px-4 py-1.5 text-neutral-500 text-sm font-light
                                     hover:text-neutral-300 transition-colors duration-300">
                      Send Message
                    </button>
                    <button className="px-4 py-1.5 text-neutral-500 text-sm font-light
                                     hover:text-neutral-300 transition-colors duration-300">
                      Schedule Interview
                    </button>
                    <button className="px-4 py-1.5 text-neutral-500 text-sm font-light
                                     hover:text-neutral-300 transition-colors duration-300">
                      Share with Team
                    </button>
                  </div>
                  <button
                    onClick={() => handleStatusChange(candidate.id, 'rejected')}
                    className="px-4 py-1.5 text-neutral-600 text-sm font-light
                                     hover:text-neutral-400 transition-colors duration-300"
                  >
                    Pass on Candidate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Thoughtful Footer */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-neutral-500 text-sm">
            Take your time to review each candidate thoughtfully.
          </p>
          <p className="text-neutral-600 text-xs">
            The right match is worth the wait.
          </p>
        </div>
      </main>
    </div>
  )
}