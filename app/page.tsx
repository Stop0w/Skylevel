import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-primary-600">
            Skylevel
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            AI-Powered Candidate Intelligence Platform
          </p>
          <p className="text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Transform 200+ resumes into 5 high-confidence candidates through validated Fit Scores.
            Experience three distinct design philosophies tailored to different user needs.
          </p>

          <div className="pt-8">
            <Link
              href="/territories"
              className="inline-block px-8 py-4 bg-primary-600 text-neutral-50 font-bold text-lg rounded-lg hover:bg-primary-700 transition-all"
            >
              Explore Design Territories
            </Link>
          </div>

          <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
              <h3 className="text-xl font-bold text-primary-400 mb-3">Confident Clarity</h3>
              <p className="text-neutral-400 text-sm">
                Bold, decisive interface for quick decision-making
              </p>
            </div>
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
              <h3 className="text-xl font-bold text-accent-400 mb-3">Thoughtful & Calm</h3>
              <p className="text-neutral-400 text-sm">
                Minimal design for contemplative review
              </p>
            </div>
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
              <h3 className="text-xl font-bold text-neutral-300 mb-3">Professional Efficiency</h3>
              <p className="text-neutral-400 text-sm">
                Data-dense interface for power users
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}