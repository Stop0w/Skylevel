'use client'

import React, { useState, useMemo } from 'react'
import { ScorePill } from '../../../components/common/ScorePill'
import { CandidateCard } from '../../../components/common/CandidateCard'
import { mockCandidates } from '../../../lib/mockData'

export default function TerritoryAFitQueue() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)

  const filteredCandidates = useMemo(() => {
    switch (selectedFilter) {
      case 'high-fit':
        return mockCandidates.filter(c => c.fitScore >= 85)
      case 'medium-fit':
        return mockCandidates.filter(c => c.fitScore >= 70 && c.fitScore < 85)
      case 'low-fit':
        return mockCandidates.filter(c => c.fitScore < 70)
      default:
        return mockCandidates
    }
  }, [selectedFilter])

  const quickStats = {
    total: mockCandidates.length,
    highFit: mockCandidates.filter(c => c.fitScore >= 85).length,
    avgScore: Math.round(mockCandidates.reduce((acc, c) => acc + c.fitScore, 0) / mockCandidates.length)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Bold Header */}
      <div className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black tracking-tight">FIT QUEUE</h1>
              <p className="text-primary-200 mt-2 text-lg font-medium">
                {quickStats.total} CANDIDATES • {quickStats.highFit} HIGH-FIT • AVG SCORE {quickStats.avgScore}
              </p>
            </div>
            <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 transition-colors shadow-xl">
              HIRE NOW
            </button>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-3">
          {[
            { id: 'all', label: 'ALL CANDIDATES', count: quickStats.total },
            { id: 'high-fit', label: 'HIGH FIT', count: quickStats.highFit },
            { id: 'medium-fit', label: 'MEDIUM FIT', count: mockCandidates.filter(c => c.fitScore >= 70 && c.fitScore < 85).length },
            { id: 'low-fit', label: 'LOW FIT', count: mockCandidates.filter(c => c.fitScore < 70).length }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${
                selectedFilter === filter.id
                  ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-neutral-700 border-2 border-neutral-200 hover:border-primary-300'
              }`}
            >
              {filter.label}
              <span className="ml-2 px-2 py-1 bg-neutral-100 text-neutral-600 rounded-md text-xs">
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Candidates Grid - Bold Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCandidates.map(candidate => (
            <div
              key={candidate.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-4 ${
                selectedCandidate === candidate.id
                  ? 'border-primary-600 ring-4 ring-primary-100'
                  : 'border-transparent hover:border-primary-300'
              }`}
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              {/* Candidate Header with Bold Score */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-black">
                        {candidate.avatar}
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-neutral-900">
                          {candidate.name}
                        </h2>
                        <p className="text-primary-600 font-bold text-sm uppercase tracking-wider">
                          {candidate.headline}
                        </p>
                      </div>
                    </div>
                    <p className="text-neutral-600 font-medium">{candidate.location}</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <ScorePill
                      score={candidate.fitScore}
                      confidence={candidate.confidence}
                      showBreakdown={true}
                      size="lg"
                      breakdown={candidate.breakdown}
                    />
                    <span className="text-xs text-neutral-500 mt-2 font-medium uppercase tracking-wider">
                      FIT SCORE
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-primary-50 text-primary-700 rounded-lg font-semibold text-sm border-2 border-primary-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bold Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log('Reject:', candidate.id)
                    }}
                    className="bg-red-500 text-white py-3 px-4 rounded-lg font-black hover:bg-red-600 transition-colors text-center"
                  >
                    REJECT
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log('Maybe:', candidate.id)
                    }}
                    className="bg-orange-500 text-white py-3 px-4 rounded-lg font-black hover:bg-orange-600 transition-colors text-center"
                  >
                    MAYBE
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log('Hire:', candidate.id)
                    }}
                    className="bg-green-500 text-white py-3 px-4 rounded-lg font-black hover:bg-green-600 transition-colors text-center"
                  >
                    HIRE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Stats Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary-600 text-white p-4 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-8">
              <div>
                <span className="text-primary-200 text-sm font-medium uppercase">Reviewed</span>
                <p className="text-2xl font-black">{filteredCandidates.length}</p>
              </div>
              <div>
                <span className="text-primary-200 text-sm font-medium uppercase">High Fit</span>
                <p className="text-2xl font-black">{filteredCandidates.filter(c => c.fitScore >= 85).length}</p>
              </div>
              <div>
                <span className="text-primary-200 text-sm font-medium uppercase">Avg Score</span>
                <p className="text-2xl font-black">
                  {Math.round(filteredCandidates.reduce((acc, c) => acc + c.fitScore, 0) / filteredCandidates.length)}
                </p>
              </div>
            </div>
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-bold hover:bg-primary-50 transition-colors">
              EXPORT RESULTS
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}