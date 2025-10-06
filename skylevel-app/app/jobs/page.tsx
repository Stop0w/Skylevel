import React from 'react';
import { ArrowRight, MapPin, DollarSign, Briefcase, Clock } from 'lucide-react';
import ScorePill from '@/components/common/ScorePill';
import Link from 'next/link';

// Mock data for job listings
const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$150k - $200k',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'We are looking for an experienced frontend developer to join our growing team...',
    requirements: ['React', 'TypeScript', '5+ years experience'],
    fitScoreRange: '70-90',
    department: 'Engineering',
    remote: true
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'New York, NY',
    salary: '$120k - $160k',
    type: 'Full-time',
    posted: '1 week ago',
    description: 'Seeking a product manager to drive our product strategy and execution...',
    requirements: ['Product strategy', 'Data analysis', '3+ years experience'],
    fitScoreRange: '65-85',
    department: 'Product',
    remote: false
  },
  {
    id: 3,
    title: 'Backend Engineer',
    company: 'CloudTech',
    location: 'Remote',
    salary: '$130k - $170k',
    type: 'Full-time',
    posted: '3 days ago',
    description: 'Join our backend team to build scalable systems and APIs...',
    requirements: ['Node.js', 'AWS', 'PostgreSQL', '4+ years experience'],
    fitScoreRange: '75-95',
    department: 'Engineering',
    remote: true
  }
];

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-skylevel-600">
                Skylevel
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/jobs" className="text-neutral-900 hover:text-skylevel-600 font-medium">
                Browse Jobs
              </Link>
              <Link href="/candidate/dashboard" className="text-neutral-600 hover:text-skylevel-600 font-medium">
                My Applications
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-skylevel-600 to-skylevel-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Find Your Perfect Match
            </h1>
            <p className="text-xl text-skylevel-100 mb-8">
              Get matched with opportunities that fit your skills and experience
            </p>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold">200+</div>
                <div className="text-sm text-skylevel-100">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">85%</div>
                <div className="text-sm text-skylevel-100">Match Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">3 min</div>
                <div className="text-sm text-skylevel-100">Application Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">
            Latest Opportunities
          </h2>
          <div className="flex items-center space-x-4">
            <select className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Product</option>
              <option>Design</option>
              <option>Sales</option>
            </select>
            <select className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500">
              <option>All Locations</option>
              <option>Remote</option>
              <option>San Francisco</option>
              <option>New York</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {mockJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-neutral-900">
                      {job.title}
                    </h3>
                    {job.remote && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Remote
                      </span>
                    )}
                  </div>
                  <div className="text-lg text-neutral-600 mb-1">{job.company}</div>
                  <div className="flex items-center space-x-4 text-sm text-neutral-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-neutral-500 mb-2">Potential Fit Score</div>
                  <div className="text-lg font-mono font-semibold text-skylevel-600">
                    {job.fitScoreRange}
                  </div>
                </div>
              </div>

              <p className="text-neutral-600 mb-4 line-clamp-2">
                {job.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full"
                    >
                      {req}
                    </span>
                  ))}
                  {job.requirements.length > 3 && (
                    <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full">
                      +{job.requirements.length - 3} more
                    </span>
                  )}
                </div>
                <Link
                  href={`/jobs/${job.id}`}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-skylevel-600 text-white rounded-lg hover:bg-skylevel-700 transition-colors duration-200"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-skylevel-600 text-skylevel-600 rounded-lg hover:bg-skylevel-50 transition-colors duration-200">
            Load More Jobs
          </button>
        </div>
      </div>
    </div>
  );
}