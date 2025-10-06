'use client'

import { useState, useMemo, useEffect } from 'react'
import { CandidateCard } from '@/components/common/CandidateCard'
import { ScorePill } from '@/components/common/ScorePill'
import { mockCandidates, mockJobs } from '@/lib/mockData'
import { cn } from '@/lib/utils'

interface Column {
  id: string
  title: string
  width: string
  sortable: boolean
  filterable: boolean
}

interface KeyboardShortcutsProps {
  isOpen: boolean
  onClose: () => void
}

function KeyboardShortcuts({ isOpen, onClose }: KeyboardShortcutsProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-neutral-950/90 z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-50">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-50"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-neutral-300 mb-3">Navigation</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Quick Search</span>
                <kbd className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs">Ctrl+K</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Toggle Shortcuts</span>
                <kbd className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs">?</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Next Row</span>
                <kbd className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs">↓</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Previous Row</span>
                <kbd className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs">↑</kbd>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-300 mb-3">Actions</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Select/Deselect</span>
                <kbd className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs">Space</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Bulk Shortlist</span>
                <kbd className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs">S</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Bulk Reject</span>
                <kbd className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs">R</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Open Details</span>
                <kbd className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs">Enter</kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TerritoryCFitQueue() {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJob, setSelectedJob] = useState(mockJobs[0].id)
  const [statusFilter, setStatusFilter] = useState('all')
  const [scoreFilter, setScoreFilter] = useState('all')
  const [sortBy, setSortBy] = useState('score')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)

  const columns: Column[] = [
    { id: 'checkbox', title: '', width: 'w-12', sortable: false, filterable: false },
    { id: 'name', title: 'Name', width: 'w-48', sortable: true, filterable: true },
    { id: 'title', title: 'Title', width: 'w-56', sortable: true, filterable: true },
    { id: 'skills', title: 'Skills', width: 'w-64', sortable: false, filterable: true },
    { id: 'score', title: 'Score', width: 'w-24', sortable: true, filterable: true },
    { id: 'status', title: 'Status', width: 'w-32', sortable: true, filterable: true },
    { id: 'source', title: 'Source', width: 'w-24', sortable: true, filterable: true },
    { id: 'applied', title: 'Applied', width: 'w-28', sortable: true, filterable: true },
    { id: 'referrals', title: 'Referrals', width: 'w-20', sortable: true, filterable: true },
    { id: 'response', title: 'Response', width: 'w-24', sortable: true, filterable: true },
    { id: 'notes', title: 'Notes', width: 'w-16', sortable: true, filterable: false },
    { id: 'emails', title: 'Emails', width: 'w-16', sortable: true, filterable: false },
  ]

  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = mockCandidates.filter(candidate => {
      // Search filter
      if (searchTerm && !candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false
      }

      // Status filter
      if (statusFilter !== 'all' && candidate.status !== statusFilter) {
        return false
      }

      // Score filter
      if (scoreFilter !== 'all') {
        if (scoreFilter === '85+' && candidate.score < 85) return false
        if (scoreFilter === '70-84' && (candidate.score < 70 || candidate.score > 84)) return false
        if (scoreFilter === '50-69' && (candidate.score < 50 || candidate.score > 69)) return false
        if (scoreFilter === '<50' && candidate.score >= 50) return false
      }

      return true
    })

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'score':
          comparison = a.score - b.score
          break
        case 'applied':
          comparison = new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime()
          break
        case 'referrals':
          comparison = a.referrals - b.referrals
          break
        case 'response':
          comparison = a.responseRate - b.responseRate
          break
        case 'notes':
          comparison = a.notes - b.notes
          break
        case 'emails':
          comparison = a.emails - b.emails
          break
        default:
          comparison = 0
      }
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [searchTerm, statusFilter, scoreFilter, sortBy, sortDirection])

  const handleSort = (columnId: string) => {
    if (columns.find(col => col.id === columnId)?.sortable) {
      if (sortBy === columnId) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
      } else {
        setSortBy(columnId)
        setSortDirection('desc')
      }
    }
  }

  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredAndSortedCandidates.length) {
      setSelectedCandidates([])
    } else {
      setSelectedCandidates(filteredAndSortedCandidates.map(c => c.id))
    }
  }

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    )
  }

  const handleBulkAction = (action: 'shortlist' | 'reject' | 'interview') => {
    console.log(`Bulk ${action} for candidates:`, selectedCandidates)
    // In real app, this would call server actions
    setSelectedCandidates([])
    setShowBulkActions(false)
  }

  // Keyboard shortcuts - client side only
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.ctrlKey) {
        e.preventDefault()
        document.getElementById('quick-search')?.focus()
      }
      if (e.key === '?') {
        e.preventDefault()
        setShowKeyboardShortcuts(!showKeyboardShortcuts)
      }
      if (e.key === 'Escape') {
        setShowKeyboardShortcuts(false)
        setShowBulkActions(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="p-2">
      {/* Header with quick filters */}
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3 mb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-neutral-50">Fit Queue</h2>
            <span className="text-xs text-neutral-400 bg-neutral-800 px-2 py-1 rounded">
              {filteredAndSortedCandidates.length} candidates
            </span>
            {selectedCandidates.length > 0 && (
              <span className="text-xs text-accent-400 bg-accent-400/20 px-2 py-1 rounded">
                {selectedCandidates.length} selected
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded"
            >
              {mockJobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>

            <button
              onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
              className="text-xs text-neutral-400 hover:text-neutral-50 px-2 py-1 bg-neutral-800 rounded"
            >
              ?
            </button>
          </div>
        </div>

        {/* Quick filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <input
            id="quick-search"
            type="text"
            placeholder="Quick search (Ctrl+K)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 text-neutral-300 text-sm px-3 py-1.5 rounded w-64 focus:outline-none focus:border-accent-400"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="reviewing">Reviewing</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={scoreFilter}
            onChange={(e) => setScoreFilter(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded"
          >
            <option value="all">All Scores</option>
            <option value="85+">85+ (Gold)</option>
            <option value="70-84">70-84 (Green)</option>
            <option value="50-69">50-69 (Orange)</option>
            <option value="<50">&lt;50 (Red)</option>
          </select>

          {selectedCandidates.length > 0 && (
            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => setShowBulkActions(!showBulkActions)}
                className="bg-accent-500 text-neutral-950 text-xs px-3 py-1 rounded font-semibold"
              >
                Bulk Actions ({selectedCandidates.length})
              </button>
            </div>
          )}
        </div>

        {/* Bulk actions panel */}
        {showBulkActions && selectedCandidates.length > 0 && (
          <div className="mt-3 p-2 bg-neutral-800 border border-neutral-700 rounded flex items-center gap-2">
            <span className="text-xs text-neutral-400">Actions:</span>
            <button
              onClick={() => handleBulkAction('shortlist')}
              className="text-xs bg-green-600 text-neutral-50 px-2 py-1 rounded"
            >
              Shortlist (S)
            </button>
            <button
              onClick={() => handleBulkAction('interview')}
              className="text-xs bg-blue-600 text-neutral-50 px-2 py-1 rounded"
            >
              Schedule Interview (I)
            </button>
            <button
              onClick={() => handleBulkAction('reject')}
              className="text-xs bg-red-600 text-neutral-50 px-2 py-1 rounded"
            >
              Reject (R)
            </button>
            <button
              onClick={() => setSelectedCandidates([])}
              className="text-xs text-neutral-400 hover:text-neutral-50 px-2 py-1"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>

      {/* Data table */}
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-neutral-800 border-b border-neutral-700">
                {columns.map(column => (
                  <th
                    key={column.id}
                    className={cn(
                      'px-2 py-2 text-left font-medium text-neutral-300',
                      column.width,
                      column.sortable && 'cursor-pointer hover:text-neutral-50'
                    )}
                    onClick={() => handleSort(column.id)}
                  >
                    <div className="flex items-center gap-1">
                      {column.title}
                      {column.sortable && sortBy === column.id && (
                        <span className="text-accent-400">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedCandidates.map((candidate, index) => (
                <tr
                  key={candidate.id}
                  className={cn(
                    'border-b border-neutral-800 hover:bg-neutral-800/30 cursor-pointer',
                    selectedCandidates.includes(candidate.id) && 'bg-neutral-800/50',
                    index % 2 === 0 && 'bg-neutral-900/20'
                  )}
                  onClick={() => handleSelectCandidate(candidate.id)}
                >
                  <td className="px-2 py-2">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.includes(candidate.id)}
                      onChange={() => handleSelectCandidate(candidate.id)}
                      className="w-3 h-3 bg-neutral-700 border-neutral-600 rounded"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-300 text-[10px] font-semibold">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-neutral-50 font-medium">{candidate.name}</div>
                        <div className="text-neutral-500 text-[10px]">{candidate.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <div className="text-neutral-50">{candidate.title}</div>
                    <div className="text-neutral-500 text-[10px]">{candidate.experience}</div>
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex flex-wrap gap-0.5">
                      {candidate.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="px-1 py-0.5 bg-neutral-800 text-neutral-300 text-[10px] rounded">
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 3 && (
                        <span className="px-1 py-0.5 bg-neutral-700 text-neutral-500 text-[10px] rounded">
                          +{candidate.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <ScorePill score={candidate.score} size="sm" />
                  </td>
                  <td className="px-2 py-2">
                    <span className={cn(
                      'px-1.5 py-0.5 text-[10px] rounded-full border',
                      candidate.status === 'new' && 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                      candidate.status === 'reviewing' && 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
                      candidate.status === 'shortlisted' && 'bg-green-500/20 text-green-400 border-green-500/30',
                      candidate.status === 'rejected' && 'bg-red-500/20 text-red-400 border-red-500/30'
                    )}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-neutral-400">{candidate.source}</td>
                  <td className="px-2 py-2">
                    <div className="text-neutral-50">{candidate.appliedDate}</div>
                    <div className="text-neutral-500 text-[10px]">{candidate.lastActive}</div>
                  </td>
                  <td className="px-2 py-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className={cn(
                        'font-medium',
                        candidate.referrals > 0 ? 'text-green-400' : 'text-neutral-500'
                      )}>
                        {candidate.referrals}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-1">
                      <div className="w-8 bg-neutral-800 rounded-full h-1">
                        <div
                          className={cn(
                            'h-1 rounded-full',
                            candidate.responseRate >= 80 ? 'bg-green-500' :
                            candidate.responseRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          )}
                          style={{ width: `${candidate.responseRate}%` }}
                        />
                      </div>
                      <span className="text-neutral-400">{candidate.responseRate}%</span>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-center text-neutral-400">{candidate.notes}</td>
                  <td className="px-2 py-2 text-center text-neutral-400">{candidate.emails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status bar */}
      <div className="mt-2 bg-neutral-900/50 border border-neutral-800 rounded-lg p-2">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-4">
            <span>Total: {filteredAndSortedCandidates.length}</span>
            <span>New: {filteredAndSortedCandidates.filter(c => c.status === 'new').length}</span>
            <span>Reviewing: {filteredAndSortedCandidates.filter(c => c.status === 'reviewing').length}</span>
            <span>Shortlisted: {filteredAndSortedCandidates.filter(c => c.status === 'shortlisted').length}</span>
            <span>Avg Score: {Math.round(filteredAndSortedCandidates.reduce((acc, c) => acc + c.score, 0) / filteredAndSortedCandidates.length)}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>High Scoring (85+): {filteredAndSortedCandidates.filter(c => c.score >= 85).length}</span>
            <span>With Referrals: {filteredAndSortedCandidates.filter(c => c.referrals > 0).length}</span>
          </div>
        </div>
      </div>

      <KeyboardShortcuts
        isOpen={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
      />
    </div>
  )
}