import React from 'react';
import { Briefcase, Users, TrendingUp, Clock, Star, ChevronRight } from 'lucide-react';

interface DashboardProps {
  onNavigateToFitQueue: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToFitQueue }) => {
  // Mock data for confident, bold presentation
  const stats = [
    { label: 'Active Jobs', value: '12', change: '+2', icon: Briefcase, color: 'bg-primary-600' },
    { label: 'Hot Candidates', value: '47', change: '+8', icon: Users, color: 'bg-accent-400' },
    { label: 'Avg Time-to-Hire', value: '18 days', change: '-3d', icon: Clock, color: 'bg-success-500' },
    { label: 'Fit Score Avg', value: '82', change: '+5', icon: Star, color: 'bg-primary-600' },
  ];

  const recentActivity = [
    { name: 'Sarah Chen', action: 'scored 89', role: 'Senior Frontend', time: '2m ago', score: 89 },
    { name: 'Marcus Rodriguez', action: 'applied', role: 'Full Stack Engineer', time: '15m ago', score: null },
    { name: 'Elena Thompson', action: 'referred by 3', role: 'Product Manager', time: '1h ago', score: 92 },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Header */}
      <header className="bg-neutral-900 border-b border-neutral-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-50">Recruiter Dashboard</h1>
              <p className="text-neutral-400 mt-1">Welcome back! Here's your hiring overview</p>
            </div>
            <button
              onClick={onNavigateToFitQueue}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Review Fit Queue
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid - Bold and Prominent */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 hover:border-primary-600 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-neutral-50 mt-2">{stat.value}</p>
                  <p className="text-sm font-medium mt-1" style={{ color: stat.change.startsWith('+') ? '#10B981' : '#EF4444' }}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hot Candidates Section */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-50">Hot Candidates</h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg hover:bg-neutral-750 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-neutral-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-50">{activity.name}</h3>
                        <p className="text-sm text-neutral-400">{activity.role}</p>
                        <p className="text-xs text-neutral-500 mt-1">{activity.action} • {activity.time}</p>
                      </div>
                    </div>
                    {activity.score && (
                      <div className="bg-accent-400 text-neutral-950 px-4 py-2 rounded-full font-bold">
                        {activity.score}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
              <h2 className="text-xl font-bold text-neutral-50 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  Create New Job
                </button>
                <button className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-50 py-3 px-4 rounded-lg font-medium transition-colors">
                  View All Candidates
                </button>
                <button className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-50 py-3 px-4 rounded-lg font-medium transition-colors">
                  Generate Report
                </button>
              </div>
            </div>

            {/* Performance Tip */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-white mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Performance Tip</h3>
                  <p className="text-sm text-neutral-200 mt-1">
                    Your avg. Fit Score is 15% above industry standard. Keep focusing on quality referrals!
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