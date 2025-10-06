import { NavLink } from 'react-router-dom'
import Link from 'next/link'

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Recruiter Navigation */}
      <nav className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="fit-queue-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-skylevel-600 dark:text-skylevel-400">
                Skylevel
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link
                  href="/fit-queue"
                  className="text-sm font-medium text-neutral-900 dark:text-neutral-50 hover:text-skylevel-600 dark:hover:text-skylevel-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Fit Queue
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/jobs"
                  className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Jobs
                </Link>
                <Link
                  href="/shortlists"
                  className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Shortlists
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-skylevel-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                JD
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  )
}