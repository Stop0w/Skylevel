import React from 'react';
import { Briefcase, Users, TrendingUp, Clock, Star, ChevronRight } from 'lucide-react';

interface DashboardProps {
  onNavigateToFitQueue: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToFitQueue }) => {
  // Mock data presented with calm, thoughtful design
  const stats = [
    { label: 'Active Jobs', value: '12', change: '+2', icon: Briefcase },
    { label: 'Qualified Candidates', value: '47', change: '+8', icon: Users },
    { label: 'Average Time-to-Hire', value: '18 days', change: '-3d', icon: Clock },
    { label: 'Quality Score', value: '82', change: '+5', icon: Star },
  ];

  const recentActivity = [
    { name: 'Sarah Chen', action: 'achieved score', role: 'Senior Frontend Developer', time: '2 minutes ago', score: 89 },
    { name: 'Marcus Rodriguez', action: 'new application', role: 'Full Stack Engineer', time: '15 minutes ago' },
    { name: 'Elena Thompson', action: 'referral completed', role: 'Product Manager', time: '1 hour ago', score: 92 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-light text-neutral-900 tracking-tight">Dashboard</h1>
              <p className="text-neutral-600 mt-3 text-lg">A thoughtful overview of your recruitment progress</p>
            </div>
            <button
              onClick={onNavigateToFitQueue}
              className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 rounded-xl font-light transition-all duration-300 hover:shadow-lg"
            >
              Review Candidates
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-8 py-12">
        {/* Stats Grid - Minimal and Thoughtful */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  stat.label === 'Qualified Candidates' ? 'bg-amber-50' :
                  stat.label === 'Quality Score' ? 'bg-emerald-50' :
                  'bg-neutral-50'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.label === 'Qualified Candidates' ? 'text-amber-600' :
                    stat.label === 'Quality Score' ? 'text-emerald-600' :
                    'text-neutral-600'
                  }`} />
                </div>
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-neutral-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-light text-neutral-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Recent Activity Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-light text-neutral-900">Recent Activity</h2>
                <button className="text-neutral-600 hover:text-neutral-900 font-light flex items-center gap-2 transition-colors">
                  View all activity <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-6 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Users className="w-7 h-7 text-neutral-400" />
                      </div>
                      <div>
                        <h3 className="font-normal text-lg text-neutral-900">{activity.name}</h3>
                        <p className="text-neutral-600 font-light">{activity.role}</p>
                        <p className="text-sm text-neutral-500 mt-1">
                          {activity.action} • {activity.time}
                        </p>
                      </div>
                    </div>
                    {activity.score && (
                      <div className="bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full font-light text-lg">
                        {activity.score}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
              <h2 className="text-xl font-light text-neutral-900 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-4 px-6 rounded-xl font-light transition-colors">
                  Create New Position
                </button>
                <button className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 py-4 px-6 rounded-xl font-light transition-colors">
                  Browse All Candidates
                </button>
                <button className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 py-4 px-6 rounded-xl font-light transition-colors">
                  Export Analytics
                </button>
              </div>
            </div>

            {/* Insight Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-7 h-7 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-normal text-lg text-neutral-900 mb-2">Quality Insight</h3>
                  <p className="text-neutral-600 font-light leading-relaxed">
                    Your candidate quality score is trending upward. Consider expanding your search criteria to maintain this momentum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;