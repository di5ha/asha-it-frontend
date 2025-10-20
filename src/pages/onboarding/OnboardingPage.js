import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import toast from 'react-hot-toast';
import './OnboardingPage.css';

const OnboardingPage = () => {
  const { updateProfile, loading } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    location: '',
    work_auth: '',
    status_enum: '',
    eligible_start: '',
    expiry: ''
  });
  
  const [validationErrors, setValidationErrors] = useState({});

  const workAuthOptions = [
    { value: 'US Citizen', label: 'US Citizen' },
    { value: 'Green Card Holder', label: 'Green Card Holder' },
    { value: 'H1B Visa', label: 'H1B Visa' },
    { value: 'F1 Visa (OPT)', label: 'F1 Visa (OPT)' },
    { value: 'Other', label: 'Other' }
  ];

  const statusOptions = [
    { value: 'authorized', label: 'Authorized to work' },
    { value: 'pending', label: 'Authorization pending' },
    { value: 'expired', label: 'Authorization expired' }
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
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }
    
    if (!formData.work_auth) {
      errors.work_auth = 'Work authorization status is required';
    }
    
    if (!formData.status_enum) {
      errors.status_enum = 'Authorization status is required';
    }
    
    if (!formData.eligible_start) {
      errors.eligible_start = 'Eligible start date is required';
    }
    
    if (!formData.expiry) {
      errors.expiry = 'Expiry date is required';
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
      await updateProfile(formData);
      toast.success('Profile updated successfully!');
      navigate('/resume/upload');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">
        <div className="onboarding-header">
          <h1>Complete Your Profile</h1>
          <p>Tell us about yourself to get started with job applications</p>
        </div>

        <form className="onboarding-form" onSubmit={handleSubmit}>
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

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${validationErrors.phone ? 'error' : ''}`}
                  placeholder="+1 (555) 123-4567"
                />
                {validationErrors.phone && (
                  <span className="field-error">{validationErrors.phone}</span>
                )}
              </div>

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
                  placeholder="City, State/Country"
                />
                {validationErrors.location && (
                  <span className="field-error">{validationErrors.location}</span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Work Authorization</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="work_auth" className="form-label">
                  Work Authorization Status *
                </label>
                <select
                  id="work_auth"
                  name="work_auth"
                  value={formData.work_auth}
                  onChange={handleChange}
                  className={`form-select ${validationErrors.work_auth ? 'error' : ''}`}
                >
                  <option value="">Select your work authorization status</option>
                  {workAuthOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {validationErrors.work_auth && (
                  <span className="field-error">{validationErrors.work_auth}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="status_enum" className="form-label">
                  Authorization Status *
                </label>
                <select
                  id="status_enum"
                  name="status_enum"
                  value={formData.status_enum}
                  onChange={handleChange}
                  className={`form-select ${validationErrors.status_enum ? 'error' : ''}`}
                >
                  <option value="">Select your current status</option>
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {validationErrors.status_enum && (
                  <span className="field-error">{validationErrors.status_enum}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="eligible_start" className="form-label">
                  Eligible Start Date *
                </label>
                <input
                  type="date"
                  id="eligible_start"
                  name="eligible_start"
                  value={formData.eligible_start}
                  onChange={handleChange}
                  className={`form-input ${validationErrors.eligible_start ? 'error' : ''}`}
                />
                {validationErrors.eligible_start && (
                  <span className="field-error">{validationErrors.eligible_start}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="expiry" className="form-label">
                  Authorization Expiry Date *
                </label>
                <input
                  type="date"
                  id="expiry"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  className={`form-input ${validationErrors.expiry ? 'error' : ''}`}
                />
                {validationErrors.expiry && (
                  <span className="field-error">{validationErrors.expiry}</span>
                )}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Continue to Resume Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
