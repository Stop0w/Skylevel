import React, { useState } from 'react';
import { Search, TrendingUp, Clock, DollarSign, Users, Calendar, Star, Briefcase, MapPin, ChevronRight, Activity, BarChart3 } from 'lucide-react';

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

const CandidateCard: React.FC<CandidateCardProps> = ({
  name, title, location, score, referrals, experience, available
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (score >= 70) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    if (score >= 50) return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
  };

  return (
    <div className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl p-8 border border-neutral-800/50 transition-all duration-300 hover:border-neutral-700 hover:shadow-lg">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-light text-neutral-100 mb-2">{name}</h3>
          <p className="text-neutral-400 mb-4">{title}</p>

          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              {experience}
            </div>
            {available && (
              <div className="flex items-center gap-2 text-emerald-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                Available
              </div>
            )}
          </div>
        </div>

        <div className={`px-6 py-3 rounded-xl border font-mono text-lg font-light ${getScoreColor(score)}`}>
          {score}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-neutral-800/50">
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <Users className="w-4 h-4" />
          {referrals} referral{referrals !== 1 ? 's' : ''}
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm text-neutral-400 hover:text-neutral-200 transition-colors duration-200">
            View Profile
          </button>
          <button className="px-4 py-2 text-sm bg-neutral-800/50 hover:bg-neutral-800 text-neutral-200 rounded-xl transition-all duration-200">
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

interface PipelineStageProps {
  name: string;
  count: number;
  color: string;
}

const PipelineStage: React.FC<PipelineStageProps> = ({ name, count, color }) => {
  return (
    <div className="flex-1 text-center">
      <div className={`${color} rounded-xl p-4 mb-2 transition-all duration-200 hover:scale-105`}>
        <div className="text-2xl font-light text-white">{count}</div>
      </div>
      <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">{name}</div>
    </div>
  );
};

export const RecruiterDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5 pointer-events-none"></div>

      {/* Header */}
      <div className="relative border-b border-neutral-900/50 backdrop-blur-sm bg-neutral-950/30">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div>
                <h1 className="text-3xl font-light text-neutral-100 mb-1">Recruiter Dashboard</h1>
                <p className="text-sm text-neutral-500">Thoughtful hiring intelligence</p>
              </div>

              <div className="hidden md:flex items-center gap-4">
                {['day', 'week', 'month', 'quarter'].map((frame) => (
                  <button
                    key={frame}
                    onClick={() => setSelectedTimeframe(frame)}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                      selectedTimeframe === frame
                        ? 'bg-neutral-800 text-neutral-200'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {frame.charAt(0).toUpperCase() + frame.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search thoughtfully..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-neutral-900/50 border border-neutral-800/50 rounded-xl text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700 w-64"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-light">
                  JD
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-8 py-12">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="Time to Hire"
            value="24 days"
            subtitle="Average duration"
            trend="-12% efficiency"
            icon={<Clock className="w-5 h-5 text-neutral-400" />}
            gradient={true}
          />
          <MetricCard
            title="Fit Score"
            value="87/100"
            subtitle="Candidate quality"
            trend="+5 points"
            icon={<TrendingUp className="w-5 h-5 text-neutral-400" />}
          />
          <MetricCard
            title="Active Value"
            value="$52k"
            subtitle="Commission pipeline"
            trend="+8% vs target"
            icon={<DollarSign className="w-5 h-5 text-neutral-400" />}
          />
          <MetricCard
            title="Opportunities"
            value="3"
            subtitle="High-potential matches"
            trend="New this week"
            icon={<Star className="w-5 h-5 text-neutral-400" />}
            gradient={true}
          />
        </div>

        {/* High-Potential Candidates */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-neutral-100 mb-2">High-Potential Candidates</h2>
              <p className="text-sm text-neutral-500">Curated matches with exceptional fit scores</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <Activity className="w-4 h-4" />
              <span>Updated 2 hours ago</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CandidateCard
              name="Sarah Chen"
              title="Product Designer"
              location="San Francisco"
              score={92}
              referrals={3}
              experience="8 years"
              available={true}
            />
            <CandidateCard
              name="Michael Rodriguez"
              title="Senior Developer"
              location="Remote"
              score={89}
              referrals={2}
              experience="6 years"
              available={true}
            />
          </div>
        </div>

        {/* Pipeline Analysis */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-neutral-100 mb-2">Pipeline Analysis</h2>
              <p className="text-sm text-neutral-500">Candidate flow through hiring stages</p>
            </div>
            <button className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-200 transition-colors">
              <BarChart3 className="w-4 h-4" />
              View Detailed Analytics
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl p-8 border border-neutral-800/50">
              <h3 className="text-lg font-light text-neutral-100 mb-6">Senior Frontend Developer</h3>

              <div className="flex items-center gap-2 mb-6">
                <PipelineStage name="Applied" count={45} color="bg-neutral-700" />
                <PipelineStage name="Review" count={12} color="bg-blue-600" />
                <PipelineStage name="Interview" count={5} color="bg-purple-600" />
                <PipelineStage name="Offer" count={2} color="bg-amber-600" />
                <PipelineStage name="Hired" count={1} color="bg-emerald-600" />
              </div>

              <div className="flex justify-between text-sm text-neutral-500">
                <span>Average Fit: 82%</span>
                <span>Review Rate: 27%</span>
              </div>
            </div>

            <div className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl p-8 border border-neutral-800/50">
              <h3 className="text-lg font-light text-neutral-100 mb-6">Product Manager</h3>

              <div className="flex items-center gap-2 mb-6">
                <PipelineStage name="Applied" count={38} color="bg-neutral-700" />
                <PipelineStage name="Review" count={10} color="bg-blue-600" />
                <PipelineStage name="Interview" count={3} color="bg-purple-600" />
                <PipelineStage name="Offer" count={1} color="bg-amber-600" />
                <PipelineStage name="Hired" count={0} color="bg-gray-600" />
              </div>

              <div className="flex justify-between text-sm text-neutral-500">
                <span>Average Fit: 75%</span>
                <span>Review Rate: 26%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thoughtful Actions */}
        <div className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700/50">
          <h2 className="text-xl font-light text-neutral-100 mb-6">Thoughtful Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="group bg-neutral-900/50 hover:bg-neutral-900/70 rounded-xl p-6 text-left transition-all duration-300 border border-neutral-800/50 hover:border-neutral-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <Search className="w-5 h-5 text-blue-400" />
                </div>
                <span className="font-medium text-neutral-200">Review Queue</span>
              </div>
              <p className="text-sm text-neutral-500 mb-4">12 candidates awaiting thoughtful review</p>
              <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                Begin Review
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button className="group bg-neutral-900/50 hover:bg-neutral-900/70 rounded-xl p-6 text-left transition-all duration-300 border border-neutral-800/50 hover:border-neutral-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="font-medium text-neutral-200">New Position</span>
              </div>
              <p className="text-sm text-neutral-500 mb-4">Create thoughtful job description</p>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                Create Role
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button className="group bg-neutral-900/50 hover:bg-neutral-900/70 rounded-xl p-6 text-left transition-all duration-300 border border-neutral-800/50 hover:border-neutral-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                </div>
                <span className="font-medium text-neutral-200">Analytics</span>
              </div>
              <p className="text-sm text-neutral-500 mb-4">Deep dive into hiring metrics</p>
              <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                View Insights
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};