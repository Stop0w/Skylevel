'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, X, Check, AlertCircle, User, Mail, Phone, FileText } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  skills: string[];
  resume: File | null;
  linkedin: string;
  github: string;
  coverLetter: string;
}

export default function ApplicationPage() {
  const params = useParams();
  const jobId = params.id as string;

  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    skills: [],
    resume: null,
    linkedin: '',
    github: '',
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock job data
  const jobTitle = 'Senior Frontend Developer';
  const companyName = 'TechCorp';

  const steps = [
    { title: 'Basic Info', description: 'Your contact details' },
    { title: 'Experience', description: 'Your professional background' },
    { title: 'Skills', description: 'Your technical skills' },
    { title: 'Review', description: 'Review and submit' }
  ];

  const handleInputChange = (field: keyof ApplicationData, value: string | string[] | File | null) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillAdd = (skill: string) => {
    if (skill && !applicationData.skills.includes(skill)) {
      setApplicationData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setApplicationData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setApplicationData(prev => ({ ...prev, resume: file }));
    }
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
              Application Submitted!
            </h1>
            <p className="text-neutral-600 mb-6">
              Your application for {jobTitle} at {companyName} has been received.
              We'll calculate your Fit Score and get back to you within 24 hours.
            </p>
            <div className="bg-gradient-to-r from-skylevel-50 to-blue-50 rounded-lg p-4 mb-6">
              <div className="text-2xl font-bold text-skylevel-600 mb-1">Calculating...</div>
              <div className="text-sm text-neutral-600">Your Fit Score will be ready soon</div>
            </div>
            <Link
              href="/candidate/dashboard"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-skylevel-600 text-white rounded-lg hover:bg-skylevel-700 transition-colors duration-200"
            >
              <span>View My Applications</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-skylevel-600">
                Skylevel
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-neutral-600">
                Applying for: {jobTitle} at {companyName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep > index + 1
                        ? 'bg-success-600 text-white'
                        : currentStep === index + 1
                        ? 'bg-skylevel-600 text-white'
                        : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {currentStep > index + 1 ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className={`text-sm font-medium ${
                      currentStep >= index + 1 ? 'text-neutral-900' : 'text-neutral-500'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-neutral-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-20 h-0.5 mx-2 ${
                    currentStep > index + 1 ? 'bg-success-600' : 'bg-neutral-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-neutral-200 p-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={applicationData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={applicationData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={applicationData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={applicationData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Experience */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Professional Experience
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    value={applicationData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years (Entry level)</option>
                    <option value="2-3">2-3 years (Junior)</option>
                    <option value="4-5">4-5 years (Mid-level)</option>
                    <option value="6-10">6-10 years (Senior)</option>
                    <option value="10+">10+ years (Lead/Principal)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Resume/CV *
                  </label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer inline-flex flex-col items-center"
                    >
                      <Upload className="w-8 h-8 text-neutral-400 mb-2" />
                      <span className="text-sm text-neutral-600">
                        {applicationData.resume
                          ? applicationData.resume.name
                          : 'Click to upload resume (PDF, DOC, DOCX)'}
                      </span>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={applicationData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      GitHub Profile
                    </label>
                    <input
                      type="url"
                      value={applicationData.github}
                      onChange={(e) => handleInputChange('github', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
                      placeholder="https://github.com/johndoe"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Skills */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Technical Skills
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Add Your Skills
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type a skill and press Enter"
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.currentTarget;
                          handleSkillAdd(input.value);
                          input.value = '';
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.querySelector('input[placeholder="Type a skill and press Enter"]') as HTMLInputElement;
                        handleSkillAdd(input.value);
                        input.value = '';
                      }}
                      className="px-4 py-2 bg-skylevel-600 text-white rounded-lg hover:bg-skylevel-700 transition-colors duration-200"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-neutral-700 mb-2">
                    Selected Skills
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {applicationData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-skylevel-100 text-skylevel-700 rounded-full text-sm"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => handleSkillRemove(skill)}
                          className="hover:text-skylevel-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {applicationData.skills.length === 0 && (
                      <div className="text-sm text-neutral-500 italic">
                        No skills added yet. Add at least 3 skills relevant to the job.
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Brief Cover Letter (Optional)
                  </label>
                  <textarea
                    value={applicationData.coverLetter}
                    onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
                    placeholder="Tell us why you're interested in this role..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Review Your Application
              </h2>
              <div className="space-y-6">
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="font-semibold text-neutral-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-neutral-500">Name:</span>
                      <div className="font-medium">{applicationData.firstName} {applicationData.lastName}</div>
                    </div>
                    <div>
                      <span className="text-neutral-500">Email:</span>
                      <div className="font-medium">{applicationData.email}</div>
                    </div>
                    <div>
                      <span className="text-neutral-500">Phone:</span>
                      <div className="font-medium">{applicationData.phone}</div>
                    </div>
                    <div>
                      <span className="text-neutral-500">Experience:</span>
                      <div className="font-medium">{applicationData.experience} years</div>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="font-semibold text-neutral-900 mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {applicationData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-skylevel-50 to-blue-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-skylevel-600" />
                    <h3 className="font-semibold text-neutral-900">Fit Score Calculation</h3>
                  </div>
                  <p className="text-neutral-600 mb-4">
                    After submitting, we'll analyze your profile against the job requirements and calculate your Fit Score.
                    You'll receive a breakdown of:
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-skylevel-600 rounded-full" />
                      <span>Technical Match Score (TMS) - Skills alignment</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-skylevel-600 rounded-full" />
                      <span>Soft Skills Rating (SRS) - Experience fit</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-skylevel-600 rounded-full" />
                      <span>Referral Network Score (RNS) - Peer validation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="inline-flex items-center space-x-2 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-skylevel-600 text-white rounded-lg hover:bg-skylevel-700 transition-colors duration-200"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}