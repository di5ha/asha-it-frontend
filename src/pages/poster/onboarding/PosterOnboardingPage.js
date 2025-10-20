import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../contexts/AppContext';
import { companyAPI } from '../../../services/api';
import toast from 'react-hot-toast';
import './PosterOnboardingPage.css';

const PosterOnboardingPage = () => {
  const { updateProfile, loading } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    title: '',
    company_name: '',
    company_description: '',
    company_website: '',
    company_industry: '',
    company_size: '',
    company_location: ''
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [isCreatingCompany, setIsCreatingCompany] = useState(false);

  const industryOptions = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Education', label: 'Education' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Consulting', label: 'Consulting' },
    { value: 'Other', label: 'Other' }
  ];

  const sizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.first_name.trim()) {
      errors.first_name = 'First name is required';
    }
    
    if (!formData.last_name.trim()) {
      errors.last_name = 'Last name is required';
    }
    
    if (!formData.title.trim()) {
      errors.title = 'Job title is required';
    }
    
    if (!formData.company_name.trim()) {
      errors.company_name = 'Company name is required';
    }
    
    if (!formData.company_description.trim()) {
      errors.company_description = 'Company description is required';
    }
    
    if (!formData.company_website.trim()) {
      errors.company_website = 'Company website is required';
    } else if (!/^https?:\/\/.+/.test(formData.company_website)) {
      errors.company_website = 'Please enter a valid URL (starting with http:// or https://)';
    }
    
    if (!formData.company_industry) {
      errors.company_industry = 'Company industry is required';
    }
    
    if (!formData.company_size) {
      errors.company_size = 'Company size is required';
    }
    
    if (!formData.company_location.trim()) {
      errors.company_location = 'Company location is required';
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
      setIsCreatingCompany(true);
      
      // Create company first
      const companyData = {
        name: formData.company_name,
        description: formData.company_description,
        website: formData.company_website,
        industry: formData.company_industry,
        size: formData.company_size,
        location: formData.company_location
      };
      
      const companyResult = await companyAPI.createCompany(companyData);
      
      // Update user profile with company info
      const profileData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        title: formData.title,
        company_id: companyResult.company.company_id
      };
      
      await updateProfile(profileData);
      
      toast.success('Profile and company created successfully!');
      navigate('/poster/dashboard');
    } catch (error) {
      toast.error('Failed to create profile. Please try again.');
      console.error('Error creating profile:', error);
    } finally {
      setIsCreatingCompany(false);
    }
  };

  return (
    <div className="poster-onboarding-page">
      <div className="poster-onboarding-container">
        <div className="poster-onboarding-header">
          <h1>Set Up Your Company Profile</h1>
          <p>Create your company profile to start posting jobs and finding talent</p>
        </div>

        <form className="poster-onboarding-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Personal Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_name" className="form-label">
                  First Name *
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`form-input ${validationErrors.first_name ? 'error' : ''}`}
                  placeholder="Enter your first name"
                />
                {validationErrors.first_name && (
                  <span className="field-error">{validationErrors.first_name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="last_name" className="form-label">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`form-input ${validationErrors.last_name ? 'error' : ''}`}
                  placeholder="Enter your last name"
                />
                {validationErrors.last_name && (
                  <span className="field-error">{validationErrors.last_name}</span>
                )}
              </div>
            </div>

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
                placeholder="e.g., Senior Recruiter, HR Manager"
              />
              {validationErrors.title && (
                <span className="field-error">{validationErrors.title}</span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h2>Company Information</h2>
            
            <div className="form-group">
              <label htmlFor="company_name" className="form-label">
                Company Name *
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className={`form-input ${validationErrors.company_name ? 'error' : ''}`}
                placeholder="Enter your company name"
              />
              {validationErrors.company_name && (
                <span className="field-error">{validationErrors.company_name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="company_description" className="form-label">
                Company Description *
              </label>
              <textarea
                id="company_description"
                name="company_description"
                value={formData.company_description}
                onChange={handleChange}
                className={`form-textarea ${validationErrors.company_description ? 'error' : ''}`}
                placeholder="Describe your company, its mission, and what makes it unique"
                rows="4"
              />
              {validationErrors.company_description && (
                <span className="field-error">{validationErrors.company_description}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="company_website" className="form-label">
                Company Website *
              </label>
              <input
                type="url"
                id="company_website"
                name="company_website"
                value={formData.company_website}
                onChange={handleChange}
                className={`form-input ${validationErrors.company_website ? 'error' : ''}`}
                placeholder="https://www.yourcompany.com"
              />
              {validationErrors.company_website && (
                <span className="field-error">{validationErrors.company_website}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company_industry" className="form-label">
                  Industry *
                </label>
                <select
                  id="company_industry"
                  name="company_industry"
                  value={formData.company_industry}
                  onChange={handleChange}
                  className={`form-select ${validationErrors.company_industry ? 'error' : ''}`}
                >
                  <option value="">Select your industry</option>
                  {industryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {validationErrors.company_industry && (
                  <span className="field-error">{validationErrors.company_industry}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="company_size" className="form-label">
                  Company Size *
                </label>
                <select
                  id="company_size"
                  name="company_size"
                  value={formData.company_size}
                  onChange={handleChange}
                  className={`form-select ${validationErrors.company_size ? 'error' : ''}`}
                >
                  <option value="">Select company size</option>
                  {sizeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {validationErrors.company_size && (
                  <span className="field-error">{validationErrors.company_size}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="company_location" className="form-label">
                Company Location *
              </label>
              <input
                type="text"
                id="company_location"
                name="company_location"
                value={formData.company_location}
                onChange={handleChange}
                className={`form-input ${validationErrors.company_location ? 'error' : ''}`}
                placeholder="City, State/Country"
              />
              {validationErrors.company_location && (
                <span className="field-error">{validationErrors.company_location}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading || isCreatingCompany}
            >
              {loading || isCreatingCompany ? 'Creating Profile...' : 'Create Company Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PosterOnboardingPage;
