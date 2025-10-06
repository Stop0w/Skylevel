'use client';

import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  X,
  Star,
  Filter,
  Search,
  ArrowUpDown,
  Eye,
  Plus,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';
import ScorePill from '@/components/common/ScorePill';

// Mock candidate data
const mockCandidates = [
  {
    id: 1,
    name: 'Sarah Chen',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    fitScore: 92,
    confidence: 'high' as const,
    breakdown: {
      tms: 95,
      srs: 88,
      rns: 90
    },
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    experience: '8 years',
    appliedDate: '2024-01-15',
    status: 'shortlisted',
    referrals: 3,
    highlighted: true
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    jobTitle: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    fitScore: 88,
    confidence: 'high' as const,
    breakdown: {
      tms: 90,
      srs: 85,
      rns: 85
    },
    skills: ['Vue.js', 'Python', 'Django', 'PostgreSQL'],
    experience: '6 years',
    appliedDate: '2024-01-14',
    status: 'under_review',
    referrals: 2,
    highlighted: true
  },
  {
    id: 3,
    name: 'Emily Johnson',
    jobTitle: 'React Developer',
    company: 'CloudTech',
    location: 'Remote',
    fitScore: 76,
    confidence: 'medium' as const,
    breakdown: {
      tms: 80,
      srs: 75,
      rns: 65
    },
    skills: ['React', 'JavaScript', 'CSS', 'MongoDB'],
    experience: '4 years',
    appliedDate: '2024-01-13',
    status: 'under_review',
    referrals: 1,
    highlighted: false
  },
  {
    id: 4,
    name: 'David Kim',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    fitScore: 85,
    confidence: 'high' as const,
    breakdown: {
      tms: 88,
      srs: 82,
      rns: 82
    },
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
    experience: '7 years',
    appliedDate: '2024-01-12',
    status: 'under_review',
    referrals: 4,
    highlighted: true
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    jobTitle: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    fitScore: 71,
    confidence: 'medium' as const,
    breakdown: {
      tms: 75,
      srs: 70,
      rns: 60
    },
    skills: ['Angular', 'Java', 'Spring Boot', 'MySQL'],
    experience: '5 years',
    appliedDate: '2024-01-11',
    status: 'rejected',
    referrals: 0,
    highlighted: false
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'shortlisted':
      return 'bg-success-100 text-success-800 border-success-200';
    case 'under_review':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-neutral-100 text-neutral-800 border-neutral-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'shortlisted':
      return <CheckCircle className="w-4 h-4" />;
    case 'under_review':
      return <Clock className="w-4 h-4" />;
    case 'rejected':
      return <X className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

export default function FitQueuePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedJob, setSelectedJob] = useState('all');
  const [sortBy, setSortBy] = useState('fitScore');
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || candidate.status === selectedStatus;
    const matchesJob = selectedJob === 'all' || candidate.jobTitle.includes(selectedJob);

    return matchesSearch && matchesStatus && matchesJob;
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    switch (sortBy) {
      case 'fitScore':
        return b.fitScore - a.fitScore;
      case 'appliedDate':
        return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
      case 'referrals':
        return b.referrals - a.referrals;
      default:
        return 0;
    }
  });

  const toggleCandidateSelection = (candidateId: number) => {
    setSelectedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const stats = {
    total: mockCandidates.length,
    shortlisted: mockCandidates.filter(c => c.status === 'shortlisted').length,
    underReview: mockCandidates.filter(c => c.status === 'under_review').length,
    averageFitScore: Math.round(mockCandidates.reduce((sum, c) => sum + c.fitScore, 0) / mockCandidates.length)
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-skylevel-600">
                Skylevel
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/jobs" className="text-neutral-600 hover:text-skylevel-600 font-medium">
                Jobs
              </Link>
              <Link href="/fit-queue" className="text-neutral-900 hover:text-skylevel-600 font-medium">
                Fit Queue
              </Link>
              <Link href="/candidate/dashboard" className="text-neutral-600 hover:text-skylevel-600 font-medium">
                Candidates
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Fit Queue</h1>
          <p className="text-neutral-600">
            Review and prioritize candidates based on AI-powered Fit Scores
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-skylevel-600" />
              <span className="text-2xl font-bold text-neutral-900">{stats.total}</span>
            </div>
            <div className="text-sm text-neutral-600">Total Candidates</div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 text-gold-600" />
              <span className="text-2xl font-bold text-neutral-900">{stats.shortlisted}</span>
            </div>
            <div className="text-sm text-neutral-600">Shortlisted</div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-neutral-900">{stats.underReview}</span>
            </div>
            <div className="text-sm text-neutral-600">Under Review</div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-success-600" />
              <span className="text-2xl font-bold text-neutral-900">{stats.averageFitScore}%</span>
            </div>
            <div className="text-sm text-neutral-600">Avg Fit Score</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search candidates or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
              >
                <option value="all">All Status</option>
                <option value="under_review">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
              >
                <option value="all">All Jobs</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Full Stack Engineer">Full Stack Engineer</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
              >
                <option value="fitScore">Sort by Fit Score</option>
                <option value="appliedDate">Sort by Date</option>
                <option value="referrals">Sort by Referrals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Candidate List */}
        <div className="bg-white rounded-lg border border-neutral-200">
          <div className="px-6 py-4 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-neutral-900">
                Candidates ({sortedCandidates.length})
              </h2>
              {selectedCandidates.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-neutral-600">
                    {selectedCandidates.length} selected
                  </span>
                  <button className="px-4 py-2 bg-skylevel-600 text-white rounded-lg hover:bg-skylevel-700 transition-colors text-sm font-medium">
                    Create Shortlist
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="divide-y divide-neutral-200">
            {sortedCandidates.map((candidate) => (
              <div key={candidate.id} className="p-6 hover:bg-neutral-50 transition-colors">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.id)}
                    onChange={() => toggleCandidateSelection(candidate.id)}
                    className="mt-1 rounded border-neutral-300 text-skylevel-600 focus:ring-skylevel-500"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-neutral-900">
                            {candidate.name}
                          </h3>
                          {candidate.highlighted && (
                            <Star className="w-5 h-5 text-gold-500 fill-current" />
                          )}
                          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(candidate.status)}`}>
                            {getStatusIcon(candidate.status)}
                            <span className="capitalize">{candidate.status.replace('_', ' ')}</span>
                          </div>
                        </div>
                        <div className="text-neutral-600 mb-1">
                          {candidate.jobTitle} at {candidate.company}
                        </div>
                        <div className="text-sm text-neutral-500 mb-2">
                          {candidate.location} • {candidate.experience} • Applied {new Date(candidate.appliedDate).toLocaleDateString()}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {candidate.skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right">
                        <ScorePill
                          score={candidate.fitScore}
                          size="lg"
                          showBreakdown={true}
                          breakdown={candidate.breakdown}
                          confidence={candidate.confidence}
                        />
                        <div className="flex items-center justify-center gap-1 mt-2 text-sm text-neutral-600">
                          <UserCheck className="w-4 h-4" />
                          <span>{candidate.referrals} referrals</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <button className="text-sm text-skylevel-600 hover:text-skylevel-700 font-medium flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          View Profile
                        </button>
                        <button className="text-sm text-neutral-600 hover:text-neutral-700 font-medium">
                          Message
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                          Maybe Later
                        </button>
                        <button className="px-3 py-1 text-sm bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors">
                          Shortlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedCandidates.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No candidates found</h3>
              <p className="text-neutral-600">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}