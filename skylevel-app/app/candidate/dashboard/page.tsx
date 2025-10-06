'use client';

import React from 'react';
import { FileText, ExternalLink, Share, Users, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import ScorePill from '@/components/common/ScorePill';
import Link from 'next/link';

// Mock data for candidate applications
const mockApplications = [
  {
    id: 1,
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    appliedDate: '2024-01-15',
    status: 'under_review',
    fitScore: 85,
    confidence: 'high' as const,
    breakdown: {
      tms: 90,
      srs: 80,
      rns: 75
    },
    nextStep: 'Technical interview scheduled for Jan 20',
    referralLink: 'https://skylevel.app/ref/abc123',
    referrals: 2
  },
  {
    id: 2,
    jobTitle: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    appliedDate: '2024-01-10',
    status: 'shortlisted',
    fitScore: 78,
    confidence: 'medium' as const,
    breakdown: {
      tms: 85,
      srs: 75,
      rns: 65
    },
    nextStep: 'Waiting for recruiter response',
    referralLink: 'https://skylevel.app/ref/def456',
    referrals: 1
  },
  {
    id: 3,
    jobTitle: 'React Developer',
    company: 'CloudTech',
    location: 'Remote',
    appliedDate: '2024-01-05',
    status: 'rejected',
    fitScore: 62,
    confidence: 'high' as const,
    breakdown: {
      tms: 70,
      srs: 60,
      rns: 50
    },
    nextStep: 'Not selected - keep applying!',
    referralLink: 'https://skylevel.app/ref/ghi789',
    referrals: 0
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
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

export default function CandidateDashboard() {
  const activeApplications = mockApplications.filter(app => app.status !== 'rejected');
  const averageFitScore = Math.round(
    mockApplications.reduce((sum, app) => sum + app.fitScore, 0) / mockApplications.length
  );
  const totalReferrals = mockApplications.reduce((sum, app) => sum + app.referrals, 0);

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
                Browse Jobs
              </Link>
              <Link href="/candidate/dashboard" className="text-neutral-900 hover:text-skylevel-600 font-medium">
                My Applications
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-skylevel-600 to-skylevel-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
              <p className="text-skylevel-100">
                Track your applications and improve your Fit Scores
              </p>
            </div>
            <Link
              href="/jobs"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-skylevel-600 rounded-lg hover:bg-neutral-50 transition-colors duration-200 font-semibold"
            >
              <span>Find More Jobs</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-skylevel-600" />
              <span className="text-2xl font-bold text-neutral-900">{mockApplications.length}</span>
            </div>
            <div className="text-sm text-neutral-600">Total Applications</div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-success-600" />
              <span className="text-2xl font-bold text-neutral-900">{averageFitScore}%</span>
            </div>
            <div className="text-sm text-neutral-600">Average Fit Score</div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-coral-600" />
              <span className="text-2xl font-bold text-neutral-900">{totalReferrals}</span>
            </div>
            <div className="text-sm text-neutral-600">Total Referrals</div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-gold-600" />
              <span className="text-2xl font-bold text-neutral-900">{activeApplications.length}</span>
            </div>
            <div className="text-sm text-neutral-600">Active Applications</div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-lg border border-neutral-200">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-900">Your Applications</h2>
          </div>

          <div className="divide-y divide-neutral-200">
            {mockApplications.map((application) => (
              <div key={application.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {application.jobTitle}
                      </h3>
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="capitalize">{application.status.replace('_', ' ')}</span>
                      </div>
                    </div>
                    <div className="text-neutral-600 mb-2">{application.company}</div>
                    <div className="text-sm text-neutral-500 mb-3">
                      Applied on {new Date(application.appliedDate).toLocaleDateString()}
                    </div>

                    <div className="text-sm text-neutral-600 mb-3">
                      <strong>Next Step:</strong> {application.nextStep}
                    </div>
                  </div>

                  <div className="text-right">
                    <ScorePill
                      score={application.fitScore}
                      size="lg"
                      showBreakdown={true}
                      breakdown={application.breakdown}
                      confidence={application.confidence}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-neutral-500">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{application.referrals} referrals</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share className="w-4 h-4" />
                      <span>Share referral link</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => navigator.clipboard.writeText(application.referralLink)}
                      className="text-sm text-skylevel-600 hover:text-skylevel-700 font-medium"
                    >
                      Copy Referral Link
                    </button>
                    {application.status === 'shortlisted' && (
                      <button className="px-4 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors duration-200 text-sm font-medium">
                        View Interview Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            💡 Tips to Improve Your Fit Score
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="font-medium text-neutral-900 mb-2">Get More Referrals</div>
              <div className="text-sm text-neutral-600">
                Share your referral link with colleagues who can validate your skills. Each referral boosts your RNS score.
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-medium text-neutral-900 mb-2">Update Your Skills</div>
              <div className="text-sm text-neutral-600">
                Keep your skills section current and relevant to the jobs you're applying for.
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-medium text-neutral-900 mb-2">Tailor Your Applications</div>
              <div className="text-sm text-neutral-600">
                Focus on jobs that match your experience and skills for higher TMS scores.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}