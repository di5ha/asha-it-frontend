import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsAPI } from '../../services/api';
import JobCard from '../../components/jobs/JobCard';
import JobFilters from '../../components/jobs/JobFilters';
import './DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    experience_level: '',
    visa_sponsorship: undefined,
    tags: []
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  useEffect(() => {
    loadJobs();
  }, [filters, pagination.page]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await jobsAPI.getJobs({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      });
      
      setJobs(result.jobs);
      setPagination(prev => ({
        ...prev,
        total: result.total
      }));
    } catch (err) {
      setError(err.message || 'Failed to load jobs');
      console.error('Error loading jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  if (loading && jobs.length === 0) {
    return (
      <div className="dashboard-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Find Your Next Job</h1>
          <p>Discover opportunities that match your skills and interests</p>
        </div>

        <div className="dashboard-content">
          <div className="filters-sidebar">
            <JobFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="jobs-main">
            {error && (
              <div className="error-banner">
                <span className="error-icon">⚠️</span>
                {error}
                <button onClick={loadJobs} className="retry-btn">
                  Try Again
                </button>
              </div>
            )}

            <div className="jobs-header">
              <h2>
                {pagination.total > 0 
                  ? `${pagination.total} jobs found` 
                  : 'No jobs found'
                }
              </h2>
              {pagination.total > 0 && (
                <div className="pagination-info">
                  Page {pagination.page} of {totalPages}
                </div>
              )}
            </div>

            <div className="jobs-grid">
              {jobs.map(job => (
                <JobCard
                  key={job.job_id}
                  job={job}
                  onClick={() => handleJobClick(job.job_id)}
                />
              ))}
            </div>

            {jobs.length === 0 && !loading && (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No jobs found</h3>
                <p>Try adjusting your filters to see more results</p>
                <button 
                  onClick={() => setFilters({
                    location: '',
                    experience_level: '',
                    visa_sponsorship: undefined,
                    tags: []
                  })}
                  className="clear-filters-btn"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="pagination-btn"
                >
                  Previous
                </button>
                
                <div className="pagination-numbers">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`pagination-number ${
                          pagination.page === pageNum ? 'active' : ''
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
