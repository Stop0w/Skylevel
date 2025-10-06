'use client';

import React, { useState } from 'react';
import { Check, X, Star, User, Briefcase, Mail, Phone, AlertCircle, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface ReferralData {
  candidateName: string;
  candidateJob: string;
  candidateCompany: string;
  referrerName: string;
  referrerEmail: string;
  referrerRelationship: string;
  workedTogether: boolean;
  yearsWorkedTogether: string;
  skillsValidation: {
    skillName: string;
    validated: boolean;
    confidence: number;
    comment: string;
  }[];
  overallRecommendation: 'strong_recommend' | 'recommend' | 'neutral' | 'not_recommend';
  additionalComments: string;
  wouldHire: boolean;
}

export default function ReferralPage() {
  const params = useParams();
  const token = params.token as string;

  // Mock data - in real app, fetch from database using token
  const mockCandidateData = {
    name: 'John Doe',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js'],
    experience: '5+ years',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe'
  };

  const [referralData, setReferralData] = useState<ReferralData>({
    candidateName: mockCandidateData.name,
    candidateJob: mockCandidateData.jobTitle,
    candidateCompany: mockCandidateData.company,
    referrerName: '',
    referrerEmail: '',
    referrerRelationship: '',
    workedTogether: false,
    yearsWorkedTogether: '',
    skillsValidation: mockCandidateData.skills.map(skill => ({
      skillName: skill,
      validated: false,
      confidence: 3,
      comment: ''
    })),
    overallRecommendation: 'neutral',
    additionalComments: '',
    wouldHire: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSkillValidation = (skillIndex: number, field: keyof typeof referralData.skillsValidation[0], value: any) => {
    setReferralData(prev => ({
      ...prev,
      skillsValidation: prev.skillsValidation.map((skill, index) =>
        index === skillIndex ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-lg border border-neutral-200 p-8 text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-success-600" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">
              Thank You!
            </h1>
            <p className="text-neutral-600 mb-6">
              Your validation for {mockCandidateData.name} has been submitted successfully.
              This will help improve their Fit Score for the {mockCandidateData.jobTitle} position.
            </p>
            <div className="bg-gradient-to-r from-skylevel-50 to-blue-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-neutral-600">
                Your referral contributes to the candidate's Referral Network Score (RNS) and helps recruiters make better decisions.
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-skylevel-600 text-white rounded-lg hover:bg-skylevel-700 transition-colors duration-200"
            >
              <span>Learn More About Skylevel</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-skylevel-600">
                Skylevel
              </Link>
            </div>
            <div className="text-sm text-neutral-600">
              Referral Validation
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Info */}
      <div className="bg-gradient-to-r from-skylevel-600 to-skylevel-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              Help {mockCandidateData.name} Get Their Dream Job
            </h1>
            <p className="text-skylevel-100 mb-6">
              Your validation will take approximately 2 minutes and significantly impact their Fit Score
            </p>

            <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <User className="w-10 h-10" />
                  </div>
                  <div className="font-semibold">{mockCandidateData.name}</div>
                  <div className="text-sm text-skylevel-100">{mockCandidateData.jobTitle}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">Applying for</div>
                  <div className="text-skylevel-100">{mockCandidateData.company}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex flex-wrap justify-center gap-2">
                  {mockCandidateData.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Your Information */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Your Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={referralData.referrerName}
                  onChange={(e) => setReferralData(prev => ({ ...prev, referrerName: e.target.value }))}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
                  placeholder="Jane Smith"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  value={referralData.referrerEmail}
                  onChange={(e) => setReferralData(prev => ({ ...prev, referrerEmail: e.target.value }))}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
                  placeholder="jane.smith@example.com"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Your Relationship to {mockCandidateData.name} *
              </label>
              <select
                value={referralData.referrerRelationship}
                onChange={(e) => setReferralData(prev => ({ ...prev, referrerRelationship: e.target.value }))}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
                required
              >
                <option value="">Select relationship</option>
                <option value="manager">Former Manager</option>
                <option value="colleague">Former Colleague</option>
                <option value="teammate">Team Member</option>
                <option value="client">Client/Customer</option>
                <option value="mentor">Mentor</option>
                <option value="friend">Professional Connection</option>
              </select>
            </div>

            <div className="mt-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="worked-together"
                  checked={referralData.workedTogether}
                  onChange={(e) => setReferralData(prev => ({ ...prev, workedTogether: e.target.checked }))}
                  className="w-4 h-4 text-skylevel-600 border-neutral-300 rounded focus:ring-skylevel-500"
                />
                <label htmlFor="worked-together" className="text-sm font-medium text-neutral-700">
                  I have worked directly with {mockCandidateData.name}
                </label>
              </div>
            </div>

            {referralData.workedTogether && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  How many years did you work together?
                </label>
                <select
                  value={referralData.yearsWorkedTogether}
                  onChange={(e) => setReferralData(prev => ({ ...prev, yearsWorkedTogether: e.target.value }))}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
                >
                  <option value="">Select duration</option>
                  <option value="0-1">Less than 1 year</option>
                  <option value="1-2">1-2 years</option>
                  <option value="2-5">2-5 years</option>
                  <option value="5+">More than 5 years</option>
                </select>
              </div>
            )}
          </div>

          {/* Skills Validation */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Skills Validation
            </h2>
            <p className="text-neutral-600 mb-6">
              Please rate your confidence in {mockCandidateData.name}'s proficiency in these skills:
            </p>

            <div className="space-y-6">
              {referralData.skillsValidation.map((skill, index) => (
                <div key={index} className="border border-neutral-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={skill.validated}
                        onChange={(e) => handleSkillValidation(index, 'validated', e.target.checked)}
                        className="w-4 h-4 text-skylevel-600 border-neutral-300 rounded focus:ring-skylevel-500"
                      />
                      <span className="font-medium text-neutral-900">{skill.skillName}</span>
                    </div>
                    {skill.validated && (
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleSkillValidation(index, 'confidence', star)}
                            className="text-2xl transition-colors duration-200"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= skill.confidence
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-neutral-300'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-neutral-600">
                          {skill.conficiency === 5 ? 'Expert' :
                           skill.confidency === 4 ? 'Advanced' :
                           skill.confidency === 3 ? 'Intermediate' :
                           skill.confidency === 2 ? 'Basic' : 'Beginner'}
                        </span>
                      </div>
                    )}
                  </div>

                  {skill.validated && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Brief comment about their {skill.skillName} skills
                      </label>
                      <textarea
                        value={skill.comment}
                        onChange={(e) => handleSkillValidation(index, 'comment', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500 text-sm"
                        placeholder={`e.g., "John built excellent React components..."`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Overall Recommendation */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Overall Recommendation
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Would you recommend {mockCandidateData.name} for this role?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'strong_recommend', label: 'Strongly Recommend', color: 'bg-success-100 text-success-800 border-success-200' },
                  { value: 'recommend', label: 'Recommend', color: 'bg-blue-100 text-blue-800 border-blue-200' },
                  { value: 'neutral', label: 'Neutral', color: 'bg-neutral-100 text-neutral-800 border-neutral-200' },
                  { value: 'not_recommend', label: 'Not Recommend', color: 'bg-red-100 text-red-800 border-red-200' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="recommendation"
                      value={option.value}
                      checked={referralData.overallRecommendation === option.value}
                      onChange={(e) => setReferralData(prev => ({ ...prev, overallRecommendation: e.target.value as any }))}
                      className="w-4 h-4 text-skylevel-600 border-neutral-300"
                    />
                    <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium border ${option.color}`}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="would-hire"
                  checked={referralData.wouldHire}
                  onChange={(e) => setReferralData(prev => ({ ...prev, wouldHire: e.target.checked }))}
                  className="w-4 h-4 text-skylevel-600 border-neutral-300 rounded focus:ring-skylevel-500"
                />
                <label htmlFor="would-hire" className="text-sm font-medium text-neutral-700">
                  I would hire {mockCandidateData.name} to work with me again
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Additional Comments (Optional)
              </label>
              <textarea
                value={referralData.additionalComments}
                onChange={(e) => setReferralData(prev => ({ ...prev, additionalComments: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
                placeholder="Any additional thoughts about {mockCandidateData.name}'s qualifications, work ethic, or fit for this role..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center space-x-2 px-8 py-3 bg-skylevel-600 text-white rounded-lg hover:bg-skylevel-700 transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Validation...</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>Submit Referral Validation</span>
                </>
              )}
            </button>
            <p className="text-sm text-neutral-500 mt-4">
              This validation will be used to calculate the candidate's Referral Network Score (RNS)
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}