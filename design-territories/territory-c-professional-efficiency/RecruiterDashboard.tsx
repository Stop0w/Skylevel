import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Clock, DollarSign, Users, Calendar, ChevronRight, MoreVertical, Settings, BarChart3, Activity, Briefcase, MapPin, AlertCircle } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  compact?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, changeType = 'neutral', icon, compact = false }) => {
  const changeColors = {
    positive: 'text-emerald-500',
    negative: 'text-red-500',
    neutral: 'text-neutral-400'
  };

  return (
    <div className={`
      ${compact ? 'p-4' : 'p-6'}
      bg-neutral-900 border border-neutral-800 rounded-lg
      hover:border-neutral-700 transition-colors duration-150
    `}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 ${compact ? 'bg-neutral-800' : 'bg-neutral-800/50'} rounded-lg`}>
          {icon}
        </div>
        {change && (
          <span className={`text-xs font-medium ${changeColors[changeType]}`}>
            {change}
          </span>
        )}
      </div>
      <div className={`${compact ? 'text-xl' : 'text-2xl'} font-semibold text-neutral-100 mb-1`}>
        {value}
      </div>
      <div className="text-xs text-neutral-500">{title}</div>
    </div>
  );
};

interface HotCandidateProps {
  id: string;
  name: string;
  title: string;
  score: number;
  referrals: number;
  location: string;
  status: 'available' | 'interviewing' | 'offer';
  lastActive: string;
  skills: string[];
}

const HotCandidate: React.FC<HotCandidateProps> = ({
  id, name, title, score, referrals, location, status, lastActive, skills
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'interviewing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'offer': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20';
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-colors duration-150">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-neutral-100 truncate">{name}</h3>
            <div className={`px-2 py-0.5 rounded border text-xs font-medium ${getStatusColor(status)}`}>
              {status}
            </div>
          </div>
          <p className="text-sm text-neutral-400 mb-2 truncate">{title}</p>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {referrals}
            </span>
            <span>{lastActive}</span>
          </div>
        </div>
        <div className={`w-12 h-12 ${getScoreColor(score)} rounded-lg flex items-center justify-center text-white font-bold text-sm ml-3`}>
          {score}
        </div>
      </div>

      <div className="flex gap-1 mb-3">
        {skills.slice(0, 4).map((skill, idx) => (
          <span key={idx} className="px-2 py-1 bg-neutral-800 text-neutral-300 rounded text-xs">
            {skill}
          </span>
        ))}
        {skills.length > 4 && (
          <span className="px-2 py-1 bg-neutral-800 text-neutral-400 rounded text-xs">
            +{skills.length - 4}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <button className="flex-1 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm rounded transition-colors duration-150">
          View
        </button>
        <button className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors duration-150">
          Contact
        </button>
        <button className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded transition-colors duration-150">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface JobPipelineProps {
  title: string;
  stages: { name: string; count: number; color: string }[];
  avgFit: number;
  reviewRate: number;
}

const JobPipeline: React.FC<JobPipelineProps> = ({ title, stages, avgFit, reviewRate }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
      <h3 className="font-semibold text-neutral-100 mb-3">{title}</h3>

      <div className="flex items-center gap-1 mb-3">
        {stages.map((stage, idx) => (
          <div key={stage.name} className="flex-1 flex flex-col items-center">
            <div className={`w-full ${stage.color} rounded py-2 text-center text-white text-xs font-medium mb-1`}>
              {stage.count}
            </div>
            <div className="text-xs text-neutral-500">{stage.name}</div>
            {idx < stages.length - 1 && (
              <ChevronRight className="w-3 h-3 text-neutral-600 -mr-3" />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-800">
        <span>Avg Fit: {avgFit}%</span>
        <span>Review: {reviewRate}%</span>
      </div>
    </div>
  );
};

export const RecruiterDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedView, setSelectedView] = useState<'overview' | 'candidates' | 'pipeline'>('overview');

  const hotCandidates: HotCandidateProps[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'Product Designer',
      score: 92,
      referrals: 3,
      location: 'San Francisco',
      status: 'available',
      lastActive: '2h ago',
      skills: ['Figma', 'React', 'TypeScript', 'Design Systems']
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      title: 'Senior Developer',
      score: 89,
      referrals: 2,
      location: 'Remote',
      status: 'interviewing',
      lastActive: '1d ago',
      skills: ['TypeScript', 'React', 'Node.js', 'Python']
    },
    {
      id: '3',
      name: 'Alex Kim',
      title: 'Frontend Engineer',
      score: 87,
      referrals: 1,
      location: 'New York',
      status: 'available',
      lastActive: '3h ago',
      skills: ['JavaScript', 'Vue', 'CSS', 'HTML']
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <div className="border-b border-neutral-900 bg-neutral-900/50 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-semibold text-neutral-100">Recruiter Dashboard</h1>

              <div className="flex items-center gap-1 bg-neutral-800 rounded-lg p-1">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'candidates', label: 'Candidates' },
                  { id: 'pipeline', label: 'Pipeline' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedView(tab.id as any)}
                    className={`px-3 py-1.5 text-sm font-medium rounded transition-colors duration-150 ${
                      selectedView === tab.id
                        ? 'bg-neutral-700 text-neutral-100'
                        : 'text-neutral-400 hover:text-neutral-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-blue-500 w-48"
                />
              </div>
              <button className="p-2 text-neutral-400 hover:text-neutral-200 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 text-neutral-400 hover:text-neutral-200 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <KPICard
            title="Avg Hire Time"
            value="24 days"
            change="-12%"
            changeType="positive"
            icon={<Clock className="w-5 h-5 text-neutral-400" />}
          />
          <KPICard
            title="Avg Fit Score"
            value="87"
            change="+5 pts"
            changeType="positive"
            icon={<TrendingUp className="w-5 h-5 text-neutral-400" />}
          />
          <KPICard
            title="Active Comm."
            value="$52k"
            change="+8%"
            changeType="positive"
            icon={<DollarSign className="w-5 h-5 text-neutral-400" />}
          />
          <KPICard
            title="Hot Candidates"
            value={hotCandidates.length}
            change="New"
            changeType="neutral"
            icon={<Activity className="w-5 h-5 text-neutral-400" />}
          />
        </div>

        {selectedView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hot Candidates */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-neutral-100 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Hot Candidates
                </h2>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  View all →
                </button>
              </div>

              <div className="space-y-3">
                {hotCandidates.map(candidate => (
                  <HotCandidate key={candidate.id} {...candidate} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="font-semibold text-neutral-100 mb-4">Quick Actions</h2>

              <div className="space-y-3">
                <button className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors duration-150 text-left">
                  <div className="flex items-center gap-3 mb-1">
                    <Search className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-neutral-100">Review Fit Queue</span>
                  </div>
                  <p className="text-xs text-neutral-500">12 candidates waiting</p>
                </button>

                <button className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors duration-150 text-left">
                  <div className="flex items-center gap-3 mb-1">
                    <Briefcase className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium text-neutral-100">Post New Job</span>
                  </div>
                  <p className="text-xs text-neutral-500">Create job listing</p>
                </button>

                <button className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors duration-150 text-left">
                  <div className="flex items-center gap-3 mb-1">
                    <BarChart3 className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-neutral-100">Analytics</span>
                  </div>
                  <p className="text-xs text-neutral-500">View performance metrics</p>
                </button>

                <button className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors duration-150 text-left">
                  <div className="flex items-center gap-3 mb-1">
                    <Users className="w-4 h-4 text-amber-500" />
                    <span className="font-medium text-neutral-100">Team Settings</span>
                  </div>
                  <p className="text-xs text-neutral-500">Manage team access</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'candidates' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {hotCandidates.map(candidate => (
              <HotCandidate key={candidate.id} {...candidate} />
            ))}
            {/* Repeat candidates for grid view */}
            {hotCandidates.map(candidate => (
              <HotCandidate key={`${candidate.id}-2`} {...candidate} />
            ))}
          </div>
        )}

        {selectedView === 'pipeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <JobPipeline
              title="Senior Frontend Developer"
              stages={[
                { name: 'App', count: 45, color: 'bg-neutral-600' },
                { name: 'Rev', count: 12, color: 'bg-blue-500' },
                { name: 'Int', count: 5, color: 'bg-purple-500' },
                { name: 'Off', count: 2, color: 'bg-amber-500' },
                { name: 'Hir', count: 1, color: 'bg-emerald-500' }
              ]}
              avgFit={82}
              reviewRate={27}
            />

            <JobPipeline
              title="Product Manager"
              stages={[
                { name: 'App', count: 38, color: 'bg-neutral-600' },
                { name: 'Rev', count: 10, color: 'bg-blue-500' },
                { name: 'Int', count: 3, color: 'bg-purple-500' },
                { name: 'Off', count: 1, color: 'bg-amber-500' },
                { name: 'Hir', count: 0, color: 'bg-gray-600' }
              ]}
              avgFit={75}
              reviewRate={26}
            />

            <JobPipeline
              title="DevOps Engineer"
              stages={[
                { name: 'App', count: 32, color: 'bg-neutral-600' },
                { name: 'Rev', count: 8, color: 'bg-blue-500' },
                { name: 'Int', count: 4, color: 'bg-purple-500' },
                { name: 'Off', count: 2, color: 'bg-amber-500' },
                { name: 'Hir', count: 1, color: 'bg-emerald-500' }
              ]}
              avgFit={78}
              reviewRate={25}
            />

            <JobPipeline
              title="UX Designer"
              stages={[
                { name: 'App', count: 28, color: 'bg-neutral-600' },
                { name: 'Rev', count: 7, color: 'bg-blue-500' },
                { name: 'Int', count: 3, color: 'bg-purple-500' },
                { name: 'Off', count: 1, color: 'bg-amber-500' },
                { name: 'Hir', count: 0, color: 'bg-gray-600' }
              ]}
              avgFit={81}
              reviewRate={25}
            />
          </div>
        )}

        {/* Recent Activity Feed */}
        <div className="mt-6">
          <h2 className="font-semibold text-neutral-100 mb-4">Recent Activity</h2>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
            <div className="space-y-3">
              {[
                { user: 'Sarah Chen', action: 'Applied to', target: 'Senior Frontend Developer', time: '2 hours ago', type: 'application' },
                { user: 'You', action: 'Scheduled interview with', target: 'Mike Rodriguez', time: '3 hours ago', type: 'interview' },
                { user: 'Alex Kim', action: 'Referral submitted for', target: 'Elena Thompson', time: '5 hours ago', type: 'referral' },
                { user: 'System', action: 'New candidates matching', target: 'Product Designer', time: '1 day ago', type: 'system' }
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'application' ? 'bg-blue-500' :
                      activity.type === 'interview' ? 'bg-emerald-500' :
                      activity.type === 'referral' ? 'bg-purple-500' :
                      'bg-neutral-500'
                    }`}></div>
                    <div className="text-sm">
                      <span className="font-medium text-neutral-100">{activity.user}</span>
                      <span className="text-neutral-400"> {activity.action} </span>
                      <span className="font-medium text-neutral-200">{activity.target}</span>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};