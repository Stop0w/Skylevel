import { useState } from 'react'
import Navigation from './components/Navigation'

// Import territory components
import TerritoryADashboard from './components/territories/TerritoryA-Dashboard'
import TerritoryAFitQueue from './components/territories/TerritoryA-FitQueue'
import TerritoryBDashboard from './components/territories/TerritoryB-Dashboard'
import TerritoryBFitQueue from './components/territories/TerritoryB-FitQueue'
import TerritoryCDashboard from './components/territories/TerritoryC-Dashboard'
import TerritoryCFitQueue from './components/territories/TerritoryC-FitQueue'

function App() {
  const [currentTerritory, setCurrentTerritory] = useState<'A' | 'B' | 'C'>('A')
  const [currentView, setCurrentView] = useState<'Dashboard' | 'FitQueue'>('Dashboard')

  console.log('App.tsx: Rendering app with territory:', currentTerritory, 'view:', currentView)

  const renderCurrentComponent = () => {
    console.log('App.tsx: Rendering component for territory:', currentTerritory, 'view:', currentView)
    try {
      switch (currentTerritory) {
        case 'A':
          return currentView === 'Dashboard' ? <TerritoryADashboard /> : <TerritoryAFitQueue />
        case 'B':
          return currentView === 'Dashboard' ? <TerritoryBDashboard /> : <TerritoryBFitQueue />
        case 'C':
          return currentView === 'Dashboard' ? <TerritoryCDashboard /> : <TerritoryCFitQueue />
        default:
          return <TerritoryADashboard />
      }
    } catch (error) {
      console.error('App.tsx: Error rendering territory component:', error)
      return <div className="p-4 text-red-500">Error rendering territory {currentTerritory} - {currentView}</div>
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navigation
        currentTerritory={currentTerritory}
        currentView={currentView}
        onTerritoryChange={setCurrentTerritory}
        onViewChange={setCurrentView}
      />
      <main>
        {/* Debug indicator */}
        <div className="bg-primary-600 text-neutral-50 p-3 text-center font-bold" data-testid="current-territory">
          Territory {currentTerritory} - {currentView} View
        </div>
        {renderCurrentComponent()}
      </main>
    </div>
  )
}

export default App
