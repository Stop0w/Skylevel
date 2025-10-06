'use client'

import React, { useState } from 'react'
import { mockCandidates } from '@/data/mockData'
import { ScorePill } from '@/components/common/ScorePill'
import { CandidateCard } from '@/components/common/CandidateCard'

export const TerritoryAFitQueue: React.FC = () => {
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
      {/* Bold Header */}
      <header className="border-b-2 border-primary-600 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-primary-600 mb-2">
                FIT QUEUE - DECISION TIME
              </h1>
              <p className="text-neutral-300 text-lg">
                {filteredCandidates.length} CANDIDATES AWAITING YOUR REVIEW
              </p>
            </div>
            <button className="px-8 py-4 bg-accent-500 text-neutral-950 font-black text-lg rounded-lg hover:bg-accent-400 transition-all transform hover:scale-105 shadow-xl border-2 border-accent-400">
              BULK ACTIONS
            </button>
          </div>
        </div>
      </header>

      {/* Bold Filters */}
      <div className="bg-neutral-900 border-b-2 border-neutral-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <span className="font-black text-neutral-400">FILTER BY SCORE:</span>
            {(['all', 'high', 'medium', 'low'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-6 py-3 font-bold rounded-lg transition-all ${
                  filter === filterType
                    ? 'bg-primary-600 text-neutral-50 border-2 border-primary-500'
                    : 'bg-neutral-800 text-neutral-400 border-2 border-neutral-700 hover:border-primary-500'
                }`}
              >
                {filterType.toUpperCase()}
                {filterType !== 'all' && (
                  <span className="ml-2 px-2 py-1 bg-neutral-700 rounded text-xs">
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

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Candidate Cards with Bold Actions */}
        <div className="space-y-6">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-neutral-900 border-2 border-neutral-700 rounded-xl hover:border-primary-500 transition-all"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-neutral-50 text-2xl font-black">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-2xl font-black text-neutral-50">
                          {candidate.name}
                        </h3>
                        <span className={`px-4 py-2 text-sm font-bold rounded-lg border-2 ${
                          candidate.status === 'new' ? 'bg-blue-500/20 text-blue-400 border-blue-500' :
                          candidate.status === 'reviewing' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' :
                          candidate.status === 'shortlisted' ? 'bg-green-500/20 text-green-400 border-green-500' :
                          'bg-red-500/20 text-red-400 border-red-500'
                        }`}>
                          {candidate.status.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-neutral-300 font-semibold text-lg mb-2">
                        {candidate.title}
                      </p>
                      <p className="text-neutral-500 mb-4">
                        {candidate.experience}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-600/20 text-primary-400 text-sm font-bold rounded border border-primary-500/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-6">
                    <ScorePill
                      score={candidate.score}
                      breakdown={candidate.breakdown}
                      showBreakdown={true}
                      size="lg"
                    />

                    <div className="flex flex-col gap-3">
                      <button className="px-6 py-3 bg-primary-600 text-neutral-50 font-bold rounded-lg hover:bg-primary-700 transition-all">
                        VIEW PROFILE
                      </button>
                      <button
                        onClick={() => handleStatusChange(candidate.id, 'shortlisted')}
                        className="px-6 py-3 bg-accent-500 text-neutral-950 font-bold rounded-lg hover:bg-accent-400 transition-all"
                      >
                        SHORTLIST
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bold Action Bar */}
              <div className="bg-neutral-800 border-t-2 border-neutral-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-neutral-700 text-neutral-300 font-bold rounded hover:bg-neutral-600 transition-all">
                      MESSAGE
                    </button>
                    <button className="px-4 py-2 bg-neutral-700 text-neutral-300 font-bold rounded hover:bg-neutral-600 transition-all">
                      SCHEDULE INTERVIEW
                    </button>
                    <button className="px-4 py-2 bg-neutral-700 text-neutral-300 font-bold rounded hover:bg-neutral-600 transition-all">
                      SHARE TEAM
                    </button>
                  </div>
                  <button
                    onClick={() => handleStatusChange(candidate.id, 'rejected')}
                    className="px-6 py-2 bg-red-600/20 text-red-400 font-bold rounded border-2 border-red-500/30 hover:bg-red-600/30 transition-all"
                  >
                    PASS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}