import Link from 'next/link'
import { mockCandidates, mockJobs } from '@/lib/mock-data'

export default function TerritoryCIndex() {
  const stats = {
    totalCandidates: mockCandidates.length,
    avgScore: Math.round(mockCandidates.reduce((acc, c) => acc + c.score, 0) / mockCandidates.length),
    highScoreCandidates: mockCandidates.filter(c => c.score >= 85).length,
    newApplications: mockCandidates.filter(c => c.status === 'new').length,
    activeJobs: mockJobs.filter(j => j.status === 'active').length
  }

  return (
    <div className="p-2 sm:p-4 max-w-full overflow-hidden">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-50 mb-2">Territory C - Professional Efficiency</h1>
        <p className="text-neutral-400 mb-4">
          Cron calendar app-inspired interface for power users. Maximum information density with compact layout optimized for efficiency.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
          <div className="text-sm text-neutral-400 mb-1">Total Candidates</div>
          <div className="text-2xl font-bold text-neutral-50">{stats.totalCandidates}</div>
        </div>
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
          <div className="text-sm text-neutral-400 mb-1">Average Score</div>
          <div className="text-2xl font-bold text-accent-400">{stats.avgScore}</div>
        </div>
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
          <div className="text-sm text-neutral-400 mb-1">High Scoring (85+)</div>
          <div className="text-2xl font-bold text-green-400">{stats.highScoreCandidates}</div>
        </div>
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
          <div className="text-sm text-neutral-400 mb-1">New Applications</div>
          <div className="text-2xl font-bold text-blue-400">{stats.newApplications}</div>
        </div>
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
          <div className="text-sm text-neutral-400 mb-1">Active Jobs</div>
          <div className="text-2xl font-bold text-neutral-50">{stats.activeJobs}</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/(design-territories)/territory-c/fit-queue" className="block">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 hover:border-accent-400 transition-all">
            <h2 className="text-lg font-semibold text-neutral-50 mb-2">Fit Queue</h2>
            <p className="text-sm text-neutral-400 mb-4">
              Data-dense candidate review interface with bulk actions, keyboard shortcuts, and advanced filtering.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span>Compact table view</span>
              <span>•</span>
              <span>Keyboard navigation</span>
              <span>•</span>
              <span>Bulk operations</span>
            </div>
          </div>
        </Link>

        <Link href="/(design-territories)/territory-c/dashboard" className="block">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 hover:border-accent-400 transition-all">
            <h2 className="text-lg font-semibold text-neutral-50 mb-2">Dashboard</h2>
            <p className="text-sm text-neutral-400 mb-4">
              Real-time metrics, score distributions, status pipelines, and activity feeds for power users.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span>Performance metrics</span>
              <span>•</span>
              <span>Activity tracking</span>
              <span>•</span>
              <span>Quick actions</span>
            </div>
          </div>
        </Link>

        <Link href="/(design-territories)/territory-c/candidates/1" className="block">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 hover:border-accent-400 transition-all">
            <h2 className="text-lg font-semibold text-neutral-50 mb-2">Candidate Profile</h2>
            <p className="text-sm text-neutral-400 mb-4">
              Comprehensive candidate information with tabbed interface, score breakdown, and activity timeline.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span>Detailed analysis</span>
              <span>•</span>
              <span>Activity tracking</span>
              <span>•</span>
              <span>Quick actions</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Keyboard Shortcuts Reference */}
      <div className="mt-8 bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-neutral-50 mb-4">Power User Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-neutral-300 mb-2">Keyboard Shortcuts</h3>
            <div className="space-y-1 text-xs text-neutral-400">
              <div><kbd className="px-1 py-0.5 bg-neutral-800 border border-neutral-700 rounded">Ctrl+K</kbd> Quick Search</div>
              <div><kbd className="px-1 py-0.5 bg-neutral-800 border border-neutral-700 rounded">?</kbd> Show Shortcuts</div>
              <div><kbd className="px-1 py-0.5 bg-neutral-800 border border-neutral-700 rounded">Space</kbd> Select/Deselect</div>
              <div><kbd className="px-1 py-0.5 bg-neutral-800 border border-neutral-700 rounded">S</kbd> Bulk Shortlist</div>
              <div><kbd className="px-1 py-0.5 bg-neutral-800 border border-neutral-700 rounded">R</kbd> Bulk Reject</div>
              <div><kbd className="px-1 py-0.5 bg-neutral-800 border border-neutral-700 rounded">Enter</kbd> Open Details</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-300 mb-2">Data Density Features</h3>
            <div className="space-y-1 text-xs text-neutral-400">
              <div>• Compact table layouts with 12+ columns</div>
              <div>• Hover tooltips for detailed information</div>
              <div>• Color-coded status and score indicators</div>
              <div>• Real-time filtering and sorting</div>
              <div>• Progress bars for visual metrics</div>
              <div>• Inline actions without page navigation</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-300 mb-2">Efficiency Tools</h3>
            <div className="space-y-1 text-xs text-neutral-400">
              <div>• Bulk selection and operations</div>
              <div>• Advanced filtering with multiple criteria</div>
              <div>• Keyboard navigation throughout</div>
              <div>• Quick action panels</div>
              <div>• Export and data synchronization</div>
              <div>• Performance metrics and analytics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}