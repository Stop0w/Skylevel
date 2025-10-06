import React, { useState } from 'react';
import { Search, Clock, DollarSign, Users, Star, Briefcase, MapPin, ChevronRight, BarChart3, Filter } from 'lucide-react';

// Territory B: Thoughtful & Calm (Stoic-inspired)
// Characteristics: Minimalist, calm colors, thoughtful data presentation, generous whitespace

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend?: string;
  icon: React.ReactNode;
  gradient?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, trend, icon, gradient = false }) => {
  return (
    <div className={`
      ${gradient
        ? 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700'
        : 'bg-neutral-900/50 border-neutral-800/50'
      }
      backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl hover:border-neutral-700
    `}>
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 bg-neutral-800/50 rounded-xl border border-neutral-700/50">
          {icon}
        </div>
        {trend && (
          <div className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
            {trend}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-3xl font-light text-neutral-100">{value}</div>
        <div className="text-sm font-medium text-neutral-400">{title}</div>
        <div className="text-xs text-neutral-500">{subtitle}</div>
      </div>
    </div>
  );
};

interface CandidateCardProps {
  name: string;
  title: string;
  location: string;
  score: number;
  referrals: number;
  experience: string;
  available: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ name, title, location, score, referrals, experience, available }) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-accent-400 bg-accent-400/10 border-accent-400/20';
    if (score >= 70) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (score >= 50) return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  return (
    <div className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl p-8 border border-neutral-800/50 hover:border-neutral-700 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <h3 className="text-xl font-light text-neutral-100">{name}</h3>
            {available && (
              <div className="px-3 py-1 bg-emerald-400/10 border border-emerald-400/20 rounded-full">
                <span className="text-xs font-medium text-emerald-400">Available</span>
              </div>
            )}
          </div>
          <div className="space-y-2 text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              {title}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {experience}
            </div>
          </div>
        </div>
        <div className={`px-6 py-3 rounded-2xl font-light text-lg border ${getScoreColor(score)}`}>
          {score}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-neutral-800/50">
        <div className="flex items-center gap-6 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {referrals} referrals
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Top candidate
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-sm font-medium text-neutral-300 transition-colors duration-200">
            View
          </button>
          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-xl text-sm font-medium text-white transition-colors duration-200">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
export const RecruiterDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <div className="bg-neutral-900/20 backdrop-blur-sm border-b border-neutral-800/50 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-light text-neutral-100">Recruiter Dashboard</h1>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search thoughtfully..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-6 py-3 bg-neutral-900/50 border border-neutral-800/50 rounded-xl text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 w-96 transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="p-3 text-neutral-500 hover:text-neutral-300 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-600/20 rounded-full flex items-center justify-center">
                  <span className="text-primary-400 font-light text-sm">JD</span>
                </div>
                <span className="text-neutral-300 font-light">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Metrics Overview */}
        <div className="mb-12">
          <h2 className="text-lg font-light text-neutral-400 mb-8">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <MetricCard
              title="Time to Hire"
              value="24 days"
              subtitle="Average duration"
              trend="-12% improvement"
              icon={<Clock className="w-6 h-6 text-primary-400" />}
              gradient={true}
            />
            <MetricCard
              title="Fit Score"
              value="87/100"
              subtitle="Quality metric"
              trend="+5 points"
              icon={<Star className="w-6 h-6 text-accent-400" />}
            />
            <MetricCard
              title="Active Roles"
              value="12"
              subtitle="Open positions"
              icon={<Briefcase className="w-6 h-6 text-emerald-400" />}
            />
            <MetricCard
              title="Commission"
              value="$52k"
              subtitle="Potential earnings"
              trend="+8% vs target"
              icon={<DollarSign className="w-6 h-6 text-amber-400" />}
              gradient={true}
            />
          </div>
        </div>

        {/* Top Candidates */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-light text-neutral-400 mb-1">Thoughtful Candidates</h2>
              <p className="text-sm text-neutral-600">Carefully selected based on comprehensive analysis</p>
            </div>
            <button className="text-primary-400 hover:text-primary-300 font-light text-sm flex items-center gap-2 transition-colors">
              View all candidates
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CandidateCard
              name="Sarah Chen"
              title="Senior Product Designer"
              location="San Francisco, CA"
              score={92}
              referrals={3}
              experience="8+ years"
              available={true}
            />
            <CandidateCard
              name="Marcus Rodriguez"
              title="Staff Engineer"
              location="Remote"
              score={89}
              referrals={2}
              experience="12+ years"
              available={true}
            />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl p-8 border border-neutral-800/50">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-primary-400" />
            <h2 className="text-lg font-light text-neutral-400">Performance Analytics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-2xl font-light text-neutral-100 mb-2">94%</div>
              <div className="text-sm text-neutral-500">Response Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-neutral-100 mb-2">4.8</div>
              <div className="text-sm text-neutral-500">Candidate Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-neutral-100 mb-2">87%</div>
              <div className="text-sm text-neutral-500">Match Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simplified FitQueue for Territory B
export const FitQueue: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const candidates = [
    { id: '1', name: 'Sarah Chen', title: 'Product Designer', score: 92, status: 'Available' },
    { id: '2', name: 'Marcus Rodriguez', title: 'Staff Engineer', score: 89, status: 'Available' },
    { id: '3', name: 'Elena Kim', title: 'Design Lead', score: 87, status: 'In Discussion' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <div className="bg-neutral-900/20 backdrop-blur-sm border-b border-neutral-800/50">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl font-light text-neutral-100 mb-4">Thoughtful Candidate Review</h1>
            <p className="text-lg text-neutral-500">Carefully evaluate each candidate with detailed insights</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-neutral-500 w-6 h-6" />
              <input
                type="text"
                placeholder="Search candidates with purpose..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-8 py-4 bg-neutral-900/50 border border-neutral-800/50 rounded-2xl text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 text-lg transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-400/10 border border-accent-400/20 rounded-full">
              <span className="text-accent-400 font-medium">{candidates.length} candidates</span>
              <span className="text-neutral-600">ready for thoughtful review</span>
            </div>
          </div>

          <div className="space-y-8">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl p-10 border border-neutral-800/50 hover:border-neutral-700 transition-all duration-300">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-6 mb-4">
                      <h3 className="text-2xl font-light text-neutral-100">{candidate.name}</h3>
                      <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                        candidate.status === 'Available'
                          ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                          : 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                      }`}>
                        {candidate.status}
                      </div>
                    </div>
                    <p className="text-lg text-neutral-400 mb-2">{candidate.title}</p>
                  </div>
                  <div className={`px-8 py-4 rounded-2xl text-2xl font-light ${
                    candidate.score >= 90
                      ? 'text-accent-400 bg-accent-400/10 border border-accent-400/20'
                      : 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20'
                  }`}>
                    {candidate.score}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-neutral-800/50">
                  <div className="text-sm text-neutral-600">
                    Comprehensive analysis available
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-neutral-300 transition-colors duration-200">
                      View Profile
                    </button>
                    <button className="px-6 py-3 bg-primary-600 hover:bg-primary-500 rounded-xl text-white transition-colors duration-200">
                      Schedule Interview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};