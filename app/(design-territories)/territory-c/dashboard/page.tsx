'use client'

import { useState, useMemo } from 'react'
import { mockCandidates, mockJobs, mockShortlists, mockActivityFeed } from '@/lib/mock-data'
import { ScorePill } from '@/components/common/ScorePill'
import { cn } from '@/lib/utils'

export default function TerritoryCDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')
  const [selectedJob, setSelectedJob] = useState('all')

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalCandidates = mockCandidates.length
    const avgScore = Math.round(mockCandidates.reduce((acc, c) => acc + c.score, 0) / totalCandidates)
    const highScoreCandidates = mockCandidates.filter(c => c.score >= 85).length
    const newCandidates = mockCandidates.filter(c => c.status === 'new').length
    const reviewingCandidates = mockCandidates.filter(c => c.status === 'reviewing').length
    const shortlistedCandidates = mockCandidates.filter(c => c.status === 'shortlisted').length
    const totalReferrals = mockCandidates.reduce((acc, c) => acc + c.referrals, 0)
    const avgResponseRate = Math.round(mockCandidates.reduce((acc, c) => acc + c.responseRate, 0) / totalCandidates)

    return {
      totalCandidates,
      avgScore,
      highScoreCandidates,
      newCandidates,
      reviewingCandidates,
      shortlistedCandidates,
      totalReferrals,
      avgResponseRate
    }
  }, [])

  const scoreDistribution = useMemo(() => {
    const ranges = [
      { label: '90-100', min: 90, max: 100, color: 'bg-accent-500' },
      { label: '80-89', min: 80, max: 89, color: 'bg-green-500' },
      { label: '70-79', min: 70, max: 79, color: 'bg-blue-500' },
      { label: '60-69', min: 60, max: 69, color: 'bg-yellow-500' },
      { label: '<60', min: 0, max: 59, color: 'bg-red-500' }
    ]

    return ranges.map(range => ({
      ...range,
      count: mockCandidates.filter(c => c.score >= range.min && c.score <= range.max).length,
      percentage: Math.round((mockCandidates.filter(c => c.score >= range.min && c.score <= range.max).length / mockCandidates.length) * 100)
    }))
  }, [])

  const statusPipeline = useMemo(() => {
    const pipeline = [
      { status: 'New', count: mockCandidates.filter(c => c.status === 'new').length, color: 'bg-blue-500' },
      { status: 'Reviewing', count: mockCandidates.filter(c => c.status === 'reviewing').length, color: 'bg-yellow-500' },
      { status: 'Shortlisted', count: mockCandidates.filter(c => c.status === 'shortlisted').length, color: 'bg-green-500' },
      { status: 'Rejected', count: mockCandidates.filter(c => c.status === 'rejected').length, color: 'bg-red-500' }
    ]

    return pipeline
  }, [])

  const recentActivity = mockActivityFeed.slice(0, 5)

  return (
    <div className="p-2">
      {/* Header */}
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-neutral-50">Professional Efficiency Dashboard</h2>
            <span className="text-xs text-neutral-400 bg-neutral-800 px-2 py-1 rounded">
              Real-time Overview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>

            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded"
            >
              <option value="all">All Jobs</option>
              {mockJobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-8 gap-2 mb-2">
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
          <div className="text-xs text-neutral-400 mb-1">Total Candidates</div>
          <div className="text-xl font-bold text-neutral-50">{metrics.totalCandidates}</div>
          <div className="text-xs text-green-400">+12% vs last week</div>
        </div>

        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
          <div className="text-xs text-neutral-400 mb-1">Avg Score</div>
          <div className="text-xl font-bold text-neutral-50 flex items-center gap-1">
            {metrics.avgScore}
            <ScorePill score={metrics.avgScore} size="sm" />
          </div>
          <div className="text-xs text-green-400">+3.2 pts</div>
        </div>

        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
          <div className="text-xs text-neutral-400 mb-1">High Scoring</div>
          <div className="text-xl font-bold text-accent-400">{metrics.highScoreCandidates}</div>
          <div className="text-xs text-neutral-500">{Math.round((metrics.highScoreCandidates / metrics.totalCandidates) * 100)}% of total</div>
        </div>

        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
          <div className="text-xs text-neutral-400 mb-1">New Applications</div>
          <div className="text-xl font-bold text-blue-400">{metrics.newCandidates}</div>
          <div className="text-xs text-neutral-500">Need review</div>
        </div>

        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
          <div className="text-xs text-neutral-400 mb-1">In Review</div>
          <div className="text-xl font-bold text-yellow-400">{metrics.reviewingCandidates}</div>
          <div className="text-xs text-neutral-500">Active pipeline</div>
        </div>

        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
          <div className="text-xs text-neutral-400 mb-1">Shortlisted</div>
          <div className="text-xl font-bold text-green-400">{metrics.shortlistedCandidates}</div>
          <div className="text-xs text-neutral-500">Ready for interview</div>
        </div>

        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
          <div className="text-xs text-neutral-400 mb-1">Total Referrals</div>
          <div className="text-xl font-bold text-neutral-50">{metrics.totalReferrals}</div>
          <div className="text-xs text-green-400">+5 today</div>
        </div>

        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
          <div className="text-xs text-neutral-400 mb-1">Response Rate</div>
          <div className="text-xl font-bold text-neutral-50">{metrics.avgResponseRate}%</div>
          <div className="text-xs text-green-400">Above average</div>
        </div>
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        {/* Score Distribution */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-neutral-50 mb-3">Score Distribution</h3>
          <div className="space-y-2">
            {scoreDistribution.map(range => (
              <div key={range.label} className="flex items-center gap-2">
                <div className="w-12 text-xs text-neutral-400">{range.label}</div>
                <div className="flex-1 bg-neutral-800 rounded-full h-4 relative overflow-hidden">
                  <div
                    className={cn('h-full', range.color)}
                    style={{ width: `${range.percentage}%` }}
                  />
                </div>
                <div className="w-8 text-xs text-neutral-300 text-right">{range.count}</div>
                <div className="w-10 text-xs text-neutral-500 text-right">{range.percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Pipeline */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-neutral-50 mb-3">Status Pipeline</h3>
          <div className="space-y-3">
            {statusPipeline.map(stage => (
              <div key={stage.status} className="flex items-center gap-3">
                <div className={cn('w-2 h-2 rounded-full', stage.color)} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-neutral-300">{stage.status}</span>
                    <span className="text-xs text-neutral-50 font-medium">{stage.count}</span>
                  </div>
                  <div className="bg-neutral-800 rounded-full h-2">
                    <div
                      className={cn('h-full rounded-full', stage.color)}
                      style={{ width: `${(stage.count / metrics.totalCandidates) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Jobs */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-neutral-50 mb-3">Active Jobs</h3>
          <div className="space-y-2">
            {mockJobs.map(job => (
              <div key={job.id} className="flex items-center justify-between p-2 bg-neutral-800/50 rounded">
                <div>
                  <div className="text-xs text-neutral-50 font-medium">{job.title}</div>
                  <div className="text-xs text-neutral-500">{job.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-neutral-50">{job.applicants} applicants</div>
                  <div className="text-xs text-neutral-500">{job.viewed} viewed</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity and Top Candidates */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {/* Recent Activity Feed */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-neutral-50 mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start gap-2 text-xs">
                <div className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-1" />
                <div className="flex-1">
                  <div className="text-neutral-300">
                    {activity.type === 'candidate_applied' && `${activity.candidateName} applied for ${activity.jobTitle}`}
                    {activity.type === 'status_changed' && `${activity.candidateName}: ${activity.oldStatus} → ${activity.newStatus}`}
                    {activity.type === 'referral_received' && `Referral received for ${activity.candidateName}`}
                    {activity.type === 'interview_scheduled' && `Interview scheduled for ${activity.candidateName}`}
                  </div>
                  <div className="text-neutral-500 text-[10px]">
                    {new Date(activity.timestamp).toLocaleDateString()} • {activity.user}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Scoring Candidates */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-neutral-50 mb-3">Top Scoring Candidates</h3>
          <div className="space-y-2">
            {mockCandidates
              .filter(c => c.status !== 'rejected')
              .sort((a, b) => b.score - a.score)
              .slice(0, 5)
              .map(candidate => (
                <div key={candidate.id} className="flex items-center justify-between p-2 bg-neutral-800/50 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-300 text-[10px] font-semibold">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-xs text-neutral-50">{candidate.name}</div>
                      <div className="text-xs text-neutral-500">{candidate.title}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-xs text-neutral-400">{candidate.referrals} referrals</div>
                      <div className="text-xs text-neutral-500">{candidate.responseRate}% response</div>
                    </div>
                    <ScorePill score={candidate.score} size="sm" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
        <h3 className="text-sm font-semibold text-neutral-50 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-6 gap-2">
          <button className="bg-accent-500/20 text-accent-400 border border-accent-500/30 text-xs px-3 py-2 rounded hover:bg-accent-500/30">
            Review New Candidates ({metrics.newCandidates})
          </button>
          <button className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs px-3 py-2 rounded hover:bg-green-500/30">
            Schedule Interviews ({metrics.shortlistedCandidates})
          </button>
          <button className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs px-3 py-2 rounded hover:bg-blue-500/30">
            Send Bulk Emails
          </button>
          <button className="bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs px-3 py-2 rounded hover:bg-purple-500/30">
            Generate Reports
          </button>
          <button className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs px-3 py-2 rounded hover:bg-orange-500/30">
            Request Referrals
          </button>
          <button className="bg-neutral-700 text-neutral-300 text-xs px-3 py-2 rounded hover:bg-neutral-600">
            Export Data
          </button>
        </div>
      </div>
    </div>
  )
}