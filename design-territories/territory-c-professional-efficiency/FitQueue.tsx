import React, { useState } from 'react';
import { Search, Filter, Star, StarOff, Eye, Calendar, MessageCircle, X, ChevronDown, ChevronUp, SlidersHorizontal, Briefcase, MapPin, Users, Clock, MoreVertical, CheckSquare, Square, Trash2, Mail } from 'lucide-react';

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
  status: 'new' | 'reviewing' | 'contacted' | 'interview' | 'offer' | 'rejected';
  lastActive: string;
  appliedDate: string;
  email: string;
  phone: string;
  availability: 'immediate' | '2weeks' | '1month' | 'notavailable';
  salary?: string;
  noticePeriod?: string;
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
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'React', 'TypeScript'],
    referrals: 3,
    experience: '8 years',
    status: 'new',
    lastActive: '2 hours ago',
    appliedDate: '2025-01-15',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 123-4567',
    availability: 'immediate',
    salary: '$140k-$180k',
    noticePeriod: '2 weeks'
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
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'AWS'],
    referrals: 2,
    experience: '6 years',
    status: 'reviewing',
    lastActive: '1 day ago',
    appliedDate: '2025-01-14',
    email: 'm.rodriguez@email.com',
    phone: '+1 (555) 234-5678',
    availability: '2weeks',
    salary: '$130k-$170k',
    noticePeriod: '3 weeks'
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
    skills: ['Strategy', 'Analytics', 'Leadership', 'Agile', 'Roadmapping', 'SQL'],
    referrals: 4,
    experience: '12 years',
    status: 'reviewing',
    lastActive: '3 hours ago',
    appliedDate: '2025-01-13',
    email: 'elena.t@email.com',
    phone: '+1 (555) 345-6789',
    availability: 'immediate',
    salary: '$160k-$200k',
    noticePeriod: 'Immediate'
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
    skills: ['Kubernetes', 'Docker', 'AWS', 'CI/CD', 'Terraform', 'Python'],
    referrals: 1,
    experience: '5 years',
    status: 'contacted',
    lastActive: '1 week ago',
    appliedDate: '2025-01-10',
    email: 'd.kim@email.com',
    phone: '+1 (555) 456-7890',
    availability: '1month',
    salary: '$120k-$150k',
    noticePeriod: '4 weeks'
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
    skills: ['User Research', 'Data Analysis', 'Usability Testing', 'Surveys', 'Analytics', 'Figma'],
    referrals: 2,
    experience: '7 years',
    status: 'interview',
    lastActive: '5 days ago',
    appliedDate: '2025-01-09',
    email: 'j.martinez@email.com',
    phone: '+1 (555) 567-8901',
    availability: '2weeks',
    salary: '$110k-$140k',
    noticePeriod: '2 weeks'
  }
];

