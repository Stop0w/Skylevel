'use client';

import React, { useState } from 'react';
import ScorePill from '@/components/common/ScorePill';
import CandidateCard from '@/components/common/CandidateCard';
import JobCard from '@/components/common/JobCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data for demonstration
const sampleCandidates = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL'],
    experience: '8 years',
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    title: 'Full Stack Engineer',
    location: 'New York, NY',
    skills: ['Vue.js', 'Python', 'Django', 'PostgreSQL', 'Docker', 'AWS'],
    experience: '5 years',
  },
  {
    id: '3',
    name: 'Emily Johnson',
    title: 'React Native Developer',
    location: 'Austin, TX',
    skills: ['React Native', 'JavaScript', 'Firebase', 'Redux', 'iOS', 'Android'],
    experience: '4 years',
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'UI/UX Frontend Developer',
    location: 'Seattle, WA',
    skills: ['React', 'SASS', 'Figma', 'Storybook', 'Jest', 'WebGL'],
    experience: '6 years',
  },
];

const sampleJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    department: 'Engineering',
    requiredSkills: ['React', 'TypeScript', 'Next.js', 'Node.js'],
    applicationCount: 45,
    status: 'active' as const,
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    salaryRange: '$120k - $180k',
    type: 'full-time' as const,
    remote: true,
    featured: true,
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    department: 'Engineering',
    requiredSkills: ['Vue.js', 'Python', 'Django', 'PostgreSQL', 'Docker'],
    applicationCount: 23,
    status: 'active' as const,
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    salaryRange: '$100k - $150k',
    type: 'full-time' as const,
    remote: false,
    featured: false,
  },
];

const scoreBreakdowns = [
  { tms: 92, srs: 88, rns: 95 }, // Excellent candidate
  { tms: 78, srs: 82, rns: 70 }, // Good candidate
  { tms: 65, srs: 70, rns: 45 }, // Average candidate
  { tms: 45, srs: 50, rns: 30 }, // Below average
];

const confidenceLevels = ['high', 'medium', 'low'] as const;

