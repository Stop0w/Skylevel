'use client'

import React from 'react'
import { ScorePill } from '../../../components/common/ScorePill'
import { mockCandidates, mockJobs, mockStats } from '../../../lib/mockData'

export default function TerritoryADashboard() {
  const topCandidates = mockCandidates
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-black tracking-tight mb-4">
              RECRUITMENT COMMAND CENTER
            </h1>
            <p className="text-primary-100 text-xl font-bold uppercase tracking-wider">
              Make Decisions. Move Fast. Hire Best.
            </p>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: 'TOTAL CANDIDATES',
              value: mockStats.totalCandidates,
              change: '+12%',
              color: 'bg-blue-500'
            },
            {
              label: 'HIGH FIT SCORES',
              value: mockStats.highFitCandidates,
              change: '+8%',
              color: 'bg-green-500'
            },
            {
              label: 'AVG FIT SCORE',
              value: `${mockStats.avgFitScore}%`,
              change: '+5%',
              color: 'bg-accent-400'
            },
            {
              label: 'TIME TO HIRE',
              value: `${mockStats.timeToHire} days`,
              change: '-15%',
              color: 'bg-orange-500'
            }
          ].map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-4 border-transparent hover:border-primary-300 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-neutral-600 text-sm font-bold uppercase tracking-wider">
                  {metric.label}
                </span>
                <span className={`px-2 py-1 rounded-lg text-xs font-black text-white ${metric.color}`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-4xl font-black text-neutral-900">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Candidates Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-wider">
                  TOP PERFORMERS
                </h2>
                <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors">
                  VIEW ALL
                </button>
              </div>

              <div className="space-y-4">
                {topCandidates.map((candidate, index) => (
                  <div
                    key={candidate.id}
                    className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border-2 border-neutral-200 hover:border-primary-400 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Badge */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${
                        index === 0 ? 'bg-accent-400 text-accent-900' :
                        index === 1 ? 'bg-neutral-400 text-white' :
                        'bg-orange-600 text-white'
                      }`}>
                        {index + 1}
                      </div>

                      {/* Candidate Info */}
                      <div>
                        <h3 className="text-lg font-black text-neutral-900">
                          {candidate.name}
                        </h3>
                        <p className="text-primary-600 font-bold text-sm uppercase tracking-wider">
                          {candidate.headline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-neutral-500 font-medium uppercase">FIT SCORE</p>
                        <ScorePill
                          score={candidate.fitScore}
                          confidence={candidate.confidence}
                          size="lg"
                          breakdown={candidate.breakdown}
                        />
                      </div>
                      <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-black hover:bg-primary-700 transition-colors">
                        HIRE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions Column */}
          <div className="space-y-6">
            {/* Urgent Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-black text-neutral-900 uppercase tracking-wider mb-4">
                URGENT ACTIONS
              </h2>
              <div className="space-y-3">
                {[
                  { label: 'Review High-Fit Candidates', count: 23, color: 'bg-green-500' },
                  { label: 'Schedule Interviews', count: 12, color: 'bg-orange-500' },
                  { label: 'Send Offers', count: 5, color: 'bg-blue-500' },
                  { label: 'Final Decisions', count: 3, color: 'bg-red-500' }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex justify-between items-center p-4 bg-neutral-50 rounded-lg border-2 border-neutral-200 hover:border-primary-400 transition-all text-left"
                  >
                    <span className="font-bold text-neutral-900">{action.label}</span>
                    <span className={`px-3 py-1 rounded-lg text-white font-black ${action.color}`}>
                      {action.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-black text-neutral-900 uppercase tracking-wider mb-4">
                PERFORMANCE THIS WEEK
              </h2>
              <div className="space-y-4">
                {[
                  { day: 'MON', score: 78 },
                  { day: 'TUE', score: 82 },
                  { day: 'WED', score: 85 },
                  { day: 'THU', score: 88 },
                  { day: 'FRI', score: 92 }
                ].map((day, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-sm font-bold text-neutral-600 w-12">
                      {day.day}
                    </span>
                    <div className="flex-1 bg-neutral-200 rounded-full h-6 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${day.score}%` }}
                      >
                        <span className="text-xs font-black text-white">{day.score}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-accent-400 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-black mb-4">
            READY TO ACCELERATE HIRING?
          </h2>
          <p className="text-xl font-bold mb-6 opacity-90">
            Transform your recruitment process with AI-powered insights
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-black text-lg hover:bg-neutral-50 transition-colors shadow-xl">
              START HIRING NOW
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-black text-lg hover:bg-white hover:text-primary-600 transition-colors">
              VIEW ANALYTICS
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}