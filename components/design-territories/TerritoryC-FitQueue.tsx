'use client'

import React, { useState } from 'react'
import { Search, Filter, Star, Clock, Users, ChevronDown, ChevronUp, Eye, CheckCircle, XCircle, Briefcase, MapPin, Mail, Phone, Calendar, Award, AlertCircle, TrendingUp, BarChart3, Download, Settings, Bell, Grid, List, ArrowUpDown, Zap, Target, Brain, MoreVertical } from 'lucide-react'
import { ScorePill } from '../../app/components/common/ScorePill'

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  location: string
  role: string
  experience: string
  fitScore: number
  confidence: 'high' | 'medium' | 'low'
  tms: number
  srs: number
  rns: number
  status: 'new' | 'reviewing' | 'shortlisted' | 'rejected'
  applied: string
  skills: string[]
  education: string
  lastActive: string
  source: string
  department: string
  priority: 'high' | 'medium' | 'low'
  timeToHire: string
  salary: string
  availability: string
  interviews: number
}

interface ColumnConfig {
  key: string
  label: string
  width: string
  sortable: boolean
  visible: boolean
}

const TerritoryCFitQueue: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedView, setSelectedView] = useState<'table' | 'compact' | 'detailed'>('table')
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('fitScore')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [filters, setFilters] = useState({
    scoreMin: 0,
    scoreMax: 100,
    status: [],
    department: [],
    priority: []
  })

  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      role: 'Senior Frontend Developer',
      experience: '8y',
      fitScore: 92,
      confidence: 'high',
      tms: 95,
      srs: 88,
      rns: 91,
      status: 'new',
      applied: '2h',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL'],
      education: 'BS CS - Stanford',
      lastActive: '5m',
      source: 'LinkedIn',
      department: 'ENG',
      priority: 'high',
      timeToHire: '2w',
      salary: '$150-180k',
      availability: '2w',
      interviews: 0
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'm.chen@email.com',
      phone: '+1 (555) 987-6543',
      location: 'New York, NY',
      role: 'Full Stack Engineer',
      experience: '6y',
      fitScore: 88,
      confidence: 'high',
      tms: 90,
      srs: 85,
      rns: 87,
      status: 'reviewing',
      applied: '4h',
      skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker'],
      education: 'MS SE - MIT',
      lastActive: '1h',
      source: 'Referral',
      department: 'ENG',
      priority: 'high',
      timeToHire: '3w',
      salary: '$140-170k',
      availability: '3w',
      interviews: 1
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'e.rodriguez@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      role: 'Product Designer',
      experience: '5y',
      fitScore: 79,
      confidence: 'medium',
      tms: 82,
      srs: 85,
      rns: 68,
      status: 'shortlisted',
      applied: '1d',
      skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'Research'],
      education: 'BFA Design - RISD',
      lastActive: '3h',
      source: 'Direct',
      department: 'DES',
      priority: 'medium',
      timeToHire: '2w',
      salary: '$120-150k',
      availability: '2w',
      interviews: 2
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'd.kim@email.com',
      phone: '+1 (555) 234-5678',
      location: 'Seattle, WA',
      role: 'DevOps Engineer',
      experience: '7y',
      fitScore: 85,
      confidence: 'high',
      tms: 88,
      srs: 80,
      rns: 85,
      status: 'reviewing',
      applied: '1d',
      skills: ['Kubernetes', 'Terraform', 'Jenkins', 'AWS', 'Python'],
      education: 'BS CE - UC Berkeley',
      lastActive: '30m',
      source: 'GitHub',
      department: 'ENG',
      priority: 'medium',
      timeToHire: '4w',
      salary: '$160-200k',
      availability: '4w',
      interviews: 1
    },
    {
      id: '5',
      name: 'Jessica Taylor',
      email: 'j.taylor@email.com',
      phone: '+1 (555) 345-6789',
      location: 'Boston, MA',
      role: 'Backend Developer',
      experience: '4y',
      fitScore: 71,
      confidence: 'medium',
      tms: 75,
      srs: 70,
      rns: 65,
      status: 'new',
      applied: '2d',
      skills: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Microservices'],
      education: 'BS CS - Georgia Tech',
      lastActive: '2h',
      source: 'Indeed',
      department: 'ENG',
      priority: 'low',
      timeToHire: '3w',
      salary: '$110-140k',
      availability: '3w',
      interviews: 0
    }
  ]

  const columns: ColumnConfig[] = [
    { key: 'select', label: '', width: 'w-12', sortable: false, visible: true },
    { key: 'priority', label: 'P', width: 'w-8', sortable: true, visible: true },
    { key: 'candidate', label: 'Candidate', width: 'w-48', sortable: true, visible: true },
    { key: 'role', label: 'Role', width: 'w-40', sortable: true, visible: true },
    { key: 'dept', label: 'Dept', width: 'w-16', sortable: true, visible: true },
    { key: 'exp', label: 'Exp', width: 'w-12', sortable: true, visible: true },
    { key: 'fitScore', label: 'Fit', width: 'w-16', sortable: true, visible: true },
    { key: 'tms', label: 'TMS', width: 'w-12', sortable: true, visible: false },
    { key: 'srs', label: 'SRS', width: 'w-12', sortable: true, visible: false },
    { key: 'rns', label: 'RNS', width: 'w-12', sortable: true, visible: false },
    { key: 'status', label: 'Status', width: 'w-24', sortable: true, visible: true },
    { key: 'applied', label: 'Applied', width: 'w-16', sortable: true, visible: true },
    { key: 'source', label: 'Source', width: 'w-20', sortable: true, visible: false },
    { key: 'interviews', label: 'Int', width: 'w-12', sortable: true, visible: true },
    { key: 'ttHire', label: 'TTH', width: 'w-12', sortable: true, visible: false },
    { key: 'salary', label: 'Salary', width: 'w-24', sortable: true, visible: false },
    { key: 'actions', label: 'Actions', width: 'w-32', sortable: false, visible: true }
  ]

  
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

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    )
  }

  const handleSelectAll = () => {
    if (selectedCandidates.length === candidates.length) {
      setSelectedCandidates([])
    } else {
      setSelectedCandidates(candidates.map(c => c.id))
    }
  }

  const sortedCandidates = [...candidates].sort((a, b) => {
    let aValue: any = a[sortBy as keyof Candidate]
    let bValue: any = b[sortBy as keyof Candidate]

    if (typeof aValue === 'string') {
      return aValue.localeCompare(bValue) * (sortOrder === 'asc' ? 1 : -1)
    }

    return (aValue - bValue) * (sortOrder === 'asc' ? 1 : -1)
  })

  const getScoreIcon = (type: string) => {
    switch (type) {
      case 'tms': return <Target className="w-3 h-3" />
      case 'srs': return <Brain className="w-3 h-3" />
      case 'rns': return <Users className="w-3 h-3" />
      default: return <Zap className="w-3 h-3" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-full px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">Fit Queue</h1>
              <span className="text-sm text-gray-500">{candidates.length} candidates</span>
              {selectedCandidates.length > 0 && (
                <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm font-medium">
                  {selectedCandidates.length} selected
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button className="text-gray-600 hover:text-gray-900 p-2">
                <Settings className="w-4 h-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-900 p-2">
                <Download className="w-4 h-4" />
              </button>
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-3 rounded flex items-center gap-2 text-sm">
                <Star className="w-4 h-4" />
                Shortlist ({selectedCandidates.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Controls Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            {/* Quick Filters */}
            <select className="text-sm px-3 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option>All Status</option>
              <option>New</option>
              <option>Reviewing</option>
              <option>Shortlisted</option>
            </select>

            <select className="text-sm px-3 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option>All Depts</option>
              <option>ENG</option>
              <option>DES</option>
              <option>PROD</option>
            </select>

            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>Score:</span>
              <input
                type="number"
                placeholder="Min"
                className="w-16 px-2 py-1 border border-gray-200 rounded"
                value={filters.scoreMin}
                onChange={(e) => setFilters({...filters, scoreMin: parseInt(e.target.value) || 0})}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-16 px-2 py-1 border border-gray-200 rounded"
                value={filters.scoreMax}
                onChange={(e) => setFilters({...filters, scoreMax: parseInt(e.target.value) || 100})}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex items-center border border-gray-200 rounded">
              <button
                onClick={() => setSelectedView('table')}
                className={`px-3 py-1 text-sm ${selectedView === 'table' ? 'bg-gray-100' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedView('compact')}
                className={`px-3 py-1 text-sm ${selectedView === 'compact' ? 'bg-gray-100' : ''}`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>

            <button className="text-sm text-gray-600 hover:text-gray-900">
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCandidates.length > 0 && (
        <div className="bg-primary-50 border-b border-primary-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary-800 font-medium">
              {selectedCandidates.length} candidates selected
            </span>
            <div className="flex items-center gap-2">
              <button className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                Shortlist All
              </button>
              <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                Schedule Interviews
              </button>
              <button className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                Reject All
              </button>
              <button
                onClick={() => setSelectedCandidates([])}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {columns.filter(col => col.visible).map((column) => (
                  <th
                    key={column.key}
                    className={`${column.width} px-2 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider`}
                  >
                    {column.sortable ? (
                      <button
                        onClick={() => handleSort(column.key)}
                        className="flex items-center gap-1 hover:text-gray-900"
                      >
                        {column.label}
                        {sortBy === column.key && (
                          <span className="text-primary-600">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCandidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="w-12 px-2 py-2">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.includes(candidate.id)}
                      onChange={() => handleCandidateSelect(candidate.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="w-8 px-2 py-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(candidate.priority)}`}></div>
                  </td>
                  <td className="w-48 px-2 py-2">
                    <div>
                      <div className="font-medium text-gray-900">{candidate.name}</div>
                      <div className="text-xs text-gray-500">{candidate.email}</div>
                    </div>
                  </td>
                  <td className="w-40 px-2 py-2">
                    <div className="text-gray-900">{candidate.role}</div>
                  </td>
                  <td className="w-16 px-2 py-2">
                    <div className="text-gray-500">{candidate.department}</div>
                  </td>
                  <td className="w-12 px-2 py-2">
                    <div className="text-gray-500">{candidate.experience}</div>
                  </td>
                  <td className="w-16 px-2 py-2">
                    <ScorePill
                      score={candidate.fitScore}
                      confidence={candidate.confidence}
                      size="sm"
                      breakdown={{
                        tms: candidate.tms,
                        srs: candidate.srs,
                        rns: candidate.rns
                      }}
                      showBreakdown={true}
                    />
                  </td>
                  <td className="w-24 px-2 py-2">
                    <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(candidate.status)}`}>
                      {candidate.status}
                    </div>
                  </td>
                  <td className="w-16 px-2 py-2">
                    <div className="text-gray-500">{candidate.applied}</div>
                  </td>
                  <td className="w-12 px-2 py-2">
                    <div className="text-center">
                      {candidate.interviews > 0 && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                          {candidate.interviews}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="w-32 px-2 py-2">
                    <div className="flex items-center gap-1">
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                        Review
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-xs font-medium">
                        Schedule
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing 1-{candidates.length} of {candidates.length} results
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50" disabled>
              Previous
            </button>
            <span className="px-3 py-1 text-sm bg-primary-600 text-white rounded">1</span>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Score Legend */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center gap-6 text-xs">
          <span className="font-medium text-gray-700">Score Breakdown:</span>
          <div className="flex items-center gap-1">
            <Target className="w-3 h-3 text-blue-600" />
            <span className="text-gray-600">TMS: Technical Match</span>
          </div>
          <div className="flex items-center gap-1">
            <Brain className="w-3 h-3 text-green-600" />
            <span className="text-gray-600">SRS: Soft Skills</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-purple-600" />
            <span className="text-gray-600">RNS: Referral Network</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TerritoryCFitQueue