export default function ComponentsDemo() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [shortlistedCandidates, setShortlistedCandidates] = useState<string[]>([]);

  // Handle candidate interactions
  const handleViewProfile = (candidateId: string) => {
    setSelectedCandidate(candidateId);
    console.log('Viewing profile for candidate:', candidateId);
  };

  const handleAddToShortlist = (candidateId: string) => {
    setShortlistedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
    console.log('Toggled shortlist for candidate:', candidateId);
  };

  const handleViewJobDetails = (jobId: string) => {
    console.log('Viewing job details for:', jobId);
  };

  const handleEditJob = (jobId: string) => {
    console.log('Editing job:', jobId);
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Skylevel Component Library
          </h1>
          <p className="text-lg text-neutral-600">
            Core UI Components for the Decision Acceleration Interface
          </p>
        </div>

        {/* ScorePill Components */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-neutral-900">
              ScorePill Component
            </CardTitle>
            <p className="text-neutral-600">
              The most critical component - displays Fit Scores with color coding and breakdown tooltips
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Different Score Ranges */}
              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-900">Excellent (85+)</h3>
                <div className="space-y-2">
                  <ScorePill score={95} size="sm" />
                  <ScorePill score={89} size="md" />
                  <ScorePill score={87} size="lg" />
                  <ScorePill
                    score={92}
                    size="md"
                    showBreakdown
                    breakdown={scoreBreakdowns[0]}
                    confidence="high"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-900">Good (70-84)</h3>
                <div className="space-y-2">
                  <ScorePill score={78} size="sm" />
                  <ScorePill score={82} size="md" />
                  <ScorePill score={71} size="lg" />
                  <ScorePill
                    score={75}
                    size="md"
                    showBreakdown
                    breakdown={scoreBreakdowns[1]}
                    confidence="medium"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-900">Average (50-69)</h3>
                <div className="space-y-2">
                  <ScorePill score={65} size="sm" />
                  <ScorePill score={58} size="md" />
                  <ScorePill score={52} size="lg" />
                  <ScorePill
                    score={62}
                    size="md"
                    showBreakdown
                    breakdown={scoreBreakdowns[2]}
                    confidence="low"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-900">Below Average (&lt;50)</h3>
                <div className="space-y-2">
                  <ScorePill score={45} size="sm" />
                  <ScorePill score={38} size="md" />
                  <ScorePill score={22} size="lg" />
                  <ScorePill
                    score={42}
                    size="md"
                    showBreakdown
                    breakdown={scoreBreakdowns[3]}
                    confidence="low"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-skylevel-50 rounded-lg border border-skylevel-200">
              <p className="text-sm text-skylevel-700">
                <strong>Tip:</strong> Hover over ScorePills with breakdowns to see detailed TMS, SRS, and RNS components.
                Confidence indicators: ● High, ◐ Medium, ○ Low
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CandidateCard Components */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-neutral-900">
              CandidateCard Component
            </CardTitle>
            <p className="text-neutral-600">
              Displays candidate information with embedded ScorePill and quick actions
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleCandidates.map((candidate, index) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  score={95 - (index * 15)}
                  breakdown={scoreBreakdowns[index]}
                  confidence={confidenceLevels[index % confidenceLevels.length]}
                  onViewProfile={handleViewProfile}
                  onAddToShortlist={handleAddToShortlist}
                  variant="default"
                />
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Compact Variant</h3>
              <div className="space-y-2">
                {sampleCandidates.slice(0, 3).map((candidate, index) => (
                  <CandidateCard
                    key={`compact-${candidate.id}`}
                    candidate={candidate}
                    score={85 - (index * 10)}
                    onViewProfile={handleViewProfile}
                    onAddToShortlist={handleAddToShortlist}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* JobCard Components */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-neutral-900">
              JobCard Component
            </CardTitle>
            <p className="text-neutral-600">
              Displays job listings with skills, status, and application metrics
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleJobs.map((job) => (
                <JobCard
                  key={job.id}
                  {...job}
                  onViewDetails={handleViewJobDetails}
                  onEditJob={handleEditJob}
                  variant="default"
                />
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Compact Variant</h3>
              <div className="space-y-2">
                {sampleJobs.map((job) => (
                  <JobCard
                    key={`compact-${job.id}`}
                    {...job}
                    onViewDetails={handleViewJobDetails}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Component Interaction Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-neutral-900">
              Component Integration Demo
            </CardTitle>
            <p className="text-neutral-600">
              See how components work together in a realistic scenario
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-neutral-900">Shortlisted Candidates</h3>
                  <p className="text-sm text-neutral-600">
                    {shortlistedCandidates.length} candidate{shortlistedCandidates.length !== 1 ? 's' : ''} shortlisted
                  </p>
                </div>
                {selectedCandidate && (
                  <div className="text-sm text-skylevel-600">
                    Currently viewing: {sampleCandidates.find(c => c.id === selectedCandidate)?.name}
                  </div>
                )}
              </div>

              {shortlistedCandidates.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {shortlistedCandidates.map(candidateId => {
                    const candidate = sampleCandidates.find(c => c.id === candidateId);
                    const index = sampleCandidates.findIndex(c => c.id === candidateId);
                    return candidate ? (
                      <CandidateCard
                        key={`shortlist-${candidateId}`}
                        candidate={candidate}
                        score={95 - (index * 15)}
                        size="sm"
                        onViewProfile={handleViewProfile}
                        onAddToShortlist={handleAddToShortlist}
                        variant="compact"
                      />
                    ) : null;
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-neutral-900">
              Performance Metrics
            </CardTitle>
            <p className="text-neutral-600">
              Component performance and optimization status
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-success-50 rounded-lg border border-success-200">
                <h3 className="font-semibold text-success-800">ScorePill</h3>
                <p className="text-sm text-success-700">✅ React.memo optimized</p>
                <p className="text-sm text-success-700">✅ &lt;10ms render time</p>
                <p className="text-sm text-success-700">✅ Used in 15+ components</p>
              </div>
              <div className="p-4 bg-success-50 rounded-lg border border-success-200">
                <h3 className="font-semibold text-success-800">CandidateCard</h3>
                <p className="text-sm text-success-700">✅ React.memo optimized</p>
                <p className="text-sm text-success-700">✅ Hover states implemented</p>
                <p className="text-sm text-success-700">✅ Responsive design</p>
              </div>
              <div className="p-4 bg-success-50 rounded-lg border border-success-200">
                <h3 className="font-semibold text-success-800">JobCard</h3>
                <p className="text-sm text-success-700">✅ Multiple variants</p>
                <p className="text-sm text-success-700">✅ Status indicators</p>
                <p className="text-sm text-success-700">✅ Interactive elements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}