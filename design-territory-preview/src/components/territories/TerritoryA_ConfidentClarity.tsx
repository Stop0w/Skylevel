import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Clock, DollarSign, Users, Calendar, Star, ChevronRight, Plus, MessageCircle, Eye, StarOff, ChevronDown, ChevronUp, SlidersHorizontal, MapPin, Briefcase, X } from 'lucide-react';

// Dashboard Components
interface KPITileProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend?: string;
  color?: string;
}

const KPITile: React.FC<KPITileProps> = ({ icon, value, label, trend, color = "primary" }) => {
  const bgColors: Record<string, string> = {
    primary: "bg-gradient-to-br from-primary-500 to-primary-600",
    success: "bg-gradient-to-br from-green-500 to-green-600",
    gold: "bg-gradient-to-br from-accent-400 to-accent-500",
    blue: "bg-gradient-to-br from-blue-500 to-blue-600"
  };

  return (
    <div className={`${bgColors[color]} rounded-xl p-6 text-white shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl`}>
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-90">{label}</div>
    </div>
  );
};

interface HotCandidateProps {
  name: string;
  title: string;
  score: number;
  referrals: number;
  available: boolean;
}

const HotCandidate: React.FC<HotCandidateProps> = ({ name, title, score, referrals, available }) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-accent-400 text-neutral-950';
    if (score >= 70) return 'bg-green-500 text-white';
    return 'bg-orange-500 text-white';
  };

  return (
    <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-primary-500 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <p className="text-neutral-400 mb-2">{title}</p>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-neutral-300">
              <Users className="w-4 h-4" />
              {referrals} referrals
            </span>
            {available && (
              <span className="flex items-center gap-1 text-green-400">
                <Clock className="w-4 h-4" />
                Available now
              </span>
            )}
          </div>
        </div>
        <div className={`px-4 py-2 rounded-full font-bold text-lg ${getScoreColor(score)}`}>
          {score}%
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
          <Eye className="w-4 h-4" />
          View Profile
        </button>
        <button className="flex-1 bg-accent-400 hover:bg-accent-500 text-neutral-950 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" />
          Schedule
        </button>
      </div>
    </div>
  );
};

interface JobPipelineProps {
  title: string;
  applications: number;
  reviewing: number;
  interviews: number;
  offers: number;
  hired: number;
  avgFit: number;
}

