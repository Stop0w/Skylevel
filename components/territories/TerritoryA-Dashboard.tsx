'use client'

import React, { useState } from 'react'
import { mockCandidates, mockJobs } from '@/data/mockData'
import { ScorePill } from '@/components/common/ScorePill'
import { CandidateCard } from '@/components/common/CandidateCard'

export const TerritoryADashboard: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState(mockJobs[0])

  const topCandidates = mockCandidates
    .filter(c => c.score >= 70)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Bold Header with Strong CTAs */}
      <header className="border-b-2 border-primary-600 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-primary-600 mb-2">
                MAKE CONFIDENT DECISIONS
              </h1>
              <p className="text-neutral-300 text-lg">
                {topCandidates.length} HIGH-CONFIDENCE CANDIDATES READY FOR REVIEW
              </p>
            </div>
            <button className="px-8 py-4 bg-primary-600 text-neutral-50 font-bold text-lg rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105 shadow-xl border-2 border-primary-500">
              REVIEW ALL CANDIDATES
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Bold Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-6 rounded-xl border-2 border-primary-500">
            <div className="text-4xl font-black text-neutral-50">{mockCandidates.length}</div>
            <div className="text-primary-200 font-semibold">TOTAL CANDIDATES</div>
          </div>
          <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-6 rounded-xl border-2 border-accent-400">
            <div className="text-4xl font-black text-neutral-950">{topCandidates.length}</div>
            <div className="text-accent-900 font-semibold">HIGH-CONFIDENCE</div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl border-2 border-green-500">
            <div className="text-4xl font-black text-neutral-50">92%</div>
            <div className="text-green-200 font-semibold">MATCH RATE</div>
          </div>
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-xl border-2 border-neutral-600">
            <div className="text-4xl font-black text-accent-400">2.5x</div>
            <div className="text-neutral-300 font-semibold">FASTER HIRING</div>
          </div>
        </section>

        {/* Top Candidates - Bold Presentation */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-neutral-50">
              TOP PERFORMERS
            </h2>
            <button className="px-6 py-3 bg-primary-600 text-neutral-50 font-bold rounded-lg hover:bg-primary-700 transition-all border-2 border-primary-500">
              VIEW ALL
            </button>
          </div>

          <div className="space-y-4">
            {topCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-neutral-900 border-2 border-neutral-700 rounded-xl p-6 hover:border-primary-500 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-neutral-50 text-2xl font-black">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-neutral-50">{candidate.name}</h3>
                      <p className="text-neutral-400 font-semibold">{candidate.title}</p>
                      <div className="flex gap-2 mt-2">
                        {candidate.skills.slice(0, 3).map((skill, index) => (
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

                  <div className="flex items-center gap-6">
                    <ScorePill
                      score={candidate.score}
                      breakdown={candidate.breakdown}
                      showBreakdown={true}
                      size="lg"
                    />
                    <button className="px-6 py-3 bg-primary-600 text-neutral-50 font-bold rounded-lg hover:bg-primary-700 transition-all">
                      REVIEW NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Strong Action Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 border-4 border-primary-500">
          <div className="text-center">
            <h2 className="text-3xl font-black text-neutral-50 mb-4">
              READY TO MAKE YOUR NEXT HIRE?
            </h2>
            <p className="text-xl text-primary-200 mb-6">
              Join thousands of recruiters making data-driven hiring decisions
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-4 bg-neutral-50 text-primary-600 font-black text-lg rounded-lg hover:bg-neutral-200 transition-all transform hover:scale-105">
                START HIRING NOW
              </button>
              <button className="px-8 py-4 bg-transparent text-neutral-50 font-bold text-lg rounded-lg border-2 border-neutral-50 hover:bg-neutral-50 hover:text-primary-600 transition-all">
                SCHEDULE DEMO
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}