const ScoreBadge: React.FC<{ score: number; label: string; size?: 'sm' | 'md' }> = ({ score, label, size = 'md' }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500 text-white';
    if (score >= 80) return 'bg-blue-500 text-white';
    if (score >= 70) return 'bg-amber-500 text-white';
    return 'bg-red-500 text-white';
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  return (
    <div className={`${getScoreColor(score)} ${sizeClasses[size]} rounded font-mono font-semibold flex items-center gap-1`}>
      {score}
      <span className="text-xs opacity-80">{label}</span>
    </div>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'new': return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' };
      case 'reviewing': return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' };
      case 'contacted': return { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' };
      case 'interview': return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' };
      case 'offer': return { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' };
      case 'rejected': return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' };
      default: return { bg: 'bg-neutral-500/10', text: 'text-neutral-400', border: 'border-neutral-500/20' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={`px-2 py-1 rounded border text-xs font-medium ${config.bg} ${config.text} ${config.border}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

const CandidateRow: React.FC<{
  candidate: Candidate;
  isSelected: boolean;
  onToggleSelect: () => void;
  onStarToggle: () => void;
  isStarred: boolean;
  showDetails: boolean;
  onToggleDetails: () => void;
}> = ({ candidate, isSelected, onToggleSelect, onStarToggle, isStarred, showDetails, onToggleDetails }) => {
  return (
    <div className="border-b border-neutral-800 last:border-b-0">
      <div className="p-4 hover:bg-neutral-900/50 transition-colors duration-150">
        <div className="flex items-center gap-4">
          {/* Checkbox */}
          <button onClick={onToggleSelect} className="text-neutral-400 hover:text-neutral-200">
            {isSelected ? <CheckSquare className="w-4 h-4 text-blue-500" /> : <Square className="w-4 h-4" />}
          </button>

          {/* Star */}
          <button onClick={onStarToggle} className="text-neutral-400 hover:text-amber-400">
            {isStarred ? <Star className="w-4 h-4 fill-current text-amber-400" /> : <StarOff className="w-4 h-4" />}
          </button>

          {/* Basic Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-semibold text-neutral-100 truncate">{candidate.name}</h3>
              <StatusBadge status={candidate.status} />
              <ScoreBadge score={candidate.fitScore} label="FIT" size="sm" />
            </div>
            <div className="flex items-center gap-4 text-sm text-neutral-400">
              <span className="truncate">{candidate.title}</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {candidate.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {candidate.experience}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {candidate.referrals} ref
              </span>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="flex items-center gap-2">
            <ScoreBadge score={candidate.tms} label="T" size="sm" />
            <ScoreBadge score={candidate.srs} label="S" size="sm" />
            <ScoreBadge score={candidate.rns} label="R" size="sm" />
          </div>

          {/* Last Active */}
          <div className="text-sm text-neutral-500 w-20 text-right">
            {candidate.lastActive}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleDetails}
              className="p-1.5 text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button className="p-1.5 text-neutral-400 hover:text-neutral-200 transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-neutral-400 hover:text-neutral-200 transition-colors">
              <Mail className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-neutral-400 hover:text-neutral-200 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanded Details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-neutral-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Skills */}
              <div>
                <h4 className="text-sm font-medium text-neutral-400 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-neutral-800 text-neutral-300 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-sm font-medium text-neutral-400 mb-2">Contact</h4>
                <div className="space-y-1 text-sm text-neutral-300">
                  <div>{candidate.email}</div>
                  <div>{candidate.phone}</div>
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <h4 className="text-sm font-medium text-neutral-400 mb-2">Details</h4>
                <div className="space-y-1 text-sm text-neutral-300">
                  <div>Applied: {candidate.appliedDate}</div>
                  <div>Available: {candidate.availability}</div>
                  <div>Salary: {candidate.salary}</div>
                  <div>Notice: {candidate.noticePeriod}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const FitQueue: React.FC = () => {
  const [candidates] = useState<Candidate[]>(mockCandidates);
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set());
  const [starredCandidates, setStarredCandidates] = useState<Set<string>>(new Set());
  const [expandedCandidates, setExpandedCandidates] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'fitScore' | 'name' | 'date' | 'referrals'>('fitScore');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterScore, setFilterScore] = useState<number>(0);

  const handleSelectAll = () => {
    if (selectedCandidates.size === candidates.length) {
      setSelectedCandidates(new Set());
    } else {
      setSelectedCandidates(new Set(candidates.map(c => c.id)));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedCandidates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

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

  const filteredAndSortedCandidates = candidates
    .filter(candidate => candidate.fitScore >= filterScore)
    .filter(candidate => filterStatus === 'all' || candidate.status === filterStatus)
    .filter(candidate =>
      searchQuery === '' ||
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'fitScore': return b.fitScore - a.fitScore;
        case 'name': return a.name.localeCompare(b.name);
        case 'date': return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        case 'referrals': return b.referrals - a.referrals;
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <div className="border-b border-neutral-900 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-neutral-100">Fit Queue</h1>
            <div className="flex items-center gap-4 text-sm text-neutral-400">
              <span>{filteredAndSortedCandidates.length} candidates</span>
              {selectedCandidates.size > 0 && (
                <span className="text-blue-400">{selectedCandidates.size} selected</span>
              )}
              {starredCandidates.size > 0 && (
                <span className="text-amber-400">{starredCandidates.size} starred</span>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Select All */}
            <button
              onClick={handleSelectAll}
              className="flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors duration-150"
            >
              {selectedCandidates.size === candidates.length ? (
                <CheckSquare className="w-4 h-4 text-blue-500" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <span className="text-sm">All</span>
            </button>

            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Filters */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="contacted">Contacted</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-blue-500"
            >
              <option value="fitScore">Fit Score</option>
              <option value="name">Name</option>
              <option value="date">Date Applied</option>
              <option value="referrals">Referrals</option>
            </select>

            <div className="flex items-center gap-2">
              <label className="text-sm text-neutral-400">Min Score:</label>
              <input
                type="number"
                min="0"
                max="100"
                value={filterScore}
                onChange={(e) => setFilterScore(Number(e.target.value))}
                className="w-16 px-2 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Bulk Actions */}
            {selectedCandidates.size > 0 && (
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-150">
                  Contact {selectedCandidates.size}
                </button>
                <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors duration-150">
                  <Mail className="w-4 h-4" />
                </button>
                <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors duration-150">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Candidate List */}
      <div className="overflow-x-auto">
        {filteredAndSortedCandidates.length > 0 ? (
          <div className="bg-neutral-900/30 border border-neutral-800 rounded-lg m-4">
            {filteredAndSortedCandidates.map(candidate => (
              <CandidateRow
                key={candidate.id}
                candidate={candidate}
                isSelected={selectedCandidates.has(candidate.id)}
                onToggleSelect={() => handleToggleSelect(candidate.id)}
                onStarToggle={() => handleStarToggle(candidate.id)}
                isStarred={starredCandidates.has(candidate.id)}
                showDetails={expandedCandidates.has(candidate.id)}
                onToggleDetails={() => toggleDetails(candidate.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-neutral-800 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-200 mb-2">No candidates found</h3>
            <p className="text-sm text-neutral-500">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>

      {/* Quick Stats Bar */}
      <div className="border-t border-neutral-900 bg-neutral-900/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-neutral-400">
            <span>Avg Fit: {Math.round(filteredAndSortedCandidates.reduce((acc, c) => acc + c.fitScore, 0) / filteredAndSortedCandidates.length || 0)}</span>
            <span>Avg Referrals: {(filteredAndSortedCandidates.reduce((acc, c) => acc + c.referrals, 0) / filteredAndSortedCandidates.length || 0).toFixed(1)}</span>
            <span>New Today: {filteredAndSortedCandidates.filter(c => c.status === 'new').length}</span>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors duration-150 text-sm">
              Export CSV
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-150 text-sm">
              Create Shortlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};