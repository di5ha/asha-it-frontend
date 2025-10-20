import React from 'react';
import { format } from 'date-fns';
import './JobCard.css';

const JobCard = ({ job, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(job.job_id);
    }
  };

  const formatSalary = (min, max, currency) => {
    if (!min || !max) return 'Salary not specified';
    return `$${min.toLocaleString()} - $${max.toLocaleString()} ${currency}`;
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  return (
    <div className="job-card" onClick={handleClick}>
      <div className="job-header">
        <div className="job-title-section">
          <h3 className="job-title">{job.title}</h3>
          <p className="job-company">{job.company?.name || 'Company Name'}</p>
        </div>
        <div className="job-status">
          <span className={`status-badge ${job.status}`}>
            {job.status}
          </span>
        </div>
      </div>

      <div className="job-details">
        <div className="job-location">
          <span className="location-icon">📍</span>
          {job.location}
        </div>
        
        <div className="job-type">
          <span className="type-icon">💼</span>
          {job.employment_type}
        </div>

        {job.visa_sponsorship && (
          <div className="visa-sponsorship">
            <span className="visa-icon">🛂</span>
            Visa Sponsorship Available
          </div>
        )}
      </div>

      <div className="job-salary">
        <span className="salary-icon">💰</span>
        {formatSalary(job.salary_min, job.salary_max, job.currency)}
      </div>

      <div className="job-description">
        <p>{job.description?.substring(0, 150)}...</p>
      </div>

      <div className="job-tags">
        {job.tags?.slice(0, 4).map(tag => (
          <span key={tag} className="job-tag">{tag}</span>
        ))}
        {job.tags?.length > 4 && (
          <span className="job-tag more">+{job.tags.length - 4} more</span>
        )}
      </div>

      <div className="job-footer">
        <div className="job-meta">
          <span className="experience-level">
            {job.experience_level} Level
          </span>
          <span className="posted-date">
            Posted {formatDate(job.posted_at)}
          </span>
        </div>
        
        <div className="job-actions">
          <button className="apply-btn">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
