'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { mockCandidates } from '@/lib/mock-data'
import { ScorePill } from '@/components/common/ScorePill'
import { cn } from '@/lib/utils'

export default function TerritoryCCandidateProfile() {
  const params = useParams()
  const candidateId = params.id as string

  const candidate = mockCandidates.find(c => c.id === candidateId)
  if (!candidate) {
    return <div className="p-4 text-neutral-400">Candidate not found</div>
  }

  const [activeTab, setActiveTab] = useState('overview')
  const [showTimeline, setShowTimeline] = useState(true)
  const [emailTemplate, setEmailTemplate] = useState('')

  const tabs = [
    { id: 'overview', label: 'Overview', shortcut: '1' },
    { id: 'skills', label: 'Skills Analysis', shortcut: '2' },
    { id: 'activity', label: 'Activity Log', shortcut: '3' },
    { id: 'communications', label: 'Communications', shortcut: '4' },
    { id: 'referrals', label: 'Referrals', shortcut: '5' },
    { id: 'notes', label: 'Notes', shortcut: '6' }
  ]

  const scoreBreakdown = [
    { label: 'Technical Match Score (TMS)', value: candidate.breakdown?.tms || 0, weight: '50%', description: 'Alignment with job requirements' },
    { label: 'Soft Skills Rating (SRS)', value: candidate.breakdown?.srs || 0, weight: '30%', description: 'Behavioral and cultural fit' },
    { label: 'Referral Network Score (RNS)', value: candidate.breakdown?.rns || 0, weight: '20%', description: 'Peer validation strength' }
  ]

  const activityLog = [
    { id: '1', date: '2024-10-05T16:00:00Z', type: 'system', action: 'Profile viewed by Sarah Davis', user: 'Sarah Davis' },
    { id: '2', date: '2024-10-05T14:30:00Z', type: 'email', action: 'Screening call scheduled', user: 'System' },
    { id: '3', date: '2024-10-04T11:15:00Z', type: 'note', action: 'Strong technical background, good communication', user: 'John Smith' },
    { id: '4', date: '2024-10-03T09:45:00Z', type: 'status', action: 'Status changed to Reviewing', user: 'Sarah Davis' },
    { id: '5', date: '2024-10-02T16:20:00Z', type: 'email', action: 'Initial outreach sent', user: 'System' },
    { id: '6', date: '2024-10-01T08:30:00Z', type: 'application', action: 'Application submitted', user: 'System' }
  ]

  const emailTemplates = [
    { id: 'screening', label: 'Screening Call Invitation', subject: 'Screening Call - Senior Frontend Engineer' },
    { id: 'technical', label: 'Technical Assessment', subject: 'Technical Assessment - Senior Frontend Engineer' },
    { id: 'rejection', label: 'Rejection Letter', subject: 'Update on your application' },
    { id: 'followup', label: 'Follow-up', subject: 'Following up on your application' }
  ]

  return (
    <div className="p-2">
      {/* Header */}
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="text-neutral-400 hover:text-neutral-50">← Back</button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-300 font-semibold">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-50">{candidate.name}</h2>
                <p className="text-sm text-neutral-400">{candidate.title} • {candidate.experience}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ScorePill score={candidate.score} size="md" breakdown={candidate.breakdown} showBreakdown />
              <span className={cn(
                'px-2 py-1 text-xs rounded-full border',
                candidate.status === 'new' && 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                candidate.status === 'reviewing' && 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
                candidate.status === 'shortlisted' && 'bg-green-500/20 text-green-400 border-green-500/30',
                candidate.status === 'rejected' && 'bg-red-500/20 text-red-400 border-red-500/30'
              )}>
                {candidate.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-green-600 text-neutral-50 text-xs px-3 py-1.5 rounded hover:bg-green-700">
              Schedule Interview
            </button>
            <button className="bg-accent-500 text-neutral-950 text-xs px-3 py-1.5 rounded hover:bg-accent-600">
              Add to Shortlist
            </button>
            <button className="bg-red-600 text-neutral-50 text-xs px-3 py-1.5 rounded hover:bg-red-700">
              Reject
            </button>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="mt-3 pt-3 border-t border-neutral-700 flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Location:</span>
            <span className="text-neutral-50">{candidate.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Email:</span>
            <span className="text-neutral-50">{candidate.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Phone:</span>
            <span className="text-neutral-50">{candidate.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Applied:</span>
            <span className="text-neutral-50">{candidate.appliedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Last Active:</span>
            <span className="text-neutral-50">{candidate.lastActive}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Response Rate:</span>
            <span className="text-neutral-50">{candidate.responseRate}%</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-1 mb-2">
        <div className="flex items-center gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 text-xs rounded transition-all',
                activeTab === tab.id
                  ? 'bg-neutral-800 text-neutral-50'
                  : 'text-neutral-400 hover:text-neutral-50 hover:bg-neutral-800/50'
              )}
            >
              <span>{tab.label}</span>
              <kbd className="px-1 py-0.5 bg-neutral-700 border border-neutral-600 rounded text-[10px]">
                {tab.shortcut}
              </kbd>
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setShowTimeline(!showTimeline)}
              className={cn(
                'px-3 py-1.5 text-xs rounded transition-all',
                showTimeline
                  ? 'bg-neutral-800 text-neutral-50'
                  : 'text-neutral-400 hover:text-neutral-50 hover:bg-neutral-800/50'
              )}
            >
              Timeline View
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Main Content */}
        <div className="col-span-2 space-y-2">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-2">
              {/* Score Breakdown */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
                <h3 className="text-sm font-semibold text-neutral-50 mb-3">Fit Score Breakdown</h3>
                <div className="space-y-3">
                  {scoreBreakdown.map((score, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-32">
                        <div className="text-xs text-neutral-50">{score.label}</div>
                        <div className="text-xs text-neutral-500">{score.weight}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-neutral-400">{score.description}</span>
                          <span className="text-xs text-neutral-50 font-medium">{score.value}/100</span>
                        </div>
                        <div className="bg-neutral-800 rounded-full h-2">
                          <div
                            className={cn(
                              'h-full rounded-full transition-all duration-300',
                              score.value >= 85 ? 'bg-accent-500' :
                              score.value >= 70 ? 'bg-green-500' :
                              score.value >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            )}
                            style={{ width: `${score.value}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
                <h3 className="text-sm font-semibold text-neutral-50 mb-3">Skills & Experience</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h4 className="text-xs font-medium text-neutral-300 mb-2">Technical Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded border border-neutral-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-neutral-300 mb-2">Experience Highlights</h4>
                    <div className="space-y-1 text-xs text-neutral-400">
                      <div>• 8+ years in frontend development</div>
                      <div>• Expert in React ecosystem</div>
                      <div>• Strong TypeScript background</div>
                      <div>• Cloud architecture experience</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
                <h3 className="text-sm font-semibold text-neutral-50 mb-3">Recent Activity</h3>
                <div className="space-y-2">
                  {activityLog.slice(0, 5).map(activity => (
                    <div key={activity.id} className="flex items-start gap-2 text-xs">
                      <div className={cn(
                        'w-1.5 h-1.5 rounded-full mt-1',
                        activity.type === 'system' && 'bg-blue-400',
                        activity.type === 'email' && 'bg-green-400',
                        activity.type === 'note' && 'bg-yellow-400',
                        activity.type === 'status' && 'bg-purple-400',
                        activity.type === 'application' && 'bg-accent-400'
                      )} />
                      <div className="flex-1">
                        <div className="text-neutral-300">{activity.action}</div>
                        <div className="text-neutral-500">
                          {new Date(activity.date).toLocaleDateString()} • {activity.user}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Skills Analysis Tab */}
          {activeTab === 'skills' && (
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-neutral-50 mb-3">Skills Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-medium text-neutral-300 mb-2">Required Skills Match</h4>
                  <div className="space-y-2">
                    {candidate.skills.slice(0, 6).map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-xs text-neutral-300">{skill}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-neutral-800 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${Math.random() * 30 + 70}%` }} />
                          </div>
                          <span className="text-xs text-neutral-400">{Math.round(Math.random() * 30 + 70)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-neutral-300 mb-2">Additional Skills</h4>
                  <div className="space-y-2">
                    {['Leadership', 'Mentoring', 'Agile', 'CI/CD', 'Testing', 'Documentation'].map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-xs text-neutral-300">{skill}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-neutral-800 rounded-full h-1.5">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${Math.random() * 40 + 40}%` }} />
                          </div>
                          <span className="text-xs text-neutral-400">{Math.round(Math.random() * 40 + 40)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Activity Log Tab */}
          {activeTab === 'activity' && (
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-neutral-50 mb-3">Complete Activity Log</h3>
              <div className="space-y-2">
                {activityLog.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3 p-2 bg-neutral-800/30 rounded">
                    <div className={cn(
                      'w-2 h-2 rounded-full mt-1',
                      activity.type === 'system' && 'bg-blue-400',
                      activity.type === 'email' && 'bg-green-400',
                      activity.type === 'note' && 'bg-yellow-400',
                      activity.type === 'status' && 'bg-purple-400',
                      activity.type === 'application' && 'bg-accent-400'
                    )} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-300">{activity.action}</span>
                        <span className="text-xs text-neutral-500">
                          {new Date(activity.date).toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-500">by {activity.user}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Communications Tab */}
          {activeTab === 'communications' && (
            <div className="space-y-2">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
                <h3 className="text-sm font-semibold text-neutral-50 mb-3">Send Email</h3>
                <div className="space-y-3">
                  <select
                    value={emailTemplate}
                    onChange={(e) => setEmailTemplate(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs px-3 py-2 rounded"
                  >
                    <option value="">Select template...</option>
                    {emailTemplates.map(template => (
                      <option key={template.id} value={template.id}>{template.label}</option>
                    ))}
                  </select>

                  {emailTemplate && (
                    <>
                      <input
                        type="text"
                        placeholder="Subject"
                        defaultValue={emailTemplates.find(t => t.id === emailTemplate)?.subject}
                        className="w-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs px-3 py-2 rounded"
                      />
                      <textarea
                        placeholder="Email content..."
                        rows={8}
                        className="w-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs px-3 py-2 rounded resize-none"
                      />
                      <div className="flex items-center gap-2">
                        <button className="bg-blue-600 text-neutral-50 text-xs px-3 py-1.5 rounded hover:bg-blue-700">
                          Send Email
                        </button>
                        <button className="bg-neutral-700 text-neutral-300 text-xs px-3 py-1.5 rounded hover:bg-neutral-600">
                          Save as Draft
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
                <h3 className="text-sm font-semibold text-neutral-50 mb-3">Email History</h3>
                <div className="space-y-2">
                  <div className="p-2 bg-neutral-800/30 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-50">Screening Call Invitation</span>
                      <span className="text-xs text-neutral-500">Oct 5, 2024</span>
                    </div>
                    <div className="text-xs text-neutral-400">Sent by Sarah Davis • Delivered</div>
                  </div>
                  <div className="p-2 bg-neutral-800/30 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-50">Initial Outreach</span>
                      <span className="text-xs text-neutral-500">Oct 2, 2024</span>
                    </div>
                    <div className="text-xs text-neutral-400">Sent by System • Opened</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Referrals Tab */}
          {activeTab === 'referrals' && (
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-neutral-50 mb-3">Referral Network</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-300">Total Referrals</span>
                  <span className="text-lg font-bold text-accent-400">{candidate.referrals}</span>
                </div>

                <div className="space-y-2">
                  <div className="p-2 bg-neutral-800/30 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-300 text-[10px]">
                        AB
                      </div>
                      <div>
                        <div className="text-xs text-neutral-50">Alice Brown</div>
                        <div className="text-xs text-neutral-500">Senior Engineer • Trust Score: 9/10</div>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-400">"Excellent frontend developer, worked with Sarah for 3 years"</div>
                  </div>

                  <div className="p-2 bg-neutral-800/30 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-300 text-[10px]">
                        CD
                      </div>
                      <div>
                        <div className="text-xs text-neutral-50">Charlie Davis</div>
                        <div className="text-xs text-neutral-500">Engineering Manager • Trust Score: 8/10</div>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-400">"Strong technical skills and great team player"</div>
                  </div>
                </div>

                <button className="w-full bg-accent-500/20 text-accent-400 border border-accent-500/30 text-xs px-3 py-2 rounded hover:bg-accent-500/30">
                  Generate Referral Link
                </button>
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-neutral-50 mb-3">Notes & Comments</h3>
              <div className="space-y-3">
                <textarea
                  placeholder="Add a new note..."
                  rows={3}
                  className="w-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs px-3 py-2 rounded resize-none"
                />
                <button className="bg-blue-600 text-neutral-50 text-xs px-3 py-1.5 rounded hover:bg-blue-700">
                  Add Note
                </button>

                <div className="space-y-2">
                  <div className="p-2 bg-neutral-800/30 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-50">Strong technical background</span>
                      <span className="text-xs text-neutral-500">John Smith • Oct 4, 2024</span>
                    </div>
                    <div className="text-xs text-neutral-400">Candidate demonstrates excellent React skills and good communication during initial screening.</div>
                  </div>

                  <div className="p-2 bg-neutral-800/30 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-50">Culture fit assessment</span>
                      <span className="text-xs text-neutral-500">Sarah Davis • Oct 3, 2024</span>
                    </div>
                    <div className="text-xs text-neutral-400">Great alignment with team values. Collaborative mindset evident from past projects.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-2">
          {/* Quick Stats */}
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-neutral-50 mb-3">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Total Notes</span>
                <span className="text-xs text-neutral-50 font-medium">{candidate.notes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Emails Sent</span>
                <span className="text-xs text-neutral-50 font-medium">{candidate.emails}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Referrals</span>
                <span className="text-xs text-neutral-50 font-medium">{candidate.referrals}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Response Rate</span>
                <span className="text-xs text-neutral-50 font-medium">{candidate.responseRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Source</span>
                <span className="text-xs text-neutral-50 font-medium">{candidate.source}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Salary Expectation</span>
                <span className="text-xs text-neutral-50 font-medium">{candidate.salary}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          {showTimeline && (
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-neutral-50 mb-3">Application Timeline</h3>
              <div className="space-y-2">
                {candidate.activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-1" />
                    <div className="flex-1">
                      <div className="text-xs text-neutral-300">{activity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Candidates */}
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-neutral-50 mb-3">Similar Candidates</h3>
            <div className="space-y-2">
              {mockCandidates
                .filter(c => c.id !== candidateId && c.status !== 'rejected')
                .slice(0, 3)
                .map(similarCandidate => (
                  <div key={similarCandidate.id} className="flex items-center gap-2 p-2 bg-neutral-800/30 rounded cursor-pointer hover:bg-neutral-800/50">
                    <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-300 text-[10px] font-semibold">
                      {similarCandidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-neutral-50 truncate">{similarCandidate.name}</div>
                      <div className="text-xs text-neutral-500 truncate">{similarCandidate.title}</div>
                    </div>
                    <ScorePill score={similarCandidate.score} size="sm" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}