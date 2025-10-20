import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsAPI } from '../../../services/api';
import toast from 'react-hot-toast';
import './EditJobPage.css';

const EditJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    employment_type: 'Full-time',
    salary_min: '',
    salary_max: '',
    currency: 'USD',
    visa_sponsorship: false,
    experience_level: '',
    tags: []
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const employmentTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Freelance'
  ];

  const experienceLevels = [
    'Entry',
    'Junior',
    'Mid-level',
    'Senior',
    'Lead',
    'Principal'
  ];

  const commonTags = [
    'react', 'javascript', 'python', 'java', 'typescript', 'node.js',
    'aws', 'docker', 'kubernetes', 'postgresql', 'mongodb', 'redis',
    'git', 'ci-cd', 'microservices', 'api', 'frontend', 'backend',
    'full-stack', 'devops', 'machine-learning', 'data-science'
  ];

  useEffect(() => {
    loadJob();
  }, [jobId]);

  const loadJob = async () => {
    try {
      setLoading(true);
      const job = await jobsAPI.getJobById(jobId);
      
      setFormData({
        title: job.title || '',
        description: job.description || '',
        location: job.location || '',
        employment_type: job.employment_type || 'Full-time',
        salary_min: job.salary_min || '',
        salary_max: job.salary_max || '',
        currency: job.currency || 'USD',
        visa_sponsorship: job.visa_sponsorship || false,
        experience_level: job.experience_level || '',
        tags: job.tags || []
      });
    } catch (error) {
      console.error('Error loading job:', error);
      toast.error('Failed to load job details');
      navigate('/poster/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTagToggle = (tag) => {
    const currentTags = formData.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    setFormData(prev => ({
      ...prev,
      tags: newTags
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Job title is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Job description is required';
    }
    
    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }
    
    if (!formData.experience_level) {
      errors.experience_level = 'Experience level is required';
    }
    
    if (formData.salary_min && formData.salary_max) {
      if (parseInt(formData.salary_min) >= parseInt(formData.salary_max)) {
        errors.salary = 'Minimum salary must be less than maximum salary';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }
    
    try {
      setSaving(true);
      
      const jobData = {
        ...formData,
        salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
        salary_max: formData.salary_max ? parseInt(formData.salary_max) : null
      };
      
      const result = await jobsAPI.updateJob(jobId, jobData);
      
      if (result.success) {
        toast.success('Job updated successfully!');
        navigate('/poster/dashboard');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-job-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-job-page">
      <div className="edit-job-container">
        <div className="page-header">
          <h1>Edit Job Posting</h1>
          <p>Update the details of your job posting</p>
        </div>

        <form onSubmit={handleSubmit} className="edit-job-form">
          <div className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`form-input ${validationErrors.title ? 'error' : ''}`}
                placeholder="e.g., Senior Frontend Developer"
              />
              {validationErrors.title && (
                <span className="field-error">{validationErrors.title}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Job Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`form-textarea ${validationErrors.description ? 'error' : ''}`}
                placeholder="Describe the role, responsibilities, and requirements..."
                rows="6"
              />
              {validationErrors.description && (
                <span className="field-error">{validationErrors.description}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location" className="form-label">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`form-input ${validationErrors.location ? 'error' : ''}`}
                  placeholder="e.g., San Francisco, CA or Remote"
                />
                {validationErrors.location && (
                  <span className="field-error">{validationErrors.location}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="employment_type" className="form-label">
                  Employment Type
                </label>
                <select
                  id="employment_type"
                  name="employment_type"
                  value={formData.employment_type}
                  onChange={handleChange}
                  className="form-select"
                >
                  {employmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Compensation</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="salary_min" className="form-label">
                  Minimum Salary
                </label>
                <input
                  type="number"
                  id="salary_min"
                  name="salary_min"
                  value={formData.salary_min}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., 80000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="salary_max" className="form-label">
                  Maximum Salary
                </label>
                <input
                  type="number"
                  id="salary_max"
                  name="salary_max"
                  value={formData.salary_max}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., 120000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="currency" className="form-label">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
            </div>

            {validationErrors.salary && (
              <span className="field-error">{validationErrors.salary}</span>
            )}
          </div>

          <div className="form-section">
            <h2>Requirements</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="experience_level" className="form-label">
                  Experience Level *
                </label>
                <select
                  id="experience_level"
                  name="experience_level"
                  value={formData.experience_level}
                  onChange={handleChange}
                  className={`form-select ${validationErrors.experience_level ? 'error' : ''}`}
                >
                  <option value="">Select experience level</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {validationErrors.experience_level && (
                  <span className="field-error">{validationErrors.experience_level}</span>
                )}
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="visa_sponsorship"
                    checked={formData.visa_sponsorship}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  Visa Sponsorship Available
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Skills & Technologies</h2>
            <p>Select relevant skills and technologies for this position:</p>
            
            <div className="tags-container">
              {commonTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`tag-button ${
                    formData.tags?.includes(tag) ? 'selected' : ''
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            
            {formData.tags && formData.tags.length > 0 && (
              <div className="selected-tags">
                <p>Selected: {formData.tags.join(', ')}</p>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/poster/dashboard')}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={saving}
            >
              {saving ? 'Updating Job...' : 'Update Job Posting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobPage;
