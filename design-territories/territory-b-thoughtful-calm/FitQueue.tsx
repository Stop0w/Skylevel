import React, { useState } from 'react';
import { Search, Filter, Star, StarOff, Eye, Calendar, MessageCircle, X, ChevronDown, ChevronUp, SlidersHorizontal, Briefcase, MapPin, Users, BarChart3, Clock } from 'lucide-react';

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
  experience: string;
  status: 'new' | 'reviewing' | 'contacted' | 'interview' | 'offer';
  lastActive: string;
  availability?: 'immediate' | '2weeks' | '1month';
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Product Designer',
    location: 'San Francisco, CA',
    fitScore: 92,
    tms: 90,
    srs: 88,
    rns: 95,
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'UI/UX'],
    referrals: 3,
    experience: '8 years',
    status: 'new',
    lastActive: '2 hours ago',
    availability: 'immediate'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    title: 'Senior Frontend Developer',
    location: 'Remote',
    fitScore: 89,
    tms: 95,
    srs: 82,
    rns: 88,
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL'],
    referrals: 2,
    experience: '6 years',
    status: 'reviewing',
    lastActive: '1 day ago',
    availability: '2weeks'
  },
  {
    id: '3',
    name: 'Elena Thompson',
    title: 'Product Manager',
    location: 'New York, NY',
    fitScore: 87,
    tms: 85,
    srs: 90,
    rns: 84,
    skills: ['Strategy', 'Analytics', 'Leadership', 'Agile', 'Roadmapping'],
    referrals: 4,
    experience: '12 years',
    status: 'reviewing',
    lastActive: '3 hours ago',
    availability: 'immediate'
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'DevOps Engineer',
    location: 'Seattle, WA',
    fitScore: 85,
    tms: 88,
    srs: 82,
    rns: 85,
    skills: ['Kubernetes', 'Docker', 'AWS', 'CI/CD', 'Terraform'],
    referrals: 1,
    experience: '5 years',
    status: 'contacted',
    lastActive: '1 week ago',
    availability: '1month'
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    title: 'UX Researcher',
    location: 'Austin, TX',
    fitScore: 83,
    tms: 85,
    srs: 88,
    rns: 78,
    skills: ['User Research', 'Data Analysis', 'Usability Testing', 'Surveys', 'Analytics'],
    referrals: 2,
    experience: '7 years',
    status: 'interview',
    lastActive: '5 days ago',
    availability: '2weeks'
  }
];

const ScoreIndicator: React.FC<{
  score: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ score, label, size = 'md' }) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (score >= 70) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    if (score >= 50) return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <div className={`
      ${getScoreColor(score)}
      ${sizeClasses[size]}
      rounded-xl border font-mono font-light transition-all duration-300 hover:scale-105
    `}>
      <div className="text-xs opacity-70 mb-1">{label}</div>
      <div>{score}</div>
    </div>
  );
};

