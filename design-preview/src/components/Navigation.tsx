import React from 'react'

interface NavigationProps {
  currentTerritory: 'A' | 'B' | 'C'
  currentView: 'Dashboard' | 'FitQueue'
  onTerritoryChange: (territory: 'A' | 'B' | 'C') => void
  onViewChange: (view: 'Dashboard' | 'FitQueue') => void
}

const Navigation: React.FC<NavigationProps> = ({
  currentTerritory,
  currentView,
  onTerritoryChange,
  onViewChange
}) => {
  const territories = [
    {
      id: 'A' as const,
      name: 'Territory A',
      description: 'Confident Clarity',
      color: 'bg-primary-600'
    },
    {
      id: 'B' as const,
      name: 'Territory B',
      description: 'Thoughtful & Calm',
      color: 'bg-accent-400'
    },
    {
      id: 'C' as const,
      name: 'Territory C',
      description: 'Professional Efficiency',
      color: 'bg-neutral-700'
    }
  ]

  const views = ['Dashboard', 'FitQueue'] as const

  return (
    <nav className="bg-neutral-900 border-b-2 border-neutral-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-neutral-50 mb-2">Skylevel Design Territories</h1>
            <p className="text-neutral-300">Compare and evaluate different design approaches for the recruitment platform</p>
          </div>

          {/* Territory Selector */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-100 mb-3 text-center">Select Design Territory</h2>
            <div className="flex justify-center gap-4 flex-wrap">
              {territories.map((territory) => (
                <button
                  key={territory.id}
                  onClick={() => onTerritoryChange(territory.id)}
                  className={`relative p-1 rounded-lg transition-all ${
                    currentTerritory === territory.id
                      ? 'ring-2 ring-offset-2 ring-accent-400 ring-offset-neutral-900'
                      : 'hover:scale-105'
                  }`}
                >
                  <div className={`${territory.color} text-neutral-50 px-6 py-3 rounded-lg min-w-[200px]`}>
                    <div className="font-bold text-lg">{territory.name}</div>
                    <div className="text-sm opacity-90">{territory.description}</div>
                  </div>
                  {currentTerritory === territory.id && (
                    <div className="absolute -top-2 -right-2 bg-accent-400 text-neutral-950 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* View Selector */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-100 mb-3 text-center">Select View</h2>
            <div className="flex justify-center gap-2">
              {views.map((view) => (
                <button
                  key={view}
                  onClick={() => onViewChange(view)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    currentView === view
                      ? 'bg-primary-600 text-neutral-50'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {view === 'FitQueue' ? 'Fit Queue' : view}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation