'use client'

import React, { useState, useMemo } from 'react'
import { CandidateCard } from '@/components/common/CandidateCard'
import { ScorePill } from '@/components/common/ScorePill'
import { mockCandidates } from '@/lib/mockData'
import { cn } from '@/lib/utils'

export default function TerritoryBFitQueue() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [filterScore, setFilterScore] = useState<number>(0)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(candidate => {
      const scoreMatch = candidate.score >= filterScore
      const statusMatch = filterStatus === 'all' || candidate.status === filterStatus
      return scoreMatch && statusMatch
    })
  }, [filterScore, filterStatus])

  const averageScore = useMemo(() => {
    return Math.round(filteredCandidates.reduce((sum, c) => sum + c.score, 0) / filteredCandidates.length)
  }, [filteredCandidates])

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Header */}
      <div className="border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light text-neutral-50 mb-2">Fit Queue</h1>
              <p className="text-neutral-400 font-light">
                {filteredCandidates.length} candidates • Average score: {averageScore}
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-sm text-neutral-500 font-light">Contemplative Review</p>
                <p className="text-2xl font-light text-accent-400">Territory B</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-12">
            <div className="space-y-2">
              <label className="text-sm text-neutral-500 font-light">Minimum Score</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filterScore}
                  onChange={(e) => setFilterScore(Number(e.target.value))}
                  className="w-32 accent-accent-400"
                />
                <ScorePill score={filterScore} size="sm" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-500 font-light">Status</label>
              <div className="flex gap-3">
                {['all', 'new', 'reviewing', 'shortlisted'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={cn(
                      'px-4 py-2 text-sm font-light rounded-full border transition-all-300',
                      filterStatus === status
                        ? 'bg-accent-400/20 border-accent-400/50 text-accent-400'
                        : 'bg-neutral-900/30 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    )}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Candidate List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-8">
              <h2 className="text-xl font-light text-neutral-50 mb-2">Candidates for Review</h2>
              <p className="text-neutral-500 font-light text-sm">
                Take your time to thoughtfully consider each candidate
              </p>
            </div>

            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  onClick={() => setSelectedCandidate(candidate.id)}
                  className={cn(
                    'transition-all-300 cursor-pointer',
                    selectedCandidate === candidate.id && 'ring-2 ring-accent-400/30'
                  )}
                >
                  <CandidateCard
                    candidate={candidate}
                    variant="default"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Contemplative Sidebar */}
          <div className="space-y-8">
            {/* Selected Candidate Preview */}
            {selectedCandidate && (
              <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
                <h3 className="text-lg font-light text-neutral-50 mb-6">Selected Candidate</h3>
                {(() => {
                  const candidate = mockCandidates.find(c => c.id === selectedCandidate)
                  if (!candidate) return null

                  return (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center text-2xl font-light text-neutral-300 mx-auto mb-4">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h4 className="text-xl font-light text-neutral-50">{candidate.name}</h4>
                        <p className="text-neutral-400 font-light mt-1">{candidate.title}</p>
                        <div className="mt-4">
                          <ScorePill
                            score={candidate.score}
                            breakdown={candidate.breakdown}
                            showBreakdown={true}
                            size="lg"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-neutral-500 font-light mb-2">Experience</p>
                          <p className="text-neutral-300 font-light">{candidate.experience}</p>
                        </div>

                        <div>
                          <p className="text-sm text-neutral-500 font-light mb-2">Key Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.slice(0, 3).map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-neutral-800 text-neutral-300 text-sm rounded-full font-light"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-neutral-800">
                        <button className="w-full py-3 bg-accent-400/10 border border-accent-400/30 text-accent-400 rounded-lg font-light hover:bg-accent-400/20 transition-all-300">
                          View Full Profile
                        </button>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}

            {/* Contemplative Quote */}
            <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
              <h3 className="text-lg font-light text-neutral-50 mb-4">Reflection</h3>
              <blockquote className="text-neutral-400 font-light italic leading-relaxed">
                "The best hiring decisions are made not in haste, but in thoughtful consideration of both skills and human potential."
              </blockquote>
              <p className="text-sm text-neutral-500 font-light mt-4">— Stoic Philosophy Applied to Recruitment</p>
            </div>

            {/* Quick Stats */}
            <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
              <h3 className="text-lg font-light text-neutral-50 mb-6">Queue Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400 font-light">Total Candidates</span>
                  <span className="text-neutral-50 font-light">{filteredCandidates.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400 font-light">High Scores (85+)</span>
                  <span className="text-accent-400 font-light">
                    {filteredCandidates.filter(c => c.score >= 85).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400 font-light">New Applications</span>
                  <span className="text-blue-400 font-light">
                    {filteredCandidates.filter(c => c.status === 'new').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400 font-light">Shortlisted</span>
                  <span className="text-green-400 font-light">
                    {filteredCandidates.filter(c => c.status === 'shortlisted').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}