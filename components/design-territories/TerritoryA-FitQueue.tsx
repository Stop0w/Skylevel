'use client'

import React, { useState } from 'react'
import { Search, Filter, Star, Clock, Users, ChevronDown, ChevronUp, Eye, CheckCircle, XCircle, Briefcase, MapPin, Mail, Phone, Calendar, Award, AlertCircle } from 'lucide-react'
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
}

interface FilterOptions {
  scoreRange: [number, number]
  status: string[]
  experience: string[]
  location: string[]
}

const TerritoryAFitQueue: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('fitScore')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [filters, setFilters] = useState<FilterOptions>({
    scoreRange: [0, 100],
    status: [],
    experience: [],
    location: []
  })

  // Mock data
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      role: 'Senior Frontend Developer',
      experience: '8 years',
      fitScore: 92,
      confidence: 'high',
      tms: 95,
      srs: 88,
      rns: 91,
      status: 'new',
      applied: '2 hours ago',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL'],
      education: 'BS Computer Science - Stanford University',
      lastActive: '5 minutes ago',
      source: 'LinkedIn'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 987-6543',
      location: 'New York, NY',
      role: 'Full Stack Engineer',
      experience: '6 years',
      fitScore: 88,
      confidence: 'high',
      tms: 90,
      srs: 85,
      rns: 87,
      status: 'reviewing',
      applied: '4 hours ago',
      skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker'],
      education: 'MS Software Engineering - MIT',
      lastActive: '1 hour ago',
      source: 'Referral'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      role: 'Product Designer',
      experience: '5 years',
      fitScore: 79,
      confidence: 'medium',
      tms: 82,
      srs: 85,
      rns: 68,
      status: 'shortlisted',
      applied: '1 day ago',
      skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research'],
      education: 'BFA Design - RISD',
      lastActive: '3 hours ago',
      source: 'Company Website'
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@email.com',
      phone: '+1 (555) 234-5678',
      location: 'Seattle, WA',
      role: 'DevOps Engineer',
      experience: '7 years',
      fitScore: 85,
      confidence: 'high',
      tms: 88,
      srs: 80,
      rns: 85,
      status: 'reviewing',
      applied: '1 day ago',
      skills: ['Kubernetes', 'Terraform', 'Jenkins', 'AWS', 'Python'],
      education: 'BS Computer Engineering - UC Berkeley',
      lastActive: '30 minutes ago',
      source: 'GitHub'
    },
    {
      id: '5',
      name: 'Jessica Taylor',
      email: 'jessica.taylor@email.com',
      phone: '+1 (555) 345-6789',
      location: 'Boston, MA',
      role: 'Backend Developer',
      experience: '4 years',
      fitScore: 71,
      confidence: 'medium',
      tms: 75,
      srs: 70,
      rns: 65,
      status: 'new',
      applied: '2 days ago',
      skills: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Microservices'],
      education: 'BS Computer Science - Georgia Tech',
      lastActive: '2 hours ago',
      source: 'Indeed'
    }
  ]

  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'reviewing': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'shortlisted': return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Eye className="w-4 h-4" />
      case 'reviewing': return <Clock className="w-4 h-4" />
      case 'shortlisted': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      default: return null
    }
  }

  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    )
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for candidates:`, selectedCandidates)
    // Implement bulk action logic
  }

  const sortedCandidates = [...candidates].sort((a, b) => {
    let aValue: number, bValue: number

    switch (sortBy) {
      case 'fitScore':
        aValue = a.fitScore
        bValue = b.fitScore
        break
      case 'applied':
        aValue = new Date(a.applied).getTime()
        bValue = new Date(b.applied).getTime()
        break
      case 'name':
        return a.name.localeCompare(b.name) * (sortOrder === 'asc' ? 1 : -1)
      default:
        aValue = a.fitScore
        bValue = b.fitScore
    }

    return (aValue - bValue) * (sortOrder === 'asc' ? 1 : -1)
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      {/* Header */}
      <header className="bg-white border-b-4 border-primary-600 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-primary-600">Fit Queue</h1>
              <p className="text-lg text-neutral-600 mt-2">Review and evaluate candidates with AI-powered Fit Scores</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary-100 px-4 py-2 rounded-lg">
                <span className="text-primary-800 font-bold">{candidates.length} Candidates</span>
              </div>
              <button className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Create Shortlist
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search candidates by name, skills, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none text-lg"
              />
            </div>
            <div className="flex gap-3">
              <select className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none font-medium">
                <option>All Experience Levels</option>
                <option>Entry Level (0-2 years)</option>
                <option>Mid Level (3-5 years)</option>
                <option>Senior Level (6+ years)</option>
              </select>
              <select className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none font-medium">
                <option>All Locations</option>
                <option>San Francisco, CA</option>
                <option>New York, NY</option>
                <option>Austin, TX</option>
                <option>Seattle, WA</option>
                <option>Boston, MA</option>
              </select>
              <button className="bg-primary-100 hover:bg-primary-200 text-primary-700 font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Advanced Filters
              </button>
            </div>
          </div>

          {/* Score Range Filter */}
          <div className="mt-4 flex items-center gap-4">
            <span className="font-medium text-gray-700">Fit Score Range:</span>
            <div className="flex items-center gap-2">
              <input type="range" min="0" max="100" className="w-32" />
              <span className="text-sm text-gray-600">0 - 100</span>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedCandidates.length > 0 && (
          <div className="bg-primary-100 border-2 border-primary-300 rounded-xl p-4 mb-6 flex items-center justify-between">
            <span className="text-primary-800 font-bold">
              {selectedCandidates.length} candidate{selectedCandidates.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => handleBulkAction('shortlist')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Add to Shortlist
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => setSelectedCandidates([])}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Sort Options */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
            >
              <option value="fitScore">Fit Score</option>
              <option value="applied">Applied Date</option>
              <option value="name">Name</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              {sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>Showing {sortedCandidates.length} candidates</span>
          </div>
        </div>

        {/* Candidate Cards */}
        <div className="space-y-4">
          {sortedCandidates.map((candidate) => (
            <div key={candidate.id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-primary-200 transition-all">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.includes(candidate.id)}
                      onChange={() => handleCandidateSelect(candidate.id)}
                      className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{candidate.name}</h3>
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border-2 ${getStatusColor(candidate.status)}`}>
                          {getStatusIcon(candidate.status)}
                          {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                        </div>
                        <ScorePill
                          score={candidate.fitScore}
                          confidence={candidate.confidence}
                          size="lg"
                          breakdown={{
                            tms: candidate.tms,
                            srs: candidate.srs,
                            rns: candidate.rns
                          }}
                          showBreakdown={true}
                        />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Briefcase className="w-4 h-4" />
                          <span className="font-medium">{candidate.role}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{candidate.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{candidate.experience}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {candidate.skills.slice(0, 5).map((skill, index) => (
                          <span key={index} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 5 && (
                          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                            +{candidate.skills.length - 5} more
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-sm text-gray-600 mb-1">Technical Match</div>
                          <div className="text-xl font-bold text-gray-900">{candidate.tms}%</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-sm text-gray-600 mb-1">Soft Skills</div>
                          <div className="text-xl font-bold text-gray-900">{candidate.srs}%</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-sm text-gray-600 mb-1">Referral Network</div>
                          <div className="text-xl font-bold text-gray-900">{candidate.rns}%</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Applied: {candidate.applied}</span>
                        <span>•</span>
                        <span>Source: {candidate.source}</span>
                        <span>•</span>
                        <span>Last active: {candidate.lastActive}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                      View Profile
                    </button>
                    <button className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                      Add to Shortlist
                    </button>
                    <button
                      onClick={() => setExpandedCandidate(expandedCandidate === candidate.id ? null : candidate.id)}
                      className="text-primary-600 hover:text-primary-800 font-medium py-2 px-4 rounded-lg border border-primary-300 hover:bg-primary-50 transition-colors"
                    >
                      {expandedCandidate === candidate.id ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedCandidate === candidate.id && (
                  <div className="mt-6 pt-6 border-t-2 border-gray-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span>{candidate.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{candidate.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Education</h4>
                        <p className="text-gray-600">{candidate.education}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TerritoryAFitQueue