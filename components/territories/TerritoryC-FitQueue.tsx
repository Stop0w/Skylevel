'use client'

import React, { useState } from 'react'
import { mockCandidates } from '@/data/mockData'
import { ScorePill } from '@/components/common/ScorePill'
import { CandidateCard } from '@/components/common/CandidateCard'

export const TerritoryCFitQueue: React.FC = () => {
  const [candidates, setCandidates] = useState(mockCandidates)
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])

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

  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    )
  }

  const bulkAction = (action: string) => {
    selectedCandidates.forEach(candidateId => {
      handleStatusChange(candidateId, action)
    })
    setSelectedCandidates([])
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Dense Header */}
      <header className="border-b border-neutral-800 bg-neutral-900">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-neutral-50">
                Fit Queue Management
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-neutral-400">
                  {filteredCandidates.length} candidates
                </span>
                <span className="text-xs text-neutral-600">•</span>
                <span className="text-xs text-neutral-400">
                  {selectedCandidates.length} selected
                </span>
                <span className="text-xs text-neutral-600">•</span>
                <span className="text-xs text-neutral-400">
                  Filter: {filter}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedCandidates.length > 0 && (
                <>
                  <button
                    onClick={() => bulkAction('shortlisted')}
                    className="px-2 py-1 bg-green-600 text-neutral-50 text-xs font-medium rounded hover:bg-green-700"
                  >
                    Shortlist ({selectedCandidates.length})
                  </button>
                  <button
                    onClick={() => bulkAction('rejected')}
                    className="px-2 py-1 bg-red-600 text-neutral-50 text-xs font-medium rounded hover:bg-red-700"
                  >
                    Reject ({selectedCandidates.length})
                  </button>
                </>
              )}
              <button className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs font-medium rounded hover:bg-neutral-700">
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Compact Filters */}
      <div className="bg-neutral-900/50 border-b border-neutral-800">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500">Score:</span>
            {(['all', 'high', 'medium', 'low'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  filter === filterType
                    ? 'bg-primary-600 text-neutral-50'
                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                }`}
              >
                {filterType.toUpperCase()}
                {filterType !== 'all' && (
                  <span className="ml-1 px-1 py-0.5 bg-neutral-700 rounded text-xs">
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
            <div className="ml-auto flex items-center gap-2">
              <button className="text-xs text-neutral-400 hover:text-neutral-300">Sort by Score</button>
              <button className="text-xs text-neutral-400 hover:text-neutral-300">Sort by Name</button>
              <button className="text-xs text-neutral-400 hover:text-neutral-300">Sort by Status</button>
            </div>
          </div>
        </div>
      </div>

      <main className="px-4 py-3">
        {/* Data-Dense Table */}
        <div className="bg-neutral-900 border border-neutral-800 rounded">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-neutral-800/50 text-xs text-neutral-400 font-medium border-b border-neutral-800">
            <div className="col-span-1 flex items-center gap-1">
              <input
                type="checkbox"
                checked={selectedCandidates.length === filteredCandidates.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCandidates(filteredCandidates.map(c => c.id))
                  } else {
                    setSelectedCandidates([])
                  }
                }}
                className="w-3 h-3 rounded border-neutral-600 bg-neutral-700 text-primary-600"
              />
              <span>Name</span>
            </div>
            <div className="col-span-2">Title</div>
            <div className="col-span-2">Skills</div>
            <div className="col-span-1">Exp</div>
            <div className="col-span-1">TMS</div>
            <div className="col-span-1">SRS</div>
            <div className="col-span-1">RNS</div>
            <div className="col-span-1">Score</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Dense Table Rows */}
          <div className="divide-y divide-neutral-800">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className={`grid grid-cols-12 gap-2 px-3 py-2 hover:bg-neutral-800/30 ${
                  selectedCandidates.includes(candidate.id) ? 'bg-neutral-800/20' : ''
                }`}
              >
                <div className="col-span-1 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.id)}
                    onChange={() => toggleCandidateSelection(candidate.id)}
                    className="w-3 h-3 rounded border-neutral-600 bg-neutral-700 text-primary-600"
                  />
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center text-neutral-50 text-xs font-medium">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-xs text-neutral-50 truncate max-w-[60px]">
                      {candidate.name.split(' ')[0]}
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-xs text-neutral-400 truncate">{candidate.title}</span>
                </div>
                <div className="col-span-2">
                  <div className="flex gap-1">
                    {candidate.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-1 py-0.5 bg-neutral-800 text-neutral-400 text-xs rounded">
                        {skill.slice(0, 3)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-1">
                  <span className="text-xs text-neutral-500">{candidate.experience.split(' ')[0]}</span>
                </div>
                <div className="col-span-1">
                  <span className="text-xs text-neutral-400">{candidate.breakdown?.tms}</span>
                </div>
                <div className="col-span-1">
                  <span className="text-xs text-neutral-400">{candidate.breakdown?.srs}</span>
                </div>
                <div className="col-span-1">
                  <span className="text-xs text-neutral-400">{candidate.breakdown?.rns}</span>
                </div>
                <div className="col-span-1">
                  <ScorePill score={candidate.score} size="sm" />
                </div>
                <div className="col-span-1">
                  <select
                    value={candidate.status}
                    onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                    className="px-1.5 py-0.5 bg-neutral-800 text-xs rounded border border-neutral-700 text-neutral-300"
                  >
                    <option value="new">New</option>
                    <option value="reviewing">Review</option>
                    <option value="shortlisted">Short</option>
                    <option value="rejected">Reject</option>
                  </select>
                </div>
                <div className="col-span-1 flex gap-1">
                  <button className="px-1.5 py-0.5 bg-primary-600 text-neutral-50 text-xs rounded hover:bg-primary-700">
                    V
                  </button>
                  <button className="px-1.5 py-0.5 bg-neutral-800 text-neutral-400 text-xs rounded hover:bg-neutral-700">
                    M
                  </button>
                  <button className="px-1.5 py-0.5 bg-neutral-800 text-neutral-400 text-xs rounded hover:bg-neutral-700">
                    I
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compact Stats Bar */}
        <div className="mt-3 bg-neutral-900 border border-neutral-800 rounded p-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="text-neutral-400">
                Total: <span className="text-neutral-50 font-medium">{filteredCandidates.length}</span>
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-400">
                High Score: <span className="text-accent-400 font-medium">
                  {filteredCandidates.filter(c => c.score >= 85).length}
                </span>
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-400">
                Avg Score: <span className="text-neutral-50 font-medium">
                  {Math.round(filteredCandidates.reduce((sum, c) => sum + c.score, 0) / filteredCandidates.length)}%
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-neutral-400 hover:text-neutral-300">Refresh</button>
              <button className="text-neutral-400 hover:text-neutral-300">Settings</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}