const JobPipeline: React.FC<JobPipelineProps> = ({
  title, applications, reviewing, interviews, offers, hired, avgFit
}) => {
  const stages = [
    { name: 'App', value: applications, color: 'bg-neutral-600' },
    { name: 'Rev', value: reviewing, color: 'bg-blue-500' },
    { name: 'Int', value: interviews, color: 'bg-purple-500' },
    { name: 'Off', value: offers, color: 'bg-orange-500' },
    { name: 'Hir', value: hired, color: 'bg-green-500' }
  ];

  const total = applications || 1;

  return (
    <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>

      <div className="flex items-center gap-2 mb-4">
        {stages.map((stage, index) => (
          <div key={stage.name} className="flex-1 relative">
            <div className={`${stage.color} rounded-lg p-3 text-center text-white font-semibold relative`}>
              {stage.value}
              <div className="text-xs opacity-80">{stage.name}</div>
            </div>
            {index < stages.length - 1 && (
              <ChevronRight className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-neutral-400">Avg Fit: {avgFit}%</span>
        <span className="text-neutral-400">Review rate: {Math.round((reviewing / total) * 100)}%</span>
      </div>
    </div>
  );
};

// FitQueue Components
interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  fitScore: number;
  tms: number;
  srs: number;
  rns: number;
  skills: string[];
  referrals: number;
  status: 'new' | 'reviewing' | 'contacted' | 'interview' | 'offer';
  isNew?: boolean;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Product Designer',
    location: 'San Francisco',
    fitScore: 92,
    tms: 90,
    srs: 88,
    rns: 95,
    skills: ['React', 'Figma', 'TypeScript', 'UI/UX', 'Design Systems'],
    referrals: 3,
    status: 'new',
    isNew: true
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    title: 'Senior Developer',
    location: 'Remote',
    fitScore: 89,
    tms: 95,
    srs: 82,
    rns: 88,
    skills: ['TypeScript', 'React', 'Node.js', 'Python', 'AWS'],
    referrals: 2,
    status: 'reviewing'
  },
  {
    id: '3',
    name: 'Alex Kim',
    title: 'Frontend Engineer',
    location: 'New York',
    fitScore: 87,
    tms: 92,
    srs: 85,
    rns: 84,
    skills: ['JavaScript', 'React', 'Vue', 'CSS', 'HTML'],
    referrals: 1,
    status: 'reviewing'
  },
  {
    id: '4',
    name: 'Maria Lopez',
    title: 'Full Stack Developer',
    location: 'Austin',
    fitScore: 85,
    tms: 88,
    srs: 82,
    rns: 85,
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker'],
    referrals: 2,
    status: 'contacted'
  },
  {
    id: '5',
    name: 'David Park',
    title: 'Backend Engineer',
    location: 'Seattle',
    fitScore: 83,
    tms: 90,
    srs: 78,
    rns: 81,
    skills: ['Java', 'Spring', 'Kubernetes', 'MongoDB', 'Redis'],
    referrals: 1,
    status: 'interview'
  }
];

const ScorePill: React.FC<{ score: number; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  score, size = 'md', className = ''
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-gradient-to-r from-accent-400 to-accent-500 text-neutral-950';
    if (score >= 70) return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
    if (score >= 50) return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white';
    return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm font-bold',
    md: 'h-10 px-4 text-base font-bold',
    lg: 'h-12 px-6 text-lg font-bold'
  };

  return (
    <div className={`
      ${getScoreColor(score)}
      ${sizeClasses[size]}
      rounded-full font-bold
      flex items-center justify-center
      shadow-lg transform transition-all duration-200 hover:scale-105
      ${className}
    `}>
      {score}%
    </div>
  );
};

const CandidateCard: React.FC<{
  candidate: Candidate;
  onStarToggle: (id: string) => void;
  isStarred: boolean;
}> = ({ candidate, onStarToggle, isStarred }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-500';
      case 'reviewing': return 'bg-blue-500';
      case 'contacted': return 'bg-purple-500';
      case 'interview': return 'bg-orange-500';
      case 'offer': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'New';
      case 'reviewing': return 'Reviewing';
      case 'contacted': return 'Contacted';
      case 'interview': return 'Interview';
      case 'offer': return 'Offer';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl border border-neutral-700 hover:border-primary-500 transition-all duration-200 hover:shadow-xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <button
              onClick={() => onStarToggle(candidate.id)}
              className="mt-1 text-neutral-400 hover:text-accent-400 transition-colors"
            >
              {isStarred ? <Star className="w-5 h-5 fill-current text-accent-400" /> : <StarOff className="w-5 h-5" />}
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-white">{candidate.name}</h3>
                {candidate.isNew && (
                  <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
                <span className={`${getStatusColor(candidate.status)} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
                  {getStatusText(candidate.status)}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-neutral-400 mb-3">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {candidate.title}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {candidate.location}
                </span>
              </div>
            </div>
            <ScorePill score={candidate.fitScore} size="lg" />
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="mb-4">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="text-sm text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1 mb-2"
          >
            {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Fit Score Breakdown
          </button>

          {showBreakdown && (
            <div className="bg-neutral-800/50 rounded-lg p-3 mb-4">
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-neutral-400">TMS:</span>
                  <span className="ml-2 text-white font-semibold">{candidate.tms}</span>
                </div>
                <div>
                  <span className="text-neutral-400">SRS:</span>
                  <span className="ml-2 text-white font-semibold">{candidate.srs}</span>
                </div>
                <div>
                  <span className="text-neutral-400">RNS:</span>
                  <span className="ml-2 text-white font-semibold">{candidate.rns}</span>
                </div>
              </div>
            </div>
          )}

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {candidate.skills.slice(0, 4).map((skill, index) => (
              <span key={index} className="bg-neutral-700 text-neutral-300 px-3 py-1 rounded-full text-xs font-medium">
                {skill} ✓
              </span>
            ))}
            {candidate.referrals > 0 && (
              <span className="bg-accent-400/20 text-accent-400 px-3 py-1 rounded-full text-xs font-medium">
                {candidate.referrals} referrals
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <button className="bg-neutral-700 hover:bg-neutral-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1">
            <Eye className="w-4 h-4" />
            View
          </button>
          <button className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1">
            <Calendar className="w-4 h-4" />
            Schedule
          </button>
          <button className="bg-neutral-700 hover:bg-neutral-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1">
            <MessageCircle className="w-4 h-4" />
            Message
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1">
            <X className="w-4 h-4" />
            Reject
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
      <div className="bg-neutral-900 border-b border-neutral-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white">Recruiter Dashboard</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-primary-500 w-64"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  JD
                </div>
                <span className="text-white">John Doe</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* KPI Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPITile
            icon={<Clock className="w-6 h-6 text-white" />}
            value="24 days"
            label="Avg Hire Time"
            trend="-12% vs last month"
            color="primary"
          />
          <KPITile
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            value="87/100"
            label="Avg Fit Score"
            trend="+5 points"
            color="success"
          />
          <KPITile
            icon={<DollarSign className="w-6 h-6 text-white" />}
            value="$52k"
            label="Active Commission"
            trend="+8% vs target"
            color="gold"
          />
          <KPITile
            icon={<Star className="w-6 h-6 text-white" />}
            value="3 Hot"
            label="Candidates"
            trend="New this week"
            color="blue"
          />
        </div>

        {/* Hot Candidates */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <div className="w-2 h-8 bg-accent-400 rounded-full"></div>
              🔥 Hot Candidates
            </h2>
            <span className="text-neutral-400">90+ Score, 2+ Referrals</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HotCandidate
              name="Sarah Chen"
              title="Product Designer • San Francisco"
              score={92}
              referrals={3}
              available={true}
            />
            <HotCandidate
              name="Mike Rodriguez"
              title="Senior Developer • Remote"
              score={89}
              referrals={2}
              available={true}
            />
          </div>
        </div>

        {/* Active Jobs Pipeline */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <div className="w-2 h-8 bg-primary-600 rounded-full"></div>
              Active Jobs Pipeline
            </h2>
            <button className="text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1">
              View All Jobs
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <JobPipeline
              title="Senior Frontend Developer"
              applications={45}
              reviewing={12}
              interviews={5}
              offers={2}
              hired={1}
              avgFit={82}
            />
            <JobPipeline
              title="Product Manager"
              applications={38}
              reviewing={10}
              interviews={3}
              offers={1}
              hired={0}
              avgFit={75}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-left transition-all duration-200 hover:scale-105">
              <div className="flex items-center gap-3 mb-2">
                <Filter className="w-5 h-5" />
                <span className="font-semibold">Review Fit Queue</span>
              </div>
              <p className="text-sm opacity-80">12 candidates ready for review</p>
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-left transition-all duration-200 hover:scale-105">
              <div className="flex items-center gap-3 mb-2">
                <Plus className="w-5 h-5" />
                <span className="font-semibold">Post New Job</span>
              </div>
              <p className="text-sm opacity-80">Create a new job listing</p>
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-left transition-all duration-200 hover:scale-105">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">View Analytics</span>
              </div>
              <p className="text-sm opacity-80">Track your hiring metrics</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// FitQueue Component
export const FitQueue: React.FC = () => {
  const [candidates] = useState<Candidate[]>(mockCandidates);
  const [starredCandidates, setStarredCandidates] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [minFitScore, setMinFitScore] = useState(0);
  const [sortBy, setSortBy] = useState('fitScore');

  const handleStarToggle = (id: string) => {
    setStarredCandidates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.fitScore >= minFitScore &&
    (candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <div className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-white">Fit Queue</h1>
            <div className="flex items-center gap-4">
              <div className="text-neutral-400">
                {filteredCandidates.length} candidates
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search candidates by name, title, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-primary-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-3 rounded-lg transition-colors duration-200"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="fitScore">Fit Score</option>
                <option value="name">Name</option>
                <option value="referrals">Referrals</option>
                <option value="new">Newest</option>
              </select>

              {starredCandidates.size > 0 && (
                <button className="bg-accent-400 hover:bg-accent-500 text-neutral-950 font-semibold px-4 py-3 rounded-lg transition-colors duration-200">
                  Shortlist ({starredCandidates.size}) →
                </button>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-neutral-800 rounded-lg border border-neutral-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Min Fit Score: {minFitScore}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={minFitScore}
                    onChange={(e) => setMinFitScore(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Location
                  </label>
                  <select className="w-full bg-neutral-700 border border-neutral-600 text-white px-3 py-2 rounded-lg">
                    <option>All Locations</option>
                    <option>Remote</option>
                    <option>San Francisco</option>
                    <option>New York</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Job Role
                  </label>
                  <select className="w-full bg-neutral-700 border border-neutral-600 text-white px-3 py-2 rounded-lg">
                    <option>All Roles</option>
                    <option>Developer</option>
                    <option>Designer</option>
                    <option>Manager</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Candidate List */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6">
          {filteredCandidates.map(candidate => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onStarToggle={handleStarToggle}
              isStarred={starredCandidates.has(candidate.id)}
            />
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-neutral-400 text-lg mb-4">No candidates found</div>
            <button className="text-primary-400 hover:text-primary-300 font-medium">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};