
import React, { useState } from 'react'
import { Search, Filter, Plus, TrendingUp, Users, Clock, ArrowUp, ArrowDown, MoreVertical, Star, Eye, CheckCircle, AlertCircle, BarChart3, Activity } from 'lucide-react'

interface Metric {
  label: string
  value: string
  change: number
  icon: React.ReactNode
  trend: 'up' | 'down' | 'stable'
}

interface Candidate {
  id: string
  name: string
  role: string
  fitScore: number
  status: 'new' | 'reviewing' | 'shortlisted' | 'rejected'
  applied: string
  experience: string
  department: string
}

const TerritoryBDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTimeRange, setSelectedTimeRange] = useState('week')
  const [focusedMetric, setFocusedMetric] = useState<string | null>(null)

  const metrics: Metric[] = [
    { label: 'Total Candidates', value: '247', change: 12.5, icon: <Users className="w-5 h-5" />, trend: 'up' },
    { label: 'Average Fit Score', value: '73.2', change: 8.3, icon: <Activity className="w-5 h-5" />, trend: 'up' },
    { label: 'Review Rate', value: '89%', change: -2.1, icon: <Clock className="w-5 h-5" />, trend: 'down' },
    { label: 'Shortlisted', value: '18', change: 15.7, icon: <Star className="w-5 h-5" />, trend: 'up' }
  ]

  const recentCandidates: Candidate[] = [
    { id: '1', name: 'Sarah Johnson', role: 'Senior Frontend Developer', fitScore: 92, status: 'new', applied: '2 hours ago', experience: '8 years', department: 'Engineering' },
    { id: '2', name: 'Michael Chen', role: 'Full Stack Engineer', fitScore: 88, status: 'reviewing', applied: '4 hours ago', experience: '6 years', department: 'Engineering' },
    { id: '3', name: 'Emily Rodriguez', role: 'Product Designer', fitScore: 79, status: 'shortlisted', applied: '1 day ago', experience: '5 years', department: 'Design' },
    { id: '4', name: 'David Kim', role: 'DevOps Engineer', fitScore: 85, status: 'reviewing', applied: '1 day ago', experience: '7 years', department: 'Engineering' },
    { id: '5', name: 'Jessica Taylor', role: 'Backend Developer', fitScore: 71, status: 'new', applied: '2 days ago', experience: '4 years', department: 'Engineering' }
  ]

  const getFitScoreGradient = (score: number) => {
    if (score >= 85) return 'bg-gradient-to-r from-accent-400 to-accent-500'
    if (score >= 70) return 'bg-gradient-to-r from-green-400 to-green-500'
    if (score >= 50) return 'bg-gradient-to-r from-orange-400 to-orange-500'
    return 'bg-gradient-to-r from-red-400 to-red-500'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'reviewing': return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'shortlisted': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'rejected': return 'bg-rose-50 text-rose-700 border-rose-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-emerald-600" />
      case 'down': return <ArrowDown className="w-4 h-4 text-rose-600" />
      case 'stable': return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-slate-950">
      {/* Header */}
      <header className="bg-neutral-900/80 backdrop-blur-md border-b border-neutral-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-light text-neutral-200 tracking-wide">Recruiter Dashboard</h1>
              <p className="text-neutral-400">A comprehensive overview of your recruitment activities</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 bg-neutral-800/60 border border-neutral-600 text-neutral-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
              <button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-neutral-50 font-light py-3 px-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Position
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Metrics Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={`bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 hover:border-neutral-300/50 transition-all duration-300 hover:shadow-lg ${focusedMetric === metric.label ? 'ring-2 ring-primary-500/50' : ''}`}
                onMouseEnter={() => setFocusedMetric(metric.label)}
                onMouseLeave={() => setFocusedMetric(null)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl text-primary-600">
                    {metric.icon}
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-sm font-light ${
                      metric.trend === 'up' ? 'text-emerald-600' :
                      metric.trend === 'down' ? 'text-rose-600' : 'text-gray-600'
                    }`}>
                      {Math.abs(metric.change)}%
                    </span>
                  </div>
                </div>
                <h3 className="text-neutral-600 text-sm font-light mb-2 tracking-wide">{metric.label}</h3>
                <p className="text-3xl font-light text-neutral-800">{metric.value}</p>
                <div className="mt-4 h-1 bg-gradient-to-r from-primary-200 to-transparent rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-neutral-200/50">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search with thoughtful consideration..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/60 border border-neutral-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-300/50 transition-all duration-300 text-neutral-700 placeholder-neutral-400"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-white/60 hover:bg-white/80 text-neutral-700 font-light py-4 px-6 rounded-xl border border-neutral-200/50 transition-all duration-300 hover:shadow-md flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Refine Search
              </button>
              <button className="bg-white/60 hover:bg-white/80 text-neutral-700 font-light py-4 px-6 rounded-xl border border-neutral-200/50 transition-all duration-300 hover:shadow-md flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Recent Candidates */}
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-200/50">
          <div className="bg-gradient-to-r from-neutral-50 to-primary-50/30 p-8 border-b border-neutral-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-light text-neutral-800">Recent Candidate Activity</h2>
                <p className="text-neutral-600 mt-1">Thoughtful evaluation of recent applications</p>
              </div>
              <div className="text-sm text-neutral-500">
                Last updated: Just now
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-4">
              {recentCandidates.map((candidate, index) => (
                <div key={candidate.id} className="bg-white/60 rounded-xl p-6 hover:bg-white/80 transition-all duration-300 border border-neutral-200/30 hover:border-neutral-300/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full flex items-center justify-center text-primary-600 font-light text-lg">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-neutral-800">{candidate.name}</h3>
                        <p className="text-neutral-600">{candidate.role}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
                          <span>{candidate.experience}</span>
                          <span>•</span>
                          <span>{candidate.department}</span>
                          <span>•</span>
                          <span>{candidate.applied}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`px-4 py-2 rounded-full text-sm font-light border ${getStatusColor(candidate.status)}`}>
                        {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                      </div>
                      <div className={`px-6 py-2 rounded-full text-white font-light ${getFitScoreGradient(candidate.fitScore)}`}>
                        {candidate.fitScore}
                      </div>
                      <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-neutral-50 to-primary-50/30 p-6 border-t border-neutral-200/50">
            <div className="flex items-center justify-between">
              <p className="text-neutral-600">Showing 5 of {recentCandidates.length} recent candidates</p>
              <button className="text-primary-600 hover:text-primary-700 font-light transition-colors">
                View all candidates →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TerritoryBDashboard