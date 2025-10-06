'use client'

import React, { useState } from 'react'
import { mockCandidates, mockJobs } from '@/data/mockData'
import { ScorePill } from '@/components/common/ScorePill'
import { CandidateCard } from '@/components/common/CandidateCard'

export const TerritoryCDashboard: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState(mockJobs[0])

  const topCandidates = mockCandidates
    .filter(c => c.score >= 70)
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Dense Header */}
      <header className="border-b border-neutral-800 bg-neutral-900">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-neutral-50">
                Recruitment Dashboard
              </h1>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-neutral-400">
                  {topCandidates.length} Active Candidates
                </span>
                <span className="text-xs text-neutral-600">•</span>
                <span className="text-xs text-neutral-400">
                  Avg Score: 78%
                </span>
                <span className="text-xs text-neutral-600">•</span>
                <span className="text-xs text-neutral-400">
                  Last Updated: 2 min ago
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-primary-600 text-neutral-50 text-xs font-medium rounded hover:bg-primary-700">
                Export Data
              </button>
              <button className="px-3 py-1.5 bg-neutral-800 text-neutral-300 text-xs font-medium rounded hover:bg-neutral-700">
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Compact Metrics */}
        <section className="grid grid-cols-6 gap-2 mb-4">
          <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
            <div className="text-lg font-semibold text-neutral-50">{mockCandidates.length}</div>
            <div className="text-xs text-neutral-500">Total</div>
          </div>
          <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
            <div className="text-lg font-semibold text-accent-400">{topCandidates.length}</div>
            <div className="text-xs text-neutral-500">Qualified</div>
          </div>
          <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
            <div className="text-lg font-semibold text-green-400">92%</div>
            <div className="text-xs text-neutral-500">Match Rate</div>
          </div>
          <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
            <div className="text-lg font-semibold text-neutral-50">2.5x</div>
            <div className="text-xs text-neutral-500">Efficiency</div>
          </div>
          <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
            <div className="text-lg font-semibold text-neutral-50">4.2d</div>
            <div className="text-xs text-neutral-500">Avg Time</div>
          </div>
          <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
            <div className="text-lg font-semibold text-neutral-50">87%</div>
            <div className="text-xs text-neutral-500">Satisfaction</div>
          </div>
        </section>

        {/* Data-Dense Candidate Table */}
        <section className="bg-neutral-900 border border-neutral-800 rounded">
          <div className="px-3 py-2 border-b border-neutral-800">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-neutral-50">Top Candidates</h2>
              <div className="flex items-center gap-2">
                <button className="text-xs text-neutral-400 hover:text-neutral-300">Filter</button>
                <button className="text-xs text-neutral-400 hover:text-neutral-300">Sort</button>
                <button className="text-xs text-neutral-400 hover:text-neutral-300">Export</button>
              </div>
            </div>
          </div>

          {/* Compact Table Header */}
          <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-neutral-800/50 text-xs text-neutral-400 font-medium">
            <div className="col-span-3">Candidate</div>
            <div className="col-span-2">Title</div>
            <div className="col-span-2">Experience</div>
            <div className="col-span-2">Key Skills</div>
            <div className="col-span-1">Score</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Dense Candidate Rows */}
          <div className="divide-y divide-neutral-800">
            {topCandidates.map((candidate) => (
              <div key={candidate.id} className="grid grid-cols-12 gap-2 px-3 py-2 hover:bg-neutral-800/30">
                <div className="col-span-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-neutral-50 text-xs font-medium">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm text-neutral-50 truncate">{candidate.name}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-xs text-neutral-400 truncate">{candidate.title}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-xs text-neutral-500">{candidate.experience.split(' • ')[0]}</span>
                </div>
                <div className="col-span-2">
                  <div className="flex gap-1">
                    {candidate.skills.slice(0, 2).map((skill, index) => (
                      <span key={index} className="px-1.5 py-0.5 bg-neutral-800 text-neutral-400 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-1">
                  <ScorePill score={candidate.score} size="sm" />
                </div>
                <div className="col-span-1">
                  <span className={`px-2 py-0.5 text-xs rounded ${
                    candidate.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                    candidate.status === 'reviewing' ? 'bg-yellow-500/20 text-yellow-400' :
                    candidate.status === 'shortlisted' ? 'bg-green-500/20 text-green-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {candidate.status}
                  </span>
                </div>
                <div className="col-span-1 flex gap-1">
                  <button className="px-2 py-0.5 bg-primary-600/20 text-primary-400 text-xs rounded hover:bg-primary-600/30">
                    View
                  </button>
                  <button className="px-2 py-0.5 bg-neutral-800 text-neutral-400 text-xs rounded hover:bg-neutral-700">
                    Act
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compact Activity Feed */}
        <section className="mt-4 bg-neutral-900 border border-neutral-800 rounded">
          <div className="px-3 py-2 border-b border-neutral-800">
            <h2 className="text-sm font-semibold text-neutral-50">Recent Activity</h2>
          </div>
          <div className="divide-y divide-neutral-800">
            <div className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span className="text-xs text-neutral-400">Sarah Chen shortlisted</span>
              </div>
              <span className="text-xs text-neutral-600">2m ago</span>
            </div>
            <div className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span className="text-xs text-neutral-400">New application: Michael Rodriguez</span>
              </div>
              <span className="text-xs text-neutral-600">5m ago</span>
            </div>
            <div className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <span className="text-xs text-neutral-400">Interview scheduled: Emily Johnson</span>
              </div>
              <span className="text-xs text-neutral-600">12m ago</span>
            </div>
            <div className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span className="text-xs text-neutral-400">Fit Score updated: James Wilson</span>
              </div>
              <span className="text-xs text-neutral-600">18m ago</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}