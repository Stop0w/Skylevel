'use client'

import React, { useState } from 'react'
import { Search, Filter, Plus, TrendingUp, Users, Clock, ArrowUp, ArrowDown, MoreVertical, Star, Eye, CheckCircle, AlertCircle, BarChart3, Activity, Download, Settings, Bell } from 'lucide-react'

interface Metric {
  label: string
  value: string
  change: number
  icon: React.ReactNode
  trend: 'up' | 'down' | 'stable'
  details: string
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
  priority: 'high' | 'medium' | 'low'
  actions: string[]
}

const TerritoryCDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  const metrics: Metric[] = [
    {
      label: 'Total Candidates',
      value: '247',
      change: 12.5,
      icon: <Users className="w-4 h-4" />,
      trend: 'up',
      details: '+28 this week'
    },
    {
      label: 'Avg Fit Score',
      value: '73.2',
      change: 8.3,
      icon: <Activity className="w-4 h-4" />,
      trend: 'up',
      details: 'Above target'
    },
    {
      label: 'Review Rate',
      value: '89%',
      change: -2.1,
      icon: <Clock className="w-4 h-4" />,
      trend: 'down',
      details: '42 pending'
    },
    {
      label: 'Shortlisted',
      value: '18',
      change: 15.7,
      icon: <Star className="w-4 h-4" />,
      trend: 'up',
      details: '3 for final round'
    }
  ]

  const recentCandidates: Candidate[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Senior Frontend Developer',
      fitScore: 92,
      status: 'new',
      applied: '2h',
      experience: '8y',
      department: 'ENG',
      priority: 'high',
      actions: ['review', 'schedule', 'shortlist']
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Full Stack Engineer',
      fitScore: 88,
      status: 'reviewing',
      applied: '4h',
      experience: '6y',
      department: 'ENG',
      priority: 'high',
      actions: ['continue', 'schedule', 'reject']
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Product Designer',
      fitScore: 79,
      status: 'shortlisted',
      applied: '1d',
      experience: '5y',
      department: 'DES',
      priority: 'medium',
      actions: ['interview', 'offer', 'reject']
    },
    {
      id: '4',
      name: 'David Kim',
      role: 'DevOps Engineer',
      fitScore: 85,
      status: 'reviewing',
      applied: '1d',
      experience: '7y',
      department: 'ENG',
      priority: 'medium',
      actions: ['continue', 'schedule', 'reject']
    },
    {
      id: '5',
      name: 'Jessica Taylor',
      role: 'Backend Developer',
      fitScore: 71,
      status: 'new',
      applied: '2d',
      experience: '4y',
      department: 'ENG',
      priority: 'low',
      actions: ['review', 'schedule', 'reject']
    }
  ]

  const notifications = [
    { id: 1, message: '5 new candidates for Senior Developer role', time: '5m ago', type: 'info' },
    { id: 2, message: 'Interview scheduled with Sarah Johnson', time: '1h ago', type: 'success' },
    { id: 3, message: 'Fit Score calculation completed for 12 candidates', time: '2h ago', type: 'info' }
  ]

  const getFitScoreColor = (score: number) => {
    if (score >= 85) return 'text-accent-600 bg-accent-50 border-accent-200'
    if (score >= 70) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 50) return 'text-orange-600 bg-orange-50 border-orange-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'reviewing': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'shortlisted': return 'bg-green-100 text-green-800 border-green-300'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-3 h-3 text-green-600" />
      case 'down': return <ArrowDown className="w-3 h-3 text-red-600" />
      case 'stable': return <div className="w-3 h-3 bg-gray-400 rounded-full" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-full px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">Recruiter Dashboard</h1>
              <span className="text-sm text-gray-500">Q4 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                <Settings className="w-5 h-5" />
              </button>
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Job
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-4 top-16 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.map((notif) => (
              <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                <p className="text-sm text-gray-900">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-full px-4 py-4">
        {/* Metrics Row */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${selectedMetric === metric.label ? 'border-primary-500 shadow-md' : 'border-gray-200'}`}
              onClick={() => setSelectedMetric(selectedMetric === metric.label ? null : metric.label)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gray-100 rounded text-gray-600">
                    {metric.icon}
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-xs font-medium ${
                      metric.trend === 'up' ? 'text-green-600' :
                      metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {Math.abs(metric.change)}%
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="text-xs text-gray-600 mb-1 uppercase tracking-wide">{metric.label}</h3>
              <p className="text-xl font-semibold text-gray-900">{metric.value}</p>
              <p className="text-xs text-gray-500 mt-1">{metric.details}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions and Search Bar */}
        <div className="grid grid-cols-12 gap-3 mb-6">
          {/* Search */}
          <div className="col-span-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search candidates, skills, or positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="col-span-3">
            <select className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Design</option>
              <option>Product</option>
            </select>
          </div>

          <div className="col-span-3">
            <select className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-600">Active filters:</span>
            {activeFilters.map((filter, index) => (
              <span key={index} className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium">
                {filter}
                <button
                  onClick={() => setActiveFilters(activeFilters.filter(f => f !== filter))}
                  className="ml-1 text-primary-900 hover:text-primary-700"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              onClick={() => setActiveFilters([])}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Recent Candidates Table */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Recent Candidates</h2>
              <p className="text-sm text-gray-500">Last 72 hours</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-gray-600 hover:text-gray-900 p-1">
                <Download className="w-4 h-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-900 p-1">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Priority</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Candidate</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Dept</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Exp</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Fit Score</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Applied</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(candidate.priority)}`}></div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{candidate.role}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{candidate.department}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{candidate.experience}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold border ${getFitScoreColor(candidate.fitScore)}`}>
                        {candidate.fitScore}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(candidate.status)}`}>
                        {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {candidate.applied}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {candidate.actions.slice(0, 2).map((action, index) => (
                          <button
                            key={index}
                            className={`text-xs px-2 py-1 rounded border ${
                              action === 'review' || action === 'continue'
                                ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                                : action === 'schedule'
                                ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            {action}
                          </button>
                        ))}
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <MoreVertical className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <span className="text-sm text-gray-700">
              Showing 5 of {recentCandidates.length} candidates
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">Previous</button>
              <span className="px-3 py-1 text-sm bg-primary-600 text-white rounded">1</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">2</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TerritoryCDashboard