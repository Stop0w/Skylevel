import React, { useState } from 'react'
import { Search, Filter, Plus, TrendingUp, Users, Clock, ArrowUp, ArrowDown, MoreVertical, Star, Eye, CheckCircle, AlertCircle } from 'lucide-react'

interface Candidate {
  id: string
  name: string
  role: string
  fitScore: number
  status: 'new' | 'reviewing' | 'shortlisted' | 'rejected'
  applied: string
  experience: string
}

interface Metric {
  label: string
  value: string
  change: number
  icon: React.ReactNode
}

const TerritoryADashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Mock data
  const metrics: Metric[] = [
    { label: 'Total Candidates', value: '247', change: 12.5, icon: <Users className="w-5 h-5" /> },
    { label: 'Avg Fit Score', value: '73.2', change: 8.3, icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Review Rate', value: '89%', change: -2.1, icon: <Clock className="w-5 h-5" /> },
    { label: 'Shortlisted', value: '18', change: 15.7, icon: <Star className="w-5 h-5" /> }
  ]

  const recentCandidates: Candidate[] = [
    { id: '1', name: 'Sarah Johnson', role: 'Senior Frontend Developer', fitScore: 92, status: 'new', applied: '2 hours ago', experience: '8 years' },
    { id: '2', name: 'Michael Chen', role: 'Full Stack Engineer', fitScore: 88, status: 'reviewing', applied: '4 hours ago', experience: '6 years' },
    { id: '3', name: 'Emily Rodriguez', role: 'Product Designer', fitScore: 79, status: 'shortlisted', applied: '1 day ago', experience: '5 years' },
    { id: '4', name: 'David Kim', role: 'DevOps Engineer', fitScore: 85, status: 'reviewing', applied: '1 day ago', experience: '7 years' },
    { id: '5', name: 'Jessica Taylor', role: 'Backend Developer', fitScore: 71, status: 'new', applied: '2 days ago', experience: '4 years' }
  ]

  const getFitScoreColor = (score: number) => {
    if (score >= 85) return 'bg-accent-500 text-white'
    if (score >= 70) return 'bg-green-500 text-white'
    if (score >= 50) return 'bg-orange-500 text-white'
    return 'bg-red-500 text-white'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-900 text-blue-200'
      case 'reviewing': return 'bg-yellow-900 text-yellow-200'
      case 'shortlisted': return 'bg-green-900 text-green-200'
      case 'rejected': return 'bg-red-900 text-red-200'
      default: return 'bg-neutral-800 text-neutral-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Eye className="w-4 h-4" />
      case 'reviewing': return <Clock className="w-4 h-4" />
      case 'shortlisted': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <AlertCircle className="w-4 h-4" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-primary-950">
      {/* Header */}
      <header className="bg-neutral-900 border-b-4 border-primary-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-primary-400">Recruiter Dashboard</h1>
              <p className="text-lg text-neutral-300 mt-2">Welcome back! Here's your candidate overview</p>
            </div>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Post New Job
            </button>
          </div>
        </div>
      </header>

      {/* Metrics Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-neutral-900 rounded-xl shadow-lg p-6 border-2 border-transparent hover:border-primary-600 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary-900 p-3 rounded-lg text-primary-400">
                  {metric.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  metric.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.change > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <h3 className="text-neutral-400 text-sm font-medium mb-1">{metric.label}</h3>
              <p className="text-3xl font-bold text-neutral-50">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-neutral-900 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search candidates by name, role, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-neutral-700 bg-neutral-800 text-neutral-50 rounded-lg focus:border-primary-500 focus:outline-none text-lg placeholder-neutral-400"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border-2 border-neutral-700 bg-neutral-800 text-neutral-50 rounded-lg focus:border-primary-500 focus:outline-none font-medium"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="reviewing">Reviewing</option>
                <option value="shortlisted">Shortlisted</option>
              </select>
              <button className="bg-primary-900 hover:bg-primary-800 text-primary-300 font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
                <Filter className="w-5 h-5" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Recent Candidates Table */}
        <div className="bg-neutral-900 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-neutral-50">Recent Candidates</h2>
            <p className="text-primary-200 mt-1">Latest applications and their Fit Scores</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-800 border-b-2 border-neutral-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-300 uppercase tracking-wider">Candidate</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-300 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-300 uppercase tracking-wider">Experience</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-300 uppercase tracking-wider">Fit Score</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-300 uppercase tracking-wider">Applied</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-neutral-900 divide-y divide-neutral-700">
                {recentCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-neutral-800 transition-colors cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-bold text-neutral-50">{candidate.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-neutral-100 font-medium">{candidate.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-neutral-400">{candidate.experience}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getFitScoreColor(candidate.fitScore)}`}>
                        {candidate.fitScore}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(candidate.status)}`}>
                        {getStatusIcon(candidate.status)}
                        {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-neutral-400">
                      {candidate.applied}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-primary-400 hover:text-primary-300 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-neutral-800 px-6 py-4 border-t-2 border-neutral-700">
            <button className="bg-primary-600 hover:bg-primary-700 text-neutral-50 font-bold py-2 px-6 rounded-lg transition-colors">
              View All Candidates
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TerritoryADashboard