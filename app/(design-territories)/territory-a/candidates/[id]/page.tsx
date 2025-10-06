'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { ScorePill } from '../../../../components/common/ScorePill'
import { mockCandidates } from '../../../../lib/mockData'

export default function TerritoryACandidateDetail() {
  const params = useParams()
  const candidateId = params.id as string
  const [selectedTab, setSelectedTab] = useState('overview')

  const candidate = mockCandidates.find(c => c.id === candidateId) || mockCandidates[0]

  const tabs = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'referrals', label: 'REFERRALS' }
  ]

  const experienceData = [
    {
      company: 'TechCorp Inc.',
      position: 'Senior Frontend Engineer',
      duration: '2021 - Present',
      description: 'Lead development of React-based applications serving 1M+ users'
    },
    {
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      duration: '2019 - 2021',
      description: 'Built responsive web applications using modern JavaScript frameworks'
    }
  ]

  const referralData = [
    {
      name: 'Alex Johnson',
      role: 'Engineering Manager',
      company: 'TechCorp Inc.',
      trustScore: 95,
      relationship: 'Former Manager'
    },
    {
      name: 'Maria Garcia',
      role: 'Senior Developer',
      company: 'TechCorp Inc.',
      trustScore: 88,
      relationship: 'Teammate'
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Header */}
      <div className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white text-primary-600 rounded-full flex items-center justify-center text-3xl font-black shadow-xl">
                {candidate.avatar}
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight mb-2">
                  {candidate.name}
                </h1>
                <p className="text-xl font-bold text-primary-200 uppercase tracking-wider mb-1">
                  {candidate.headline}
                </p>
                <p className="text-primary-200 font-medium">
                  {candidate.location}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="mb-4">
                <ScorePill
                  score={candidate.fitScore}
                  confidence={candidate.confidence}
                  showBreakdown={true}
                  size="lg"
                  breakdown={candidate.breakdown}
                />
              </div>
              <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-black text-lg hover:bg-primary-50 transition-colors shadow-xl">
                MOVE TO HIRE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-6 py-4 font-bold text-sm uppercase tracking-wider transition-all ${
                  selectedTab === tab.id
                    ? 'bg-primary-600 text-white border-b-4 border-primary-800'
                    : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Score Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-wider mb-6">
            FIT SCORE BREAKDOWN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'TECHNICAL MATCH SCORE', score: candidate.breakdown.tms, color: 'bg-blue-500' },
              { label: 'SOFT SKILLS RATING', score: candidate.breakdown.srs, color: 'bg-green-500' },
              { label: 'REFERRAL NETWORK SCORE', score: candidate.breakdown.rns, color: 'bg-accent-400' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white font-black text-2xl shadow-lg">
                    <div className={`w-full h-full rounded-full flex items-center justify-center ${item.color}`}>
                      {item.score}
                    </div>
                  </div>
                </div>
                <p className="font-bold text-neutral-700 uppercase tracking-wider text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {selectedTab === 'overview' && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-wider mb-6">
                  CANDIDATE OVERVIEW
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-primary-600 mb-3">Summary</h3>
                    <p className="text-neutral-700 font-medium leading-relaxed">
                      Exceptional {candidate.headline.toLowerCase()} with proven track record of delivering high-quality, scalable solutions.
                      Strong expertise in modern technologies and excellent team collaboration skills.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-primary-600 mb-3">Top Skills</h3>
                    <div className="flex flex-wrap gap-3">
                      {candidate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-bold border-2 border-primary-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-primary-600 mb-3">Recent Experience</h3>
                    <div className="space-y-4">
                      {experienceData.map((exp, index) => (
                        <div key={index} className="border-l-4 border-primary-500 pl-4">
                          <h4 className="font-black text-neutral-900">{exp.position}</h4>
                          <p className="font-bold text-primary-600">{exp.company}</p>
                          <p className="text-neutral-600 font-medium">{exp.duration}</p>
                          <p className="text-neutral-700 mt-2">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'referrals' && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-wider mb-6">
                  REFERRAL VALIDATIONS
                </h2>
                <div className="space-y-4">
                  {referralData.map((referral, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border-2 border-neutral-200">
                      <div>
                        <h3 className="font-black text-neutral-900">{referral.name}</h3>
                        <p className="font-bold text-primary-600">{referral.role} • {referral.company}</p>
                        <p className="text-neutral-600 font-medium">{referral.relationship}</p>
                      </div>
                      <div className="text-right">
                        <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg bg-accent-400">
                          {referral.trustScore}
                        </div>
                        <p className="text-xs text-neutral-500 mt-1 font-medium uppercase">Trust Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-black text-neutral-900 uppercase tracking-wider mb-4">
                QUICK ACTIONS
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-green-500 text-white py-4 px-4 rounded-lg font-black hover:bg-green-600 transition-colors">
                  HIRE CANDIDATE
                </button>
                <button className="w-full bg-primary-600 text-white py-4 px-4 rounded-lg font-black hover:bg-primary-700 transition-colors">
                  SCHEDULE INTERVIEW
                </button>
                <button className="w-full bg-orange-500 text-white py-4 px-4 rounded-lg font-black hover:bg-orange-600 transition-colors">
                  REQUEST REFERRAL
                </button>
                <button className="w-full bg-red-500 text-white py-4 px-4 rounded-lg font-black hover:bg-red-600 transition-colors">
                  REJECT CANDIDATE
                </button>
              </div>
            </div>

            {/* Communication History */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-black text-neutral-900 uppercase tracking-wider mb-4">
                COMMUNICATION
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                  <span className="font-bold text-neutral-700">Email Sent</span>
                  <span className="text-sm text-neutral-500">2 days ago</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                  <span className="font-bold text-neutral-700">Application Received</span>
                  <span className="text-sm text-neutral-500">5 days ago</span>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-black text-neutral-900 uppercase tracking-wider mb-4">
                ADD NOTES
              </h2>
              <textarea
                className="w-full p-3 border-2 border-neutral-200 rounded-lg font-medium text-neutral-700 focus:border-primary-400 focus:outline-none"
                rows={4}
                placeholder="Add your notes about this candidate..."
              />
              <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-primary-700 transition-colors mt-3">
                SAVE NOTES
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}