import React, { useState, useEffect } from 'react';
import './ResumeComponentEditor.css';

const ResumeComponentEditor = ({ componentType, componentData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(componentData || {});
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setFormData(componentData || {});
  }, [componentData]);

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    
    if (index !== null) {
      // Handle array fields (education, experience, projects)
      setFormData(prev => ({
        ...prev,
        [name]: prev[name].map((item, i) => 
          i === index ? { ...item, [e.target.dataset.field]: value } : item
        )
      }));
    } else {
      // Handle simple fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear validation error
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleArrayFieldChange = (field, index, subField, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, [subField]: value } : item
      )
    }));
  };

  const addArrayItem = (field, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), defaultItem]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSkillsChange = (skillType, skills) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skillType]: skills.split(',').map(s => s.trim()).filter(s => s)
      }
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (componentType === 'contact') {
      if (!formData.name?.trim()) errors.name = 'Name is required';
      if (!formData.email?.trim()) errors.email = 'Email is required';
      if (!formData.phone?.trim()) errors.phone = 'Phone is required';
      if (!formData.location?.trim()) errors.location = 'Location is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const renderContactEditor = () => (
    <div className="editor-form">
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          className={validationErrors.name ? 'error' : ''}
        />
        {validationErrors.name && <span className="field-error">{validationErrors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          className={validationErrors.email ? 'error' : ''}
        />
        {validationErrors.email && <span className="field-error">{validationErrors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone || ''}
          onChange={handleChange}
          className={validationErrors.phone ? 'error' : ''}
        />
        {validationErrors.phone && <span className="field-error">{validationErrors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="location">Location *</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location || ''}
          onChange={handleChange}
          className={validationErrors.location ? 'error' : ''}
        />
        {validationErrors.location && <span className="field-error">{validationErrors.location}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="linkedin">LinkedIn URL</label>
        <input
          type="url"
          id="linkedin"
          name="linkedin"
          value={formData.linkedin || ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="github">GitHub URL</label>
        <input
          type="url"
          id="github"
          name="github"
          value={formData.github || ''}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const renderEducationEditor = () => (
    <div className="editor-form">
      <div className="array-section">
        <div className="section-header">
          <h3>Education</h3>
          <button 
            type="button" 
            onClick={() => addArrayItem('education', {
              degree: '',
              school: '',
              graduation_year: '',
              gpa: '',
              relevant_courses: []
            })}
            className="add-btn"
          >
            Add Education
          </button>
        </div>

        {(formData.education || []).map((edu, index) => (
          <div key={index} className="array-item">
            <div className="item-header">
              <h4>Education #{index + 1}</h4>
              <button 
                type="button" 
                onClick={() => removeArrayItem('education', index)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Degree *</label>
                <input
                  type="text"
                  value={edu.degree || ''}
                  onChange={(e) => handleArrayFieldChange('education', index, 'degree', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>School *</label>
                <input
                  type="text"
                  value={edu.school || ''}
                  onChange={(e) => handleArrayFieldChange('education', index, 'school', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Graduation Year *</label>
                <input
                  type="number"
                  value={edu.graduation_year || ''}
                  onChange={(e) => handleArrayFieldChange('education', index, 'graduation_year', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>GPA</label>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) => handleArrayFieldChange('education', index, 'gpa', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Relevant Courses (comma-separated)</label>
              <input
                type="text"
                value={(edu.relevant_courses || []).join(', ')}
                onChange={(e) => handleArrayFieldChange('education', index, 'relevant_courses', e.target.value.split(',').map(s => s.trim()))}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExperienceEditor = () => (
    <div className="editor-form">
      <div className="array-section">
        <div className="section-header">
          <h3>Work Experience</h3>
          <button 
            type="button" 
            onClick={() => addArrayItem('experience', {
              title: '',
              company: '',
              duration: '',
              description: '',
              achievements: []
            })}
            className="add-btn"
          >
            Add Experience
          </button>
        </div>

        {(formData.experience || []).map((exp, index) => (
          <div key={index} className="array-item">
            <div className="item-header">
              <h4>Experience #{index + 1}</h4>
              <button 
                type="button" 
                onClick={() => removeArrayItem('experience', index)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  value={exp.title || ''}
                  onChange={(e) => handleArrayFieldChange('experience', index, 'title', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Company *</label>
                <input
                  type="text"
                  value={exp.company || ''}
                  onChange={(e) => handleArrayFieldChange('experience', index, 'company', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Duration *</label>
              <input
                type="text"
                value={exp.duration || ''}
                onChange={(e) => handleArrayFieldChange('experience', index, 'duration', e.target.value)}
                placeholder="e.g., 2020-2023"
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={exp.description || ''}
                onChange={(e) => handleArrayFieldChange('experience', index, 'description', e.target.value)}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Achievements (one per line)</label>
              <textarea
                value={(exp.achievements || []).join('\n')}
                onChange={(e) => handleArrayFieldChange('experience', index, 'achievements', e.target.value.split('\n').filter(a => a.trim()))}
                rows="3"
                placeholder="Enter each achievement on a new line"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkillsEditor = () => (
    <div className="editor-form">
      <div className="form-group">
        <label>Technical Skills (comma-separated)</label>
        <textarea
          value={(formData.skills?.technical || []).join(', ')}
          onChange={(e) => handleSkillsChange('technical', e.target.value)}
          rows="3"
          placeholder="React, JavaScript, Python, etc."
        />
      </div>

      <div className="form-group">
        <label>Soft Skills (comma-separated)</label>
        <textarea
          value={(formData.skills?.soft || []).join(', ')}
          onChange={(e) => handleSkillsChange('soft', e.target.value)}
          rows="3"
          placeholder="Leadership, Communication, Problem Solving, etc."
        />
      </div>
    </div>
  );

  const renderProjectsEditor = () => (
    <div className="editor-form">
      <div className="array-section">
        <div className="section-header">
          <h3>Projects</h3>
          <button 
            type="button" 
            onClick={() => addArrayItem('projects', {
              name: '',
              description: '',
              technologies: [],
              url: ''
            })}
            className="add-btn"
          >
            Add Project
          </button>
        </div>

        {(formData.projects || []).map((project, index) => (
          <div key={index} className="array-item">
            <div className="item-header">
              <h4>Project #{index + 1}</h4>
              <button 
                type="button" 
                onClick={() => removeArrayItem('projects', index)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>

            <div className="form-group">
              <label>Project Name *</label>
              <input
                type="text"
                value={project.name || ''}
                onChange={(e) => handleArrayFieldChange('projects', index, 'name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={project.description || ''}
                onChange={(e) => handleArrayFieldChange('projects', index, 'description', e.target.value)}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Technologies (comma-separated)</label>
              <input
                type="text"
                value={(project.technologies || []).join(', ')}
                onChange={(e) => handleArrayFieldChange('projects', index, 'technologies', e.target.value.split(',').map(t => t.trim()))}
              />
            </div>

            <div className="form-group">
              <label>Project URL</label>
              <input
                type="url"
                value={project.url || ''}
                onChange={(e) => handleArrayFieldChange('projects', index, 'url', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const getComponentTitle = () => {
    const titles = {
      contact: 'Contact Information',
      education: 'Education',
      experience: 'Work Experience',
      skills: 'Skills',
      projects: 'Projects'
    };
    return titles[componentType] || 'Component';
  };

  return (
    <div className="component-editor-overlay">
      <div className="component-editor-modal">
        <div className="editor-header">
          <h2>Edit {getComponentTitle()}</h2>
          <button onClick={onCancel} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="editor-content">
          {componentType === 'contact' && renderContactEditor()}
          {componentType === 'education' && renderEducationEditor()}
          {componentType === 'experience' && renderExperienceEditor()}
          {componentType === 'skills' && renderSkillsEditor()}
          {componentType === 'projects' && renderProjectsEditor()}

          <div className="editor-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeComponentEditor;
