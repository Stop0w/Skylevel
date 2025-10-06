'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { ScorePill } from '../../components/common/ScorePill'
import { cn } from '../../lib/utils'

interface Candidate {
  id: string
  name: string
  title: string
  experience: string
  location: string
  email: string
  phone: string
  skills: string[]
  score: number
  confidence: 'high' | 'medium' | 'low'
  breakdown?: {
    tms: number
    srs: number
    rns: number
  }
  status: string
  referrals: number
  appliedDate: string
  lastActive: string
}

interface FilterState {
  scoreRange: number
  skillSearch: string
  status: string
  sortBy: string
  sortDirection: 'asc' | 'desc'
}

interface FitQueueClientProps {
  initialCandidates: Candidate[]
}

export function FitQueueClient({ initialCandidates }: FitQueueClientProps) {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [shortlist, setShortlist] = useState<string[]>([])
  const [showShortlist, setShowShortlist] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    scoreRange: 0,
    skillSearch: '',
    status: 'all',
    sortBy: 'score',
    sortDirection: 'desc'
  })

  // Filter and sort candidates
  const filteredCandidates = useMemo(() => {
    let filtered = [...candidates]

    // Filter by score range
    if (filters.scoreRange > 0) {
      filtered = filtered.filter(c => c.score >= filters.scoreRange)
    }

    // Filter by skills
    if (filters.skillSearch) {
      const searchLower = filters.skillSearch.toLowerCase()
      filtered = filtered.filter(c =>
        c.skills.some(skill => skill.toLowerCase().includes(searchLower))
      )
    }

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(c => c.status === filters.status)
    }

    // Sort candidates
    filtered.sort((a, b) => {
      let aValue: number
      let bValue: number

      switch (filters.sortBy) {
        case 'score':
          aValue = a.score
          bValue = b.score
          break
        case 'tms':
          aValue = a.breakdown?.tms || 0
          bValue = b.breakdown?.tms || 0
          break
        case 'srs':
          aValue = a.breakdown?.srs || 0
          bValue = b.breakdown?.srs || 0
          break
        case 'rns':
          aValue = a.breakdown?.rns || 0
          bValue = b.breakdown?.rns || 0
          break
        case 'date':
          aValue = new Date(a.appliedDate).getTime()
          bValue = new Date(b.appliedDate).getTime()
          break
        case 'referrals':
          aValue = a.referrals
          bValue = b.referrals
          break
        default:
          aValue = a.score
          bValue = b.score
      }

      if (filters.sortDirection === 'asc') {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })

    return filtered
  }, [candidates, filters])

  // Handle filter changes
  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  // Add/remove from shortlist
  const toggleShortlist = useCallback((candidateId: string) => {
    setShortlist(prev => {
      if (prev.includes(candidateId)) {
        return prev.filter(id => id !== candidateId)
      } else {
        return [...prev, candidateId]
      }
    })
  }, [])

  // Get candidate count in each status
  const statusCounts = useMemo(() => {
    const counts = {
      all: candidates.length,
      new: candidates.filter(c => c.status === 'new').length,
      reviewing: candidates.filter(c => c.status === 'reviewing').length,
      shortlisted: candidates.filter(c => c.status === 'shortlisted').length,
      interviewing: candidates.filter(c => c.status === 'interviewing').length
    }
    return counts
  }, [candidates])

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-neutral-900">Fit Queue</h1>
              <div className="text-sm text-neutral-600">
                {filteredCandidates.length} of {candidates.length} candidates
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowShortlist(!showShortlist)}
                className="relative px-4 py-2 bg-skylevel-600 text-white rounded-lg hover:bg-skylevel-700 transition-colors flex items-center gap-2"
              >
                Shortlist
                {shortlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-400 text-accent-900 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {shortlist.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-neutral-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4">
            {/* Score Range Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-neutral-700">Min Score:</label>
              <select
                value={filters.scoreRange}
                onChange={(e) => updateFilter('scoreRange', Number(e.target.value))}
                className="px-3 py-1 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-skylevel-500"
              >
                <option value="0">All</option>
                <option value="90">90+</option>
                <option value="80">80+</option>
                <option value="70">70+</option>
                <option value="50">50+</option>
              </select>
            </div>

            {/* Skills Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-neutral-700">Skills:</label>
              <input
                type="text"
                value={filters.skillSearch}
                onChange={(e) => updateFilter('skillSearch', e.target.value)}
                placeholder="Search skills..."
                className="px-3 py-1 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-skylevel-500 w-48"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-neutral-700">Status:</label>
              <div className="flex gap-1">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <button
                    key={status}
                    onClick={() => updateFilter('status', status)}
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                      filters.status === status
                        ? "bg-skylevel-600 text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    )}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2 ml-auto">
              <label className="text-sm font-medium text-neutral-700">Sort:</label>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value)}
                className="px-3 py-1 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-skylevel-500"
              >
                <option value="score">Overall Score</option>
                <option value="tms">Technical Match</option>
                <option value="srs">Soft Skills</option>
                <option value="rns">Referral Network</option>
                <option value="date">Date Applied</option>
                <option value="referrals">Referrals</option>
              </select>
              <button
                onClick={() => updateFilter('sortDirection', filters.sortDirection === 'asc' ? 'desc' : 'asc')}
                className="p-1 text-neutral-600 hover:text-neutral-900"
              >
                {filters.sortDirection === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Candidates List */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">{candidate.name}</h3>
                  <p className="text-sm text-neutral-600">{candidate.title}</p>
                  <p className="text-xs text-neutral-500 mt-1">{candidate.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <ScorePill
                    score={candidate.score}
                    confidence={candidate.confidence}
                    showBreakdown={true}
                    breakdown={candidate.breakdown}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
                <span>{candidate.experience} exp</span>
                <span>•</span>
                <span>{candidate.appliedDate}</span>
                {candidate.referrals > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-skylevel-600">{candidate.referrals} referrals</span>
                  </>
                )}
              </div>

              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 4 && (
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-500 text-xs rounded-full">
                      +{candidate.skills.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                <span className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  candidate.status === 'new' && "bg-blue-100 text-blue-700",
                  candidate.status === 'reviewing' && "bg-yellow-100 text-yellow-700",
                  candidate.status === 'shortlisted' && "bg-green-100 text-green-700",
                  candidate.status === 'interviewing' && "bg-purple-100 text-purple-700"
                )}>
                  {candidate.status}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleShortlist(candidate.id)
                  }}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                    shortlist.includes(candidate.id)
                      ? "bg-accent-400 text-accent-900"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  )}
                >
                  {shortlist.includes(candidate.id) ? 'Remove' : 'Add to Shortlist'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">No candidates match your filters</p>
          </div>
        )}
      </div>

      {/* Shortlist Drawer */}
      {showShortlist && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowShortlist(false)} />
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
            <div className="p-4 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Shortlist ({shortlist.length})</h2>
                <button
                  onClick={() => setShowShortlist(false)}
                  className="p-2 hover:bg-neutral-100 rounded-md"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto h-full pb-20">
              {shortlist.length === 0 ? (
                <p className="text-neutral-500 text-center py-8">No candidates in shortlist</p>
              ) : (
                <div className="space-y-3">
                  {candidates
                    .filter(c => shortlist.includes(c.id))
                    .map(candidate => (
                      <div key={candidate.id} className="p-3 border border-neutral-200 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{candidate.name}</h4>
                            <p className="text-sm text-neutral-600">{candidate.title}</p>
                            <ScorePill
                              score={candidate.score}
                              confidence={candidate.confidence}
                              size="sm"
                              className="mt-2"
                            />
                          </div>
                          <button
                            onClick={() => toggleShortlist(candidate.id)}
                            className="p-1 hover:bg-neutral-100 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}