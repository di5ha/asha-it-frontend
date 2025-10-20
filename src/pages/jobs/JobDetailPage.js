import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsAPI, applicationsAPI } from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import toast from 'react-hot-toast';
import ApplyModal from '../../components/jobs/ApplyModal';
import './JobDetailPage.css';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { userProfile } = useApp();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    loadJob();
  }, [jobId]);

  const loadJob = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const jobData = await jobsAPI.getJobById(jobId);
      setJob(jobData);
    } catch (err) {
      setError(err.message || 'Failed to load job details');
      console.error('Error loading job:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!userProfile?.profile?.resume_components) {
      toast.error('Please complete your resume first');
      navigate('/resume/components');
      return;
    }
    setShowApplyModal(true);
  };

  const handleSubmitApplication = async (applicationData) => {
    try {
      setApplying(true);
      
      const result = await applicationsAPI.createApplication({
        job_id: jobId,
        applicant_user_id: userProfile.user_id,
        resume_id: 'res_001', // In a real app, this would come from user profile
        selected_components: applicationData.selectedComponents,
        note: applicationData.note
      });
      
      if (result.success) {
        toast.success('Application submitted successfully!');
        setShowApplyModal(false);
        navigate('/applications');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  const formatSalary = (min, max, currency) => {
    if (!min || !max) return 'Salary not specified';
    return `$${min.toLocaleString()} - $${max.toLocaleString()} ${currency}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="job-detail-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="job-detail-page">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Job Not Found</h2>
          <p>{error || 'The job you\'re looking for doesn\'t exist or has been removed.'}</p>
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-detail-page">
      <div className="job-detail-container">
        <div className="job-header">
          <div className="job-title-section">
            <h1 className="job-title">{job.title}</h1>
            <div className="job-company">
              <span className="company-logo">
                {job.company?.name?.charAt(0) || 'C'}
              </span>
              <div className="company-info">
                <h2 className="company-name">{job.company?.name || 'Company Name'}</h2>
                <p className="company-description">{job.company?.description}</p>
              </div>
            </div>
          </div>
          
          <div className="job-actions">
            <button onClick={() => navigate('/dashboard')} className="back-btn">
              ← Back to Jobs
            </button>
            <button onClick={handleApply} className="apply-btn" disabled={applying}>
              {applying ? 'Applying...' : 'Apply Now'}
            </button>
          </div>
        </div>

        <div className="job-content">
          <div className="job-main">
            <div className="job-details">
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <div className="detail-content">
                    <h4>Location</h4>
                    <p>{job.location}</p>
                  </div>
                </div>
                
                <div className="detail-item">
                  <span className="detail-icon">💼</span>
                  <div className="detail-content">
                    <h4>Employment Type</h4>
                    <p>{job.employment_type}</p>
                  </div>
                </div>
                
                <div className="detail-item">
                  <span className="detail-icon">💰</span>
                  <div className="detail-content">
                    <h4>Salary</h4>
                    <p>{formatSalary(job.salary_min, job.salary_max, job.currency)}</p>
                  </div>
                </div>
                
                <div className="detail-item">
                  <span className="detail-icon">📊</span>
                  <div className="detail-content">
                    <h4>Experience Level</h4>
                    <p>{job.experience_level}</p>
                  </div>
                </div>
                
                {job.visa_sponsorship && (
                  <div className="detail-item">
                    <span className="detail-icon">🛂</span>
                    <div className="detail-content">
                      <h4>Visa Sponsorship</h4>
                      <p>Available</p>
                    </div>
                  </div>
                )}
                
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <div className="detail-content">
                    <h4>Posted</h4>
                    <p>{formatDate(job.posted_at)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="job-description">
              <h3>Job Description</h3>
              <div className="description-content">
                {job.description?.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="job-requirements">
              <h3>Requirements</h3>
              <ul className="requirements-list">
                <li>Bachelor's degree in Computer Science or related field</li>
                <li>3+ years of experience in web development</li>
                <li>Proficiency in React and JavaScript</li>
                <li>Experience with modern development tools</li>
                <li>Strong problem-solving skills</li>
                <li>Excellent communication skills</li>
              </ul>
            </div>

            <div className="job-tags">
              <h3>Skills & Technologies</h3>
              <div className="tags-container">
                {job.tags?.map(tag => (
                  <span key={tag} className="job-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="job-sidebar">
            <div className="company-card">
              <h3>About {job.company?.name}</h3>
              <p>{job.company?.description}</p>
              <div className="company-details">
                <p><strong>Industry:</strong> {job.company?.industry}</p>
                <p><strong>Size:</strong> {job.company?.size} employees</p>
                <p><strong>Location:</strong> {job.company?.location}</p>
              </div>
              {job.company?.website && (
                <a 
                  href={job.company.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="company-website"
                >
                  Visit Company Website
                </a>
              )}
            </div>

            <div className="application-card">
              <h3>Ready to Apply?</h3>
              <p>Submit your application and let's get started!</p>
              <button onClick={handleApply} className="apply-btn-sidebar">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showApplyModal && (
        <ApplyModal
          job={job}
          onClose={() => setShowApplyModal(false)}
          onSubmit={handleSubmitApplication}
          loading={applying}
        />
      )}
    </div>
  );
};

export default JobDetailPage;
