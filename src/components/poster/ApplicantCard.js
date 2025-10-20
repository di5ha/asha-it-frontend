import React from 'react';
import { format } from 'date-fns';
import './ApplicantCard.css';

const ApplicantCard = ({ applicant, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(applicant.application_id);
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const getStatusColor = (status) => {
    const colors = {
      submitted: '#3b82f6',
      reviewed: '#8b5cf6',
      interview: '#f59e0b',
      rejected: '#ef4444',
      accepted: '#10b981'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusIcon = (status) => {
    const icons = {
      submitted: '📤',
      reviewed: '👀',
      interview: '🎯',
      rejected: '❌',
      accepted: '✅'
    };
    return icons[status] || '📋';
  };

  const getSelectedComponentsCount = () => {
    if (!applicant.selected_components) return 0;
    return Object.values(applicant.selected_components).filter(Boolean).length;
  };

  const getApplicantName = () => {
    const contact = applicant.selected_components?.contact;
    if (contact?.name) {
      return contact.name;
    }
    return `Applicant ${applicant.application_id.slice(-6)}`;
  };

  const getApplicantEmail = () => {
    const contact = applicant.selected_components?.contact;
    return contact?.email || 'Email not provided';
  };

  const getApplicantLocation = () => {
    const contact = applicant.selected_components?.contact;
    return contact?.location || 'Location not provided';
  };

  return (
    <div className="applicant-card" onClick={handleClick}>
      <div className="applicant-header">
        <div className="applicant-info">
          <div className="applicant-avatar">
            {getApplicantName().charAt(0).toUpperCase()}
          </div>
          <div className="applicant-details">
            <h3 className="applicant-name">{getApplicantName()}</h3>
            <p className="applicant-email">{getApplicantEmail()}</p>
            <p className="applicant-location">📍 {getApplicantLocation()}</p>
          </div>
        </div>
        <div className="applicant-status">
          <span 
            className="status-badge"
            style={{ backgroundColor: getStatusColor(applicant.status) }}
          >
            <span className="status-icon">{getStatusIcon(applicant.status)}</span>
            {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="applicant-content">
        <div className="application-details">
          <div className="detail-item">
            <span className="detail-label">Applied:</span>
            <span className="detail-value">{formatDate(applicant.applied_at)}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Resume Components:</span>
            <span className="detail-value">{getSelectedComponentsCount()} selected</span>
          </div>
          
          {applicant.note && (
            <div className="detail-item">
              <span className="detail-label">Note:</span>
              <span className="detail-value">{applicant.note}</span>
            </div>
          )}
        </div>

        {applicant.selected_components && (
          <div className="resume-preview">
            <h4>Resume Preview</h4>
            
            {applicant.selected_components.education && (
              <div className="preview-section">
                <strong>Education:</strong>
                <p>
                  {applicant.selected_components.education.length} education record(s)
                </p>
              </div>
            )}
            
            {applicant.selected_components.experience && (
              <div className="preview-section">
                <strong>Experience:</strong>
                <p>
                  {applicant.selected_components.experience.length} work experience(s)
                </p>
              </div>
            )}
            
            {applicant.selected_components.skills && (
              <div className="preview-section">
                <strong>Skills:</strong>
                <p>
                  {applicant.selected_components.skills.length} technical skills
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="applicant-actions">
        <button className="view-profile-btn">
          View Full Profile
        </button>
        <div className="action-buttons">
          <button className="action-btn accept">
            Accept
          </button>
          <button className="action-btn reject">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;
