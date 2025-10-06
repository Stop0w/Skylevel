import Link from "next/link";
import { ArrowRight, Users, TrendingUp, CheckCircle, Star, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-skylevel-600 to-skylevel-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <div className="text-white">
            <h1 className="text-3xl font-bold">Skylevel</h1>
            <p className="text-skylevel-200">AI-Powered Candidate Intelligence</p>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/jobs" className="text-white hover:text-skylevel-200 transition-colors">
              Browse Jobs
            </Link>
            <Link href="/candidate/dashboard" className="text-white hover:text-skylevel-200 transition-colors">
              Candidate Dashboard
            </Link>
            <Link href="/fit-queue" className="text-white hover:text-skylevel-200 transition-colors">
              Recruiter Portal
            </Link>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="text-center py-20">
          <h2 className="text-5xl font-bold text-white mb-6">
            Transform 200+ Resumes into 5 High-Confidence Candidates
          </h2>
          <p className="text-xl text-skylevel-100 mb-8 max-w-3xl mx-auto">
            Our AI-powered Fit Score system analyzes candidates across Technical Match, Soft Skills, and Peer Validation to accelerate recruitment decisions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/jobs"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-skylevel-600 rounded-lg hover:bg-neutral-50 transition-colors duration-200 font-semibold"
            >
              <span>Find Opportunities</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/fit-queue"
              className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-skylevel-600 transition-colors duration-200 font-semibold"
            >
              <span>View Fit Queue</span>
              <Users className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">3 min</div>
              <div className="text-skylevel-200">Application Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">85%</div>
              <div className="text-skylevel-200">Match Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">2 min</div>
              <div className="text-skylevel-200">Referral Validation</div>
            </div>
          </div>
        </div>

        {/* Fit Score Explanation */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            How Fit Scores Work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">TMS</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Technical Match Score</h4>
              <p className="text-skylevel-200 text-sm">
                Skills alignment vs job requirements using advanced pattern matching
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">SRS</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Soft Skills Rating</h4>
              <p className="text-skylevel-200 text-sm">
                Behavioral fit assessment based on experience and communication patterns
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">RNS</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Referral Network Score</h4>
              <p className="text-skylevel-200 text-sm">
                Peer validation strength through trusted colleague endorsements
              </p>
            </div>
          </div>
        </div>

        {/* User Journey Preview */}
        <div className="text-center pb-20">
          <h3 className="text-3xl font-bold text-white mb-12">
            Complete User Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/jobs"
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:bg-white/20 transition-colors duration-200"
            >
              <Briefcase className="w-8 h-8 text-white mb-4 mx-auto" />
              <h4 className="text-lg font-semibold text-white mb-2">Browse Jobs</h4>
              <p className="text-skylevel-200 text-sm">
                Discover opportunities with potential Fit Score ranges
              </p>
            </Link>

            <Link
              href="/jobs/1"
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:bg-white/20 transition-colors duration-200"
            >
              <Star className="w-8 h-8 text-white mb-4 mx-auto" />
              <h4 className="text-lg font-semibold text-white mb-2">View Details</h4>
              <p className="text-skylevel-200 text-sm">
                Comprehensive job information and requirements
              </p>
            </Link>

            <Link
              href="/jobs/1/apply"
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:bg-white/20 transition-colors duration-200"
            >
              <CheckCircle className="w-8 h-8 text-white mb-4 mx-auto" />
              <h4 className="text-lg font-semibold text-white mb-2">Apply in 3 Minutes</h4>
              <p className="text-skylevel-200 text-sm">
                Streamlined application with instant Fit Score calculation
              </p>
            </Link>

            <Link
              href="/referral/abc123"
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:bg-white/20 transition-colors duration-200"
            >
              <Users className="w-8 h-8 text-white mb-4 mx-auto" />
              <h4 className="text-lg font-semibold text-white mb-2">Get Validated</h4>
              <p className="text-skylevel-200 text-sm">
                Peer referrals boost your Referral Network Score
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}