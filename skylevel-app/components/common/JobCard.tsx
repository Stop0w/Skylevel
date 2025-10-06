'use client';

import React, { useState } from 'react';
import { Briefcase, MapPin, Users, Clock, ChevronRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  department?: string;
  requiredSkills: string[];
  applicationCount?: number;
  status?: 'active' | 'paused' | 'closed';
  postedDate?: string;
  salaryRange?: string;
  type?: 'full-time' | 'part-time' | 'contract' | 'internship';
  remote?: boolean;
  featured?: boolean;
  onViewDetails?: (jobId: string) => void;
  onEditJob?: (jobId: string) => void;
  showStatus?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

/**
 * JobCard - Component for displaying job listings
 *
 * Features:
 * - Job title and company information
 * - Required skills display with truncation
 * - Application count and status indicators
 * - Remote/work type badges
 * - Interactive hover states
 * - Multiple display variants
 */
const JobCard = React.memo<JobCardProps>(({
  id,
  title,
  company,
  location,
  department,
  requiredSkills,
  applicationCount = 0,
  status = 'active',
  postedDate,
  salaryRange,
  type = 'full-time',
  remote = false,
  featured = false,
  onViewDetails,
  onEditJob,
  showStatus = true,
  variant = 'default',
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Handle view details action
  const handleViewDetails = () => {
    onViewDetails?.(id);
  };

  // Handle edit job action
  const handleEditJob = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditJob?.(id);
  };

  // Get status configuration
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          color: 'bg-success-100 text-success-700 border-success-200',
          label: 'Active',
          icon: <TrendingUp className="w-3 h-3" />
        };
      case 'paused':
        return {
          color: 'bg-coral-100 text-coral-700 border-coral-200',
          label: 'Paused',
          icon: <Clock className="w-3 h-3" />
        };
      case 'closed':
        return {
          color: 'bg-neutral-100 text-neutral-700 border-neutral-200',
          label: 'Closed',
          icon: null
        };
      default:
        return {
          color: 'bg-neutral-100 text-neutral-700 border-neutral-200',
          label: 'Unknown',
          icon: null
        };
    }
  };

  // Get employment type display
  const getEmploymentTypeDisplay = () => {
    switch (type) {
      case 'full-time':
        return 'Full-time';
      case 'part-time':
        return 'Part-time';
      case 'contract':
        return 'Contract';
      case 'internship':
        return 'Internship';
      default:
        return type;
    }
  };

  // Truncate skills for display
  const getDisplaySkills = (skills: string[], maxCount: number = 4) => {
    if (skills.length <= maxCount) return skills;
    return [...skills.slice(0, maxCount), `+${skills.length - maxCount}`];
  };

  // Format posted date
  const formatPostedDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const statusConfig = getStatusConfig();
  const displaySkills = getDisplaySkills(requiredSkills);
  const formattedPostedDate = formatPostedDate(postedDate);

  // Compact variant (for job lists)
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'flex items-center justify-between p-4 rounded-lg border border-neutral-200 bg-white hover:border-skylevel-300 hover:shadow-sm transition-all duration-200 cursor-pointer',
          featured && 'border-skylevel-200 bg-skylevel-50/30',
          isHovered && 'border-skylevel-400 shadow-md',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleViewDetails}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-skylevel-100 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-skylevel-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-semibold text-neutral-900 truncate">
                {title}
              </h3>
              {featured && (
                <span className="px-1.5 py-0.5 bg-gold-100 text-gold-700 text-xs font-medium rounded">
                  Featured
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-600 truncate">{company}</p>
            <div className="flex items-center space-x-3 text-xs text-neutral-500 mt-1">
              <span className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {location}
              </span>
              {applicationCount > 0 && (
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {applicationCount}
                </span>
              )}
            </div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-neutral-400" />
      </div>
    );
  }

  // Default and detailed variants
  return (
    <Card
      className={cn(
        'relative cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        featured && 'border-skylevel-200 bg-skylevel-50/30',
        isHovered && 'border-skylevel-400',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Job Icon */}
            <div className="flex-shrink-0">
              <div className={cn(
                'w-12 h-12 rounded-lg flex items-center justify-center',
                featured
                  ? 'bg-gold-100 border-2 border-gold-200'
                  : 'bg-skylevel-100 border-2 border-skylevel-200'
              )}>
                <Briefcase className={cn(
                  'w-6 h-6',
                  featured ? 'text-gold-700' : 'text-skylevel-600'
                )} />
              </div>
            </div>

            {/* Job Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-base font-semibold text-neutral-900 truncate">
                  {title}
                </CardTitle>
                {featured && (
                  <span className="px-2 py-1 bg-gold-100 text-gold-700 text-xs font-medium rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <CardDescription className="text-sm text-neutral-600">
                {company}
                {department && ` • ${department}`}
              </CardDescription>

              {/* Location and Type */}
              <div className="flex items-center space-x-3 text-sm text-neutral-500 mt-1">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {location}
                </span>
                <span className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {getEmploymentTypeDisplay()}
                </span>
                {remote && (
                  <span className="px-2 py-1 bg-success-100 text-success-700 text-xs font-medium rounded">
                    Remote
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Status Badge */}
          {showStatus && (
            <div className="flex-shrink-0">
              <div className={cn(
                'flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border',
                statusConfig.color
              )}>
                {statusConfig.icon}
                <span>{statusConfig.label}</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Salary Range */}
        {salaryRange && (
          <div className="mb-3">
            <span className="text-sm font-medium text-neutral-900">{salaryRange}</span>
          </div>
        )}

        {/* Required Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {displaySkills.map((skill, index) => (
              <span
                key={index}
                className={cn(
                  'px-2 py-1 rounded-md text-xs font-medium',
                  skill.startsWith('+')
                    ? 'bg-neutral-100 text-neutral-600'
                    : 'bg-skylevel-50 text-skylevel-700 border border-skylevel-200'
                )}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
          <div className="flex items-center space-x-3">
            {applicationCount > 0 && (
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {applicationCount} application{applicationCount !== 1 ? 's' : ''}
              </span>
            )}
            {formattedPostedDate && (
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {formattedPostedDate}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1 bg-skylevel-600 hover:bg-skylevel-700"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            View Details
          </Button>

          {onEditJob && (
            <Button
              variant="outline"
              size="sm"
              className="border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              onClick={handleEditJob}
            >
              Edit
            </Button>
          )}
        </div>

        {/* Hover Overlay Indicator */}
        {isHovered && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-skylevel-500 rounded-full animate-pulse" />
          </div>
        )}
      </CardContent>
    </Card>
  );
});

JobCard.displayName = 'JobCard';

export default JobCard;