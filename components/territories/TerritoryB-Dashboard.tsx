'use client'

import React, { useState } from 'react'
import { mockCandidates, mockJobs } from '@/data/mockData'
import { ScorePill } from '@/components/common/ScorePill'
import { CandidateCard } from '@/components/common/CandidateCard'

export const TerritoryBDashboard: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState(mockJobs[0])

  const topCandidates = mockCandidates
    .filter(c => c.score >= 70)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Minimal Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <h1 className="text-2xl font-light text-neutral-50 tracking-wide">
                Candidate Overview
              </h1>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl">
                A thoughtful approach to finding the right fit. {topCandidates.length} candidates
                are ready for your consideration.
              </p>
            </div>
            <button className="px-6 py-3 bg-neutral-800 text-neutral-300 font-medium rounded-lg
                           hover:bg-neutral-700 transition-colors duration-300 border border-neutral-700">
              Review Candidates
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Calm Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="bg-neutral-900/30 p-8 rounded-xl border border-neutral-800/50">
            <div className="text-3xl font-light text-neutral-50 mb-2">{mockCandidates.length}</div>
            <div className="text-neutral-500 text-sm">Total Candidates</div>
          </div>
          <div className="bg-neutral-900/30 p-8 rounded-xl border border-neutral-800/50">
            <div className="text-3xl font-light text-accent-400 mb-2">{topCandidates.length}</div>
            <div className="text-neutral-500 text-sm">High Confidence</div>
          </div>
          <div className="bg-neutral-900/30 p-8 rounded-xl border border-neutral-800/50">
            <div className="text-3xl font-light text-neutral-50 mb-2">92%</div>
            <div className="text-neutral-500 text-sm">Match Rate</div>
          </div>
          <div className="bg-neutral-900/30 p-8 rounded-xl border border-neutral-800/50">
            <div className="text-3xl font-light text-neutral-300 mb-2">2.5x</div>
            <div className="text-neutral-500 text-sm">Faster Hiring</div>
          </div>
        </section>

        {/* Thoughtful Candidates Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-xl font-light text-neutral-50 mb-3">
              Promising Candidates
            </h2>
            <p className="text-neutral-500 text-sm max-w-3xl leading-relaxed">
              These candidates have shown strong potential. Take your time to review their profiles
              and consider how they might contribute to your team.
            </p>
          </div>

          <div className="space-y-6">
            {topCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-neutral-900/20 border border-neutral-800/50 rounded-xl p-8
                         hover:border-neutral-700/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="w-14 h-14 bg-neutral-800 rounded-full flex items-center justify-center
                                   text-neutral-300 text-lg font-light">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-light text-neutral-50">{candidate.name}</h3>
                      <p className="text-neutral-400 text-sm">{candidate.title}</p>
                      <div className="flex gap-2">
                        {candidate.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-neutral-800/50 text-neutral-400 text-xs
                                       font-light rounded border border-neutral-700/50"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <ScorePill
                      score={candidate.score}
                      breakdown={candidate.breakdown}
                      showBreakdown={false}
                      size="md"
                    />
                    <button className="px-5 py-2 bg-neutral-800 text-neutral-300 font-light
                                   rounded-lg hover:bg-neutral-700 transition-colors duration-300 text-sm">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contemplative Action Section */}
        <section className="bg-neutral-900/20 border border-neutral-800/50 rounded-xl p-12">
          <div className="text-center space-y-6">
            <h2 className="text-xl font-light text-neutral-50">
              Ready to move forward thoughtfully?
            </h2>
            <p className="text-neutral-400 text-sm max-w-2xl mx-auto leading-relaxed">
              Take the next step in your hiring journey with confidence. Our platform is designed
              to help you make considered decisions.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-neutral-800 text-neutral-300 font-light rounded-lg
                                 hover:bg-neutral-700 transition-colors duration-300">
                Continue Review
              </button>
              <button className="px-8 py-3 bg-transparent text-neutral-400 font-light rounded-lg
                                 border border-neutral-700 hover:text-neutral-300 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}