import React from 'react';
import { ArrowLeft, ArrowRight, MapPin, DollarSign, Briefcase, Clock, Users, Building } from 'lucide-react';
import ScorePill from '@/components/common/ScorePill';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock job data (in real app, this would come from database)
const mockJob = {
  id: 1,
  title: 'Senior Frontend Developer',
  company: 'TechCorp',
  location: 'San Francisco, CA',
  salary: '$150k - $200k',
  type: 'Full-time',
  posted: '2 days ago',
  department: 'Engineering',
  remote: true,
  description: `We are looking for an experienced frontend developer to join our growing team. You'll work on cutting-edge web applications using modern React, TypeScript, and Next.js.

As a Senior Frontend Developer, you'll be responsible for:
- Building responsive, accessible user interfaces
- Collaborating with product managers and designers
- Mentoring junior developers
- Optimizing application performance
- Contributing to technical architecture decisions

Our tech stack includes React, TypeScript, Next.js, Tailwind CSS, and more. We believe in writing clean, maintainable code and following best practices.

We offer competitive compensation, comprehensive benefits, and a flexible work environment. Join us in building products that make a difference!`,
  requirements: [
    '5+ years of professional frontend development experience',
    'Expert knowledge of React and TypeScript',
    'Experience with Next.js or similar frameworks',
    'Strong understanding of web accessibility standards',
    'Experience with responsive design and cross-browser compatibility',
    'Familiarity with testing frameworks (Jest, React Testing Library)',
    'Excellent communication and collaboration skills'
  ],
  benefits: [
    'Competitive salary and equity package',
    'Comprehensive health, dental, and vision insurance',
    '401(k) with company matching',
    'Unlimited PTO',
    'Professional development budget',
    'Flexible work hours and remote options',
    'Modern equipment and home office stipend'
  ],
  companyInfo: {
    size: '100-500 employees',
    industry: 'Technology',
    founded: '2018',
    culture: 'Fast-paced, collaborative, innovation-focused'
  }
};

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jobId = parseInt(id);

  // In real app, fetch job from database
  if (jobId !== 1) {
    notFound();
  }

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

      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/jobs"
          className="inline-flex items-center space-x-2 text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Jobs</span>
        </Link>
      </div>

      {/* Job Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-neutral-200 p-8">
              {/* Job Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-neutral-900">
                    {mockJob.title}
                  </h1>
                  {mockJob.remote && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      Remote
                    </span>
                  )}
                </div>
                <div className="text-xl text-neutral-600 mb-4">{mockJob.company}</div>
                <div className="flex items-center space-x-6 text-sm text-neutral-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{mockJob.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{mockJob.salary}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{mockJob.type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{mockJob.posted}</span>
                  </div>
                </div>
              </div>

              {/* Fit Score Preview */}
              <div className="bg-gradient-to-r from-skylevel-50 to-blue-50 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      Your Potential Fit Score
                    </h3>
                    <p className="text-neutral-600">
                      Based on your profile, you could score between 70-90% for this role
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-skylevel-600 mb-1">70-90</div>
                    <div className="text-sm text-neutral-500">Fit Score Range</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-skylevel-200">
                  <div className="text-sm text-neutral-600">
                    Complete the 3-minute application to get your exact Fit Score
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                  About the Role
                </h2>
                <div className="prose prose-neutral max-w-none">
                  {mockJob.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-neutral-600 mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {mockJob.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-skylevel-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-neutral-600">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                  Benefits & Perks
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mockJob.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-success-500 rounded-full flex-shrink-0" />
                      <span className="text-neutral-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Company Info */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Company Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-neutral-400" />
                  <div>
                    <div className="text-sm text-neutral-500">Company Size</div>
                    <div className="text-neutral-900">{mockJob.companyInfo.size}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-neutral-400" />
                  <div>
                    <div className="text-sm text-neutral-500">Industry</div>
                    <div className="text-neutral-900">{mockJob.companyInfo.industry}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Company Culture</div>
                  <div className="text-neutral-900">{mockJob.companyInfo.culture}</div>
                </div>
              </div>
            </div>

            {/* Application CTA */}
            <div className="bg-gradient-to-br from-skylevel-600 to-skylevel-700 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">
                Ready to Apply?
              </h3>
              <p className="text-skylevel-100 mb-6">
                Complete our 3-minute application and get your Fit Score instantly
              </p>
              <Link
                href={`/jobs/${mockJob.id}/apply`}
                className="inline-flex items-center justify-center w-full space-x-2 px-6 py-3 bg-white text-skylevel-600 rounded-lg hover:bg-neutral-50 transition-colors duration-200 font-semibold"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="mt-4 pt-4 border-t border-skylevel-500 text-sm text-skylevel-100">
                <div className="flex items-center justify-between mb-2">
                  <span>Application time:</span>
                  <span className="font-semibold">~3 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Response time:</span>
                  <span className="font-semibold">~24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}