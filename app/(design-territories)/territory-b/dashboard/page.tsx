'use client'

import React from 'react'
import { ScorePill } from '@/components/common/ScorePill'
import { mockCandidates, mockJobs } from '@/lib/mockData'
import { cn } from '@/lib/utils'

export default function TerritoryBDashboard() {
  const totalCandidates = mockCandidates.length
  const averageScore = Math.round(mockCandidates.reduce((sum, c) => sum + c.score, 0) / totalCandidates)
  const highScoreCandidates = mockCandidates.filter(c => c.score >= 85).length
  const newCandidates = mockCandidates.filter(c => c.status === 'new').length
  const shortlistedCandidates = mockCandidates.filter(c => c.status === 'shortlisted').length

  const scoreDistribution = [
    { range: '90-100', count: mockCandidates.filter(c => c.score >= 90).length, color: 'text-accent-400' },
    { range: '80-89', count: mockCandidates.filter(c => c.score >= 80 && c.score < 90).length, color: 'text-green-400' },
    { range: '70-79', count: mockCandidates.filter(c => c.score >= 70 && c.score < 80).length, color: 'text-orange-400' },
    { range: '60-69', count: mockCandidates.filter(c => c.score >= 60 && c.score < 70).length, color: 'text-red-400' },
    { range: 'Below 60', count: mockCandidates.filter(c => c.score < 60).length, color: 'text-neutral-500' },
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Header */}
      <div className="border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-neutral-50 mb-2">Dashboard</h1>
              <p className="text-neutral-400 font-light">Calm overview of your recruitment insights</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-neutral-500 font-light">Thoughtful Analytics</p>
              <p className="text-2xl font-light text-accent-400">Territory B</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
            <div className="mb-4">
              <p className="text-sm text-neutral-500 font-light mb-2">Total Candidates</p>
              <p className="text-3xl font-light text-neutral-50">{totalCandidates}</p>
            </div>
            <div className="text-sm text-neutral-400 font-light">
              {newCandidates} new this week
            </div>
          </div>

          <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
            <div className="mb-4">
              <p className="text-sm text-neutral-500 font-light mb-2">Average Fit Score</p>
              <div className="flex items-center gap-3">
                <p className="text-3xl font-light text-neutral-50">{averageScore}</p>
                <ScorePill score={averageScore} size="sm" />
              </div>
            </div>
            <div className="text-sm text-neutral-400 font-light">
              Across all candidates
            </div>
          </div>

          <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
            <div className="mb-4">
              <p className="text-sm text-neutral-500 font-light mb-2">High Scores (85+)</p>
              <p className="text-3xl font-light text-accent-400">{highScoreCandidates}</p>
            </div>
            <div className="text-sm text-neutral-400 font-light">
              {Math.round((highScoreCandidates / totalCandidates) * 100)}% of total
            </div>
          </div>

          <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
            <div className="mb-4">
              <p className="text-sm text-neutral-500 font-light mb-2">Shortlisted</p>
              <p className="text-3xl font-light text-green-400">{shortlistedCandidates}</p>
            </div>
            <div className="text-sm text-neutral-400 font-light">
              Ready for interview
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Score Distribution */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
              <h2 className="text-xl font-light text-neutral-50 mb-8">Score Distribution</h2>
              <div className="space-y-6">
                {scoreDistribution.map((segment, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-400 font-light">{segment.range}</span>
                      <span className={cn('text-sm font-light', segment.color)}>{segment.count} candidates</span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-2">
                      <div
                        className={cn('h-2 rounded-full transition-all-300', {
                          'bg-accent-400': segment.color === 'text-accent-400',
                          'bg-green-400': segment.color === 'text-green-400',
                          'bg-orange-400': segment.color === 'text-orange-400',
                          'bg-red-400': segment.color === 'text-red-400',
                          'bg-neutral-500': segment.color === 'text-neutral-500',
                        })}
                        style={{ width: `${(segment.count / totalCandidates) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent High Performers */}
            <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
              <h2 className="text-xl font-light text-neutral-50 mb-8">Recent High Performers</h2>
              <div className="space-y-6">
                {mockCandidates
                  .filter(c => c.score >= 85)
                  .slice(0, 3)
                  .map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between py-4 border-b border-neutral-800 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-300 font-light">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-light text-neutral-50">{candidate.name}</h3>
                          <p className="text-sm text-neutral-400 font-light">{candidate.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-neutral-500 font-light">{candidate.experience}</span>
                        <ScorePill score={candidate.score} size="sm" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Active Positions */}
            <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
              <h2 className="text-lg font-light text-neutral-50 mb-6">Active Positions</h2>
              <div className="space-y-4">
                {mockJobs.map((job) => (
                  <div key={job.id} className="space-y-2">
                    <h3 className="font-light text-neutral-50">{job.title}</h3>
                    <div className="space-y-1">
                      <p className="text-sm text-neutral-400 font-light">{job.location}</p>
                      <p className="text-sm text-neutral-500 font-light">
                        {job.applicantsCount} applicants • Avg score: {job.avgScore}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contemplative Insight */}
            <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
              <h2 className="text-lg font-light text-neutral-50 mb-4">Weekly Insight</h2>
              <p className="text-neutral-400 font-light leading-relaxed mb-6">
                Your thoughtful approach to candidate review is yielding quality results.
                The {highScoreCandidates} high-scoring candidates represent strong potential
                for your current openings.
              </p>
              <div className="pt-6 border-t border-neutral-800">
                <p className="text-sm text-neutral-500 font-light italic">
                  "Patience and thoroughness in review leads to better hiring outcomes."
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
              <h2 className="text-lg font-light text-neutral-50 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full py-3 px-4 bg-accent-400/10 border border-accent-400/30 text-accent-400 rounded-lg font-light hover:bg-accent-400/20 transition-all-300">
                  Review New Candidates
                </button>
                <button className="w-full py-3 px-4 bg-neutral-800/50 border border-neutral-700 text-neutral-300 rounded-lg font-light hover:bg-neutral-800 transition-all-300">
                  Update Job Calibrations
                </button>
                <button className="w-full py-3 px-4 bg-neutral-800/50 border border-neutral-700 text-neutral-300 rounded-lg font-light hover:bg-neutral-800 transition-all-300">
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}