const CandidateCard: React.FC<{
  candidate: Candidate;
  onStarToggle: (id: string) => void;
  isStarred: boolean;
  showDetails: boolean;
  onToggleDetails: () => void;
}> = ({ candidate, onStarToggle, isStarred, showDetails, onToggleDetails }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
      case 'reviewing': return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      case 'contacted': return 'bg-purple-400/10 text-purple-400 border-purple-400/20';
      case 'interview': return 'bg-amber-400/10 text-amber-400 border-amber-400/20';
      case 'offer': return 'bg-rose-400/10 text-rose-400 border-rose-400/20';
      default: return 'bg-neutral-400/10 text-neutral-400 border-neutral-400/20';
    }
  };

  const getAvailabilityColor = (availability?: string) => {
    switch (availability) {
      case 'immediate': return 'text-emerald-400';
      case '2weeks': return 'text-blue-400';
      case '1month': return 'text-amber-400';
      default: return 'text-neutral-400';
    }
  };

  return (
    <div className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-neutral-800/50 transition-all duration-300 hover:border-neutral-700/50 hover:shadow-lg">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-6 flex-1">
            <button
              onClick={() => onStarToggle(candidate.id)}
              className="mt-1 text-neutral-500 hover:text-amber-400 transition-colors duration-200"
            >
              {isStarred ?
                <Star className="w-5 h-5 fill-current text-amber-400" /> :
                <StarOff className="w-5 h-5" />
              }
            </button>

            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h3 className="text-xl font-light text-neutral-100">{candidate.name}</h3>
                <div className={`px-3 py-1 rounded-xl border text-xs font-medium ${getStatusColor(candidate.status)}`}>
                  {candidate.status}
                </div>
                {candidate.availability && (
                  <div className={`text-xs font-medium ${getAvailabilityColor(candidate.availability)}`}>
                    Available: {candidate.availability === 'immediate' ? 'Now' : candidate.availability}
                  </div>
                )}
              </div>

              <div className="text-neutral-400 mb-4">{candidate.title}</div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {candidate.location}
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {candidate.experience}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {candidate.lastActive}
                </div>
              </div>
            </div>

            <ScoreIndicator score={candidate.fitScore} label="FIT" size="lg" />
          </div>
        </div>

        {/* Score Breakdown */}
        <button
          onClick={onToggleDetails}
          className="w-full flex items-center justify-between text-sm text-neutral-400 hover:text-neutral-200 transition-colors duration-200 mb-6 pb-6 border-b border-neutral-800/50"
        >
          <span className="font-medium">Fit Score Analysis</span>
          {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showDetails && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ScoreIndicator score={candidate.tms} label="Technical Match" size="sm" />
            <ScoreIndicator score={candidate.srs} label="Soft Skills" size="sm" />
            <ScoreIndicator score={candidate.rns} label="Referral Network" size="sm" />
          </div>
        )}

        {/* Skills */}
        <div className="mb-6">
          <div className="text-sm font-medium text-neutral-400 mb-3">Key Skills</div>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.slice(0, 6).map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-neutral-800/50 text-neutral-300 rounded-xl text-sm border border-neutral-700/50">
                {skill}
              </span>
            ))}
            {candidate.referrals > 0 && (
              <span className="px-3 py-1 bg-amber-400/10 text-amber-400 rounded-xl text-sm border border-amber-400/20">
                {candidate.referrals} referral{candidate.referrals !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-neutral-800/50">
          <div className="text-sm text-neutral-500">
            Candidate ID: #{candidate.id.padStart(6, '0')}
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm text-neutral-400 hover:text-neutral-200 transition-colors duration-200">
              <Eye className="w-4 h-4 inline mr-2" />
              View
            </button>
            <button className="px-4 py-2 text-sm text-neutral-400 hover:text-neutral-200 transition-colors duration-200">
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Message
            </button>
            <button className="px-4 py-2 text-sm bg-neutral-800/50 hover:bg-neutral-800 text-neutral-200 rounded-xl transition-all duration-200">
              <Calendar className="w-4 h-4 inline mr-2" />
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FitQueue: React.FC = () => {
  const [candidates] = useState<Candidate[]>(mockCandidates);
  const [starredCandidates, setStarredCandidates] = useState<Set<string>>(new Set());
  const [expandedCandidates, setExpandedCandidates] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [minFitScore, setMinFitScore] = useState(70);
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

  const toggleDetails = (id: string) => {
    setExpandedCandidates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredCandidates = candidates
    .filter(candidate => candidate.fitScore >= minFitScore)
    .filter(candidate =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'fitScore': return b.fitScore - a.fitScore;
        case 'name': return a.name.localeCompare(b.name);
        case 'referrals': return b.referrals - a.referrals;
        case 'experience': return b.experience.localeCompare(a.experience);
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5 pointer-events-none"></div>

      {/* Header */}
      <div className="relative border-b border-neutral-900/50 backdrop-blur-sm bg-neutral-950/30 sticky top-0 z-10">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-light text-neutral-100 mb-1">Fit Queue</h1>
              <p className="text-sm text-neutral-500">Thoughtful candidate evaluation</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-neutral-500">
                {filteredCandidates.length} candidates
              </div>
              {starredCandidates.size > 0 && (
                <div className="px-3 py-1 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20 text-sm font-medium">
                  {starredCandidates.size} starred
                </div>
              )}
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search candidates thoughtfully..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-900/50 border border-neutral-800/50 rounded-xl text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-neutral-900/50 hover:bg-neutral-900/70 border border-neutral-800/50 text-neutral-300 rounded-xl transition-all duration-200"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-neutral-900/50 border border-neutral-800/50 text-neutral-300 rounded-xl focus:outline-none focus:border-neutral-700"
              >
                <option value="fitScore">Fit Score</option>
                <option value="name">Name</option>
                <option value="referrals">Referrals</option>
                <option value="experience">Experience</option>
              </select>

              <button className="flex items-center gap-2 px-4 py-3 text-neutral-300">
                <BarChart3 className="w-5 h-5" />
                Analytics
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 p-6 bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-neutral-800/50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-3">
                    Minimum Fit Score: {minFitScore}%
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
                  <div className="flex justify-between text-xs text-neutral-500 mt-2">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-3">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700/50 text-neutral-300 rounded-lg">
                    <option>All Statuses</option>
                    <option>New</option>
                    <option>Reviewing</option>
                    <option>Contacted</option>
                    <option>Interview</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-3">
                    Availability
                  </label>
                  <select className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700/50 text-neutral-300 rounded-lg">
                    <option>All</option>
                    <option>Immediate</option>
                    <option>2 Weeks</option>
                    <option>1 Month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-3">
                    Location
                  </label>
                  <select className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700/50 text-neutral-300 rounded-lg">
                    <option>All Locations</option>
                    <option>Remote</option>
                    <option>San Francisco</option>
                    <option>New York</option>
                    <option>Austin</option>
                    <option>Seattle</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Candidate List */}
      <div className="relative container mx-auto px-8 py-12">
        {filteredCandidates.length > 0 ? (
          <div className="space-y-6">
            {filteredCandidates.map(candidate => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onStarToggle={handleStarToggle}
                isStarred={starredCandidates.has(candidate.id)}
                showDetails={expandedCandidates.has(candidate.id)}
                onToggleDetails={() => toggleDetails(candidate.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-neutral-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-xl font-light text-neutral-200 mb-2">No candidates found</h3>
            <p className="text-sm text-neutral-500 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setMinFitScore(70);
              }}
              className="px-6 py-2 text-sm text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Load More */}
        {filteredCandidates.length > 0 && (
          <div className="flex justify-center mt-12">
            <button className="px-8 py-3 text-sm text-neutral-400 hover:text-neutral-200 transition-colors duration-200 border border-neutral-800/50 rounded-xl hover:border-neutral-700/50">
              Load more candidates
            </button>
          </div>
        )}
      </div>
    </div>
  );
};