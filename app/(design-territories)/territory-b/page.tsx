import React from 'react'
import Link from 'next/link'

export default function TerritoryBPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl font-light text-neutral-50 mb-4">Territory B</h1>
          <p className="text-xl text-neutral-400 font-light leading-relaxed">
            Thoughtful & Calm — A contemplative approach to candidate review
          </p>
        </div>

        <nav className="space-y-6">
          <Link
            href="/(design-territories)/territory-b/fit-queue"
            className="block p-8 bg-neutral-900/30 border border-neutral-800 rounded-lg hover:border-accent-400/50 transition-all-300"
          >
            <h2 className="text-2xl font-light text-neutral-50 mb-2">Fit Queue</h2>
            <p className="text-neutral-400 font-light">
              Minimal candidate review interface designed for focused contemplation
            </p>
          </Link>

          <Link
            href="/(design-territories)/territory-b/dashboard"
            className="block p-8 bg-neutral-900/30 border border-neutral-800 rounded-lg hover:border-accent-400/50 transition-all-300"
          >
            <h2 className="text-2xl font-light text-neutral-50 mb-2">Dashboard</h2>
            <p className="text-neutral-400 font-light">
              Calm overview of recruitment metrics and insights
            </p>
          </Link>

          <Link
            href="/(design-territories)/territory-b/candidates/sample-id"
            className="block p-8 bg-neutral-900/30 border border-neutral-800 rounded-lg hover:border-accent-400/50 transition-all-300"
          >
            <h2 className="text-2xl font-light text-neutral-50 mb-2">Candidate Profile</h2>
            <p className="text-neutral-400 font-light">
              Detailed candidate view with contemplative information hierarchy
            </p>
          </Link>
        </nav>
      </div>
    </div>
  )
}