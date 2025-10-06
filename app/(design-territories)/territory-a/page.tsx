import React from 'react'
import Link from 'next/link'
import { mockStats } from '@/lib/mockData'

export default function TerritoryAPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl font-light text-neutral-50 mb-4">Territory A</h1>
          <p className="text-xl text-neutral-400 font-light leading-relaxed">
            Confident Clarity — Bold, decisive candidate evaluation interface
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-5 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">{mockStats.totalCandidates}</div>
            <div className="text-sm text-neutral-400">Total Candidates</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-400 mb-1">{mockStats.highFitCandidates}</div>
            <div className="text-sm text-neutral-400">High Fit (85+)</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">{mockStats.avgFitScore}</div>
            <div className="text-sm text-neutral-400">Avg Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">{mockStats.timeToHire}</div>
            <div className="text-sm text-neutral-400">Days to Hire</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">{mockStats.openPositions}</div>
            <div className="text-sm text-neutral-400">Open Positions</div>
          </div>
        </div>

        <nav className="space-y-6">
          <Link
            href="/territory-a/fit-queue"
            className="block p-8 bg-neutral-900/30 border border-neutral-800 rounded-lg hover:border-primary-600/50 transition-all-300"
          >
            <h2 className="text-2xl font-light text-neutral-50 mb-2">Fit Queue</h2>
            <p className="text-neutral-400 font-light">
              Bold candidate review interface with clear decision points and confident scoring
            </p>
          </Link>

          <Link
            href="/territory-a/dashboard"
            className="block p-8 bg-neutral-900/30 border border-neutral-800 rounded-lg hover:border-primary-600/50 transition-all-300"
          >
            <h2 className="text-2xl font-light text-neutral-50 mb-2">Dashboard</h2>
            <p className="text-neutral-400 font-light">
              Clear metrics dashboard with decisive insights and bold visual hierarchy
            </p>
          </Link>

          <Link
            href="/territory-a/candidates/sample-id"
            className="block p-8 bg-neutral-900/30 border border-neutral-800 rounded-lg hover:border-primary-600/50 transition-all-300"
          >
            <h2 className="text-2xl font-light text-neutral-50 mb-2">Candidate Profile</h2>
            <p className="text-neutral-400 font-light">
              Comprehensive candidate view with confident presentation of key information
            </p>
          </Link>
        </nav>
      </div>
    </div>
  )
}