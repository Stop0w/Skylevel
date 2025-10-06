import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import { RecruiterDashboard as DashboardA, FitQueue as FitQueueA } from './components/territories/TerritoryA_ConfidentClarity';
import { RecruiterDashboard as DashboardB, FitQueue as FitQueueB } from './components/territories/TerritoryB_ThoughtfulCalm';
import { RecruiterDashboard as DashboardC, FitQueue as FitQueueC } from './components/territories/TerritoryC_ProfessionalEfficiency';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          {/* Territory A: Confident Clarity (Dollar Shave Club inspired) */}
          <Route path="/territory-a/dashboard" element={<DashboardA />} />
          <Route path="/territory-a/fit-queue" element={<FitQueueA />} />

          {/* Territory B: Thoughtful & Calm (Stoic inspired) */}
          <Route path="/territory-b/dashboard" element={<DashboardB />} />
          <Route path="/territory-b/fit-queue" element={<FitQueueB />} />

          {/* Territory C: Professional Efficiency (Cron inspired) */}
          <Route path="/territory-c/dashboard" element={<DashboardC />} />
          <Route path="/territory-c/fit-queue" element={<FitQueueC />} />

          {/* Default route - redirect to Territory A */}
          <Route path="/" element={<DashboardA />} />
          <Route path="/dashboard" element={<DashboardA />} />
          <Route path="/fit-queue" element={<FitQueueA />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;