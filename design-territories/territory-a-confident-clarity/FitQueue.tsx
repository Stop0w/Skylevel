import React, { useState } from 'react';
import { Search, Filter, Star, StarOff, Eye, Calendar, MessageCircle, X, ChevronDown, ChevronUp, SlidersHorizontal, User, MapPin, Briefcase } from 'lucide-react';

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