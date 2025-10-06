'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, Briefcase, MapPin, Edit, Save, X, Plus, Trash2, Linkedin, Github, Globe, FileText, Star } from 'lucide-react';
import ScorePill from '@/components/common/ScorePill';
import Link from 'next/link';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  experience: string;
  bio: string;
  skills: string[];
  experienceHistory: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    graduationYear: string;
  }>;
  socialLinks: {
    linkedin: string;
    github: string;
    website: string;
  };
  resumeUrl: string | null;
}

export default function CandidateProfile() {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Senior Frontend Developer',
    experience: '5+ years',
    bio: 'Passionate frontend developer with expertise in React, TypeScript, and modern web technologies. I love building intuitive user interfaces and solving complex problems with elegant solutions.',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'GraphQL', 'AWS', 'Docker'],
    experienceHistory: [
      {
        id: '1',
        company: 'TechCorp',
        position: 'Senior Frontend Developer',
        startDate: '2022-01',
        endDate: null,
        description: 'Leading frontend development for flagship product, mentoring junior developers, and implementing best practices.'
      },
      {
        id: '2',
        company: 'StartupXYZ',
        position: 'Frontend Developer',
        startDate: '2020-06',
        endDate: '2021-12',
        description: 'Built responsive web applications using React and TypeScript, collaborated with designers and backend developers.'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        graduationYear: '2019'
      }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      website: 'https://johndoe.dev'
    },
    resumeUrl: '/resume/john-doe-resume.pdf'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profileData);
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill && !editData.skills.includes(newSkill)) {
      setEditData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

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
              <Link href="/jobs" className="text-neutral-600 hover:text-skylevel-600 font-medium">
                Browse Jobs
              </Link>
              <Link href="/candidate/dashboard" className="text-neutral-600 hover:text-skylevel-600 font-medium">
                My Applications
              </Link>
              <Link href="/candidate/profile" className="text-neutral-900 hover:text-skylevel-600 font-medium">
                My Profile
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-skylevel-600 to-skylevel-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <div className="text-xl text-skylevel-100 mb-1">{profileData.title}</div>
              <div className="flex items-center space-x-4 text-sm text-skylevel-200">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{profileData.experience}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <ScorePill
                score={85}
                size="lg"
                showBreakdown={true}
                breakdown={{
                  tms: 90,
                  srs: 80,
                  rns: 75
                }}
                confidence="high"
              />
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-skylevel-100">{profileData.bio}</p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills Section */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-900">Skills</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center space-x-1 text-sm text-skylevel-600 hover:text-skylevel-700"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      placeholder="Add a new skill"
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500"
                    />
                    <button
                      onClick={addSkill}
                      className="px-4 py-2 bg-skylevel-600 text-white rounded-lg hover:bg-skylevel-700 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-skylevel-100 text-skylevel-700 rounded-full text-sm"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:text-skylevel-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Experience</h2>
              <div className="space-y-6">
                {profileData.experienceHistory.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-skylevel-600 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-neutral-900">{exp.position}</h3>
                      <span className="text-sm text-neutral-500">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </span>
                    </div>
                    <div className="text-neutral-600 mb-2">{exp.company}</div>
                    <p className="text-sm text-neutral-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Education</h2>
              <div className="space-y-4">
                {profileData.education.map((edu) => (
                  <div key={edu.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-neutral-900">{edu.degree} in {edu.field}</h3>
                      <div className="text-neutral-600">{edu.institution}</div>
                    </div>
                    <div className="text-sm text-neutral-500">{edu.graduationYear}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Information */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-neutral-900">Contact Information</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-skylevel-600 hover:text-skylevel-700"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={editData.firstName}
                      onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={editData.lastName}
                      onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-skylevel-500 text-sm"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm text-neutral-600">{profileData.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm text-neutral-600">{profileData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm text-neutral-600">{profileData.location}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Social Links</h2>
              <div className="space-y-3">
                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-sm text-neutral-600 hover:text-skylevel-600"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href={profileData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-sm text-neutral-600 hover:text-skylevel-600"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
                {profileData.socialLinks.website && (
                  <a
                    href={profileData.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-sm text-neutral-600 hover:text-skylevel-600"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Personal Website</span>
                  </a>
                )}
              </div>
            </div>

            {/* Resume */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Resume</h2>
              {profileData.resumeUrl ? (
                <a
                  href={profileData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-skylevel-600 text-white rounded-lg hover:bg-skylevel-700 transition-colors duration-200 text-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Resume</span>
                </a>
              ) : (
                <button className="inline-flex items-center space-x-2 px-4 py-2 border border-skylevel-600 text-skylevel-600 rounded-lg hover:bg-skylevel-50 transition-colors duration-200 text-sm">
                  <Plus className="w-4 h-4" />
                  <span>Upload Resume</span>
                </button>
              )}
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}