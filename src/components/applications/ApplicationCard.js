import React from 'react';
import { format } from 'date-fns';
import './ApplicationCard.css';

const ApplicationCard = ({ application, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(application.application_id);
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
    if (!application.selected_components) return 0;
    return Object.values(application.selected_components).filter(Boolean).length;
  };

  return (
    <div className="application-card" onClick={handleClick}>
      <div className="application-header">
        <div className="application-title">
          <h3>Application #{application.application_id.slice(-6)}</h3>
          <p className="job-title">Applied to: {application.job_title || 'Job Title'}</p>
        </div>
        <div className="application-status">
          <span 
            className="status-badge"
            style={{ backgroundColor: getStatusColor(application.status) }}
          >
            <span className="status-icon">{getStatusIcon(application.status)}</span>
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="application-details">
        <div className="detail-item">
          <span className="detail-label">Applied Date:</span>
          <span className="detail-value">{formatDate(application.applied_at)}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Resume Components:</span>
          <span className="detail-value">{getSelectedComponentsCount()} selected</span>
        </div>
        
        {application.note && (
          <div className="detail-item">
            <span className="detail-label">Note:</span>
            <span className="detail-value">{application.note}</span>
          </div>
        )}
      </div>

      <div className="application-actions">
        <button className="view-details-btn">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
