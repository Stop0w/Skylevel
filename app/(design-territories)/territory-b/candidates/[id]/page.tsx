'use client'

import React, { useState } from 'react'
import { ScorePill } from '@/components/common/ScorePill'
import { mockCandidates } from '@/lib/mockData'
import { cn } from '@/lib/utils'

export default function TerritoryBCandidateProfile({ params }: { params: { id: string } }) {
  const candidate = mockCandidates.find(c => c.id === params.id) || mockCandidates[0]
  const [activeSection, setActiveSection] = useState<'overview' | 'skills' | 'experience'>('overview')

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Header */}
      <div className="border-b border-neutral-900">
        <div className="max-w-5xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light text-neutral-50 mb-2">Candidate Profile</h1>
              <p className="text-neutral-400 font-light">Thoughtful candidate evaluation</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-neutral-500 font-light">Contemplative Review</p>
              <p className="text-2xl font-light text-accent-400">Territory B</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column - Candidate Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Profile Card */}
            <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center text-3xl font-light text-neutral-300 mx-auto mb-6">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </div>

                <h2 className="text-2xl font-light text-neutral-50 mb-2">{candidate.name}</h2>
                <p className="text-neutral-400 font-light mb-4">{candidate.title}</p>

                <div className="mb-6">
                  <ScorePill
                    score={candidate.score}
                    breakdown={candidate.breakdown}
                    showBreakdown={true}
                    size="lg"
                  />
                </div>

                <div className="w-full py-2 px-3 bg-accent-400/20 border border-accent-400/30 rounded-full text-accent-400 text-sm font-light">
                  {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-sm text-neutral-500 font-light mb-2">Location</p>
                  <p className="text-neutral-300 font-light">{candidate.location}</p>
                </div>

                <div>
                  <p className="text-sm text-neutral-500 font-light mb-2">Experience</p>
                  <p className="text-neutral-300 font-light">{candidate.experience}</p>
                </div>

                <div>
                  <p className="text-sm text-neutral-500 font-light mb-2">Education</p>
                  <p className="text-neutral-300 font-light">{candidate.education}</p>
                </div>

                <div>
                  <p className="text-sm text-neutral-500 font-light mb-2">Email</p>
                  <p className="text-neutral-300 font-light">{candidate.email}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-6">
              <div className="space-y-3">
                <button className="w-full py-3 bg-accent-400/10 border border-accent-400/30 text-accent-400 rounded-lg font-light hover:bg-accent-400/20 transition-all-300">
                  Add to Shortlist
                </button>
                <button className="w-full py-3 bg-neutral-800/50 border border-neutral-700 text-neutral-300 rounded-lg font-light hover:bg-neutral-800 transition-all-300">
                  Schedule Interview
                </button>
                <button className="w-full py-3 bg-neutral-800/50 border border-neutral-700 text-neutral-300 rounded-lg font-light hover:bg-neutral-800 transition-all-300">
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-12">
            {/* Section Navigation */}
            <div className="flex gap-2 border-b border-neutral-800">
              {(['overview', 'skills', 'experience'] as const).map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={cn(
                    'pb-4 px-2 font-light transition-all-300 border-b-2',
                    activeSection === section
                      ? 'text-accent-400 border-accent-400'
                      : 'text-neutral-500 border-transparent hover:text-neutral-300'
                  )}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {/* Overview Section */}
            {activeSection === 'overview' && (
              <div className="space-y-8">
                <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
                  <h3 className="text-xl font-light text-neutral-50 mb-6">About</h3>
                  <p className="text-neutral-400 font-light leading-relaxed">
                    {candidate.bio}
                  </p>
                </div>

                <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
                  <h3 className="text-xl font-light text-neutral-50 mb-6">Score Breakdown</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-neutral-400 font-light">Technical Match Score (TMS)</span>
                        <span className="text-neutral-50 font-light">{candidate.breakdown.tms}</span>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-2">
                        <div
                          className="bg-accent-400 h-2 rounded-full transition-all-300"
                          style={{ width: `${candidate.breakdown.tms}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-neutral-400 font-light">Soft Skills Rating (SRS)</span>
                        <span className="text-neutral-50 font-light">{candidate.breakdown.srs}</span>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-2">
                        <div
                          className="bg-green-400 h-2 rounded-full transition-all-300"
                          style={{ width: `${candidate.breakdown.srs}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-neutral-400 font-light">Referral Network Score (RNS)</span>
                        <span className="text-neutral-50 font-light">{candidate.breakdown.rns}</span>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-2">
                        <div
                          className="bg-orange-400 h-2 rounded-full transition-all-300"
                          style={{ width: `${candidate.breakdown.rns}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <div className="space-y-8">
                <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
                  <h3 className="text-xl font-light text-neutral-50 mb-6">Technical Skills</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {candidate.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-300 font-light"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
                  <h3 className="text-xl font-light text-neutral-50 mb-6">Skill Assessment</h3>
                  <div className="space-y-4">
                    <p className="text-neutral-400 font-light leading-relaxed">
                      The candidate demonstrates strong proficiency across multiple technical domains
                      with particular depth in their core specialties. Their skill set aligns well
                      with current requirements and shows potential for growth.
                    </p>
                    <div className="pt-4 border-t border-neutral-800">
                      <p className="text-sm text-neutral-500 font-light italic">
                        "Technical excellence combined with adaptability makes this candidate a strong fit for evolving project needs."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Experience Section */}
            {activeSection === 'experience' && (
              <div className="space-y-8">
                <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
                  <h3 className="text-xl font-light text-neutral-50 mb-6">Professional Journey</h3>
                  <div className="space-y-6">
                    <p className="text-neutral-400 font-light leading-relaxed">
                      With {candidate.experience.toLowerCase()}, this candidate has developed a comprehensive
                      understanding of their field. Their progression shows consistent growth and increasing
                      responsibility over time.
                    </p>

                    <div className="space-y-4">
                      <div className="pb-4 border-b border-neutral-800">
                        <h4 className="font-light text-neutral-50 mb-2">Senior Role</h4>
                        <p className="text-neutral-400 font-light text-sm mb-2">Current Position</p>
                        <p className="text-neutral-300 font-light">
                          Leading cross-functional initiatives and mentoring junior team members while
                          maintaining technical excellence in project delivery.
                        </p>
                      </div>

                      <div className="pb-4 border-b border-neutral-800">
                        <h4 className="font-light text-neutral-50 mb-2">Mid-Level Experience</h4>
                        <p className="text-neutral-400 font-light text-sm mb-2">Previous Position</p>
                        <p className="text-neutral-300 font-light">
                          Developed core competencies and contributed significantly to key projects,
                          establishing expertise in primary technical domains.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-light text-neutral-50 mb-2">Early Career</h4>
                        <p className="text-neutral-400 font-light text-sm mb-2">Foundation Building</p>
                        <p className="text-neutral-300 font-light">
                          Built fundamental skills and established work habits that support continued
                          professional growth and development.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-8">
                  <h3 className="text-xl font-light text-neutral-50 mb-6">Contemplative Assessment</h3>
                  <div className="space-y-4">
                    <p className="text-neutral-400 font-light leading-relaxed">
                      This candidate's professional journey reflects steady growth and increasing
                      complexity of responsibilities. Their experience suggests both technical capability
                      and the maturity needed for senior roles.
                    </p>
                    <p className="text-neutral-400 font-light leading-relaxed">
                      The combination of their educational background and practical experience provides
                      a strong foundation for continued development and contribution to the team.
                    </p>
                    <div className="pt-4 border-t border-neutral-800">
                      <p className="text-sm text-neutral-500 font-light italic">
                        "Experience, when combined with reflection, leads to wisdom. This candidate shows
                        signs of both valuable experience and thoughtful application of lessons learned."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}