import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsAPI } from '../../../services/api';
import './PosterDashboardPage.css';

const PosterDashboardPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0
  });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would get the company ID from the user profile
      const result = await jobsAPI.getCompanyJobs('comp_001');
      
      setJobs(result);
      setStats({
        totalJobs: result.length,
        activeJobs: result.filter(job => job.status === 'open').length,
        totalApplications: result.reduce((sum, job) => sum + (job.application_count || 0), 0)
      });
    } catch (err) {
      setError(err.message || 'Failed to load jobs');
      console.error('Error loading jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJobClick = (jobId) => {
    navigate(`/poster/jobs/${jobId}/applicants`);
  };

  const handleCreateJob = () => {
    navigate('/poster/jobs/new');
  };

  const handleEditJob = (jobId, e) => {
    e.stopPropagation();
    navigate(`/poster/jobs/${jobId}/edit`);
  };

  if (loading && jobs.length === 0) {
    return (
      <div className="poster-dashboard-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="poster-dashboard-page">
      <div className="poster-dashboard-container">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Job Management Dashboard</h1>
            <p>Manage your job postings and track applications</p>
          </div>
          <button onClick={handleCreateJob} className="create-job-btn">
            <span className="btn-icon">➕</span>
            Post New Job
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{stats.totalJobs}</h3>
              <p>Total Jobs</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🟢</div>
            <div className="stat-content">
              <h3>{stats.activeJobs}</h3>
              <p>Active Jobs</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <h3>{stats.totalApplications}</h3>
              <p>Total Applications</p>
            </div>
          </div>
        </div>

        <div className="jobs-section">
          <div className="section-header">
            <h2>Your Job Postings</h2>
            <div className="section-actions">
              <button onClick={loadJobs} className="refresh-btn">
                Refresh
              </button>
            </div>
          </div>

          {error && (
            <div className="error-banner">
              <span className="error-icon">⚠️</span>
              {error}
              <button onClick={loadJobs} className="retry-btn">
                Try Again
              </button>
            </div>
          )}

          {jobs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No jobs posted yet</h3>
              <p>Create your first job posting to start attracting talent</p>
              <button onClick={handleCreateJob} className="create-first-job-btn">
                Post Your First Job
              </button>
            </div>
          ) : (
            <div className="jobs-grid">
              {jobs.map(job => (
                <div key={job.job_id} className="poster-job-card">
                  <div className="job-header">
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-status">
                      <span className={`status-badge ${job.status}`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="job-details">
                    <p className="job-company">{job.company?.name || 'Your Company'}</p>
                    <p className="job-location">📍 {job.location}</p>
                    <p className="job-type">{job.employment_type}</p>
                    <p className="job-salary">
                      ${job.salary_min?.toLocaleString()} - ${job.salary_max?.toLocaleString()} {job.currency}
                    </p>
                  </div>

                  <div className="job-tags">
                    {job.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="job-tag">{tag}</span>
                    ))}
                    {job.tags?.length > 3 && (
                      <span className="job-tag more">+{job.tags.length - 3} more</span>
                    )}
                  </div>

                  <div className="job-meta">
                    <p className="posted-date">
                      Posted {new Date(job.posted_at).toLocaleDateString()}
                    </p>
                    <p className="applications-count">
                      {job.application_count || 0} applications
                    </p>
                  </div>

                  <div className="job-actions">
                    <button 
                      onClick={() => handleJobClick(job.job_id)}
                      className="view-applicants-btn"
                    >
                      View Applicants
                    </button>
                    <button 
                      onClick={(e) => handleEditJob(job.job_id, e)}
                      className="edit-job-btn"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PosterDashboardPage;
