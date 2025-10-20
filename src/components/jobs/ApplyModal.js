import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import './ApplyModal.css';

const ApplyModal = ({ job, onClose, onSubmit, loading }) => {
  const { userProfile } = useApp();
  const [selectedComponents, setSelectedComponents] = useState({});
  const [note, setNote] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Initialize with all components selected by default
    const resumeComponents = userProfile?.profile?.resume_components || {};
    const initialSelection = {
      contact: true,
      education: resumeComponents.education?.length > 0,
      experience: resumeComponents.experience?.length > 0,
      skills: resumeComponents.skills?.technical?.length > 0,
      projects: resumeComponents.projects?.length > 0
    };
    setSelectedComponents(initialSelection);
  }, [userProfile]);

  const handleComponentToggle = (componentType) => {
    setSelectedComponents(prev => ({
      ...prev,
      [componentType]: !prev[componentType]
    }));
    
    // Clear validation error
    if (validationErrors.components) {
      setValidationErrors(prev => ({
        ...prev,
        components: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    const hasSelectedComponents = Object.values(selectedComponents).some(selected => selected);
    if (!hasSelectedComponents) {
      errors.components = 'Please select at least one resume component';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit({
      selectedComponents,
      note
    });
  };

  const getComponentPreview = (componentType) => {
    const resumeComponents = userProfile?.profile?.resume_components || {};
    
    switch (componentType) {
      case 'contact':
        const contact = resumeComponents.contact || {};
        return contact.name ? `${contact.name} - ${contact.email}` : 'Contact information';
      
      case 'education':
        const education = resumeComponents.education || [];
        return education.length > 0 ? `${education.length} education record(s)` : 'No education records';
      
      case 'experience':
        const experience = resumeComponents.experience || [];
        return experience.length > 0 ? `${experience.length} work experience(s)` : 'No work experience';
      
      case 'skills':
        const skills = resumeComponents.skills?.technical || [];
        return skills.length > 0 ? `${skills.length} technical skills` : 'No skills listed';
      
      case 'projects':
        const projects = resumeComponents.projects || [];
        return projects.length > 0 ? `${projects.length} project(s)` : 'No projects listed';
      
      default:
        return 'Component';
    }
  };

  return (
    <div className="apply-modal-overlay">
      <div className="apply-modal">
        <div className="modal-header">
          <h2>Apply for {job.title}</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-content">
          <div className="application-section">
            <h3>Select Resume Components</h3>
            <p>Choose which parts of your resume to include in this application:</p>
            
            {validationErrors.components && (
              <div className="error-message">{validationErrors.components}</div>
            )}

            <div className="components-list">
              <div className="component-item">
                <label className="component-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedComponents.contact}
                    onChange={() => handleComponentToggle('contact')}
                  />
                  <span className="checkmark"></span>
                  <div className="component-info">
                    <h4>Contact Information</h4>
                    <p>{getComponentPreview('contact')}</p>
                  </div>
                </label>
              </div>

              <div className="component-item">
                <label className="component-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedComponents.education}
                    onChange={() => handleComponentToggle('education')}
                  />
                  <span className="checkmark"></span>
                  <div className="component-info">
                    <h4>Education</h4>
                    <p>{getComponentPreview('education')}</p>
                  </div>
                </label>
              </div>

              <div className="component-item">
                <label className="component-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedComponents.experience}
                    onChange={() => handleComponentToggle('experience')}
                  />
                  <span className="checkmark"></span>
                  <div className="component-info">
                    <h4>Work Experience</h4>
                    <p>{getComponentPreview('experience')}</p>
                  </div>
                </label>
              </div>

              <div className="component-item">
                <label className="component-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedComponents.skills}
                    onChange={() => handleComponentToggle('skills')}
                  />
                  <span className="checkmark"></span>
                  <div className="component-info">
                    <h4>Skills</h4>
                    <p>{getComponentPreview('skills')}</p>
                  </div>
                </label>
              </div>

              <div className="component-item">
                <label className="component-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedComponents.projects}
                    onChange={() => handleComponentToggle('projects')}
                  />
                  <span className="checkmark"></span>
                  <div className="component-info">
                    <h4>Projects</h4>
                    <p>{getComponentPreview('projects')}</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="application-section">
            <h3>Additional Note (Optional)</h3>
            <p>Add a personal message to your application:</p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tell the employer why you're interested in this position..."
              className="note-textarea"
              rows="4"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
