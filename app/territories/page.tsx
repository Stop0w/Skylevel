'use client'

import React, { useState } from 'react'
import { TerritoryADashboard } from '@/components/territories/TerritoryA-Dashboard'
import { TerritoryAFitQueue } from '@/components/territories/TerritoryA-FitQueue'
import { TerritoryBDashboard } from '@/components/territories/TerritoryB-Dashboard'
import { TerritoryBFitQueue } from '@/components/territories/TerritoryB-FitQueue'
import { TerritoryCDashboard } from '@/components/territories/TerritoryC-Dashboard'
import { TerritoryCFitQueue } from '@/components/territories/TerritoryC-FitQueue'

type Territory = 'A' | 'B' | 'C'
type View = 'dashboard' | 'fit-queue'

export default function TerritoriesPage() {
  const [activeTerritory, setActiveTerritory] = useState<Territory>('A')
  const [activeView, setActiveView] = useState<View>('dashboard')

  const getTerritoryInfo = (territory: Territory) => {
    const info = {
      A: {
        name: 'Territory A - Confident Clarity',
        description: 'Bold, decisive interface inspired by Dollar Shave Club. High contrast, strong CTAs, quick decision-making.',
        color: 'primary'
      },
      B: {
        name: 'Territory B - Thoughtful & Calm',
        description: 'Minimal, contemplative design inspired by Stoic philosophy. Generous whitespace, calm aesthetics, reduced cognitive load.',
        color: 'accent'
      },
      C: {
        name: 'Territory C - Professional Efficiency',
        description: 'Data-dense, power-user interface inspired by Cron. Maximum information density, compact layout, optimized for efficiency.',
        color: 'neutral'
      }
    }
    return info[territory]
  }

  const renderTerritory = () => {
    if (activeTerritory === 'A') {
      return activeView === 'dashboard' ? <TerritoryADashboard /> : <TerritoryAFitQueue />
    } else if (activeTerritory === 'B') {
      return activeView === 'dashboard' ? <TerritoryBDashboard /> : <TerritoryBFitQueue />
    } else {
      return activeView === 'dashboard' ? <TerritoryCDashboard /> : <TerritoryCFitQueue />
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Territory Navigation */}
      <header className="border-b border-neutral-800 bg-neutral-900">
        <div className="max-w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-50 mb-2">
                Skylevel Design Territories
              </h1>
              <p className="text-neutral-400">
                Three distinct design philosophies unified by a dark theme
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-700">
                View Documentation
              </button>
            </div>
          </div>

          {/* Territory Selector */}
          <div className="flex gap-4 mt-6">
            {(['A', 'B', 'C'] as Territory[]).map((territory) => {
              const info = getTerritoryInfo(territory)
              const isActive = activeTerritory === territory
              return (
                <button
                  key={territory}
                  onClick={() => setActiveTerritory(territory)}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    isActive
                      ? `bg-${info.color}-600/20 border-${info.color}-500 text-neutral-50`
                      : 'bg-neutral-800/50 border-neutral-700 text-neutral-400 hover:border-neutral-600'
                  }`}
                >
                  <h3 className="font-bold mb-1">{info.name}</h3>
                  <p className="text-sm opacity-80">{info.description}</p>
                </button>
              )
            })}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-4 mt-6">
            <span className="text-neutral-400">View:</span>
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeView === 'dashboard'
                  ? 'bg-primary-600 text-neutral-50'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveView('fit-queue')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeView === 'fit-queue'
                  ? 'bg-primary-600 text-neutral-50'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              Fit Queue
            </button>
          </div>
        </div>
      </header>

      {/* Territory Display */}
      <main>
        {renderTerritory()}
      </main>

      {/* Territory Legend */}
      <footer className="border-t border-neutral-800 bg-neutral-900 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-lg font-bold text-neutral-50 mb-4">Design Philosophy Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-bold text-primary-400">Confident Clarity (A)</h3>
              <ul className="text-sm text-neutral-400 space-y-1">
                <li>• Bold, decisive design language</li>
                <li>• Strong primary colors and CTAs</li>
                <li>• High contrast for quick decisions</li>
                <li>• Action-oriented layout</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-accent-400">Thoughtful & Calm (B)</h3>
              <ul className="text-sm text-neutral-400 space-y-1">
                <li>• Minimal design with generous spacing</li>
                <li>• Subtle transitions and calm colors</li>
                <li>• Reduced cognitive load</li>
                <li>• Contemplative user experience</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-neutral-300">Professional Efficiency (C)</h3>
              <ul className="text-sm text-neutral-400 space-y-1">
                <li>• Data-dense, compact interface</li>
                <li>• Maximum information per screen</li>
                <li>• Power-user optimized</li>
                <li>• Streamlined workflows</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}