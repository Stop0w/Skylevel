import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Clock, DollarSign, Users, Star, MapPin, ChevronRight, Keyboard, Zap, Eye, MessageSquare, Phone, Mail } from 'lucide-react';

// Territory C: Professional Efficiency (Cron-inspired)
// Characteristics: Keyboard-first, professional blue, multi-pane layouts, bulk operations

interface StatCardProps {
  value: string;
  label: string;
  change?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ value, label, change, icon, trend = 'neutral' }) => {
  const trendColors = {
    up: 'text-emerald-400',
    down: 'text-red-400',
    neutral: 'text-neutral-400'
  };

  return (
    <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-800 hover:border-professional-500 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-neutral-800 rounded">
          {icon}
        </div>
        {change && (
          <span className={`text-sm font-medium ${trendColors[trend]}`}>
            {change}
          </span>
        )}
      </div>
      <div className="text-2xl font-semibold text-neutral-100 mb-1">{value}</div>
      <div className="text-sm text-neutral-500">{label}</div>
    </div>
  );
};

interface CandidateRowProps {
  candidate: {
    id: string;
    name: string;
    title: string;
    location: string;
    score: number;
    status: 'available' | 'interviewing' | 'offered' | 'hired';
    lastContact: string;
    referrals: number;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CandidateRow: React.FC<CandidateRowProps> = ({ candidate, isSelected, onSelect }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-emerald-500/20 text-emerald-400';
      case 'interviewing': return 'bg-blue-500/20 text-blue-400';
      case 'offered': return 'bg-amber-500/20 text-amber-400';
      case 'hired': return 'bg-professional-500/20 text-professional-400';
      default: return 'bg-neutral-500/20 text-neutral-400';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-accent-400 text-neutral-950';
    if (score >= 70) return 'bg-emerald-500 text-white';
    if (score >= 50) return 'bg-amber-500 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <div className={`group hover:bg-neutral-900/50 transition-colors border-b border-neutral-800 ${isSelected ? 'bg-neutral-900/70' : ''}`}>
      <div className="p-4">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(candidate.id)}
            className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-professional-500 focus:ring-professional-500 focus:ring-offset-neutral-950"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-medium text-neutral-100 truncate">{candidate.name}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(candidate.status)}`}>
                {candidate.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <span>{candidate.title}</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {candidate.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {candidate.referrals}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-500">{candidate.lastContact}</span>
            </div>

            <div className={`px-3 py-1 rounded font-medium text-sm ${getScoreColor(candidate.score)}`}>
              {candidate.score}
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 hover:bg-neutral-800 rounded transition-colors" title="View">
                <Eye className="w-4 h-4 text-neutral-400" />
              </button>
              <button className="p-2 hover:bg-neutral-800 rounded transition-colors" title="Message">
                <MessageSquare className="w-4 h-4 text-neutral-400" />
              </button>
              <button className="p-2 hover:bg-neutral-800 rounded transition-colors" title="Call">
                <Phone className="w-4 h-4 text-neutral-400" />
              </button>
              <button className="p-2 hover:bg-neutral-800 rounded transition-colors" title="Email">
                <Mail className="w-4 h-4 text-neutral-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
export const RecruiterDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { value: '24', label: 'Avg Days to Hire', change: '-12%', trend: 'up' as const, icon: <Clock className="w-5 h-5 text-professional-400" /> },
    { value: '87', label: 'Avg Fit Score', change: '+5 pts', trend: 'up' as const, icon: <Star className="w-5 h-5 text-accent-400" /> },
    { value: '$52k', label: 'Commission', change: '+8%', trend: 'up' as const, icon: <DollarSign className="w-5 h-5 text-emerald-400" /> },
    { value: '94%', label: 'Response Rate', change: '+2%', trend: 'up' as const, icon: <TrendingUp className="w-5 h-5 text-blue-400" /> },
  ];

  const pipelineData = [
    { stage: 'Applied', count: 45, color: 'bg-neutral-600' },
    { stage: 'Reviewing', count: 12, color: 'bg-blue-500' },
    { stage: 'Interview', count: 5, color: 'bg-purple-500' },
    { stage: 'Offer', count: 2, color: 'bg-amber-500' },
    { stage: 'Hired', count: 1, color: 'bg-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <div className="bg-neutral-900 border-b border-neutral-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Quick search... (Ctrl+K)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-professional-500 w-80 font-mono"
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-neutral-800 rounded-lg border border-neutral-700">
                <Keyboard className="w-4 h-4 text-neutral-500" />
                <span className="text-xs text-neutral-500">Ctrl+K</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-professional-600 hover:bg-professional-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Quick Actions
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-professional-600 rounded-full flex items-center justify-center text-sm font-medium">
                  JD
                </div>
                <span className="text-sm">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  change={stat.change}
                  icon={stat.icon}
                  trend={stat.trend}
                />
              ))}
            </div>

            {/* Pipeline Overview */}
            <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Hiring Pipeline</h2>
                <button className="text-sm text-professional-400 hover:text-professional-300 flex items-center gap-1">
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {pipelineData.map((stage, index) => (
                  <div key={stage.stage} className="flex-1 text-center">
                    <div className={`${stage.color} rounded p-3 mb-2`}>
                      <div className="text-lg font-semibold">{stage.count}</div>
                      <div className="text-xs opacity-80">{stage.stage}</div>
                    </div>
                    {index < pipelineData.length - 1 && (
                      <div className="text-center text-neutral-500">→</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm text-neutral-500">
                <span>Total: 65 candidates</span>
                <span>Conversion: 33%</span>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-neutral-900 rounded-lg border border-neutral-800">
              <div className="p-4 border-b border-neutral-800">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
              </div>
              <div className="divide-y divide-neutral-800">
                {[
                  { name: 'Sarah Chen', action: 'Interview scheduled', time: '2h ago', status: 'success' },
                  { name: 'Mike Rodriguez', action: 'Offer extended', time: '5h ago', status: 'success' },
                  { name: 'Alex Kim', action: 'Application received', time: '1d ago', status: 'neutral' },
                ].map((activity, index) => (
                  <div key={index} className="p-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-emerald-400' : 'bg-neutral-400'
                      }`} />
                      <div>
                        <div className="font-medium">{activity.name}</div>
                        <div className="text-sm text-neutral-500">{activity.action}</div>
                      </div>
                    </div>
                    <div className="text-sm text-neutral-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-neutral-900 border-l border-neutral-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>

          <div className="space-y-4 mb-6">
            <div className="bg-neutral-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-professional-400 mb-1">87%</div>
              <div className="text-sm text-neutral-500">Match Quality</div>
              <div className="w-full bg-neutral-700 rounded-full h-2 mt-2">
                <div className="bg-professional-500 h-2 rounded-full" style={{ width: '87%' }} />
              </div>
            </div>

            <div className="bg-neutral-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-400 mb-1">94%</div>
              <div className="text-sm text-neutral-500">Response Rate</div>
              <div className="w-full bg-neutral-700 rounded-full h-2 mt-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '94%' }} />
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">Keyboard Shortcuts</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Search</span>
              <span className="font-mono bg-neutral-800 px-2 py-1 rounded">Ctrl+K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">New Candidate</span>
              <span className="font-mono bg-neutral-800 px-2 py-1 rounded">Ctrl+N</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Bulk Actions</span>
              <span className="font-mono bg-neutral-800 px-2 py-1 rounded">Ctrl+B</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// FitQueue Component for Territory C
