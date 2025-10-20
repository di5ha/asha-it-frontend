import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { applicationsAPI, jobsAPI } from '../../../services/api';
import ApplicantCard from '../../../components/poster/ApplicantCard';
import './JobApplicantsPage.css';

const JobApplicantsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');


  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load job details and applicants in parallel
      const [jobData, applicantsData] = await Promise.all([
        jobsAPI.getJobById(jobId),
        applicationsAPI.getJobApplicants(jobId)
      ]);
      
      setJob(jobData);
      setApplicants(applicantsData);
    } catch (err) {
      setError(err.message || 'Failed to load applicants');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    loadData();
  }, [jobId, loadData]);

  const handleApplicantClick = (applicantId) => {
    // In a real app, this would navigate to applicant details
    console.log('View applicant:', applicantId);
  };

  const getFilteredApplicants = () => {
    if (filter === 'all') return applicants;
    return applicants.filter(applicant => applicant.status === filter);
  };

  const getStatusCounts = () => {
    const counts = {
      all: applicants.length,
      submitted: 0,
      reviewed: 0,
      interview: 0,
      rejected: 0,
      accepted: 0
    };
    
    applicants.forEach(applicant => {
      if (counts.hasOwnProperty(applicant.status)) {
        counts[applicant.status]++;
      }
    });
    
    return counts;
  };

  const statusCounts = getStatusCounts();
  const filteredApplicants = getFilteredApplicants();

  if (loading) {
    return (
      <div className="job-applicants-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading applicants...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="job-applicants-page">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Job Not Found</h2>
          <p>{error || 'The job you\'re looking for doesn\'t exist or has been removed.'}</p>
          <button onClick={() => navigate('/poster/dashboard')} className="back-btn">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-applicants-page">
      <div className="job-applicants-container">
        <div className="page-header">
          <div className="header-content">
            <button 
              onClick={() => navigate('/poster/dashboard')}
              className="back-btn"
            >
              ← Back to Dashboard
            </button>
            <div className="job-info">
              <h1>Applicants for "{job.title}"</h1>
              <p>{job.company?.name} • {job.location}</p>
            </div>
          </div>
        </div>

        <div className="applicants-content">
          <div className="applicants-filters">
            <div className="filter-tabs">
              {Object.entries(statusCounts).map(([status, count]) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`filter-tab ${filter === status ? 'active' : ''}`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="error-banner">
              <span className="error-icon">⚠️</span>
              {error}
              <button onClick={loadData} className="retry-btn">
                Try Again
              </button>
            </div>
          )}

          {filteredApplicants.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                {filter === 'all' ? '👥' : '🔍'}
              </div>
              <h3>
                {filter === 'all' 
                  ? 'No applicants yet' 
                  : `No ${filter} applicants`
                }
              </h3>
              <p>
                {filter === 'all'
                  ? 'This job hasn\'t received any applications yet'
                  : `You don't have any ${filter} applicants at the moment`
                }
              </p>
            </div>
          ) : (
            <div className="applicants-list">
              {filteredApplicants.map(applicant => (
                <ApplicantCard
                  key={applicant.application_id}
                  applicant={applicant}
                  onClick={() => handleApplicantClick(applicant.application_id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicantsPage;
