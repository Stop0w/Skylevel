import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Grid3x3, Users, LayoutDashboard, Filter } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isTerritoryOpen, setIsTerritoryOpen] = useState(false);

  const territories = [
    {
      id: 'territory-a',
      name: 'Territory A',
      description: 'Confident Clarity',
      inspiration: 'Dollar Shave Club',
      color: 'bg-primary-600',
      routes: [
        { path: '/territory-a/dashboard', name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { path: '/territory-a/fit-queue', name: 'Fit Queue', icon: <Users className="w-4 h-4" /> },
      ]
    },
    {
      id: 'territory-b',
      name: 'Territory B',
      description: 'Thoughtful & Calm',
      inspiration: 'Stoic',
      color: 'bg-emerald-600',
      routes: [
        { path: '/territory-b/dashboard', name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { path: '/territory-b/fit-queue', name: 'Fit Queue', icon: <Users className="w-4 h-4" /> },
      ]
    },
    {
      id: 'territory-c',
      name: 'Territory C',
      description: 'Professional Efficiency',
      inspiration: 'Cron',
      color: 'bg-professional-600',
      routes: [
        { path: '/territory-c/dashboard', name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { path: '/territory-c/fit-queue', name: 'Fit Queue', icon: <Users className="w-4 h-4" /> },
      ]
    },
  ];

  const getCurrentTerritory = () => {
    const path = location.pathname;
    if (path.includes('territory-a')) return 'territory-a';
    if (path.includes('territory-b')) return 'territory-b';
    if (path.includes('territory-c')) return 'territory-c';
    return 'territory-a'; // default
  };

  const currentTerritory = getCurrentTerritory();
  const currentTerritoryData = territories.find(t => t.id === currentTerritory);

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Skylevel</h1>
                <p className="text-xs text-neutral-500">Design Territory Preview</p>
              </div>
            </div>

            {/* Territory Selector */}
            <div className="relative">
              <button
                onClick={() => setIsTerritoryOpen(!isTerritoryOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700 transition-colors"
              >
                <div className={`w-3 h-3 rounded-full ${currentTerritoryData?.color}`} />
                <span className="text-white font-medium">{currentTerritoryData?.description}</span>
                <span className="text-xs text-neutral-500">({currentTerritoryData?.inspiration})</span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isTerritoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {isTerritoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl">
                  <div className="p-4 border-b border-neutral-800">
                    <h3 className="text-sm font-medium text-neutral-400 mb-1">Choose Design Territory</h3>
                    <p className="text-xs text-neutral-500">Different design approaches for Skylevel</p>
                  </div>

                  <div className="max-h-64 overflow-y-auto">
                    {territories.map((territory) => (
                      <div key={territory.id} className="border-b border-neutral-800 last:border-b-0">
                        <Link
                          to={territory.routes[0].path}
                          onClick={() => setIsTerritoryOpen(false)}
                          className={`block p-4 hover:bg-neutral-800 transition-colors ${
                            currentTerritory === territory.id ? 'bg-neutral-800' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-3 h-3 rounded-full mt-1 ${territory.color}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-white">{territory.name}</span>
                                <span className="text-xs px-2 py-1 bg-neutral-700 rounded text-neutral-400">
                                  {territory.inspiration}
                                </span>
                              </div>
                              <p className="text-sm text-neutral-500 mb-2">{territory.description}</p>
                              <div className="flex gap-2">
                                {territory.routes.map((route) => (
                                  <Link
                                    key={route.path}
                                    to={route.path}
                                    onClick={(e) => e.stopPropagation()}
                                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                                      isActiveRoute(route.path)
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                                    }`}
                                  >
                                    {route.icon}
                                    {route.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="flex items-center gap-2">
            {currentTerritoryData?.routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActiveRoute(route.path)
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="flex items-center justify-between py-2 px-4 bg-neutral-800/50 rounded-lg mb-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Grid3x3 className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-400">
                Currently viewing: <span className="text-white font-medium">{currentTerritoryData?.description}</span>
              </span>
            </div>
            <div className="text-xs text-neutral-500">
              Inspired by {currentTerritoryData?.inspiration}
            </div>
          </div>
          <div className="text-xs text-neutral-500">
            3 design territories • 2 components each
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;