export const FitQueue: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set());

  const candidates = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'Senior Product Designer',
      location: 'San Francisco, CA',
      score: 92,
      status: 'available' as const,
      lastContact: '2 days ago',
      referrals: 3
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      title: 'Staff Software Engineer',
      location: 'Remote',
      score: 89,
      status: 'interviewing' as const,
      lastContact: '1 hour ago',
      referrals: 2
    },
    {
      id: '3',
      name: 'Elena Kim',
      title: 'Design Lead',
      location: 'New York, NY',
      score: 87,
      status: 'available' as const,
      lastContact: '3 days ago',
      referrals: 4
    },
    {
      id: '4',
      name: 'David Park',
      title: 'Senior Backend Engineer',
      location: 'Seattle, WA',
      score: 85,
      status: 'offered' as const,
      lastContact: '4 hours ago',
      referrals: 1
    },
    {
      id: '5',
      name: 'Maria Lopez',
      title: 'Full Stack Developer',
      location: 'Austin, TX',
      score: 83,
      status: 'interviewing' as const,
      lastContact: '1 day ago',
      referrals: 2
    }
  ];

  const handleSelectAll = () => {
    if (selectedCandidates.size === candidates.length) {
      setSelectedCandidates(new Set());
    } else {
      setSelectedCandidates(new Set(candidates.map(c => c.id)));
    }
  };

  const handleSelectCandidate = (id: string) => {
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

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <div className="bg-neutral-900 border-b border-neutral-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">Fit Queue</h1>
              <div className="text-sm text-neutral-500">
                {filteredCandidates.length} candidates
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search candidates... (Ctrl+K)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-professional-500 w-80 font-mono"
                />
              </div>

              {selectedCandidates.size > 0 && (
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 bg-professional-600 hover:bg-professional-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Contact ({selectedCandidates.size})
                  </button>
                  <button className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm font-medium transition-colors">
                    Bulk Actions
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {selectedCandidates.size > 0 && (
            <div className="bg-professional-500/10 border border-professional-500/20 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-professional-400">
                    {selectedCandidates.size} selected
                  </span>
                  <button className="text-sm text-professional-400 hover:text-professional-300">
                    Clear selection
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 bg-professional-600 hover:bg-professional-700 text-white rounded text-sm transition-colors">
                    Email All
                  </button>
                  <button className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 text-white rounded text-sm transition-colors">
                    Export
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex items-center gap-4">
            <button className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-sm transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-sm transition-colors">
              Score: 85+
            </button>
            <button className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-sm transition-colors">
              Available
            </button>
            <button className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-sm transition-colors">
              High Referrals
            </button>
          </div>
        </div>
      </div>

      {/* Candidate List */}
      <div className="bg-neutral-900 min-h-[calc(100vh-200px)]">
        {/* Header Row */}
        <div className="border-b border-neutral-800 bg-neutral-900">
          <div className="px-6 py-3">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={selectedCandidates.size === filteredCandidates.length && filteredCandidates.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-professional-500 focus:ring-professional-500 focus:ring-offset-neutral-950"
              />
              <div className="flex-1 grid grid-cols-12 gap-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <div className="col-span-4">Candidate</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-2">Last Contact</div>
                <div className="col-span-2 text-center">Fit Score</div>
                <div className="col-span-2">Actions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Rows */}
        <div>
          {filteredCandidates.map((candidate) => (
            <CandidateRow
              key={candidate.id}
              candidate={candidate}
              isSelected={selectedCandidates.has(candidate.id)}
              onSelect={handleSelectCandidate}
            />
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-neutral-400 mb-4">No candidates found</div>
            <button className="text-professional-400 hover:text-professional-300 text-sm">
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="bg-neutral-900 border-t border-neutral-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-500">
            Professional efficiency tools at your fingertips
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-professional-600 hover:bg-professional-700 text-white rounded-lg text-sm font-medium transition-colors">
              Export List
            </button>
            <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm font-medium transition-colors">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};