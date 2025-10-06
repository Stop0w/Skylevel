'use client'

import React, { useState } from 'react'
import { Search, Filter, Star, Clock, Users, ChevronDown, ChevronUp, Eye, CheckCircle, XCircle, Briefcase, MapPin, Mail, Phone, Calendar, Award, AlertCircle, TrendingUp, BarChart3, Download } from 'lucide-react'
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
}

const TerritoryBFitQueue: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid')
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null)
  const [selectedScoreRange, setSelectedScoreRange] = useState<[number, number]>([70, 100])
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])

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
      source: 'LinkedIn',
      department: 'Engineering'
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
      source: 'Referral',
      department: 'Engineering'
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
      source: 'Company Website',
      department: 'Design'
    }
  ]

  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'reviewing': return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'shortlisted': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'rejected': return 'bg-rose-50 text-rose-700 border-rose-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getScoreBarColor = (score: number) => {
    if (score >= 85) return 'bg-accent-400'
    if (score >= 70) return 'bg-emerald-400'
    if (score >= 50) return 'bg-amber-400'
    return 'bg-rose-400'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-lg border-b border-neutral-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-light text-neutral-800 tracking-wide">Candidate Fit Queue</h1>
              <p className="text-neutral-600">Thoughtful evaluation of candidate fit and potential</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl border border-neutral-200/50">
                <Users className="w-4 h-4 text-neutral-600" />
                <span className="text-neutral-700 font-light">{candidates.length} candidates</span>
              </div>
              <button className="bg-gradient-to-r from-accent-400 to-accent-500 hover:from-accent-500 hover:to-accent-600 text-white font-light py-3 px-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md flex items-center gap-2">
                <Star className="w-4 h-4" />
                Create Shortlist
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-neutral-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-light text-neutral-700 mb-2">Search Candidates</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search with intention..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/60 border border-neutral-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-300/50 transition-all duration-300 text-neutral-700 placeholder-neutral-400"
                />
              </div>
            </div>

            {/* Score Range */}
            <div>
              <label className="block text-sm font-light text-neutral-700 mb-2">Fit Score Range</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={selectedScoreRange[0]}
                  onChange={(e) => setSelectedScoreRange([parseInt(e.target.value), selectedScoreRange[1]])}
                  className="flex-1"
                />
                <span className="text-sm text-neutral-600 font-light bg-white/60 px-3 py-1 rounded-lg border border-neutral-200/50">
                  {selectedScoreRange[0]}-{selectedScoreRange[1]}
                </span>
              </div>
            </div>

            {/* View Toggle */}
            <div>
              <label className="block text-sm font-light text-neutral-700 mb-2">View Preference</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedView('grid')}
                  className={`flex-1 py-2 px-4 rounded-lg font-light transition-all duration-300 ${
                    selectedView === 'grid'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white/60 text-neutral-700 hover:bg-white/80 border border-neutral-200/50'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setSelectedView('list')}
                  className={`flex-1 py-2 px-4 rounded-lg font-light transition-all duration-300 ${
                    selectedView === 'list'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white/60 text-neutral-700 hover:bg-white/80 border border-neutral-200/50'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-600 font-light">High Fit (85+)</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-light text-neutral-800">12</p>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-600 font-light">Medium Fit (70-84)</span>
              <BarChart3 className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-light text-neutral-800">28</p>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-600 font-light">Under Review</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-light text-neutral-800">15</p>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-600 font-light">Shortlisted</span>
              <Star className="w-4 h-4 text-accent-600" />
            </div>
            <p className="text-2xl font-light text-neutral-800">6</p>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className={selectedView === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}>
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 hover:bg-white/80 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center text-primary-600 font-light text-xl">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-neutral-800">{candidate.name}</h3>
                    <p className="text-neutral-600">{candidate.role}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {candidate.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {candidate.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
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
                  <div className={`px-4 py-2 rounded-full text-sm font-light border ${getStatusColor(candidate.status)}`}>
                    {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                  </div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Technical Match</span>
                  <span className="text-sm font-medium text-neutral-800">{candidate.tms}%</span>
                </div>
                <div className="w-full bg-neutral-200/50 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getScoreBarColor(candidate.tms)}`}
                    style={{ width: `${candidate.tms}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Soft Skills</span>
                  <span className="text-sm font-medium text-neutral-800">{candidate.srs}%</span>
                </div>
                <div className="w-full bg-neutral-200/50 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getScoreBarColor(candidate.srs)}`}
                    style={{ width: `${candidate.srs}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Referral Network</span>
                  <span className="text-sm font-medium text-neutral-800">{candidate.rns}%</span>
                </div>
                <div className="w-full bg-neutral-200/50 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getScoreBarColor(candidate.rns)}`}
                    style={{ width: `${candidate.rns}%` }}
                  ></div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.slice(0, 4).map((skill, index) => (
                    <span key={index} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-lg text-sm font-light border border-primary-200">
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 4 && (
                    <span className="bg-neutral-50 text-neutral-600 px-3 py-1 rounded-lg text-sm font-light border border-neutral-200">
                      +{candidate.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-neutral-200/50">
                <div className="text-sm text-neutral-500">
                  Applied {candidate.applied} via {candidate.source}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setExpandedCandidate(expandedCandidate === candidate.id ? null : candidate.id)}
                    className="text-primary-600 hover:text-primary-700 font-light transition-colors"
                  >
                    {expandedCandidate === candidate.id ? 'Hide Details' : 'View Details'}
                  </button>
                  <button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-light py-2 px-4 rounded-lg transition-all duration-300">
                    Review
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedCandidate === candidate.id && (
                <div className="mt-6 pt-6 border-t border-neutral-200/50 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-neutral-800 mb-3">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{candidate.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{candidate.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-800 mb-3">Education</h4>
                      <p className="text-sm text-neutral-600">{candidate.education}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TerritoryBFitQueue