import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = ({ isSignUp, onSubmit, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

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
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (isSignUp) {
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData.email, formData.password);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-input ${validationErrors.email ? 'error' : ''}`}
          placeholder="Enter your email"
          autoComplete="email"
        />
        {validationErrors.email && (
          <span className="field-error">{validationErrors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`form-input ${validationErrors.password ? 'error' : ''}`}
          placeholder="Enter your password"
          autoComplete={isSignUp ? 'new-password' : 'current-password'}
        />
        {validationErrors.password && (
          <span className="field-error">{validationErrors.password}</span>
        )}
      </div>

      {isSignUp && (
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`form-input ${validationErrors.confirmPassword ? 'error' : ''}`}
            placeholder="Confirm your password"
            autoComplete="new-password"
          />
          {validationErrors.confirmPassword && (
            <span className="field-error">{validationErrors.confirmPassword}</span>
          )}
        </div>
      )}

      <button 
        type="submit" 
        className="submit-btn"
        disabled={!formData.email || !formData.password}
      >
        {isSignUp ? 'Create Account' : 'Sign In'}
      </button>
    </form>
  );
};

export default AuthForm;
