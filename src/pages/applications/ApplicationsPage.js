import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationsAPI } from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import ApplicationCard from '../../components/applications/ApplicationCard';
import './ApplicationsPage.css';

const ApplicationsPage = () => {
  const navigate = useNavigate();
  const { userProfile } = useApp();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');


  const loadApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await applicationsAPI.getApplications(userProfile?.user_id);
      setApplications(result);
    } catch (err) {
      setError(err.message || 'Failed to load applications');
      console.error('Error loading applications:', err);
    } finally {
      setLoading(false);
    }
  }, [userProfile?.user_id]);



  useEffect(() => {
    loadApplications();
  }, [loadApplications]);
  const handleApplicationClick = (applicationId) => {
    // In a real app, this would navigate to application details
    console.log('View application:', applicationId);
  };

  const getFilteredApplications = () => {
    if (filter === 'all') return applications;
    return applications.filter(app => app.status === filter);
  };

  const getStatusCounts = () => {
    const counts = {
      all: applications.length,
      submitted: 0,
      reviewed: 0,
      interview: 0,
      rejected: 0,
      accepted: 0
    };
    
    applications.forEach(app => {
      if (counts.hasOwnProperty(app.status)) {
        counts[app.status]++;
      }
    });
    
    return counts;
  };

  const statusCounts = getStatusCounts();
  const filteredApplications = getFilteredApplications();

  if (loading) {
    return (
      <div className="applications-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="applications-page">
      <div className="applications-container">
        <div className="applications-header">
          <h1>My Applications</h1>
          <p>Track the status of your job applications</p>
        </div>

        <div className="applications-content">
          <div className="applications-filters">
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
              <button onClick={loadApplications} className="retry-btn">
                Try Again
              </button>
            </div>
          )}

          {filteredApplications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                {filter === 'all' ? '📝' : '🔍'}
              </div>
              <h3>
                {filter === 'all' 
                  ? 'No applications yet' 
                  : `No ${filter} applications`
                }
              </h3>
              <p>
                {filter === 'all'
                  ? 'Start applying to jobs to see your applications here'
                  : `You don't have any ${filter} applications at the moment`
                }
              </p>
              {filter === 'all' && (
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="browse-jobs-btn"
                >
                  Browse Jobs
                </button>
              )}
            </div>
          ) : (
            <div className="applications-list">
              {filteredApplications.map(application => (
                <ApplicationCard
                  key={application.application_id}
                  application={application}
                  onClick={() => handleApplicationClick(application.application_id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
